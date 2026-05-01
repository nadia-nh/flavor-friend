'use client'

import { useState, useEffect, useRef } from 'react'
import { Food, FoodCategory, FoodType, Attempt } from '@/lib/types'
import { getSuggestionsForFood, getSimilarFoods, getSimilarFoodsFallback, getAllSuggestedFoods, getFoodType, foodSuggestions } from '@/lib/foods'
import { recipes, getRecipeForFood } from '@/lib/recipes'

const STORAGE_KEY = 'flavorfriend-foods'
const FOOD_TYPES: FoodType[] = ['vegetable', 'grain', 'legume', 'other']
const CATEGORIES: FoodCategory[] = ['love', 'exploring', 'curious', 'notYet']

const FOOD_TYPE_CONFIG: Record<FoodType, {
  label: string; emoji: string; fill: string; stroke: string; textColor: string; startDeg: number; endDeg: number
}> = {
  vegetable: { label: 'Vegetables', emoji: '🥦', fill: '#bbf7d0', stroke: '#16a34a', textColor: '#14532d', startDeg: 180, endDeg: 270 },
  grain:     { label: 'Grains',     emoji: '🌾', fill: '#fde68a', stroke: '#d97706', textColor: '#78350f', startDeg: 270, endDeg: 360 },
  legume:    { label: 'Legumes',    emoji: '🫘', fill: '#fed7aa', stroke: '#ea580c', textColor: '#7c2d12', startDeg: 0,   endDeg: 90  },
  other:     { label: 'Other',      emoji: '🥜', fill: '#ddd6fe', stroke: '#7c3aed', textColor: '#4c1d95', startDeg: 90,  endDeg: 180 },
}

const defaultFoods: Food[] = [
  { id: '1', name: 'Rice',    category: 'love', foodType: 'grain',     attempts: 10, lastAttempted: '2024-01-15', notes: '', methodUsed: '', attemptHistory: [] },
  { id: '2', name: 'Pasta',   category: 'love', foodType: 'grain',     attempts: 10, lastAttempted: '2024-01-15', notes: '', methodUsed: '', attemptHistory: [] },
  { id: '3', name: 'Bread',   category: 'love', foodType: 'other',     attempts: 10, lastAttempted: '2024-01-15', notes: '', methodUsed: '', attemptHistory: [] },
  { id: '4', name: 'Broccoli', category: 'exploring', foodType: 'vegetable', attempts: 2, lastAttempted: '2024-01-10', notes: '', methodUsed: 'Roasted', attemptHistory: [
    { id: 'a1', date: '2024-01-08', method: 'Roasted', liked: false, notes: 'Too crunchy' },
    { id: 'a2', date: '2024-01-10', method: 'Steamed', liked: null, notes: 'It was okay' },
  ]},
  { id: '5', name: 'Spinach', category: 'exploring', foodType: 'vegetable', attempts: 1, lastAttempted: '2024-01-12', notes: '', methodUsed: 'Smoothie', attemptHistory: [
    { id: 'a3', date: '2024-01-12', method: 'Smoothie', liked: true, notes: 'Couldnt even taste it!' },
  ]},
  { id: '6', name: 'Mushrooms',       category: 'curious', foodType: 'vegetable', attempts: 0, lastAttempted: null, notes: '', methodUsed: '', attemptHistory: [] },
  { id: '7', name: 'Brussels Sprouts', category: 'curious', foodType: 'vegetable', attempts: 0, lastAttempted: null, notes: '', methodUsed: '', attemptHistory: [] },
  { id: '8', name: 'Cauliflower',     category: 'curious', foodType: 'vegetable', attempts: 0, lastAttempted: null, notes: '', methodUsed: '', attemptHistory: [] },
]

const encouragementMessages = [
  "You're doing great! Every try counts.",
  "Nice work! Your palate is expanding.",
  "That's courage! Keep going at your own pace.",
  "Every bite teaches your body something new.",
  "You're amazing for trying!",
  "Food adventures take time - be patient with yourself.",
  "Small steps lead to big discoveries!",
]

function getIngredientImageUrl(foodName: string): string {
  const slug = foodName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  return `https://spoonacular.com/cdn/ingredients_500x500/${slug}.jpg`
}

const PLATE_CX = 200
const PLATE_CY = 200
const PLATE_R = 183
const INNER_R = 28

function polarToXY(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function makeSectorPath(cx: number, cy: number, outerR: number, innerR: number, startDeg: number, endDeg: number): string {
  const oS = polarToXY(cx, cy, outerR, startDeg)
  const oE = polarToXY(cx, cy, outerR, endDeg)
  const iS = polarToXY(cx, cy, innerR, startDeg)
  const iE = polarToXY(cx, cy, innerR, endDeg)
  const large = endDeg - startDeg > 180 ? 1 : 0
  return `M ${iS.x} ${iS.y} L ${oS.x} ${oS.y} A ${outerR} ${outerR} 0 ${large} 1 ${oE.x} ${oE.y} L ${iE.x} ${iE.y} A ${innerR} ${innerR} 0 ${large} 0 ${iS.x} ${iS.y} Z`
}

function getFoodCirclePositions(count: number, startDeg: number, endDeg: number, cx: number, cy: number): Array<{x: number; y: number}> {
  if (count === 0) return []
  const innerR = 48
  const outerR = 158
  const pad = 20
  const usableStart = startDeg + pad
  const usableEnd = endDeg - pad
  const usableRange = usableEnd - usableStart
  const maxPerRow = 2
  const rows = Math.ceil(count / maxPerRow)
  const rStep = (outerR - innerR) / rows
  const positions: Array<{x: number; y: number}> = []
  let placed = 0
  for (let row = 0; row < rows && placed < count; row++) {
    const r = innerR + rStep * (row + 0.5)
    const inRow = Math.min(maxPerRow, count - placed)
    for (let i = 0; i < inRow; i++) {
      const t = inRow === 1 ? 0.5 : i / (inRow - 1)
      positions.push(polarToXY(cx, cy, r, usableStart + usableRange * t))
      placed++
    }
  }
  return positions
}

export default function Home() {
  const [foods, setFoods] = useState<Food[]>([])
  const [showMessage, setShowMessage] = useState('')
  const [selectedFood, setSelectedFood] = useState<Food | null>(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [showProgress, setShowProgress] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [movedToSafe, setMovedToSafe] = useState<string[]>([])
  const [attemptModal, setAttemptModal] = useState<Food | null>(null)
  const [attemptMethod, setAttemptMethod] = useState('')
  const [attemptLiked, setAttemptLiked] = useState<boolean | null>(null)
  const [attemptNotes, setAttemptNotes] = useState('')
  const [suggestionIndex, setSuggestionIndex] = useState(0)
  const [dismissedSuggestions, setDismissedSuggestions] = useState<string[]>([])
  const [plateInput, setPlateInput] = useState('')
  const [exploringInput, setExploringInput] = useState('')
  const [showAutocomplete, setShowAutocomplete] = useState<Record<string, boolean>>({})
  const [recipeFilter, setRecipeFilter] = useState('all')
  const [suggestionImgError, setSuggestionImgError] = useState(false)
  const [platePopover, setPlatePopover] = useState<{food: Food; x: number; y: number} | null>(null)
  const [plateDragGhost, setPlateDragGhost] = useState<{svgX: number; svgY: number; outside: boolean; foodId: string} | null>(null)
  const plateRef = useRef<SVGSVGElement>(null)
  const plateDragRef = useRef<{food: Food; startX: number; startY: number; curX: number; curY: number; outside: boolean} | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const cardInnerRef = useRef<HTMLDivElement>(null)
  const cardDragRef = useRef<{startX: number; deltaX: number} | null>(null)
  const [swipeDir, setSwipeDir] = useState<'left' | 'right' | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed: Food[] = JSON.parse(stored)
      if (parsed.length === 0) {
        setFoods(defaultFoods)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultFoods))
      } else {
        const migrated = parsed.map(f => ({
          ...f,
          foodType: (f.foodType ?? getFoodType(f.name)) as FoodType,
          category: (f.category === 'notYet' ? 'curious' : f.category) as FoodCategory,
        }))
        setFoods(migrated)
      }
    } else {
      setFoods(defaultFoods)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultFoods))
    }
  }, [])

  useEffect(() => {
    if (foods.length > 0) localStorage.setItem(STORAGE_KEY, JSON.stringify(foods))
  }, [foods])

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const drag = plateDragRef.current
      if (!drag || !plateRef.current) return
      drag.curX = e.clientX
      drag.curY = e.clientY
      const rect = plateRef.current.getBoundingClientRect()
      const svgX = (e.clientX - rect.left) / rect.width * 400
      const svgY = (e.clientY - rect.top) / rect.height * 400
      const outside = Math.sqrt((svgX - PLATE_CX) ** 2 + (svgY - PLATE_CY) ** 2) > PLATE_R + 9
      drag.outside = outside
      setPlateDragGhost({ svgX, svgY, outside, foodId: drag.food.id })
    }
    const onUp = (e: PointerEvent) => {
      const drag = plateDragRef.current
      if (!drag) return
      const dist = Math.sqrt((drag.curX - drag.startX) ** 2 + (drag.curY - drag.startY) ** 2)
      if (dist < 8) {
        setPlatePopover({ food: drag.food, x: drag.curX, y: drag.curY })
      } else if (drag.outside) {
        setFoods(prev => prev.filter(f => f.id !== drag.food.id))
      }
      plateDragRef.current = null
      setPlateDragGhost(null)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [])

  const addFood = (name: string, category: FoodCategory, foodType?: FoodType) => {
    if (!name.trim()) return
    if (foods.some(f => f.name.toLowerCase() === name.trim().toLowerCase())) return
    const newFood: Food = {
      id: Date.now().toString(),
      name: name.trim(),
      category,
      foodType: foodType ?? getFoodType(name),
      attempts: 0,
      lastAttempted: null,
      notes: '',
      methodUsed: '',
      attemptHistory: [],
    }
    setFoods(prev => [...prev, newFood])
  }

  const moveFood = (food: Food, newCategory: FoodCategory) => {
    if (newCategory === 'love' && (food.category === 'exploring' || food.category === 'curious') && !movedToSafe.includes(food.id)) {
      setMovedToSafe(prev => [...prev, food.id])
      setShowMessage(`${food.name} is on your plate!`)
      setTimeout(() => setShowMessage(''), 2000)
    }
    setFoods(prev => prev.map(f => f.id === food.id ? { ...f, category: newCategory } : f))
  }

  const deleteFood = (id: string) => setFoods(prev => prev.filter(f => f.id !== id))

  const openAttemptModal = (food: Food) => {
    const suggestion = getSuggestionsForFood(food.name)
    setAttemptMethod(suggestion?.cookingMethods[0]?.name || 'Plain')
    setAttemptLiked(null)
    setAttemptNotes('')
    setAttemptModal(food)
  }

  const submitAttempt = () => {
    if (!attemptModal) return
    const attempt: Attempt = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      method: attemptMethod,
      liked: attemptLiked,
      notes: attemptNotes,
    }
    const newAttempts = attemptModal.attempts + 1
    const message = newAttempts >= 7
      ? `Amazing! You've tried ${attemptModal.name} 7 times! Move it to your plate when ready.`
      : encouragementMessages[newAttempts % encouragementMessages.length]
    setShowMessage(message)
    setTimeout(() => setShowMessage(''), 4000)
    setFoods(prev => prev.map(f => f.id === attemptModal.id ? {
      ...f, attempts: newAttempts, lastAttempted: attempt.date,
      methodUsed: attemptMethod, attemptHistory: [...f.attemptHistory, attempt],
    } : f))
    setAttemptModal(null)
  }

  const addOrMoveFood = (name: string, category: FoodCategory) => {
    const existing = foods.find(f => f.name.toLowerCase() === name.toLowerCase())
    if (existing) {
      if (existing.category !== category) moveFood(existing, category)
    } else {
      addFood(name, category)
    }
  }

  useEffect(() => {
    setSuggestionImgError(false)
  }, [suggestionIndex])

  const allFoodNames = getAllSuggestedFoods()
  const loveFoods = foods.filter(f => f.category === 'love')
  const exploringFoods = foods.filter(f => f.category === 'exploring')
  const safeFoodNames = loveFoods.map(f => f.name)
  const recipeCategories = ['all', ...Array.from(new Set(recipes.map(r => r.category)))]
  const inProgressFoods = exploringFoods.filter(f => f.attempts > 0)

  const allSuggested = getSimilarFoods(safeFoodNames)
  const availableSuggestions = allSuggested.filter(s => !dismissedSuggestions.includes(s) && !foods.some(f => f.name.toLowerCase() === s.toLowerCase()))
  const fallbackSuggestions = availableSuggestions.length === 0 ? getSimilarFoodsFallback(safeFoodNames, allFoodNames) : []
  const allSuggestions = availableSuggestions.length > 0 ? availableSuggestions : fallbackSuggestions
  const currentSuggestion = allSuggestions[Math.max(0, suggestionIndex) % Math.max(1, allSuggestions.length)]
  const usingFallback = availableSuggestions.length === 0 && fallbackSuggestions.length > 0
  const suggestionData = currentSuggestion ? foodSuggestions.find(s => s.name === currentSuggestion) : undefined
  const exampleRecipe = currentSuggestion ? getRecipeForFood(currentSuggestion) : undefined

  const handleAddCurrentSuggestion = (category: FoodCategory) => {
    if (currentSuggestion) {
      addFood(currentSuggestion, category)
      setDismissedSuggestions(prev => [...prev, currentSuggestion])
      setSuggestionIndex(prev => prev + 1)
    }
  }

  const handleCardPointerDown = (e: React.PointerEvent) => {
    e.preventDefault()
    cardDragRef.current = { startX: e.clientX, deltaX: 0 }
    cardRef.current?.setPointerCapture(e.pointerId)
  }

  const handleCardPointerMove = (e: React.PointerEvent) => {
    const drag = cardDragRef.current
    if (!drag) return
    const deltaX = e.clientX - drag.startX
    drag.deltaX = deltaX
    if (cardInnerRef.current) {
      cardInnerRef.current.style.transform = `translateX(${deltaX}px) rotate(${deltaX / 20}deg)`
    }
    setSwipeDir(deltaX > 30 ? 'right' : deltaX < -30 ? 'left' : null)
  }

  const handleCardPointerUp = () => {
    const drag = cardDragRef.current
    if (!drag) return
    const { deltaX } = drag
    cardDragRef.current = null
    if (cardInnerRef.current) {
      cardInnerRef.current.style.transform = ''
    }
    setSwipeDir(null)
    if (currentSuggestion) {
      if (deltaX > 60) handleAddCurrentSuggestion('exploring')
      else if (deltaX < -60) setSuggestionIndex(prev => prev + 1)
    }
  }

  const dm = darkMode

  const renderAutocomplete = (key: string, inputVal: string, onSelect: (name: string) => void, dropUp = false, excludeNames: string[] = []) => {
    if (!showAutocomplete[key] || inputVal.length === 0) return null
    const excluded = new Set(excludeNames.map(n => n.toLowerCase()))
    const filtered = allFoodNames.filter(n =>
      n.toLowerCase().includes(inputVal.toLowerCase()) && !excluded.has(n.toLowerCase())
    ).slice(0, 6)
    if (filtered.length === 0) return null
    return (
      <div className={`absolute z-20 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-36 overflow-y-auto ${dropUp ? 'bottom-full mb-1' : 'top-full mt-1'}`}>
        {filtered.map(name => (
          <button
            key={name}
            className="w-full text-left px-3 py-1.5 text-sm hover:bg-green-50"
            onMouseDown={e => e.preventDefault()}
            onClick={() => onSelect(name)}
          >
            {name}
          </button>
        ))}
      </div>
    )
  }

  return (
    <main className={`min-h-screen p-4 ${dm ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <header className="text-center mb-6">
        <div className="flex justify-end mb-2">
          <button onClick={() => setDarkMode(!dm)} className={`px-3 py-1 rounded-lg text-sm ${dm ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}>
            {dm ? '☀️' : '🌙'}
          </button>
        </div>
        <h1 className={`text-3xl font-bold mb-2 ${dm ? 'text-emerald-300' : 'text-green-800'}`}>PlantPal</h1>
        <p className={dm ? 'text-emerald-400' : 'text-green-700'}>Expand your palate, one bite at a time</p>
      </header>

      {showMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-4 py-2 rounded-full shadow-lg z-50 text-sm">
          {showMessage}
        </div>
      )}

      {/* Suggestions toggle */}
      <button
        onClick={() => setShowSuggestions(!showSuggestions)}
        className={`mx-auto block mb-4 px-6 py-3 rounded-2xl font-medium transition-all ${
          showSuggestions ? 'bg-emerald-500 text-white' : 'bg-green-100 text-green-700 border border-green-300 hover:bg-green-200'
        }`}
      >
        {showSuggestions ? '✕ Close Suggestions' : '+ Food Suggestions'}
      </button>

      {showSuggestions && (
        <div className="max-w-md mx-auto mb-6">
          {!currentSuggestion ? (
            <div className="bg-white rounded-2xl border-2 border-green-200 shadow-lg p-8">
              <p className="text-center text-gray-500">No more suggestions. Check back later!</p>
            </div>
          ) : (
            <>
              {/* Swipeable card */}
              <div
                ref={cardRef}
                className="relative h-64 cursor-grab active:cursor-grabbing select-none touch-none"
                onPointerDown={handleCardPointerDown}
                onPointerMove={handleCardPointerMove}
                onPointerUp={handleCardPointerUp}
                onPointerCancel={handleCardPointerUp}
              >
                <div
                  ref={cardInnerRef}
                  className="absolute inset-0 bg-white rounded-2xl border border-green-200 shadow-lg overflow-hidden flex flex-col"
                  style={{ willChange: 'transform' }}
                >
                  {/* Full-width image area */}
                  <div className="relative w-full flex-1 bg-green-100 flex items-center justify-center overflow-hidden">
                    {!suggestionImgError
                      ? <img key={currentSuggestion} src={getIngredientImageUrl(currentSuggestion)} alt={currentSuggestion} className="w-full h-full object-cover" onError={() => setSuggestionImgError(true)} />
                      : <span className="text-7xl">🍽️</span>
                    }
                    {/* Gradient overlay for text legibility */}
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
                    {/* Category badge */}
                    {suggestionData && (
                      <span className="absolute top-2 left-2 bg-white/85 backdrop-blur-sm text-xs font-semibold px-2 py-1 rounded-full">
                        {FOOD_TYPE_CONFIG[suggestionData.foodType].emoji} {FOOD_TYPE_CONFIG[suggestionData.foodType].label}
                      </span>
                    )}
                    {/* Food name on gradient */}
                    <span className="absolute bottom-3 left-0 right-0 text-center text-white font-bold text-xl drop-shadow-lg px-4">
                      {currentSuggestion}
                    </span>
                  </div>
                </div>

                {/* Swipe overlays */}
                {swipeDir === 'right' && (
                  <div className="absolute inset-0 bg-green-400/30 rounded-2xl flex items-center justify-center pointer-events-none">
                    <span className="text-white font-bold text-2xl drop-shadow-lg">✓ Try it!</span>
                  </div>
                )}
                {swipeDir === 'left' && (
                  <div className="absolute inset-0 bg-gray-400/30 rounded-2xl flex items-center justify-center pointer-events-none">
                    <span className="text-white font-bold text-2xl drop-shadow-lg">→ Skip</span>
                  </div>
                )}
              </div>

              {/* Recipe hint outside drag zone */}
              {exampleRecipe && (
                <p className="text-xs text-center text-green-600 mt-2">✨ Try: {exampleRecipe.title}</p>
              )}

              {/* Action buttons */}
              <div className="flex items-center justify-around mt-4 px-8">
                <div className="flex flex-col items-center gap-1">
                  <button
                    onClick={() => setSuggestionIndex(p => p + 1)}
                    className="w-14 h-14 rounded-full bg-gray-100 text-gray-500 text-2xl hover:bg-gray-200 flex items-center justify-center shadow transition-colors"
                  >
                    →
                  </button>
                  <span className="text-xs text-gray-400">Skip</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <button
                    onClick={() => handleAddCurrentSuggestion('exploring')}
                    className="w-14 h-14 rounded-full bg-green-100 text-green-700 text-2xl hover:bg-green-200 flex items-center justify-center shadow transition-colors"
                  >
                    ✓
                  </button>
                  <span className="text-xs text-green-600 font-medium">Try it!</span>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Main layout */}
      <div className="flex flex-col lg:flex-row gap-6 max-w-5xl mx-auto px-4 mb-8">

        {/* Plate */}
        <div className="flex-1">
          <h2 className={`text-xl font-bold mb-3 text-center ${dm ? 'text-gray-200' : 'text-gray-800'}`}>Your Plate</h2>
          <svg ref={plateRef} viewBox="-30 -30 460 460" className="w-full max-w-sm mx-auto drop-shadow-xl" style={{ touchAction: 'none' }}>
            {/* Rim */}
            <circle cx={PLATE_CX} cy={PLATE_CY} r={PLATE_R + 9} fill={plateDragGhost?.outside ? '#fca5a5' : dm ? '#374151' : '#d1d5db'} />
            <circle cx={PLATE_CX} cy={PLATE_CY} r={PLATE_R} fill="white" />

            {FOOD_TYPES.map(ft => {
              const cfg = FOOD_TYPE_CONFIG[ft]
              const sectorFoods = loveFoods.filter(f => f.foodType === ft)
              const positions = getFoodCirclePositions(sectorFoods.length, cfg.startDeg, cfg.endDeg, PLATE_CX, PLATE_CY)
              const midAngle = (cfg.startDeg + cfg.endDeg) / 2
              const labelPos = polarToXY(PLATE_CX, PLATE_CY, 242, midAngle)
              return (
                <g key={ft}>
                  <path d={makeSectorPath(PLATE_CX, PLATE_CY, PLATE_R, INNER_R, cfg.startDeg, cfg.endDeg)} fill={cfg.fill} stroke="white" strokeWidth="2" />
                  <text x={labelPos.x} y={labelPos.y - 9} textAnchor="middle" dominantBaseline="central" fontSize="22">{cfg.emoji}</text>
                  <text x={labelPos.x} y={labelPos.y + 13} textAnchor="middle" dominantBaseline="central" fontSize="14" fontWeight="700" fill={cfg.stroke} fontFamily="system-ui, sans-serif">
                    {cfg.label}
                  </text>
                  {sectorFoods.map((food, i) => {
                    const pos = positions[i]
                    if (!pos) return null
                    const isDragging = plateDragGhost?.foodId === food.id
                    return (
                      <g
                        key={food.id}
                        style={{ cursor: isDragging ? 'grabbing' : 'grab', opacity: isDragging ? 0.3 : 1 }}
                        onPointerDown={e => {
                          e.preventDefault()
                          plateDragRef.current = { food, startX: e.clientX, startY: e.clientY, curX: e.clientX, curY: e.clientY, outside: false }
                        }}
                      >
                        <text x={pos.x} y={pos.y} textAnchor="middle" dominantBaseline="central" fontSize="24" style={{ userSelect: 'none' }}>
                          {cfg.emoji}
                        </text>
                        <text x={pos.x} y={pos.y + 16} textAnchor="middle" dominantBaseline="hanging" fontSize="11" fill={cfg.textColor} fontWeight="600" fontFamily="system-ui, sans-serif">
                          {food.name.length <= 12 ? food.name : food.name.slice(0, 11) + '…'}
                        </text>
                        <title>{food.name}</title>
                      </g>
                    )
                  })}
                </g>
              )
            })}

            {/* Center */}
            <circle cx={PLATE_CX} cy={PLATE_CY} r={INNER_R} fill={dm ? '#374151' : '#f9fafb'} stroke={dm ? '#4b5563' : '#e5e7eb'} strokeWidth="1" />

            {/* Drag ghost */}
            {plateDragGhost && (() => {
              const draggedFood = loveFoods.find(f => f.id === plateDragGhost.foodId)
              const ft = draggedFood?.foodType ?? 'other'
              const cfg2 = FOOD_TYPE_CONFIG[ft]
              return (
                <g style={{ pointerEvents: 'none' }} opacity="0.85">
                  <text x={plateDragGhost.svgX} y={plateDragGhost.svgY} textAnchor="middle" dominantBaseline="central" fontSize="24" style={{ userSelect: 'none' }}>
                    {cfg2.emoji}
                  </text>
                  {plateDragGhost.outside && (
                    <text x={plateDragGhost.svgX} y={plateDragGhost.svgY + 22} textAnchor="middle" fontSize="11" fill="#ef4444" fontWeight="600">Release to remove</text>
                  )}
                </g>
              )
            })()}
          </svg>

          {/* Single plate input */}
          <div className="relative mt-5 max-w-sm mx-auto">
            <input
              type="text"
              value={plateInput}
              placeholder="Add food to your plate…"
              className={`w-full px-4 py-2.5 text-sm border-2 rounded-xl ${dm ? 'bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-500' : 'bg-white border-gray-300 placeholder-gray-400'} focus:outline-none focus:border-emerald-400`}
              onChange={e => {
                setPlateInput(e.target.value)
                setShowAutocomplete(p => ({ ...p, plate: e.target.value.length > 0 }))
              }}
              onFocus={() => { if (plateInput.length > 0) setShowAutocomplete(p => ({ ...p, plate: true })) }}
              onBlur={() => { setTimeout(() => setShowAutocomplete(p => ({ ...p, plate: false })), 200) }}
              onKeyDown={e => {
                if (e.key === 'Enter' && plateInput.trim()) {
                  addOrMoveFood(plateInput.trim(), 'love')
                  setPlateInput('')
                }
              }}
            />
            {renderAutocomplete('plate', plateInput, name => {
              addOrMoveFood(name, 'love')
              setPlateInput('')
              setShowAutocomplete(p => ({ ...p, plate: false }))
            }, false, loveFoods.map(f => f.name))}
          </div>
        </div>

        {/* Exploring sidebar */}
        <div className={`w-full lg:w-72 rounded-2xl p-4 ${dm ? 'bg-lime-900/30 border-lime-800' : 'bg-lime-50 border-lime-200'} border`}>
          <h2 className={`text-lg font-bold mb-4 ${dm ? 'text-lime-300' : 'text-lime-800'}`}>🌱 Trying Now</h2>

          {exploringFoods.length === 0 && (
            <p className={`text-sm mb-4 ${dm ? 'text-lime-500' : 'text-lime-600'}`}>Add foods you&apos;re experimenting with here!</p>
          )}

          <ul className="space-y-2 mb-4">
            {exploringFoods.map(food => (
              <li key={food.id} className={`flex items-center gap-2 p-2 rounded-xl ${dm ? 'bg-lime-800/40' : 'bg-white'} shadow-sm`}>
                <button
                  onClick={() => setSelectedFood(food)}
                  className={`flex-1 text-left text-sm font-medium truncate ${dm ? 'text-lime-200 hover:text-lime-400' : 'text-gray-800 hover:text-lime-700'}`}
                >
                  {food.name}
                </button>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <div className="relative w-7 h-7">
                    <svg className="w-7 h-7 -rotate-90">
                      <circle cx="14" cy="14" r="10" stroke={dm ? '#374151' : '#e5e7eb'} strokeWidth="2.5" fill="none" />
                      <circle cx="14" cy="14" r="10" stroke="#84cc16" strokeWidth="2.5" fill="none"
                        strokeDasharray={`${Math.min(food.attempts, 7) * 8.98} 62.8`} className="transition-all duration-300" />
                    </svg>
                    <span className={`absolute inset-0 flex items-center justify-center text-xs font-medium ${dm ? 'text-lime-300' : 'text-lime-700'}`}>{food.attempts}</span>
                  </div>
                  <span className={`text-xs ${dm ? 'text-lime-600' : 'text-lime-500'}`}>/7</span>
                  <button onClick={() => openAttemptModal(food)} className={`text-lg font-bold leading-none px-1 ${dm ? 'text-lime-400 hover:text-lime-200' : 'text-lime-500 hover:text-lime-700'}`}>+</button>
                  <button onClick={() => deleteFood(food.id)} className={`text-xs px-0.5 ${dm ? 'text-gray-500 hover:text-red-400' : 'text-gray-400 hover:text-red-500'}`}>✕</button>
                </div>
              </li>
            ))}
          </ul>

          <div className="relative">
            <input
              type="text"
              value={exploringInput}
              placeholder="Add food to try…"
              className={`w-full px-3 py-2 text-sm border rounded-xl ${dm ? 'bg-lime-900/50 border-lime-700 text-lime-100 placeholder-lime-600' : 'bg-white border-lime-300 placeholder-lime-400'}`}
              onChange={e => {
                setExploringInput(e.target.value)
                setShowAutocomplete(p => ({ ...p, exploring: e.target.value.length > 0 }))
              }}
              onFocus={() => { if (exploringInput.length > 0) setShowAutocomplete(p => ({ ...p, exploring: true })) }}
              onBlur={() => { setTimeout(() => setShowAutocomplete(p => ({ ...p, exploring: false })), 200) }}
              onKeyDown={e => {
                if (e.key === 'Enter' && exploringInput) {
                  addOrMoveFood(exploringInput, 'exploring')
                  setExploringInput('')
                }
              }}
            />
            {renderAutocomplete('exploring', exploringInput, name => {
              addOrMoveFood(name, 'exploring')
              setExploringInput('')
              setShowAutocomplete(p => ({ ...p, exploring: false }))
            }, true, exploringFoods.map(f => f.name))}
          </div>
        </div>
      </div>

      {/* Plate food popover */}
      {platePopover && (
        <div className="fixed inset-0 z-30" onClick={() => setPlatePopover(null)}>
          <div
            className="absolute bg-white rounded-2xl shadow-xl border border-gray-200 p-3 w-44"
            style={{ left: Math.min(platePopover.x, window.innerWidth - 184), top: Math.min(platePopover.y - 8, window.innerHeight - 140) }}
            onClick={e => e.stopPropagation()}
          >
            <p className="text-sm font-semibold text-gray-800 mb-2 truncate">{platePopover.food.name}</p>
            <button
              className="w-full text-left px-3 py-1.5 rounded-xl text-sm hover:bg-lime-50 text-lime-700 mb-1"
              onClick={() => { moveFood(platePopover.food, 'exploring'); setPlatePopover(null) }}
            >
              🌱 Move to Exploring
            </button>
            <button
              className="w-full text-left px-3 py-1.5 rounded-xl text-sm hover:bg-red-50 text-red-600 mb-1"
              onClick={() => { deleteFood(platePopover.food.id); setPlatePopover(null) }}
            >
              🗑️ Remove
            </button>
            <button
              className="w-full text-left px-3 py-1.5 rounded-xl text-sm hover:bg-gray-50 text-gray-600"
              onClick={() => { setSelectedFood(platePopover.food); setPlatePopover(null) }}
            >
              Details →
            </button>
          </div>
        </div>
      )}

      {/* Food detail modal */}
      {selectedFood && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 p-4" onClick={() => setSelectedFood(null)}>
          <div className="bg-white rounded-2xl p-4 max-w-sm w-full max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">{selectedFood.name}</h3>
              <div className="flex gap-1">
                {CATEGORIES.map(cat => (
                  <button key={cat} onClick={() => moveFood(selectedFood, cat)}
                    className={`text-xs px-2 py-1 rounded ${selectedFood.category === cat ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {cat === 'love' ? '🟢' : cat === 'exploring' ? '🌱' : cat === 'curious' ? '🌿' : '🚫'}
                  </button>
                ))}
              </div>
            </div>
            {(() => {
              const suggestion = getSuggestionsForFood(selectedFood.name)
              if (!suggestion) return null
              return (
                <>
                  <p className="text-sm text-gray-600 mb-3">Similar to: {suggestion.similarTo.join(', ')}</p>
                  <h4 className="font-medium text-gray-800 mb-2">Cooking methods:</h4>
                  <ul className="space-y-2 mb-4">
                    {suggestion.cookingMethods.map((method, i) => (
                      <li key={i} className="text-sm bg-gray-50 p-2 rounded">
                        <span className="font-medium">{method.name}</span>
                        <span className={`ml-2 px-1 rounded text-xs ${method.difficulty === 'easy' ? 'bg-green-100 text-green-700' : method.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{method.difficulty}</span>
                        <p className="text-gray-600 text-xs mt-0.5">{method.description}</p>
                      </li>
                    ))}
                  </ul>
                  <h4 className="font-medium text-gray-800 mb-2">Easy meals:</h4>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {suggestion.easyMeals.map((meal, i) => (
                      <span key={i} className="px-2 py-1 bg-blue-50 border border-blue-200 rounded-full text-xs text-blue-700">{meal}</span>
                    ))}
                  </div>
                </>
              )
            })()}
            {selectedFood.attemptHistory.length > 0 && (
              <>
                <h4 className="font-medium text-gray-800 mb-2">Your attempts:</h4>
                <ul className="space-y-1 mb-4">
                  {[...selectedFood.attemptHistory].reverse().map(attempt => (
                    <li key={attempt.id} className="text-xs bg-gray-50 p-2 rounded">
                      <span className="text-gray-500">{attempt.date}</span> — {attempt.method}
                      {attempt.liked === true && <span className="text-green-600 ml-1">✓</span>}
                      {attempt.liked === false && <span className="text-red-500 ml-1">✕</span>}
                      {attempt.notes && <span className="text-gray-500 ml-1">· {attempt.notes}</span>}
                    </li>
                  ))}
                </ul>
              </>
            )}
            <button onClick={() => setSelectedFood(null)} className="w-full py-2 bg-gray-100 text-gray-600 rounded-xl">Close</button>
          </div>
        </div>
      )}

      {/* Attempt modal */}
      {attemptModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-4 max-w-sm w-full">
            <h3 className="font-semibold text-lg mb-4">Log attempt: {attemptModal.name}</h3>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">How did you try it?</label>
              <input type="text" value={attemptMethod} onChange={e => setAttemptMethod(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-xl" />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">Did you like it?</label>
              <div className="flex gap-2">
                <button onClick={() => setAttemptLiked(true)} className={`flex-1 py-2 rounded-xl border ${attemptLiked === true ? 'bg-green-500 text-white border-green-500' : 'border-gray-300 text-gray-600'}`}>✓ Liked</button>
                <button onClick={() => setAttemptLiked(false)} className={`flex-1 py-2 rounded-xl border ${attemptLiked === false ? 'bg-red-500 text-white border-red-500' : 'border-gray-300 text-gray-600'}`}>✕ Not yet</button>
                <button onClick={() => setAttemptLiked(null)} className={`flex-1 py-2 rounded-xl border ${attemptLiked === null ? 'bg-gray-500 text-white border-gray-500' : 'border-gray-300 text-gray-600'}`}>? Not sure</button>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea value={attemptNotes} onChange={e => setAttemptNotes(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-xl" rows={2} />
            </div>
            <div className="flex gap-2">
              <button onClick={() => setAttemptModal(null)} className="flex-1 py-2 border border-gray-300 rounded-xl text-gray-600">Cancel</button>
              <button onClick={submitAttempt} className="flex-1 py-2 bg-emerald-500 text-white rounded-xl">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Progress */}
      <button
        onClick={() => setShowProgress(!showProgress)}
        className={`mx-auto block mb-4 px-6 py-3 rounded-2xl font-medium transition-all ${showProgress ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-700 border border-purple-300 hover:bg-purple-200'}`}
      >
        {showProgress ? '✕ Close Progress' : '📊 View Progress'}
      </button>

      {showProgress && (
        <div className="max-w-md mx-auto mb-6 p-4 bg-white rounded-2xl border-2 border-purple-200 shadow-lg">
          <h3 className="font-semibold text-purple-800 mb-4">Your Food Journey</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-purple-600 mb-1">Foods on your plate</p>
              <p className="text-2xl font-bold text-emerald-600">{movedToSafe.length}</p>
            </div>
            <div>
              <p className="text-sm text-purple-600 mb-1">In progress ({inProgressFoods.length})</p>
              {inProgressFoods.length > 0 ? (
                <div className="space-y-3">
                  {inProgressFoods.map(f => (
                    <div key={f.id} className="flex items-center gap-3">
                      <span className="text-sm text-gray-700 w-24 truncate">{f.name}</span>
                      <div className="relative w-8 h-8">
                        <svg className="w-8 h-8 -rotate-90">
                          <circle cx="16" cy="16" r="12" stroke="#e5e7eb" strokeWidth="3" fill="none" />
                          <circle cx="16" cy="16" r="12" stroke="#8b5cf6" strokeWidth="3" fill="none" strokeDasharray={`${Math.min(f.attempts, 7) * 10.8} 75.4`} className="transition-all duration-300" />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">{f.attempts}</span>
                      </div>
                      <span className="text-xs text-gray-500">/ 7</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-500">Start trying foods in &quot;Trying Now&quot;</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Recipe browser */}
      <section className="max-w-6xl mx-auto px-4 pb-8">
        <details className={`${dm ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6`}>
          <summary className={`text-xl font-bold cursor-pointer hover:text-emerald-600 ${dm ? 'text-gray-200' : 'text-gray-800'}`}>
            📖 Recipe Browser ({recipes.length} recipes)
          </summary>
          <div className="mt-4">
            <div className="flex flex-wrap gap-2 mb-6">
              {recipeCategories.map(cat => (
                <button key={cat} onClick={() => setRecipeFilter(cat)}
                  className={`px-3 py-1 rounded-full text-sm ${recipeFilter === cat ? 'bg-emerald-500 text-white' : dm ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {recipes.filter(r => recipeFilter === 'all' || r.category === recipeFilter).map((recipe, idx) => (
                <div key={idx} className={`${dm ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg shadow p-2 hover:shadow-md transition-shadow`}>
                  <img src={recipe.image || '/placeholder-vegetable.svg'} alt={recipe.title} className="w-full h-32 object-cover rounded-md mb-2" onError={e => { (e.target as HTMLImageElement).src = '/placeholder-vegetable.svg' }} />
                  <h3 className={`text-sm font-medium mb-1 line-clamp-2 ${dm ? 'text-gray-200' : 'text-gray-800'}`}>{recipe.title}</h3>
                  <p className={`text-xs mb-2 ${dm ? 'text-gray-400' : 'text-gray-500'}`}>{recipe.source}</p>
                  {recipe.prepTime && <span className={`inline-block text-xs px-2 py-0.5 rounded-full mb-2 ${dm ? 'bg-emerald-900 text-emerald-300' : 'bg-emerald-100 text-emerald-700'}`}>⏱ {recipe.prepTime}</span>}
                  <a href={recipe.link} target="_blank" rel="noopener noreferrer" className="block text-center text-sm bg-emerald-500 text-white py-1.5 rounded-lg hover:bg-emerald-600 transition-colors">View Recipe</a>
                </div>
              ))}
            </div>
          </div>
        </details>
      </section>

      <footer className="text-center text-gray-500 text-sm pb-8">
        <p>Your journey is unique. Go at your own pace. 💚</p>
      </footer>
    </main>
  )
}

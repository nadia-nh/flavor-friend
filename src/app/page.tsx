'use client'

import { useState, useEffect, useRef } from 'react'
import { Food, FoodCategory, FoodType, Attempt } from '@/lib/types'
import { getSuggestionsForFood, getParentSuggestion, getSimilarFoods, getSimilarFoodsFallback, getAllSuggestedFoods, getFoodType, foodSuggestions } from '@/lib/foods'
import { recipes, getRecipeForFood } from '@/lib/recipes'

const STORAGE_KEY = 'flavorfriend-foods'
const DISMISSED_KEY = 'flavorfriend-dismissed'
const FOOD_TYPES: FoodType[] = ['vegetable', 'grain', 'legume', 'other']
const CATEGORIES: FoodCategory[] = ['love', 'exploring', 'curious', 'notYet']

const FOOD_TYPE_CONFIG: Record<FoodType, {
  label: string; emoji: string; fill: string; stroke: string; textColor: string; startDeg: number; endDeg: number
}> = {
  vegetable: { label: 'Vegetables', emoji: '🥦', fill: '#bbf7d0', stroke: '#16a34a', textColor: '#14532d', startDeg: 180, endDeg: 270 },
  grain:     { label: 'Grains',     emoji: '🌾', fill: '#fef3c7', stroke: '#d97706', textColor: '#78350f', startDeg: 270, endDeg: 360 },
  legume:    { label: 'Legumes',    emoji: '🫘', fill: '#fed7aa', stroke: '#c2410c', textColor: '#7c2d12', startDeg: 0,   endDeg: 90  },
  other:     { label: 'Other',      emoji: '🥜', fill: '#d1fae5', stroke: '#059669', textColor: '#064e3b', startDeg: 90,  endDeg: 180 },
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

// Spoonacular CDN slugs that differ from the simple lowercase-with-dashes food name
const SPOONACULAR_SLUG_OVERRIDES: Record<string, string> = {
  'oats': 'rolled-oats',
  'sweet potato': 'sweet-potato',
  'bell peppers': 'red-pepper',
  'brussels sprouts': 'brussels-sprouts',
  'green beans': 'green-beans',
  'coconut milk': 'coconut-milk',
  'textured vegetable protein': 'tvp',
  'soy curls': 'edamame',
  'black beans': 'black-beans',
  'kidney beans': 'kidney-beans',
  'chia seeds': 'chia-seeds',
  'butternut squash': 'butternut-squash',
  'nutritional yeast': 'nutritional-yeast',
  // CDN has singular for these (plural 404s)
  'tomatoes': 'tomato',
  'peppers': 'pepper',
  'onions': 'red-onion',
  // CDN slug differs from display name
  'corn': 'corn-on-the-cob',
  'tahini': 'sesame-seeds',
  // grouped variants
  'rice (all)': 'cooked-white-rice',
  'rice (white)': 'cooked-white-rice',
  'rice (brown)': 'brown-rice',
  'beans (all)': 'black-beans',
  'pasta (all)': 'spaghetti',
  'pasta (wheat)': 'spaghetti',
  'pasta (whole wheat)': 'spaghetti',
}

function getIngredientImageUrl(foodName: string): string {
  const key = foodName.toLowerCase()
  const slug = SPOONACULAR_SLUG_OVERRIDES[key] ?? key.replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  return `https://spoonacular.com/cdn/ingredients_500x500/${slug}.jpg`
}

// Flickr-based fallback: stable per food (lock = simple hash of name), food-tagged photos
function getFlickrFallbackUrl(foodName: string): string {
  const clean = foodName.replace(/\s*\(.*?\)\s*/g, ' ').trim()
  const lock = Math.abs(clean.split('').reduce((h, c) => (h * 31 + c.charCodeAt(0)) | 0, 0))
  return `https://loremflickr.com/500/500/${encodeURIComponent(clean)},food?lock=${lock}`
}

const PLATE_CX = 200
const PLATE_CY = 200
const PLATE_R = 183
const INNER_R = 38

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
  const [showProgress, setShowProgress] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [movedToSafe, setMovedToSafe] = useState<string[]>([])
  const [attemptModal, setAttemptModal] = useState<Food | null>(null)
  const [attemptMethod, setAttemptMethod] = useState('')
  const [attemptLiked, setAttemptLiked] = useState<boolean | null>(null)
  const [attemptNotes, setAttemptNotes] = useState('')
  const [dismissedSuggestions, setDismissedSuggestions] = useState<string[]>([])
  const [sessionSkipped, setSessionSkipped] = useState<string[]>([])
  const [plateInput, setPlateInput] = useState('')
  const [exploringInput, setExploringInput] = useState('')
  const [showAutocomplete, setShowAutocomplete] = useState<Record<string, boolean>>({})
  const [recipeFilter, setRecipeFilter] = useState('all')
  const [activeTab, setActiveTab] = useState<'home' | 'discover' | 'recipes'>('home')
  const [imgFallback, setImgFallback] = useState<'spoonacular' | 'fooddata' | 'parentimage' | 'flickr' | 'emoji'>('spoonacular')
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
    try {
      const stored = localStorage.getItem(DISMISSED_KEY)
      if (stored) setDismissedSuggestions(JSON.parse(stored))
    } catch {}
  }, [])

  useEffect(() => {
    localStorage.setItem(DISMISSED_KEY, JSON.stringify(dismissedSuggestions))
  }, [dismissedSuggestions])

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

  const allFoodNames = getAllSuggestedFoods()
  const loveFoods = foods.filter(f => f.category === 'love')
  const exploringFoods = foods.filter(f => f.category === 'exploring')
  const safeFoodNames = loveFoods.map(f => f.name)
  const recipeCategories = ['all', ...Array.from(new Set(recipes.map(r => r.category)))]
  const inProgressFoods = exploringFoods.filter(f => f.attempts > 0)

  const activeFoodNames = new Set(foods.map(f => f.name.toLowerCase()))
  const dismissedSet = new Set(dismissedSuggestions.map(s => s.toLowerCase()))
  const skippedSet = new Set(sessionSkipped.map(s => s.toLowerCase()))
  const isAvailable = (s: string) =>
    !dismissedSet.has(s.toLowerCase()) && !skippedSet.has(s.toLowerCase()) && !activeFoodNames.has(s.toLowerCase())

  const allSuggested = getSimilarFoods(safeFoodNames)
  const availableSuggestions = allSuggested.filter(isAvailable)
  const fallbackSuggestions = availableSuggestions.length === 0
    ? getSimilarFoodsFallback(safeFoodNames, allFoodNames).filter(isAvailable)
    : []
  const allSuggestions = availableSuggestions.length > 0 ? availableSuggestions : fallbackSuggestions
  const currentSuggestion = allSuggestions[0] as string | undefined
  const suggestionData = currentSuggestion ? foodSuggestions.find(s => s.name === currentSuggestion) : undefined
  const exampleRecipe = currentSuggestion ? getRecipeForFood(currentSuggestion) : undefined

  useEffect(() => {
    setImgFallback('spoonacular')
  }, [currentSuggestion])

  useEffect(() => {
    if (activeTab === 'discover') setSessionSkipped([])
  }, [activeTab])

  const handleAddCurrentSuggestion = (category: FoodCategory) => {
    if (currentSuggestion) {
      addOrMoveFood(currentSuggestion, category)
      setDismissedSuggestions(prev => [...prev, currentSuggestion])
    }
  }

  const handleSkipCurrentSuggestion = () => {
    if (currentSuggestion) setSessionSkipped(prev => [...prev, currentSuggestion])
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
      else if (deltaX < -60) handleSkipCurrentSuggestion()
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
    <main className={`min-h-screen p-4 pb-20 ${dm ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <header className="text-center mb-4">
        <div className="flex justify-between items-center mb-2">
          <button onClick={() => setDarkMode(!dm)} className={`px-3 py-1 rounded-lg text-sm ${dm ? 'bg-gray-700 text-amber-300' : 'bg-gray-200 text-gray-700'}`}>
            {dm ? '☀️' : '🌙'}
          </button>
          <button
            onClick={() => setShowProgress(true)}
            className={`p-2 rounded-lg text-lg leading-none ${dm ? 'text-gray-400 hover:text-green-300' : 'text-gray-400 hover:text-green-800'}`}
            aria-label="View progress"
          >
            📊
          </button>
        </div>
        <h1 className={`text-3xl font-bold italic mb-6 ${dm ? 'text-green-300' : 'text-green-800'}`} style={{ fontFamily: 'var(--font-display)' }}>Plant Pal</h1>
      </header>

      {showMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-green-800 text-white px-4 py-2 rounded-full shadow-lg z-50 text-sm">
          {showMessage}
        </div>
      )}

      {activeTab === 'home' && (<>

      {/* Main layout */}
      <div className="flex flex-col lg:flex-row gap-6 max-w-5xl mx-auto px-4 mb-4">

        {/* Plate */}
        <div className="flex-1">
          <svg ref={plateRef} viewBox="-30 -30 460 460" className="w-full max-w-sm mx-auto drop-shadow-xl" style={{ touchAction: 'none' }}>
            <defs>
              {/* Rim gradient — off-centre radial, light from top-left, gives 3-D ceramic depth */}
              <radialGradient id="rimGrad" cx="38%" cy="32%" r="68%">
                <stop offset="0%"   stopColor={dm ? '#6b7280' : '#e9ecef'} />
                <stop offset="65%"  stopColor={dm ? '#374151' : '#ced4da'} />
                <stop offset="100%" stopColor={dm ? '#1f2937' : '#adb5bd'} />
              </radialGradient>
              {/* Plate base — very subtle warm cream at edges, pure white at centre */}
              <radialGradient id="plateGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor="#ffffff" />
                <stop offset="100%" stopColor={dm ? '#1f2937' : '#fdf8f0'} />
              </radialGradient>
              {/* Rim noise filter — overlays fractal grain for matte stoneware feel */}
              <filter id="rimNoise" x="-2%" y="-2%" width="104%" height="104%">
                <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" result="noise"/>
                <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise"/>
                <feBlend in="SourceGraphic" in2="grayNoise" mode="multiply" result="blended"/>
                <feComposite in="blended" in2="SourceGraphic" operator="in"/>
              </filter>
            </defs>

            {/* Rim */}
            <circle
              cx={PLATE_CX} cy={PLATE_CY} r={PLATE_R + 9}
              fill={plateDragGhost?.outside ? '#fca5a5' : 'url(#rimGrad)'}
              filter={plateDragGhost?.outside ? undefined : 'url(#rimNoise)'}
            />
            {/* Ceramic glaze highlight arc — simulates specular gloss at top of rim */}
            {!plateDragGhost?.outside && (() => {
              const hStart = polarToXY(PLATE_CX, PLATE_CY, PLATE_R + 5, 210)
              const hEnd   = polarToXY(PLATE_CX, PLATE_CY, PLATE_R + 5, 310)
              return (
                <path
                  d={`M ${hStart.x} ${hStart.y} A ${PLATE_R + 5} ${PLATE_R + 5} 0 0 1 ${hEnd.x} ${hEnd.y}`}
                  fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.35"
                />
              )
            })()}
            <circle cx={PLATE_CX} cy={PLATE_CY} r={PLATE_R} fill="url(#plateGrad)" />

            {FOOD_TYPES.map(ft => {
              const cfg = FOOD_TYPE_CONFIG[ft]
              const sectorFoods = loveFoods.filter(f => f.foodType === ft)
              const positions = getFoodCirclePositions(sectorFoods.length, cfg.startDeg, cfg.endDeg, PLATE_CX, PLATE_CY)
              const midAngle = (cfg.startDeg + cfg.endDeg) / 2
              const labelPos = polarToXY(PLATE_CX, PLATE_CY, 242, midAngle)
              return (
                <g key={ft}>
                  <path d={makeSectorPath(PLATE_CX, PLATE_CY, PLATE_R, INNER_R, cfg.startDeg, cfg.endDeg)} fill={cfg.fill} stroke="white" strokeWidth="2.5" strokeOpacity="0.7" />
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

            {/* Center — water reminder */}
            <circle cx={PLATE_CX} cy={PLATE_CY} r={INNER_R} fill={dm ? '#075985' : '#e0f2fe'} stroke={dm ? '#38bdf8' : '#7dd3fc'} strokeWidth="1.5" />
            <text x={PLATE_CX} y={PLATE_CY + 3} textAnchor="middle" dominantBaseline="central" fontSize="22" style={{ userSelect: 'none' }}>💧</text>

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
              className={`w-full px-4 py-2.5 text-sm border rounded-2xl ${dm ? 'bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-500' : 'bg-white border-gray-300 placeholder-gray-400'} focus:outline-none focus:border-green-400`}
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
        <div className={`w-full lg:w-72 p-4 rounded-2xl shadow-lg ${dm ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-xs font-semibold uppercase tracking-widest mb-3 ${dm ? 'text-gray-500' : 'text-gray-400'}`}>Trying Now</h2>

          {exploringFoods.length === 0 && (
            <p className={`text-sm mb-4 ${dm ? 'text-gray-500' : 'text-gray-400'}`}>Add foods you&apos;re experimenting with here!</p>
          )}

          <ul className="space-y-1 mb-3">
            {exploringFoods.map(food => (
              <li key={food.id} className={`group flex items-center gap-2 px-2 py-1.5 rounded-xl ${dm ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}`}>
                <button
                  onClick={() => setSelectedFood(food)}
                  className={`flex-1 text-left text-sm font-medium truncate ${dm ? 'text-gray-200 hover:text-green-400' : 'text-gray-700 hover:text-green-700'}`}
                >
                  {food.name}
                </button>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <div className="relative w-7 h-7">
                    <svg className="w-7 h-7 -rotate-90">
                      <circle cx="14" cy="14" r="10" stroke={dm ? '#374151' : '#e5e7eb'} strokeWidth="2.5" fill="none" />
                      <circle cx="14" cy="14" r="10" stroke="#16a34a" strokeWidth="2.5" fill="none"
                        strokeDasharray={`${Math.min(food.attempts, 7) * 8.98} 62.8`} className="transition-all duration-300" />
                    </svg>
                    <span className={`absolute inset-0 flex items-center justify-center text-xs font-medium ${dm ? 'text-gray-300' : 'text-gray-600'}`}>{food.attempts}</span>
                  </div>
                  <span className={`text-xs ${dm ? 'text-gray-600' : 'text-gray-400'}`}>/7</span>
                  <button onClick={() => openAttemptModal(food)} className={`text-base font-bold leading-none px-1 ${dm ? 'text-green-400 hover:text-green-200' : 'text-green-600 hover:text-green-800'}`}>+</button>
                  <button onClick={() => deleteFood(food.id)} className={`text-xs px-0.5 opacity-0 group-hover:opacity-100 transition-opacity ${dm ? 'text-gray-500 hover:text-red-400' : 'text-gray-400 hover:text-red-500'}`}>✕</button>
                </div>
              </li>
            ))}
          </ul>

          <div className="relative">
            <input
              type="text"
              value={exploringInput}
              placeholder="Add food to try…"
              className={`w-full px-3 py-2 text-sm border rounded-2xl ${dm ? 'bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-500' : 'bg-white border-gray-300 placeholder-gray-400'} focus:outline-none focus:border-green-400`}
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
              className="w-full text-left px-3 py-1.5 rounded-xl text-sm hover:bg-green-50 text-green-700 mb-1"
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
                    className={`text-xs px-2 py-1 rounded ${selectedFood.category === cat ? 'bg-green-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
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
                        <span className={`ml-2 px-1 rounded text-xs ${method.difficulty === 'easy' ? 'bg-green-100 text-green-700' : method.difficulty === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{method.difficulty}</span>
                        <p className="text-gray-600 text-xs mt-0.5">{method.description}</p>
                      </li>
                    ))}
                  </ul>
                  <h4 className="font-medium text-gray-800 mb-2">Easy meals:</h4>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {suggestion.easyMeals.map((meal, i) => (
                      <span key={i} className="px-2 py-1 bg-stone-100 border border-stone-200 rounded-full text-xs text-stone-700">{meal}</span>
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
                <button onClick={() => setAttemptLiked(true)} className={`flex-1 py-2 rounded-xl border ${attemptLiked === true ? 'bg-green-800 text-white border-green-800' : 'border-gray-300 text-gray-600'}`}>✓ Liked</button>
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
              <button onClick={submitAttempt} className="flex-1 py-2 bg-green-800 text-white rounded-xl">Save</button>
            </div>
          </div>
        </div>
      )}

      </>)}

      {/* Discover tab */}
      {activeTab === 'discover' && (
        <div className="max-w-md mx-auto py-6 px-4">
          <h2 className={`text-xl font-bold text-center mb-6 ${dm ? 'text-green-300' : 'text-green-900'}`}>What to try next</h2>
          {!currentSuggestion ? (
            <div className={`${dm ? 'bg-gray-800 border-green-800' : 'bg-white border-green-200'} rounded-2xl border-2 shadow-lg p-8`}>
              <p className="text-center text-gray-500">No more suggestions right now — check back later!</p>
            </div>
          ) : (
            <>
              {/* Swipeable card */}
              <div
                ref={cardRef}
                className="relative h-72 cursor-grab active:cursor-grabbing select-none touch-none"
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
                    {imgFallback !== 'emoji'
                      ? <img
                          key={`${currentSuggestion}-${imgFallback}`}
                          src={
                            imgFallback === 'spoonacular'
                              ? getIngredientImageUrl(currentSuggestion)
                              : imgFallback === 'fooddata'
                              ? getSuggestionsForFood(currentSuggestion)?.image ?? ''
                              : imgFallback === 'parentimage'
                              ? getParentSuggestion(currentSuggestion)?.image ?? ''
                              : getFlickrFallbackUrl(currentSuggestion)
                          }
                          alt={currentSuggestion}
                          className="w-full h-full object-cover"
                          onError={() => {
                            if (imgFallback === 'spoonacular') {
                              const own = getSuggestionsForFood(currentSuggestion)?.image
                              const parent = getParentSuggestion(currentSuggestion)?.image
                              if (own) setImgFallback('fooddata')
                              else if (parent) setImgFallback('parentimage')
                              else setImgFallback('flickr')
                            } else if (imgFallback === 'fooddata') {
                              const parent = getParentSuggestion(currentSuggestion)?.image
                              if (parent) setImgFallback('parentimage')
                              else setImgFallback('flickr')
                            } else if (imgFallback === 'parentimage') {
                              setImgFallback('flickr')
                            } else {
                              setImgFallback('emoji')
                            }
                          }}
                        />
                      : <span className="text-7xl">🍽️</span>
                    }
                    {/* Gradient overlay */}
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
                    {/* Category badge */}
                    {suggestionData && (
                      <span className="absolute top-2 left-2 bg-white/85 backdrop-blur-sm text-xs font-semibold px-2 py-1 rounded-full">
                        {FOOD_TYPE_CONFIG[suggestionData.foodType].emoji} {FOOD_TYPE_CONFIG[suggestionData.foodType].label}
                      </span>
                    )}
                    {/* Food name */}
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

              {/* Recipe hint */}
              {exampleRecipe && (
                <p className="text-xs text-center text-green-600 mt-2">✨ Try: {exampleRecipe.title}</p>
              )}

              {/* Action buttons */}
              <div className="flex items-center justify-around mt-6 px-8">
                <div className="flex flex-col items-center gap-1">
                  <button
                    onClick={handleSkipCurrentSuggestion}
                    className="w-14 h-14 rounded-full bg-gray-100 text-gray-500 text-2xl hover:bg-gray-200 flex items-center justify-center shadow transition-colors"
                  >→</button>
                  <span className="text-xs text-gray-400">Skip</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <button
                    onClick={() => handleAddCurrentSuggestion('exploring')}
                    className="w-14 h-14 rounded-full bg-green-100 text-green-700 text-2xl hover:bg-green-200 flex items-center justify-center shadow transition-colors"
                  >✓</button>
                  <span className="text-xs text-green-700 font-medium">Try it!</span>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Progress modal */}
      {showProgress && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowProgress(false)}
        >
          <div
            className={`${dm ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 max-w-sm w-full`}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-5">
              <h3 className={`font-semibold text-lg ${dm ? 'text-green-300' : 'text-green-900'}`}>Your Food Journey</h3>
              <button onClick={() => setShowProgress(false)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">✕</button>
            </div>
            <div className="space-y-4">
              <div>
                <p className={`text-sm mb-1 ${dm ? 'text-green-400' : 'text-green-700'}`}>Foods on your plate</p>
                <p className={`text-2xl font-bold ${dm ? 'text-green-300' : 'text-green-800'}`}>{movedToSafe.length}</p>
              </div>
              <div>
                <p className={`text-sm mb-2 ${dm ? 'text-green-400' : 'text-green-700'}`}>In progress ({inProgressFoods.length})</p>
                {inProgressFoods.length > 0 ? (
                  <div className="space-y-3">
                    {inProgressFoods.map(f => (
                      <div key={f.id} className="flex items-center gap-3">
                        <span className={`text-sm w-24 truncate ${dm ? 'text-gray-300' : 'text-gray-700'}`}>{f.name}</span>
                        <div className="relative w-8 h-8">
                          <svg className="w-8 h-8 -rotate-90">
                            <circle cx="16" cy="16" r="12" stroke="#e5e7eb" strokeWidth="3" fill="none" />
                            <circle cx="16" cy="16" r="12" stroke="#16a34a" strokeWidth="3" fill="none" strokeDasharray={`${Math.min(f.attempts, 7) * 10.8} 75.4`} className="transition-all duration-300" />
                          </svg>
                          <span className={`absolute inset-0 flex items-center justify-center text-xs font-medium ${dm ? 'text-gray-300' : ''}`}>{f.attempts}</span>
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
        </div>
      )}

      {/* Recipe browser tab */}
      {activeTab === 'recipes' && (
        <section className="max-w-6xl mx-auto px-4 pb-8">
          <h2 className={`text-2xl font-bold mb-4 ${dm ? 'text-gray-200' : 'text-gray-800'}`}>📖 Recipes ({recipes.length})</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {recipeCategories.map(cat => (
              <button key={cat} onClick={() => setRecipeFilter(cat)}
                className={`px-3 py-1 rounded-full text-sm ${recipeFilter === cat ? 'bg-green-800 text-white' : dm ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
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
                {recipe.prepTime && <span className={`inline-block text-xs px-2 py-0.5 rounded-full mb-2 ${dm ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700'}`}>⏱ {recipe.prepTime}</span>}
                <a href={recipe.link} target="_blank" rel="noopener noreferrer" className="block text-center text-sm bg-green-800 text-white py-1.5 rounded-lg hover:bg-green-900 transition-colors">View Recipe</a>
              </div>
            ))}
          </div>
        </section>
      )}


      {/* Bottom tab bar */}
      <nav className={`fixed bottom-0 left-0 right-0 z-40 flex border-t ${dm ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
        <button
          onClick={() => setActiveTab('home')}
          className={`flex-1 py-3 text-sm font-medium flex flex-col items-center gap-0.5 transition-colors ${
            activeTab === 'home' ? (dm ? 'text-green-400' : 'text-green-700') : (dm ? 'text-gray-500' : 'text-gray-400')
          }`}
        >
          <span className="text-lg">🌱</span>
          <span>Home</span>
        </button>
        <button
          onClick={() => setActiveTab('discover')}
          className={`flex-1 py-3 text-sm font-medium flex flex-col items-center gap-0.5 transition-colors ${
            activeTab === 'discover' ? (dm ? 'text-green-400' : 'text-green-700') : (dm ? 'text-gray-500' : 'text-gray-400')
          }`}
        >
          <span className="text-lg">🔍</span>
          <span>Discover</span>
        </button>
        <button
          onClick={() => setActiveTab('recipes')}
          className={`flex-1 py-3 text-sm font-medium flex flex-col items-center gap-0.5 transition-colors ${
            activeTab === 'recipes' ? (dm ? 'text-green-400' : 'text-green-700') : (dm ? 'text-gray-500' : 'text-gray-400')
          }`}
        >
          <span className="text-lg">📖</span>
          <span>Recipes</span>
        </button>
      </nav>
    </main>
  )
}

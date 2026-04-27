'use client'

import { useState, useEffect, useRef } from 'react'
import { Food, FoodCategory, Attempt } from '@/lib/types'
import { getSuggestionsForFood, getSimilarFoods, getAllSuggestedFoods } from '@/lib/foods'

const STORAGE_KEY = 'flavorfriend-foods'

const defaultFoods: Food[] = [
  { id: '1', name: 'Rice', category: 'love', attempts: 10, lastAttempted: '2024-01-15', notes: '', methodUsed: '', attemptHistory: [] },
  { id: '2', name: 'Pasta', category: 'love', attempts: 10, lastAttempted: '2024-01-15', notes: '', methodUsed: '', attemptHistory: [] },
  { id: '3', name: 'Bread', category: 'love', attempts: 10, lastAttempted: '2024-01-15', notes: '', methodUsed: '', attemptHistory: [] },
  { id: '4', name: 'Broccoli', category: 'exploring', attempts: 2, lastAttempted: '2024-01-10', notes: '', methodUsed: 'Roasted', attemptHistory: [
    { id: 'a1', date: '2024-01-08', method: 'Roasted', liked: false, notes: 'Too crunchy' },
    { id: 'a2', date: '2024-01-10', method: 'Steamed', liked: null, notes: 'It was okay' }
  ]},
  { id: '5', name: 'Spinach', category: 'exploring', attempts: 1, lastAttempted: '2024-01-12', notes: '', methodUsed: 'Smoothie', attemptHistory: [
    { id: 'a3', date: '2024-01-12', method: 'Smoothie', liked: true, notes: 'Couldnt even taste it!' }
  ]},
  { id: '6', name: 'Mushrooms', category: 'curious', attempts: 0, lastAttempted: null, notes: '', methodUsed: '', attemptHistory: [] },
  { id: '7', name: 'Brussels Sprouts', category: 'curious', attempts: 0, lastAttempted: null, notes: '', methodUsed: '', attemptHistory: [] },
  { id: '8', name: 'Cauliflower', category: 'curious', attempts: 0, lastAttempted: null, notes: '', methodUsed: '', attemptHistory: [] },
]

const getCategoryInfo = (dark: boolean): Record<FoodCategory, { label: string; emoji: string; color: string; headerColor: string }> => ({
  love: { label: 'Love', emoji: '🟢', color: dark ? 'bg-emerald-900/50 shadow-md' : 'bg-emerald-50 shadow-md', headerColor: dark ? 'bg-gradient-to-r from-emerald-600 to-emerald-700' : 'bg-gradient-to-r from-emerald-300 to-emerald-400' },
  exploring: { label: 'Exploring', emoji: '🌱', color: dark ? 'bg-lime-900/50 shadow-md' : 'bg-lime-50 shadow-md', headerColor: dark ? 'bg-gradient-to-r from-lime-600 to-lime-700' : 'bg-gradient-to-r from-lime-300 to-lime-400' },
  curious: { label: 'Curious', emoji: '🌿', color: dark ? 'bg-amber-900/50 shadow-md' : 'bg-amber-50 shadow-md', headerColor: dark ? 'bg-gradient-to-r from-amber-600 to-amber-700' : 'bg-gradient-to-r from-amber-300 to-amber-400' },
  notYet: { label: 'Not Yet', emoji: '🚫', color: dark ? 'bg-stone-900/50 shadow-md' : 'bg-stone-50 shadow-md', headerColor: dark ? 'bg-gradient-to-r from-stone-600 to-stone-700' : 'bg-gradient-to-r from-stone-300 to-stone-400' },
})

const encouragementMessages = [
  "You're doing great! Every try counts.",
  "Nice work! Your palate is expanding.",
  "That's courage! Keep going at your own pace.",
  "Every bite teaches your body something new.",
  "You're amazing for trying!",
  "Food adventures take time - be patient with yourself.",
  "Small steps lead to big discoveries!",
]

interface DragState {
  isDragging: boolean
  startX: number
  startY: number
  currentX: number
  currentY: number
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
  const [swipeY, setSwipeY] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState<'up' | 'down' | null>(null)
  const [dismissedSuggestions, setDismissedSuggestions] = useState<string[]>([])
  const [inputValues, setInputValues] = useState<Record<FoodCategory, string>>({ love: '', exploring: '', curious: '', notYet: '' })
  const [showAutocomplete, setShowAutocomplete] = useState<Record<string, boolean>>({})
  
  const allFoodNames = getAllSuggestedFoods()
  const existingFoodNames = foods.map(f => f.name.toLowerCase())
  
  const cardRef = useRef<HTMLDivElement>(null)
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
  })
  const [dragOverCategory, setDragOverCategory] = useState<FoodCategory | null>(null)
  const [draggedFood, setDraggedFood] = useState<Food | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      const migrated = parsed.map((f: Food) => ({
        ...f,
        category: f.category === 'notYet' ? 'curious' : f.category
      }))
      setFoods(migrated)
    } else {
      setFoods(defaultFoods)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultFoods))
    }
  }, [])

  useEffect(() => {
    if (foods.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(foods))
    }
  }, [foods])

  const addFood = (name: string, category: FoodCategory) => {
    if (!name.trim()) return
    const newFood: Food = {
      id: Date.now().toString(),
      name: name.trim(),
      category,
      attempts: 0,
      lastAttempted: null,
      notes: '',
      methodUsed: '',
      attemptHistory: [],
    }
    setFoods([...foods, newFood])
  }

  const moveFood = (food: Food, newCategory: FoodCategory) => {
    if (newCategory === 'love' && (food.category === 'exploring' || food.category === 'curious') && !movedToSafe.includes(food.id)) {
      setMovedToSafe([...movedToSafe, food.id])
      setShowMessage(`Great! ${food.name} moved to Safe!`)
      setTimeout(() => setShowMessage(''), 2000)
    }
    setFoods(foods.map(f => f.id === food.id ? { ...f, category: newCategory } : f))
  }

  const deleteFood = (id: string) => {
    setFoods(foods.filter(f => f.id !== id))
  }

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
      ? `Amazing! You've tried ${attemptModal.name} 7 times! Move it to Safe when you're ready.`
      : encouragementMessages[newAttempts % encouragementMessages.length]

    setShowMessage(message)
    setTimeout(() => setShowMessage(''), 4000)

    setFoods(foods.map(f => {
      if (f.id === attemptModal.id) {
        return {
          ...f,
          attempts: newAttempts,
          lastAttempted: attempt.date,
          methodUsed: attemptMethod,
          attemptHistory: [...f.attemptHistory, attempt],
        }
      }
      return f
    }))

    setAttemptModal(null)
  }

  const safeFoodNames = foods.filter(f => f.category === 'love').map(f => f.name)
  const allSuggested = getSimilarFoods(safeFoodNames)
  const availableSuggestions = allSuggested.filter(
    s => !dismissedSuggestions.includes(s) && !foods.some(f => f.name.toLowerCase() === s.toLowerCase())
  )
  const currentSuggestion = availableSuggestions[Math.max(0, suggestionIndex) % Math.max(1, availableSuggestions.length)]

  const handleSwipeDown = () => {
    if (currentSuggestion) {
      setDismissedSuggestions([...dismissedSuggestions, currentSuggestion])
      setSwipeY(0)
      setSwipeDirection(null)
    }
  }

  const handleAddCurrentSuggestion = (category: FoodCategory) => {
    if (currentSuggestion) {
      addFood(currentSuggestion, category)
      setDismissedSuggestions([...dismissedSuggestions, currentSuggestion])
      setSuggestionIndex(prev => prev + 1)
    }
  }

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    setDragState({
      isDragging: true,
      startX: clientX,
      startY: clientY,
      currentX: clientX,
      currentY: clientY,
    })
  }

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragState.isDragging) return
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    setDragState(prev => ({
      ...prev,
      currentX: clientX,
      currentY: clientY,
    }))
  }

  const handleDragEnd = () => {
    if (!dragState.isDragging) return
    
    const deltaX = dragState.currentX - dragState.startX
    const deltaY = dragState.currentY - dragState.startY
    
    if (currentSuggestion) {
      if (deltaX > 100) {
handleAddCurrentSuggestion('curious')
      } else if (deltaX < -100) {
        handleAddCurrentSuggestion('notYet')
      } else if (deltaY < -100) {
        setDismissedSuggestions([...dismissedSuggestions, currentSuggestion])
        setSuggestionIndex(prev => prev + 1)
      }
    }
    
    setDragState({
      isDragging: false,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
    })
  }

  const exploringFoods = foods.filter(f => f.category === 'exploring')
  const completedFoods = exploringFoods.filter(f => f.attempts >= 7)
  const inProgressFoods = exploringFoods.filter(f => f.attempts > 0)

  const categories: FoodCategory[] = ['love', 'exploring', 'curious', 'notYet']

  return (
    <main className={`min-h-screen p-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <header className="text-center mb-6">
        <div className="flex justify-end mb-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-3 py-1 rounded-lg text-sm ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
        <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-emerald-300' : 'text-green-800'}`}>FlavorFriend</h1>
        <p className={darkMode ? 'text-emerald-400' : 'text-green-700'}>Expand your palate, one bite at a time</p>
      </header>

      {showMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-4 py-2 rounded-full shadow-lg z-50 text-sm">
          {showMessage}
        </div>
      )}

      <button
        onClick={() => setShowSuggestions(!showSuggestions)}
        className={`mx-auto block mb-4 px-6 py-3 rounded-2xl font-medium transition-all ${
          showSuggestions 
            ? 'bg-emerald-500 text-white' 
            : 'bg-green-100 text-green-700 border border-green-300 hover:bg-green-200'
        }`}
      >
        {showSuggestions ? '✕ Close Suggestions' : '+ Food Suggestions'}
      </button>

      {showSuggestions && (
        <div className="max-w-md mx-auto mb-6 p-4 bg-white rounded-2xl border-2 border-green-200 shadow-lg">
          {!currentSuggestion ? (
            <p className="text-center text-gray-500 py-8">No more suggestions. Check back later!</p>
          ) : (
            <>
              <h3 className="text-center font-semibold text-green-800 mb-4">Based on foods you like:</h3>
              
              <div 
                ref={cardRef}
                className="relative h-48 cursor-grab active:cursor-grabbing select-none"
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
              >
                <div 
                  className="absolute inset-0 bg-gradient-to-b from-green-50 to-green-100 rounded-2xl border border-green-300 shadow-lg flex flex-col items-center justify-center p-6 transition-transform"
                  style={{
                    transform: `translateY(${dragState.isDragging ? dragState.currentY - dragState.startY : 0}px) translateX(${dragState.isDragging ? dragState.currentX - dragState.startX : 0}px) rotate(${dragState.isDragging ? (dragState.currentX - dragState.startX) / 20 : 0}deg)`,
                  }}
                >
                  <span className="text-4xl mb-2">🍽️</span>
                  <span className="text-xl font-semibold text-green-800">{currentSuggestion}</span>
                  <p className="text-sm text-green-600 mt-2">← Never | ↑ Later | Want to Try →</p>
                  
                  {dragState.isDragging && (
                    <div className="absolute inset-0 flex items-center justify-around text-2xl opacity-30">
                      <span>← Never</span>
                      <span>↑ Later</span>
                      <span>Want to Try →</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-center gap-2 mt-4">
                <button
                  onClick={() => handleAddCurrentSuggestion('notYet')}
                  className="px-4 py-2 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 font-medium"
                >
                  ← Never
                </button>
                <button
                  onClick={() => {
                    setDismissedSuggestions([...dismissedSuggestions, currentSuggestion])
                    setSuggestionIndex(prev => prev + 1)
                  }}
                  className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 font-medium"
                >
                  ↑ Maybe Later
                </button>
                <button
                  onClick={() => handleAddCurrentSuggestion('curious')}
                  className="px-4 py-2 bg-orange-100 text-orange-700 rounded-xl hover:bg-orange-200 font-medium"
                >
                  Want to Try →
                </button>
              </div>
              
              <p className="text-xs text-center text-gray-400 mt-3">
                {availableSuggestions.length} more suggestion{availableSuggestions.length !== 1 ? 's' : ''} available
              </p>
            </>
          )}
        </div>
      )}

      <div className="flex gap-3 overflow-x-auto justify-center pb-4 mb-4">
        {categories.map(cat => {
          const count = foods.filter(f => f.category === cat).length
          return (
            <div
              key={cat}
              className={`flex-shrink-0 w-56 rounded-2xl ${getCategoryInfo(darkMode)[cat].color} transition-all duration-200 ${
                dragOverCategory === cat ? 'ring-4 ring-blue-400 ring-opacity-50 scale-105' : ''
              }`}
              onDragOver={(e) => {
                e.preventDefault()
                setDragOverCategory(cat)
              }}
              onDragLeave={() => setDragOverCategory(null)}
              onDrop={() => {
                if (draggedFood) {
                  moveFood(draggedFood, cat)
                  setDraggedFood(null)
                  setDragOverCategory(null)
                } else if (currentSuggestion) {
                  handleAddCurrentSuggestion(cat)
                  setDragOverCategory(null)
                }
              }}
            >
              <div className={`px-3 py-2 rounded-t-lg ${getCategoryInfo(darkMode)[cat].headerColor} text-white sticky top-0 z-10`}>
                <span className="mr-2">{getCategoryInfo(darkMode)[cat].emoji}</span>
                {getCategoryInfo(darkMode)[cat].label}
                <span className="ml-2 text-white/70">({count})</span>
              </div>
              <div className="p-2">
                <div className="relative flex gap-1 mb-2">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={inputValues[cat]}
                      placeholder="Add..."
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                      onChange={(e) => {
                        setInputValues({ ...inputValues, [cat]: e.target.value })
                        setShowAutocomplete({ ...showAutocomplete, [cat]: e.target.value.length > 0 })
                      }}
                      onFocus={() => {
                        if (inputValues[cat].length > 0) {
                          setShowAutocomplete({ ...showAutocomplete, [cat]: true })
                        }
                      }}
                      onBlur={() => {
                        setTimeout(() => setShowAutocomplete({ ...showAutocomplete, [cat]: false }), 200)
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && inputValues[cat]) {
                          addFood(inputValues[cat], cat)
                          setInputValues({ ...inputValues, [cat]: '' })
                        }
                      }}
                    />
                    {showAutocomplete[cat] && inputValues[cat].length > 0 && (
                      <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-32 overflow-y-auto">
                        {allFoodNames
                          .filter(name => 
                            name.toLowerCase().includes(inputValues[cat].toLowerCase()) &&
                            !existingFoodNames.includes(name.toLowerCase())
                          )
                          .slice(0, 5)
                          .map(name => (
                            <button
                              key={name}
                              className="w-full text-left px-2 py-1 text-sm hover:bg-green-50"
                              onClick={() => {
                                addFood(name, cat)
                                setInputValues({ ...inputValues, [cat]: '' })
                                setShowAutocomplete({ ...showAutocomplete, [cat]: false })
                              }}
                            >
                              {name}
                            </button>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
                <ul className="space-y-1 max-h-48 overflow-y-auto">
                  {foods.filter(f => f.category === cat).map(food => (
                    <li
                      key={food.id}
                      draggable
                      onDragStart={() => setDraggedFood(food)}
                      onDragEnd={() => setDraggedFood(null)}
                      className="flex items-center justify-between bg-white p-2 rounded-xl shadow-sm group cursor-move hover:scale-102 hover:shadow-md transition-all duration-200"
                    >
                      <button
                        onClick={() => setSelectedFood(selectedFood?.id === food.id ? null : food)}
                        className="font-medium text-gray-800 text-sm hover:text-green-600 truncate"
                      >
                        {food.name}
                      </button>
                      {cat === 'exploring' ? (
                        <div className="flex items-center gap-2">
                          <div className="relative w-6 h-6">
                            <svg className="w-6 h-6 transform -rotate-90">
                              <circle cx="12" cy="12" r="9" stroke="#e5e7eb" strokeWidth="2" fill="none" />
                              <circle cx="12" cy="12" r="9" stroke="#22c55e" strokeWidth="2" fill="none" strokeDasharray={`${food.attempts * 5.14} 57`} className="transition-all duration-300" />
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-xs">{food.attempts}</span>
                          </div>
                          <button
                            onClick={() => openAttemptModal(food)}
                            className="text-xs text-gray-400 hover:text-green-600"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
                          <button
                            onClick={() => deleteFood(food.id)}
                            className="text-gray-400 hover:text-red-500 text-xs"
                          >
                            ✕
                          </button>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })}
      </div>

      {selectedFood && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 p-4" onClick={() => setSelectedFood(null)}>
          <div className="bg-white rounded-2xl p-4 max-w-sm w-full max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">{selectedFood.name}</h3>
              <div className="flex gap-1">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => moveFood(selectedFood, cat)}
                    className={`text-xs px-2 py-1 rounded ${
                      selectedFood.category === cat
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {getCategoryInfo(darkMode)[cat].emoji}
                  </button>
                ))}
              </div>
            </div>

            {(() => {
              const suggestion = getSuggestionsForFood(selectedFood.name)
              if (!suggestion) return null
              return (
                <>
                  <p className="text-sm text-gray-600 mb-3">Similar to: {suggestion.similarTo}</p>
                  <h4 className="font-medium text-gray-800 mb-2">Cooking methods:</h4>
                  <ul className="space-y-2 mb-4">
                    {suggestion.cookingMethods.map((method, i) => (
                      <li key={i} className="text-sm bg-gray-50 p-2 rounded">
                        <span className="font-medium">{method.name}</span>
                        <span className={`ml-2 px-1 rounded text-xs ${
                          method.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                          method.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {method.difficulty}
                        </span>
                        <p className="text-gray-600 text-xs">{method.description}</p>
                      </li>
                    ))}
                  </ul>
                  <h4 className="font-medium text-gray-800 mb-2">Easy meals:</h4>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {suggestion.easyMeals.map((meal, i) => (
                      <span key={i} className="px-2 py-1 bg-blue-50 border border-blue-200 rounded-full text-xs text-blue-700">
                        {meal}
                      </span>
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
                      <span className="text-gray-500">{attempt.date}</span> - {attempt.method}
                      {attempt.liked === true && <span className="text-green-600 ml-1">✓</span>}
                      {attempt.liked === false && <span className="text-red-500 ml-1">✕</span>}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <button
              onClick={() => setSelectedFood(null)}
              className="w-full py-2 bg-gray-100 text-gray-600 rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setShowProgress(!showProgress)}
        className={`mx-auto block mb-4 px-6 py-3 rounded-2xl font-medium transition-all ${
          showProgress 
            ? 'bg-purple-600 text-white' 
            : 'bg-purple-100 text-purple-700 border border-purple-300 hover:bg-purple-200'
        }`}
      >
        {showProgress ? '✕ Close Progress' : '📊 View Progress'}
      </button>

      {showProgress && (
        <div className="max-w-md mx-auto mb-6 p-4 bg-white rounded-2xl border-2 border-purple-200 shadow-lg">
          <h3 className="font-semibold text-purple-800 mb-4">Your Food Journey</h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-purple-600 mb-1">Foods moved to Safe</p>
              <p className="text-2xl font-bold text-emerald-600">{movedToSafe.length}</p>
            </div>

            <div>
              <p className="text-sm text-purple-600 mb-1">In progress ({inProgressFoods.length})</p>
              {inProgressFoods.length > 0 ? (
                <div className="space-y-3">
                  {inProgressFoods.map(f => (
                    <div key={f.id} className="flex items-center gap-3">
                      <span className="text-sm text-gray-700 w-20 truncate">{f.name}</span>
                      <div className="relative w-8 h-8">
                        <svg className="w-8 h-8 transform -rotate-90">
                          <circle cx="16" cy="16" r="12" stroke="#e5e7eb" strokeWidth="3" fill="none" />
                          <circle 
                            cx="16" cy="16" r="12" 
                            stroke="#8b5cf6" 
                            strokeWidth="3" 
                            fill="none" 
                            strokeDasharray={`${f.attempts * 10.8} 75.4`} 
                            className="transition-all duration-300" 
                          />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">{f.attempts}</span>
                      </div>
                      <span className="text-xs text-gray-500">/ 7</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-500">Start trying foods in "Trying"</p>
              )}
            </div>
          </div>
        </div>
      )}

      {attemptModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-4 max-w-sm w-full">
            <h3 className="font-semibold text-lg mb-4">Log attempt: {attemptModal.name}</h3>
            
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">How did you try it?</label>
              <input
                type="text"
                value={attemptMethod}
                onChange={e => setAttemptMethod(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">Did you like it?</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setAttemptLiked(true)}
                  className={`flex-1 py-2 rounded-xl border ${
                    attemptLiked === true ? 'bg-green-500 text-white border-green-500' : 'border-gray-300 text-gray-600'
                  }`}
                >
                  ✓ Liked
                </button>
                <button
                  onClick={() => setAttemptLiked(false)}
                  className={`flex-1 py-2 rounded-xl border ${
                    attemptLiked === false ? 'bg-red-500 text-white border-red-500' : 'border-gray-300 text-gray-600'
                  }`}
                >
                  ✕ Not yet
                </button>
                <button
                  onClick={() => setAttemptLiked(null)}
                  className={`flex-1 py-2 rounded-xl border ${
                    attemptLiked === null ? 'bg-gray-500 text-white border-gray-500' : 'border-gray-300 text-gray-600'
                  }`}
                >
                  ? Not sure
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                value={attemptNotes}
                onChange={e => setAttemptNotes(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl"
                rows={2}
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setAttemptModal(null)}
                className="flex-1 py-2 border border-gray-300 rounded-xl text-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={submitAttempt}
                className="flex-1 py-2 bg-emerald-500 text-white rounded-xl"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="text-center text-gray-500 text-sm mt-8 pb-8">
        <p>Your journey is unique. Go at your own pace. 💚</p>
      </footer>
    </main>
  )
}
'use client'

import { useRef, useState, useEffect } from 'react'
import { Food, FoodCategory, Attempt, DietaryTag } from '@/lib/types'
import { getSimilarFoods, getSimilarFoodsFallback, getAllSuggestedFoods, getFoodType, getTagsForFood } from '@/lib/foods'
import { ATTEMPT_GOAL } from '@/lib/constants'
import { useFoodsStorage } from '@/hooks/useFoodsStorage'
import { useDismissedSuggestions } from '@/hooks/useDismissedSuggestions'
import { Plate } from '@/components/Plate'
import { TryingNow } from '@/components/TryingNow'
import { SuggestionCard } from '@/components/SuggestionCard'
import { RecipeBrowser } from '@/components/RecipeBrowser'
import { AttemptModal } from '@/components/AttemptModal'
import { FoodDetailModal } from '@/components/FoodDetailModal'
import { StatsModal } from '@/components/StatsModal'

const encouragementMessages = [
  "You're doing great! Every try counts.",
  "Nice work! Your palate is expanding.",
  "That's courage! Keep going at your own pace.",
  "Every bite teaches your body something new.",
  "You're amazing for trying!",
  "Food adventures take time - be patient with yourself.",
  "Small steps lead to big discoveries!",
]

const ALL_DIETARY_TAGS: { tag: DietaryTag; label: string }[] = [
  { tag: 'gluten-free',  label: 'Gluten-free' },
  { tag: 'nut-free',     label: 'Nut-free' },
  { tag: 'soy-free',     label: 'Soy-free' },
  { tag: 'oil-free',     label: 'Oil-free' },
  { tag: 'raw-friendly', label: 'Raw-friendly' },
]

export default function Home() {
  const [foods, setFoods] = useFoodsStorage()
  const [dismissedSuggestions, setDismissedSuggestions] = useDismissedSuggestions()
  const [showMessage, setShowMessage] = useState('')
  const [selectedFood, setSelectedFood] = useState<Food | null>(null)
  const [showProgress, setShowProgress] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [movedToSafe, setMovedToSafe] = useState<string[]>([])
  const [attemptModal, setAttemptModal] = useState<Food | null>(null)
  const [sessionSkipped, setSessionSkipped] = useState<string[]>([])
  const [recipeFilter, setRecipeFilter] = useState('all')
  const [activeTab, setActiveTab] = useState<'home' | 'discover' | 'recipes'>('home')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTags, setActiveTags] = useState<DietaryTag[]>([])
  const importRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (activeTab === 'discover') setSessionSkipped([])
  }, [activeTab])

  const addFood = (name: string, category: FoodCategory) => {
    if (!name.trim()) return
    if (foods.some(f => f.name.toLowerCase() === name.trim().toLowerCase())) return
    setFoods(prev => [...prev, {
      id: Date.now().toString(),
      name: name.trim(),
      category,
      foodType: getFoodType(name),
      attempts: 0,
      lastAttempted: null,
      notes: '',
      methodUsed: '',
      attemptHistory: [],
    }])
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

  const addOrMoveFood = (name: string, category: FoodCategory) => {
    const existing = foods.find(f => f.name.toLowerCase() === name.toLowerCase())
    if (existing) {
      if (existing.category !== category) moveFood(existing, category)
    } else {
      addFood(name, category)
    }
  }

  const handleAttemptSubmit = (foodId: string, attempt: Attempt) => {
    const food = foods.find(f => f.id === foodId)
    if (!food) return
    const newAttempts = food.attempts + 1
    const message = newAttempts >= ATTEMPT_GOAL
      ? `Amazing! You've tried ${food.name} ${ATTEMPT_GOAL} times! Move it to your plate when ready.`
      : encouragementMessages[newAttempts % encouragementMessages.length]
    setShowMessage(message)
    setTimeout(() => setShowMessage(''), 4000)
    setFoods(prev => prev.map(f =>
      f.id === foodId
        ? { ...f, attempts: newAttempts, lastAttempted: attempt.date, methodUsed: attempt.method, attemptHistory: [...f.attemptHistory, attempt] }
        : f
    ))
    setAttemptModal(null)
  }

  const exportData = () => {
    const blob = new Blob([JSON.stringify({ version: 1, foods }, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `flavorfriend-backup-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const importData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    e.target.value = ''
    const reader = new FileReader()
    reader.onload = ev => {
      try {
        const parsed = JSON.parse(ev.target?.result as string)
        const imported: Food[] = Array.isArray(parsed) ? parsed : parsed.foods
        if (!Array.isArray(imported)) return
        setFoods(imported)
        setShowMessage('Data imported!')
        setTimeout(() => setShowMessage(''), 2000)
      } catch {
        setShowMessage('Import failed — invalid file')
        setTimeout(() => setShowMessage(''), 3000)
      }
    }
    reader.readAsText(file)
  }

  const toggleTag = (tag: DietaryTag) =>
    setActiveTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])

  const allFoodNames = getAllSuggestedFoods()
  const loveFoods = foods.filter(f => f.category === 'love')
  const exploringFoods = foods.filter(f => f.category === 'exploring')
  const safeFoodNames = loveFoods.map(f => f.name)

  const activeFoodNames = new Set(foods.map(f => f.name.toLowerCase()))
  const dismissedSet = new Set(dismissedSuggestions.map(s => s.toLowerCase()))
  const skippedSet = new Set(sessionSkipped.map(s => s.toLowerCase()))
  const isAvailable = (s: string) =>
    !dismissedSet.has(s.toLowerCase()) && !skippedSet.has(s.toLowerCase()) && !activeFoodNames.has(s.toLowerCase())
  const matchesDiet = (s: string) =>
    activeTags.length === 0 || activeTags.every(t => getTagsForFood(s).includes(t))

  const allSuggested = getSimilarFoods(safeFoodNames)
  const availableSuggestions = allSuggested.filter(s => isAvailable(s) && matchesDiet(s))
  const fallbackSuggestions = availableSuggestions.length === 0
    ? getSimilarFoodsFallback(safeFoodNames, allFoodNames).filter(s => isAvailable(s) && matchesDiet(s))
    : []
  const allSuggestions = availableSuggestions.length > 0 ? availableSuggestions : fallbackSuggestions
  const currentSuggestion = allSuggestions[0] as string | undefined

  const handleAddSuggestion = (category: FoodCategory) => {
    if (currentSuggestion) {
      addOrMoveFood(currentSuggestion, category)
      setDismissedSuggestions(prev => [...prev, currentSuggestion])
    }
  }

  const handleSkipSuggestion = () => {
    if (currentSuggestion) setSessionSkipped(prev => [...prev, currentSuggestion])
  }

  const searchResults = searchQuery.trim()
    ? foods.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : []

  const dm = darkMode

  return (
    <main className={`min-h-screen p-4 pb-20 ${dm ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <header className="text-center mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex gap-2">
            <button onClick={() => setDarkMode(!dm)} className={`px-3 py-1 rounded-lg text-sm ${dm ? 'bg-gray-700 text-amber-300' : 'bg-gray-200 text-gray-700'}`}>
              {dm ? '☀️' : '🌙'}
            </button>
            <button onClick={exportData} className={`px-3 py-1 rounded-lg text-xs ${dm ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`} title="Export backup">
              ↓ Export
            </button>
            <label className={`px-3 py-1 rounded-lg text-xs cursor-pointer ${dm ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`} title="Import backup">
              ↑ Import
              <input ref={importRef} type="file" accept="application/json" className="sr-only" onChange={importData} />
            </label>
          </div>
          <button
            onClick={() => setShowProgress(true)}
            className={`p-2 rounded-lg text-lg leading-none ${dm ? 'text-gray-400 hover:text-green-300' : 'text-gray-400 hover:text-green-800'}`}
            aria-label="View progress"
          >
            📊
          </button>
        </div>
        <h1 className={`text-3xl font-bold italic mb-3 ${dm ? 'text-green-300' : 'text-green-800'}`} style={{ fontFamily: 'var(--font-display)' }}>Plant Pal</h1>
        <div className="relative max-w-sm mx-auto">
          <input
            type="search"
            value={searchQuery}
            placeholder="Search your foods…"
            aria-label="Search your foods"
            className={`w-full px-4 py-2 text-sm border rounded-2xl ${dm ? 'bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-500' : 'bg-white border-gray-300 placeholder-gray-400'} focus:outline-none focus:border-green-400`}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={e => { if (e.key === 'Escape') setSearchQuery('') }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">✕</button>
          )}
        </div>
        {searchResults.length > 0 && (
          <ul className={`mt-1 max-w-sm mx-auto rounded-xl border shadow-lg overflow-hidden ${dm ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'}`}>
            {searchResults.map(f => (
              <li key={f.id}>
                <button
                  className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 ${dm ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-green-50'}`}
                  onClick={() => { setSelectedFood(f); setSearchQuery('') }}
                >
                  <span>{f.name}</span>
                  <span className={`ml-auto text-xs ${dm ? 'text-gray-500' : 'text-gray-400'}`}>{f.category}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
        {searchQuery && searchResults.length === 0 && (
          <p className={`mt-1 text-sm ${dm ? 'text-gray-500' : 'text-gray-400'}`}>No foods found</p>
        )}
      </header>

      {showMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-green-800 text-white px-4 py-2 rounded-full shadow-lg z-50 text-sm">
          {showMessage}
        </div>
      )}

      {activeTab === 'home' && (
        <div className="flex flex-col lg:flex-row gap-6 max-w-5xl mx-auto px-4 mb-4">
          <Plate
            loveFoods={loveFoods}
            darkMode={darkMode}
            onAddFood={addOrMoveFood}
            onMoveFood={moveFood}
            onDeleteFood={deleteFood}
            onSelectFood={setSelectedFood}
          />
          <TryingNow
            exploringFoods={exploringFoods}
            allFoodNames={allFoodNames}
            darkMode={darkMode}
            onAddFood={addOrMoveFood}
            onDeleteFood={deleteFood}
            onSelectFood={setSelectedFood}
            onLogAttempt={setAttemptModal}
          />
        </div>
      )}

      {activeTab === 'discover' && (
        <div className="max-w-md mx-auto py-6 px-4">
          <h2 className={`text-xl font-bold text-center mb-4 ${dm ? 'text-green-300' : 'text-green-900'}`}>What to try next</h2>
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {ALL_DIETARY_TAGS.map(({ tag, label }) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${activeTags.includes(tag) ? 'bg-green-700 text-white border-green-700' : (dm ? 'bg-gray-800 text-gray-400 border-gray-600 hover:border-green-600' : 'bg-white text-gray-500 border-gray-300 hover:border-green-400')}`}
              >
                {label}
              </button>
            ))}
          </div>
          <SuggestionCard
            currentSuggestion={currentSuggestion}
            darkMode={darkMode}
            onAdd={handleAddSuggestion}
            onSkip={handleSkipSuggestion}
          />
        </div>
      )}

      {activeTab === 'recipes' && (
        <RecipeBrowser
          darkMode={darkMode}
          recipeFilter={recipeFilter}
          onFilterChange={setRecipeFilter}
        />
      )}

      <FoodDetailModal
        food={selectedFood}
        onClose={() => setSelectedFood(null)}
        onMove={moveFood}
      />

      <AttemptModal
        food={attemptModal}
        onClose={() => setAttemptModal(null)}
        onSubmit={handleAttemptSubmit}
      />

      <StatsModal
        open={showProgress}
        onClose={() => setShowProgress(false)}
        allFoods={foods}
        darkMode={darkMode}
      />

      <nav className={`fixed bottom-0 left-0 right-0 z-40 flex border-t ${dm ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
        <button
          onClick={() => setActiveTab('home')}
          className={`flex-1 py-3 text-sm font-medium flex flex-col items-center gap-0.5 transition-colors ${activeTab === 'home' ? (dm ? 'text-green-400' : 'text-green-700') : (dm ? 'text-gray-500' : 'text-gray-400')}`}
        >
          <span className="text-lg">🌱</span>
          <span>Home</span>
        </button>
        <button
          onClick={() => setActiveTab('discover')}
          className={`flex-1 py-3 text-sm font-medium flex flex-col items-center gap-0.5 transition-colors ${activeTab === 'discover' ? (dm ? 'text-green-400' : 'text-green-700') : (dm ? 'text-gray-500' : 'text-gray-400')}`}
        >
          <span className="text-lg">🔍</span>
          <span>Discover</span>
        </button>
        <button
          onClick={() => setActiveTab('recipes')}
          className={`flex-1 py-3 text-sm font-medium flex flex-col items-center gap-0.5 transition-colors ${activeTab === 'recipes' ? (dm ? 'text-green-400' : 'text-green-700') : (dm ? 'text-gray-500' : 'text-gray-400')}`}
        >
          <span className="text-lg">📖</span>
          <span>Recipes</span>
        </button>
      </nav>
    </main>
  )
}

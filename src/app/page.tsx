'use client'

import { useRef, useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Leaf, Compass, ChefHat } from 'lucide-react'
import { Food, FoodCategory, Attempt, DietaryTag } from '@/lib/types'
import { getSimilarFoods, getSimilarFoodsFallback, getAllSuggestedFoods, getFoodType, getTagsForFood } from '@/lib/foods'
import { ATTEMPT_GOAL } from '@/lib/constants'
import { useFoodsStorage } from '@/hooks/useFoodsStorage'
import { useDismissedSuggestions } from '@/hooks/useDismissedSuggestions'
import { useAuth } from '@/hooks/useAuth'
import { Plate } from '@/components/Plate'
import { TryingNow } from '@/components/TryingNow'
import { SuggestionCard } from '@/components/SuggestionCard'
import { RecipeBrowser } from '@/components/RecipeBrowser'
import { AttemptModal } from '@/components/AttemptModal'
import { FoodDetailModal } from '@/components/FoodDetailModal'
import { StatsModal } from '@/components/StatsModal'
import { AuthModal } from '@/components/AuthModal'

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

export default function Page() {
  return (
    <Suspense>
      <Home />
    </Suspense>
  )
}

function Home() {
  const { user, signIn, signOut } = useAuth()
  const userId = user?.id ?? null
  const [foods, setFoods] = useFoodsStorage(userId)
  const [dismissedSuggestions, setDismissedSuggestions] = useDismissedSuggestions(userId)
  const searchParams = useSearchParams()
  const router = useRouter()
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
  const [showOptionsMenu, setShowOptionsMenu] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [linkExpired, setLinkExpired] = useState(false)
  const importRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (searchParams.get('auth_error') === 'link_expired') {
      setLinkExpired(true)
      setShowAuthModal(true)
      router.replace('/')
    }
  }, [searchParams, router])

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
    <main className={`min-h-screen pb-20 ${dm ? 'bg-gray-900' : 'bg-[#fcfaf8]'}`}>
      <header className={`sticky top-0 z-50 backdrop-blur-xl shadow-sm mb-6 px-6 py-4 border-b ${dm ? 'bg-emerald-950/80 border-emerald-900/50' : 'bg-emerald-600/90 border-emerald-500/50'}`}>
        <div className="flex justify-between items-center mb-4">
          <div className="w-10" />
          <h1 className="text-4xl font-bold italic text-white" style={{ fontFamily: 'var(--font-display)' }}>Plant Pal</h1>
          <div className="relative">
            <button
              onClick={() => setShowOptionsMenu(o => !o)}
              className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white text-2xl leading-none rounded-full hover:bg-white/10 transition-colors"
              aria-label="Options"
            >
              ⋯
            </button>
            {showOptionsMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowOptionsMenu(false)} />
                <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-xl z-50 py-1 min-w-40 border border-stone-100">
                  <button onClick={() => { setDarkMode(!dm); setShowOptionsMenu(false) }} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-stone-50 flex items-center gap-2">
                    {dm ? '☀️ Light mode' : '🌙 Dark mode'}
                  </button>
                  <button onClick={() => { exportData(); setShowOptionsMenu(false) }} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-stone-50 flex items-center gap-2">
                    ↓ Export backup
                  </button>
                  <label className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-stone-50 flex items-center gap-2 cursor-pointer">
                    ↑ Import backup
                    <input ref={importRef} type="file" accept="application/json" className="sr-only" onChange={e => { importData(e); setShowOptionsMenu(false) }} />
                  </label>
                  <button onClick={() => { setShowProgress(true); setShowOptionsMenu(false) }} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-stone-50 flex items-center gap-2">
                    📊 Stats
                  </button>
                  <div className="border-t border-stone-100 my-1" />
                  <button onClick={() => { setShowAuthModal(true); setShowOptionsMenu(false) }} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-stone-50 flex items-center gap-2">
                    {user ? `👤 Account` : '🔑 Sign in / Sync'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="relative max-w-sm mx-auto">
          <input
            type="search"
            value={searchQuery}
            placeholder="Search your foods…"
            aria-label="Search your foods"
            className="w-full px-4 py-2 text-sm rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:bg-white/20 transition-colors"
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={e => { if (e.key === 'Escape') setSearchQuery('') }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white">✕</button>
          )}
        </div>
        {searchResults.length > 0 && (
          <ul className="mt-1 max-w-sm mx-auto rounded-xl border shadow-lg overflow-hidden bg-white border-stone-200 relative z-10">
            {searchResults.map(f => (
              <li key={f.id}>
                <button
                  className="w-full text-left px-4 py-2 text-sm flex items-center gap-2 text-gray-700 hover:bg-green-50"
                  onClick={() => { setSelectedFood(f); setSearchQuery('') }}
                >
                  <span>{f.name}</span>
                  <span className="ml-auto text-xs text-gray-400">{f.category}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
        {searchQuery && searchResults.length === 0 && (
          <p className="mt-1 text-sm text-white/60 text-center">No foods found</p>
        )}
      </header>

      {showMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-emerald-800 text-white px-4 py-2 rounded-full shadow-lg z-50 text-sm">
          {showMessage}
        </div>
      )}

      {activeTab === 'home' && (
        <div className="flex flex-col lg:flex-row gap-6 max-w-5xl mx-auto px-4 mb-4 mt-2">
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
          <h2 className={`text-2xl font-bold italic text-center mb-1 ${dm ? 'text-green-300' : 'text-green-900'}`} style={{ fontFamily: 'var(--font-display)' }}>What to try next</h2>
          <p className={`text-sm text-center mb-4 ${dm ? 'text-gray-500' : 'text-stone-400'}`}>Based on what&apos;s on your plate</p>
          <div className="flex flex-wrap gap-1.5 justify-center mb-6">
            {ALL_DIETARY_TAGS.map(({ tag, label }) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`inline-flex items-center leading-none px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors ${activeTags.includes(tag) ? 'bg-green-700 text-white border-green-700' : (dm ? 'bg-gray-800 text-gray-400 border-gray-600 hover:border-green-600' : 'bg-white text-gray-500 border-gray-300 hover:border-green-400')}`}
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

      <AuthModal
        open={showAuthModal}
        user={user}
        darkMode={darkMode}
        linkExpired={linkExpired}
        onClose={() => { setShowAuthModal(false); setLinkExpired(false) }}
        onSignIn={signIn}
        onSignOut={signOut}
      />

      <nav className={`fixed bottom-0 left-0 right-0 z-40 flex border-t pb-safe ${dm ? 'bg-gray-900/90 backdrop-blur-md border-gray-800' : 'bg-white/90 backdrop-blur-md border-gray-100'}`}>
        <button
          onClick={() => setActiveTab('home')}
          className="flex-1 pt-2 pb-3 text-[11px] font-medium flex flex-col items-center gap-1 transition-all"
        >
          <div className={`p-1.5 rounded-2xl transition-colors ${activeTab === 'home' ? (dm ? 'bg-emerald-900/50 text-emerald-400' : 'bg-emerald-50 text-emerald-600') : (dm ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600')}`}>
            <Leaf className="w-5 h-5" />
          </div>
          <span className={activeTab === 'home' ? (dm ? 'text-emerald-400' : 'text-emerald-700') : (dm ? 'text-gray-500' : 'text-gray-400')}>Home</span>
        </button>
        <button
          onClick={() => setActiveTab('discover')}
          className="flex-1 pt-2 pb-3 text-[11px] font-medium flex flex-col items-center gap-1 transition-all"
        >
          <div className={`p-1.5 rounded-2xl transition-colors ${activeTab === 'discover' ? (dm ? 'bg-emerald-900/50 text-emerald-400' : 'bg-emerald-50 text-emerald-600') : (dm ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600')}`}>
            <Compass className="w-5 h-5" />
          </div>
          <span className={activeTab === 'discover' ? (dm ? 'text-emerald-400' : 'text-emerald-700') : (dm ? 'text-gray-500' : 'text-gray-400')}>Discover</span>
        </button>
        <button
          onClick={() => setActiveTab('recipes')}
          className="flex-1 pt-2 pb-3 text-[11px] font-medium flex flex-col items-center gap-1 transition-all"
        >
          <div className={`p-1.5 rounded-2xl transition-colors ${activeTab === 'recipes' ? (dm ? 'bg-emerald-900/50 text-emerald-400' : 'bg-emerald-50 text-emerald-600') : (dm ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600')}`}>
            <ChefHat className="w-5 h-5" />
          </div>
          <span className={activeTab === 'recipes' ? (dm ? 'text-emerald-400' : 'text-emerald-700') : (dm ? 'text-gray-500' : 'text-gray-400')}>Recipes</span>
        </button>
      </nav>
    </main>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { Food, FoodCategory, Attempt } from '@/lib/types'
import { getSuggestionsForFood, getSimilarFoods } from '@/lib/foods'

const STORAGE_KEY = 'flavorfriend-foods'

const defaultFoods: Food[] = [
  { id: '1', name: 'Chicken', category: 'safe', attempts: 10, lastAttempted: '2024-01-15', notes: '', methodUsed: '', attemptHistory: [] },
  { id: '2', name: 'Rice', category: 'safe', attempts: 10, lastAttempted: '2024-01-15', notes: '', methodUsed: '', attemptHistory: [] },
  { id: '3', name: 'Pasta', category: 'safe', attempts: 10, lastAttempted: '2024-01-15', notes: '', methodUsed: '', attemptHistory: [] },
  { id: '4', name: 'Bread', category: 'safe', attempts: 10, lastAttempted: '2024-01-15', notes: '', methodUsed: '', attemptHistory: [] },
  { id: '5', name: 'Broccoli', category: 'learning', attempts: 2, lastAttempted: '2024-01-10', notes: '', methodUsed: 'Roasted', attemptHistory: [
    { id: 'a1', date: '2024-01-08', method: 'Roasted', liked: false, notes: 'Too crunchy' },
    { id: 'a2', date: '2024-01-10', method: 'Steamed', liked: null, notes: 'It was okay' }
  ]},
  { id: '6', name: 'Spinach', category: 'learning', attempts: 1, lastAttempted: '2024-01-12', notes: '', methodUsed: 'Smoothie', attemptHistory: [
    { id: 'a3', date: '2024-01-12', method: 'Smoothie', liked: true, notes: 'Couldnt even taste it!' }
  ]},
  { id: '7', name: 'Salmon', category: 'scary', attempts: 0, lastAttempted: null, notes: '', methodUsed: '', attemptHistory: [] },
  { id: '8', name: 'Mushrooms', category: 'scary', attempts: 0, lastAttempted: null, notes: '', methodUsed: '', attemptHistory: [] },
  { id: '9', name: 'Brussels Sprouts', category: 'scary', attempts: 0, lastAttempted: null, notes: '', methodUsed: '', attemptHistory: [] },
]

const categoryInfo: Record<FoodCategory, { label: string; emoji: string; color: string }> = {
  safe: { label: 'Safe Foods', emoji: '🟢', color: 'bg-green-100 border-green-300' },
  learning: { label: 'Trying', emoji: '🟡', color: 'bg-yellow-100 border-yellow-300' },
  scary: { label: 'Want to Try', emoji: '🔴', color: 'bg-red-50 border-red-200' },
  new: { label: 'Suggested', emoji: '⚪', color: 'bg-gray-100 border-gray-300' },
}

const encouragementMessages = [
  "You're doing great! Every try counts.",
  "Nice work! Your palate is expanding.",
  "That's courage! Keep going at your own pace.",
  "Every bite teaches your body something new.",
  "You're amazing for trying!",
  "Food adventures take time - be patient with yourself.",
  "Small steps lead to big discoveries!",
]

export default function Home() {
  const [foods, setFoods] = useState<Food[]>([])
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory>('safe')
  const [newFoodName, setNewFoodName] = useState('')
  const [showMessage, setShowMessage] = useState('')
  const [selectedFood, setSelectedFood] = useState<Food | null>(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [showProgress, setShowProgress] = useState(false)
  const [attemptModal, setAttemptModal] = useState<Food | null>(null)
  const [attemptMethod, setAttemptMethod] = useState('')
  const [attemptLiked, setAttemptLiked] = useState<boolean | null>(null)
  const [attemptNotes, setAttemptNotes] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      setFoods(JSON.parse(stored))
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

  const addFood = () => {
    if (!newFoodName.trim()) return
    const newFood: Food = {
      id: Date.now().toString(),
      name: newFoodName.trim(),
      category: selectedCategory,
      attempts: 0,
      lastAttempted: null,
      notes: '',
      methodUsed: '',
      attemptHistory: [],
    }
    setFoods([...foods, newFood])
    setNewFoodName('')
  }

  const moveFood = (food: Food, newCategory: FoodCategory) => {
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

  const safeFoodNames = foods.filter(f => f.category === 'safe').map(f => f.name)
  const similarFoods = getSimilarFoods(safeFoodNames)

  const filteredFoods = foods.filter(f => f.category === selectedCategory)
  const suggestion = selectedFood ? getSuggestionsForFood(selectedFood.name) : null

  const learningFoods = foods.filter(f => f.category === 'learning')
  const completedFoods = learningFoods.filter(f => f.attempts >= 7)
  const inProgressFoods = learningFoods.filter(f => f.attempts > 0 && f.attempts < 7)
  const justStarted = learningFoods.filter(f => f.attempts === 0)

  return (
    <main className="min-h-screen p-4 max-w-2xl mx-auto pb-20">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold text-green-800 mb-2">FlavorFriend</h1>
        <p className="text-green-700">Expand your palate, one bite at a time</p>
      </header>

      {showMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg z-50 animate-pulse">
          {showMessage}
        </div>
      )}

      <button
        onClick={() => setShowProgress(!showProgress)}
        className="mb-4 text-green-600 text-sm underline"
      >
        {showProgress ? 'Hide progress' : 'View your progress'}
      </button>

      {showProgress && (
        <div className="mb-6 p-4 bg-purple-50 rounded-xl border border-purple-200">
          <h3 className="font-semibold text-purple-800 mb-4">Your Food Journey</h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-purple-600 mb-1">Ready to move to Safe ({completedFoods.length} foods)</p>
              {completedFoods.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {completedFoods.map(f => (
                    <span key={f.id} className="px-2 py-1 bg-green-500 text-white rounded-full text-xs">
                      {f.name}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-500">Keep trying foods in "Trying" to see them here</p>
              )}
            </div>

            <div>
              <p className="text-sm text-purple-600 mb-1">In progress ({inProgressFoods.length} foods)</p>
              {inProgressFoods.length > 0 ? (
                <div className="space-y-2">
                  {inProgressFoods.map(f => (
                    <div key={f.id} className="flex items-center gap-2">
                      <span className="text-sm text-gray-700 w-24 truncate">{f.name}</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-purple-500 rounded-full transition-all"
                          style={{ width: `${(f.attempts / 7) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 w-12 text-right">{f.attempts}/7</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-500">Start trying foods in "Trying"</p>
              )}
            </div>

            <div>
              <p className="text-sm text-purple-600 mb-1">Just added ({justStarted.length} foods)</p>
              {justStarted.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {justStarted.map(f => (
                    <span key={f.id} className="px-2 py-1 bg-yellow-400 text-white rounded-full text-xs">
                      {f.name}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-500">Add foods to "Trying" to track them here</p>
              )}
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setShowSuggestions(!showSuggestions)}
        className="mb-4 text-green-600 text-sm underline"
      >
        {showSuggestions ? 'Hide suggestions' : 'Show food suggestions'}
      </button>

      {showSuggestions && (
        <div className="mb-6 p-4 bg-green-50 rounded-xl border border-green-200">
          <h3 className="font-semibold text-green-800 mb-2">Similar foods you might enjoy:</h3>
          <p className="text-sm text-green-700 mb-3">Based on foods you already like</p>
          <div className="flex flex-wrap gap-2">
            {similarFoods.map(food => (
              <button
                key={food}
                onClick={() => {
                  setFoods([...foods, {
                    id: Date.now().toString() + food,
                    name: food,
                    category: 'new',
                    attempts: 0,
                    lastAttempted: null,
                    notes: '',
                    methodUsed: '',
                    attemptHistory: [],
                  }])
                }}
                className="px-3 py-1 bg-white border border-green-300 rounded-full text-sm text-green-700 hover:bg-green-100"
              >
                + {food}
              </button>
            ))}
          </div>
        </div>
      )}

      <nav className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {(Object.keys(categoryInfo) as FoodCategory[]).map(cat => {
          const count = foods.filter(f => f.category === cat).length
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-full border-2 transition-all ${
                selectedCategory === cat
                  ? 'border-green-600 bg-green-50 text-green-800'
                  : 'border-gray-200 text-gray-600 hover:border-green-300'
              }`}
            >
              <span className="mr-2">{categoryInfo[cat].emoji}</span>
              {categoryInfo[cat].label}
              <span className="ml-1 text-xs">({count})</span>
            </button>
          )
        })}
      </nav>

      <div className={`p-4 rounded-xl border-2 mb-6 ${categoryInfo[selectedCategory].color}`}>
        <h2 className="text-xl font-semibold mb-4">
          {categoryInfo[selectedCategory].emoji} {categoryInfo[selectedCategory].label}
        </h2>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newFoodName}
            onChange={e => setNewFoodName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addFood()}
            placeholder="Add a food..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
          />
          <button
            onClick={addFood}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Add
          </button>
        </div>

        {filteredFoods.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No foods here yet. Add some above!
          </p>
        ) : (
          <ul className="space-y-2">
            {filteredFoods.map(food => (
              <li
                key={food.id}
                className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm"
              >
                <button
                  onClick={() => setSelectedFood(selectedFood?.id === food.id ? null : food)}
                  className="font-medium text-gray-800 hover:text-green-600"
                >
                  {food.name}
                </button>
                <div className="flex items-center gap-2">
                  {selectedCategory === 'learning' && (
                    <button
                      onClick={() => openAttemptModal(food)}
                      className="text-sm px-3 py-1 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
                    >
                      Tried ({food.attempts}/7)
                    </button>
                  )}
                  <select
                    value={food.category}
                    onChange={e => moveFood(food, e.target.value as FoodCategory)}
                    className="text-sm px-2 py-1 border border-gray-200 rounded bg-white"
                  >
                    <option value="safe">🟢 Safe</option>
                    <option value="learning">🟡 Trying</option>
                    <option value="scary">🔴 Want to Try</option>
                    <option value="new">⚪ Suggested</option>
                  </select>
                  <button
                    onClick={() => deleteFood(food.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedFood && suggestion && (
        <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-200 mb-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">
            How to try: {selectedFood.name}
          </h3>
          
          <p className="text-sm text-blue-700 mb-3">
            Similar to: {suggestion.similarTo}
          </p>

          <h4 className="font-medium text-blue-800 mb-2">Cooking methods:</h4>
          <ul className="space-y-3 mb-4">
            {suggestion.cookingMethods.map((method, i) => (
              <li key={i} className="text-sm">
                <span className="font-medium text-blue-900">{method.name}</span>
                <span className={`ml-2 px-2 py-0.5 rounded text-xs ${
                  method.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                  method.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {method.difficulty}
                </span>
                <p className="text-blue-700">{method.description}</p>
                <ul className="list-disc list-inside text-blue-600 mt-1">
                  {method.tips.map((tip, j) => (
                    <li key={j}>{tip}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <h4 className="font-medium text-blue-800 mb-2">Easy meals:</h4>
          <ul className="flex flex-wrap gap-2">
            {suggestion.easyMeals.map((meal, i) => (
              <li key={i} className="px-3 py-1 bg-white border border-blue-200 rounded-full text-sm text-blue-700">
                {meal}
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedFood && !suggestion && (
        <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-200 mb-6">
          <p className="text-gray-600">
            Cooking tips for {selectedFood.name} are coming soon!
          </p>
        </div>
      )}

      {selectedFood && selectedFood.attemptHistory.length > 0 && (
        <div className="p-4 bg-amber-50 rounded-xl border-2 border-amber-200 mb-6">
          <h3 className="text-lg font-semibold text-amber-800 mb-3">
            Your attempts at {selectedFood.name}
          </h3>
          <ul className="space-y-2">
            {[...selectedFood.attemptHistory].reverse().map(attempt => (
              <li key={attempt.id} className="text-sm bg-white p-2 rounded">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-gray-500">{attempt.date}</span>
                  <span className="font-medium">{attempt.method}</span>
                  {attempt.liked === true && <span className="text-green-600">✓ liked</span>}
                  {attempt.liked === false && <span className="text-red-500">✕ not yet</span>}
                  {attempt.liked === null && <span className="text-gray-400">? not sure</span>}
                </div>
                {attempt.notes && <p className="text-gray-600">{attempt.notes}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}

      {attemptModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-4 max-w-sm w-full max-h-[90vh] overflow-y-auto">
            <h3 className="font-semibold text-lg mb-4">Log attempt: {attemptModal.name}</h3>
            
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">How did you try it?</label>
              <input
                type="text"
                value={attemptMethod}
                onChange={e => setAttemptMethod(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="e.g., Roasted, Steamed, Raw..."
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">Did you like it?</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setAttemptLiked(true)}
                  className={`flex-1 py-2 rounded-lg border ${
                    attemptLiked === true 
                      ? 'bg-green-500 text-white border-green-500' 
                      : 'border-gray-300 text-gray-600'
                  }`}
                >
                  ✓ Liked
                </button>
                <button
                  onClick={() => setAttemptLiked(false)}
                  className={`flex-1 py-2 rounded-lg border ${
                    attemptLiked === false 
                      ? 'bg-red-500 text-white border-red-500' 
                      : 'border-gray-300 text-gray-600'
                  }`}
                >
                  ✕ Not yet
                </button>
                <button
                  onClick={() => setAttemptLiked(null)}
                  className={`flex-1 py-2 rounded-lg border ${
                    attemptLiked === null 
                      ? 'bg-gray-500 text-white border-gray-500' 
                      : 'border-gray-300 text-gray-600'
                  }`}
                >
                  ? Not sure
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
              <textarea
                value={attemptNotes}
                onChange={e => setAttemptNotes(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={2}
                placeholder="How did it taste? What did you think?"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setAttemptModal(null)}
                className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={submitAttempt}
                className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="text-center text-gray-500 text-sm mt-8">
        <p>Your journey is unique. Go at your own pace. 💚</p>
      </footer>
    </main>
  )
}
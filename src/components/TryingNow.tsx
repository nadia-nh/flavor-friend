'use client'

import { useState } from 'react'
import { Food, FoodCategory } from '@/lib/types'
import { ATTEMPT_GOAL } from '@/lib/constants'

interface TryingNowProps {
  exploringFoods: Food[]
  allFoodNames: string[]
  darkMode: boolean
  onAddFood: (name: string, category: FoodCategory) => void
  onDeleteFood: (id: string) => void
  onSelectFood: (food: Food) => void
  onLogAttempt: (food: Food) => void
}

export function TryingNow({ exploringFoods, allFoodNames, darkMode, onAddFood, onDeleteFood, onSelectFood, onLogAttempt }: TryingNowProps) {
  const [input, setInput] = useState('')
  const [showAutocomplete, setShowAutocomplete] = useState(false)
  const dm = darkMode

  const filtered = allFoodNames.filter(n =>
    n.toLowerCase().includes(input.toLowerCase()) &&
    !exploringFoods.some(f => f.name.toLowerCase() === n.toLowerCase())
  ).slice(0, 6)

  // Circumference of ring (r=10): 2π*10 ≈ 62.8
  const ringCircumference = 62.8

  return (
    <div className={`w-full lg:w-72 p-4 rounded-3xl shadow-sm border ${dm ? 'bg-gray-800/90 border-gray-700/50' : 'bg-white/90 border-emerald-100/50'} backdrop-blur-sm`}>
      <h2 className={`text-base font-bold italic mb-3 ${dm ? 'text-emerald-300' : 'text-emerald-800'}`} style={{ fontFamily: 'var(--font-display)' }}>Trying Now</h2>

      {exploringFoods.length === 0 && (
        <p className={`text-sm mb-4 ${dm ? 'text-gray-500' : 'text-gray-400'}`}>Add foods you&apos;re experimenting with here!</p>
      )}

      <ul className="space-y-1 mb-3">
        {exploringFoods.map(food => (
          <li key={food.id} className={`group flex items-center gap-2 px-2 py-1.5 rounded-xl transition-transform hover:translate-x-1 ${dm ? 'hover:bg-gray-700/50' : 'hover:bg-emerald-50/80'}`}>
            <button
              onClick={() => onSelectFood(food)}
              className={`flex-1 text-left text-sm font-medium truncate ${dm ? 'text-gray-200 hover:text-emerald-400' : 'text-gray-700 hover:text-emerald-700'}`}
            >
              {food.name}
            </button>
            <div className="flex items-center gap-1 flex-shrink-0">
              <div className="relative w-7 h-7">
                <svg className="w-7 h-7 -rotate-90">
                  <circle cx="14" cy="14" r="10" stroke={dm ? '#374151' : '#e5e7eb'} strokeWidth="2.5" fill="none" />
                  <circle cx="14" cy="14" r="10" stroke="#10b981" strokeWidth="2.5" fill="none" strokeLinecap="round"
                    strokeDasharray={`${Math.min(food.attempts, ATTEMPT_GOAL) * (ringCircumference / ATTEMPT_GOAL)} ${ringCircumference}`}
                    className="transition-all duration-300"
                  />
                </svg>
                <span className={`absolute inset-0 flex items-center justify-center text-xs font-medium ${dm ? 'text-gray-300' : 'text-gray-600'}`}>{food.attempts}</span>
              </div>
              <span className={`text-xs ${dm ? 'text-gray-600' : 'text-gray-400'}`}>/{ATTEMPT_GOAL}</span>
              <button onClick={() => onLogAttempt(food)} className={`text-base font-bold leading-none px-1 ${dm ? 'text-emerald-400 hover:text-emerald-200' : 'text-emerald-600 hover:text-emerald-800'}`}>+</button>
              <button onClick={() => onDeleteFood(food.id)} className={`text-xs px-0.5 opacity-0 group-hover:opacity-100 transition-opacity ${dm ? 'text-gray-500 hover:text-red-400' : 'text-gray-400 hover:text-red-500'}`}>✕</button>
            </div>
          </li>
        ))}
      </ul>

      <div className="relative">
        <input
          type="text"
          value={input}
          placeholder="Add food to try…"
          aria-label="Add food to try"
          role="combobox"
          aria-expanded={showAutocomplete && filtered.length > 0}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          aria-controls="trying-now-autocomplete"
          className={`w-full px-3 py-2 text-sm border rounded-2xl ${dm ? 'bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-500' : 'bg-white border-gray-200 placeholder-gray-400'} focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 shadow-sm transition-all`}
          onChange={e => {
            setInput(e.target.value)
            setShowAutocomplete(e.target.value.length > 0)
          }}
          onFocus={() => { if (input.length > 0) setShowAutocomplete(true) }}
          onBlur={() => { setTimeout(() => setShowAutocomplete(false), 200) }}
          onKeyDown={e => {
            if (e.key === 'Enter' && input.trim()) {
              onAddFood(input.trim(), 'exploring')
              setInput('')
            } else if (e.key === 'Escape') {
              setShowAutocomplete(false)
            }
          }}
        />
        {showAutocomplete && filtered.length > 0 && (
          <ul id="trying-now-autocomplete" role="listbox" aria-label="Food suggestions" className="absolute z-20 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-36 overflow-y-auto bottom-full mb-1 list-none p-0 m-0">
            {filtered.map(name => (
              <li key={name} role="option" aria-selected={false}>
                <button
                  className="w-full text-left px-3 py-1.5 text-sm hover:bg-emerald-50 focus:bg-emerald-50 focus:outline-none transition-colors"
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => {
                    onAddFood(name, 'exploring')
                    setInput('')
                    setShowAutocomplete(false)
                  }}
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

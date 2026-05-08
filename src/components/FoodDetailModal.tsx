'use client'

import { Food, FoodCategory } from '@/lib/types'
import { CATEGORIES } from '@/lib/constants'
import { getSuggestionsForFood } from '@/lib/foods'

interface FoodDetailModalProps {
  food: Food | null
  onClose: () => void
  onMove: (food: Food, cat: FoodCategory) => void
}

export function FoodDetailModal({ food, onClose, onMove }: FoodDetailModalProps) {
  if (!food) return null

  const suggestion = getSuggestionsForFood(food.name)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-4 max-w-sm w-full max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold">{food.name}</h3>
          <div className="flex gap-1">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => onMove(food, cat)}
                className={`text-xs px-2 py-1 rounded ${food.category === cat ? 'bg-green-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {cat === 'love' ? '🟢' : cat === 'exploring' ? '🌱' : cat === 'curious' ? '🌿' : '🚫'}
              </button>
            ))}
          </div>
        </div>
        {suggestion && (
          <>
            <p className="text-sm text-gray-600 mb-3">Similar to: {suggestion.similarTo.join(', ')}</p>
            <h4 className="font-medium text-gray-800 mb-2">Cooking methods:</h4>
            <ul className="space-y-2 mb-4">
              {suggestion.cookingMethods.map((method, i) => (
                <li key={i} className="text-sm bg-gray-50 p-2 rounded">
                  <span className="font-medium">{method.name}</span>
                  <span className={`ml-2 px-1 rounded text-xs ${method.difficulty === 'easy' ? 'bg-green-100 text-green-700' : method.difficulty === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                    {method.difficulty}
                  </span>
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
        )}
        {food.attemptHistory.length > 0 && (
          <>
            <h4 className="font-medium text-gray-800 mb-2">Your attempts:</h4>
            <ul className="space-y-1 mb-4">
              {[...food.attemptHistory].reverse().map(attempt => (
                <li key={attempt.id} className="text-xs bg-gray-50 p-2 rounded">
                  <span className="text-gray-500">{attempt.date}</span> — {attempt.method}
                  {attempt.liked === true  && <span className="text-green-600 ml-1">✓</span>}
                  {attempt.liked === false && <span className="text-red-500 ml-1">✕</span>}
                  {attempt.notes && <span className="text-gray-500 ml-1">· {attempt.notes}</span>}
                </li>
              ))}
            </ul>
          </>
        )}
        <button onClick={onClose} className="w-full py-2 bg-gray-100 text-gray-600 rounded-xl">Close</button>
      </div>
    </div>
  )
}

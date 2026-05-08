'use client'

import { useState, useEffect } from 'react'
import { Food, Attempt } from '@/lib/types'
import { getSuggestionsForFood } from '@/lib/foods'

interface AttemptModalProps {
  food: Food | null
  onClose: () => void
  onSubmit: (foodId: string, attempt: Attempt) => void
}

export function AttemptModal({ food, onClose, onSubmit }: AttemptModalProps) {
  const [method, setMethod] = useState('')
  const [liked, setLiked] = useState<boolean | null>(null)
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (food) {
      const suggestion = getSuggestionsForFood(food.name)
      setMethod(suggestion?.cookingMethods[0]?.name || 'Plain')
      setLiked(null)
      setNotes('')
    }
  }, [food])

  if (!food) return null

  const handleSubmit = () => {
    const attempt: Attempt = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      method,
      liked,
      notes,
    }
    onSubmit(food.id, attempt)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-4 max-w-sm w-full">
        <h3 className="font-semibold text-lg mb-4">Log attempt: {food.name}</h3>
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">How did you try it?</label>
          <input type="text" value={method} onChange={e => setMethod(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-xl" />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">Did you like it?</label>
          <div className="flex gap-2">
            <button onClick={() => setLiked(true)}  className={`flex-1 py-2 rounded-xl border ${liked === true  ? 'bg-green-800 text-white border-green-800' : 'border-gray-300 text-gray-600'}`}>✓ Liked</button>
            <button onClick={() => setLiked(false)} className={`flex-1 py-2 rounded-xl border ${liked === false ? 'bg-red-500 text-white border-red-500'   : 'border-gray-300 text-gray-600'}`}>✕ Not yet</button>
            <button onClick={() => setLiked(null)}  className={`flex-1 py-2 rounded-xl border ${liked === null  ? 'bg-gray-500 text-white border-gray-500'  : 'border-gray-300 text-gray-600'}`}>? Not sure</button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-xl" rows={2} />
        </div>
        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 py-2 border border-gray-300 rounded-xl text-gray-600">Cancel</button>
          <button onClick={handleSubmit} className="flex-1 py-2 bg-green-800 text-white rounded-xl">Save</button>
        </div>
      </div>
    </div>
  )
}

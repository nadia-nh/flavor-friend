'use client'

import { useEffect, useRef } from 'react'
import { Food } from '@/lib/types'
import { ATTEMPT_GOAL } from '@/lib/constants'

interface StatsModalProps {
  open: boolean
  onClose: () => void
  allFoods: Food[]
  darkMode: boolean
}

export function StatsModal({ open, onClose, allFoods, darkMode }: StatsModalProps) {
  const dm = darkMode
  const dialogRef = useRef<HTMLDivElement>(null)
  // Circumference of ring (r=12): 2π*12 ≈ 75.4
  const ringCircumference = 75.4

  useEffect(() => {
    if (open) dialogRef.current?.focus()
  }, [open])

  if (!open) return null

  const loveFoods     = allFoods.filter(f => f.category === 'love')
  const inProgressFoods = allFoods.filter(f => f.category === 'exploring' && f.attempts > 0)
  const totalAttempts = allFoods.reduce((sum, f) => sum + f.attempts, 0)
  const mostTried     = [...allFoods].sort((a, b) => b.attempts - a.attempts)[0]

  const methodCounts: Record<string, number> = {}
  for (const f of allFoods) {
    for (const a of f.attemptHistory) {
      if (a.method) methodCounts[a.method] = (methodCounts[a.method] ?? 0) + 1
    }
  }
  const topMethods = Object.entries(methodCounts).sort((a, b) => b[1] - a[1]).slice(0, 3)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}
      onKeyDown={e => { if (e.key === 'Escape') onClose() }}
    >
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="stats-modal-title" tabIndex={-1}
        className={`${dm ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 max-w-sm w-full focus:outline-none`} onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-5">
          <h3 id="stats-modal-title" className={`font-semibold text-lg ${dm ? 'text-green-300' : 'text-green-900'}`}>Your Food Journey</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">✕</button>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className={`rounded-xl p-3 ${dm ? 'bg-gray-700' : 'bg-green-50'}`}>
              <p className={`text-xs mb-1 ${dm ? 'text-green-400' : 'text-green-700'}`}>On your plate</p>
              <p className={`text-2xl font-bold ${dm ? 'text-green-300' : 'text-green-800'}`}>{loveFoods.length}</p>
            </div>
            <div className={`rounded-xl p-3 ${dm ? 'bg-gray-700' : 'bg-green-50'}`}>
              <p className={`text-xs mb-1 ${dm ? 'text-green-400' : 'text-green-700'}`}>Total attempts</p>
              <p className={`text-2xl font-bold ${dm ? 'text-green-300' : 'text-green-800'}`}>{totalAttempts}</p>
            </div>
          </div>

          {mostTried && mostTried.attempts > 0 && (
            <div>
              <p className={`text-xs mb-1 ${dm ? 'text-green-400' : 'text-green-700'}`}>Most tried</p>
              <p className={`text-sm font-semibold ${dm ? 'text-gray-200' : 'text-gray-800'}`}>
                {mostTried.name} <span className={`font-normal ${dm ? 'text-gray-400' : 'text-gray-500'}`}>({mostTried.attempts}×)</span>
              </p>
            </div>
          )}

          {topMethods.length > 0 && (
            <div>
              <p className={`text-xs mb-2 ${dm ? 'text-green-400' : 'text-green-700'}`}>Favourite methods</p>
              <div className="space-y-1">
                {topMethods.map(([method, count]) => (
                  <div key={method} className="flex items-center gap-2">
                    <div className={`h-1.5 rounded-full bg-green-500`} style={{ width: `${Math.round((count / topMethods[0][1]) * 100)}%`, minWidth: '8px' }} />
                    <span className={`text-xs truncate ${dm ? 'text-gray-300' : 'text-gray-600'}`}>{method}</span>
                    <span className={`text-xs ml-auto flex-shrink-0 ${dm ? 'text-gray-500' : 'text-gray-400'}`}>{count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

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
                        <circle cx="16" cy="16" r="12" stroke="#16a34a" strokeWidth="3" fill="none"
                          strokeDasharray={`${Math.min(f.attempts, ATTEMPT_GOAL) * (ringCircumference / ATTEMPT_GOAL)} ${ringCircumference}`}
                          className="transition-all duration-300"
                        />
                      </svg>
                      <span className={`absolute inset-0 flex items-center justify-center text-xs font-medium ${dm ? 'text-gray-300' : ''}`}>{f.attempts}</span>
                    </div>
                    <span className="text-xs text-gray-500">/ {ATTEMPT_GOAL}</span>
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
  )
}

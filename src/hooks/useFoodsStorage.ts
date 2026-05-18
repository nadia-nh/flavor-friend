'use client'

import { useState, useEffect, useRef } from 'react'
import { Food, FoodCategory, FoodType } from '@/lib/types'
import { getFoodType } from '@/lib/foods'
import { STORAGE_KEY, DISMISSED_KEY } from '@/lib/constants'
import * as db from '@/lib/supabase/db'

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
  { id: '6', name: 'Mushrooms',        category: 'curious', foodType: 'vegetable', attempts: 0, lastAttempted: null, notes: '', methodUsed: '', attemptHistory: [] },
  { id: '7', name: 'Brussels Sprouts', category: 'curious', foodType: 'vegetable', attempts: 0, lastAttempted: null, notes: '', methodUsed: '', attemptHistory: [] },
  { id: '8', name: 'Cauliflower',      category: 'curious', foodType: 'vegetable', attempts: 0, lastAttempted: null, notes: '', methodUsed: '', attemptHistory: [] },
]

function normalizeFoods(parsed: Food[]): Food[] {
  return parsed.map(f => ({
    ...f,
    foodType: (f.foodType ?? getFoodType(f.name)) as FoodType,
    category: (f.category === 'notYet' ? 'curious' : f.category) as FoodCategory,
  }))
}

function loadLocalFoods(): Food[] | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return null
    const parsed: Food[] = JSON.parse(stored)
    return parsed.length > 0 ? normalizeFoods(parsed) : null
  } catch {
    return null
  }
}

export function useFoodsStorage(userId: string | null) {
  const [foods, setFoods] = useState<Food[]>([])
  const initializedRef = useRef(false)

  useEffect(() => {
    initializedRef.current = false

    if (userId === null) {
      // Guest mode: localStorage only
      const local = loadLocalFoods()
      setFoods(local ?? defaultFoods)
      if (!local) localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultFoods))
      initializedRef.current = true
      return
    }

    // Logged-in mode: load from cloud, auto-migrate local data if present
    db.fetchFoods(userId).then(async cloudFoods => {
      const localFoods = loadLocalFoods()

      if (cloudFoods.length === 0 && localFoods && localFoods.length > 0) {
        // First login with local data: migrate to cloud
        await db.saveFoods(userId, localFoods)
        setFoods(localFoods)
      } else if (cloudFoods.length > 0) {
        setFoods(cloudFoods)
      } else {
        await db.saveFoods(userId, defaultFoods)
        setFoods(defaultFoods)
      }
      // Always clear localStorage when logged in — Supabase is the source of truth
      localStorage.removeItem(STORAGE_KEY)
      initializedRef.current = true
    }).catch(() => {
      // Fallback to local if cloud fetch fails
      const local = loadLocalFoods()
      setFoods(local ?? defaultFoods)
      initializedRef.current = true
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  // Persist changes
  useEffect(() => {
    if (!initializedRef.current || foods.length === 0) return

    if (userId === null) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(foods))
    } else {
      db.saveFoods(userId, foods).catch(console.error)
    }
  }, [foods, userId])

  return [foods, setFoods] as const
}

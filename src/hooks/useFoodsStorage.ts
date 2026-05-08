'use client'

import { useState, useEffect } from 'react'
import { Food, FoodCategory, FoodType } from '@/lib/types'
import { getFoodType } from '@/lib/foods'
import { STORAGE_KEY } from '@/lib/constants'

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

export function useFoodsStorage() {
  const [foods, setFoods] = useState<Food[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) {
        setFoods(defaultFoods)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultFoods))
        return
      }
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
    } catch {
      setFoods(defaultFoods)
    }
  }, [])

  useEffect(() => {
    if (foods.length > 0) localStorage.setItem(STORAGE_KEY, JSON.stringify(foods))
  }, [foods])

  return [foods, setFoods] as const
}

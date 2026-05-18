import { Food } from '@/lib/types'
import { createClient } from './client'

const supabase = createClient()

export async function fetchFoods(userId: string): Promise<Food[]> {
  const { data, error } = await supabase
    .from('foods')
    .select('*')
    .eq('user_id', userId)

  if (error) throw error
  if (!data || data.length === 0) return []

  return data.map(row => ({
    id: row.id,
    name: row.name,
    category: row.category,
    foodType: row.food_type,
    attempts: row.attempts,
    lastAttempted: row.last_attempted,
    notes: row.notes,
    methodUsed: row.method_used,
    attemptHistory: row.attempt_history ?? [],
  }))
}

export async function saveFoods(userId: string, foods: Food[]): Promise<void> {
  const rows = foods.map(f => ({
    id: f.id,
    user_id: userId,
    name: f.name,
    category: f.category,
    food_type: f.foodType,
    attempts: f.attempts,
    last_attempted: f.lastAttempted,
    notes: f.notes,
    method_used: f.methodUsed,
    attempt_history: f.attemptHistory,
  }))

  const { error } = await supabase
    .from('foods')
    .upsert(rows, { onConflict: 'id,user_id' })

  if (error) throw error
}

export async function deleteFoodRow(userId: string, foodId: string): Promise<void> {
  const { error } = await supabase
    .from('foods')
    .delete()
    .eq('id', foodId)
    .eq('user_id', userId)

  if (error) throw error
}

export async function fetchDismissed(userId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from('dismissed_suggestions')
    .select('suggestions')
    .eq('user_id', userId)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return (data?.suggestions as string[]) ?? []
}

export async function saveDismissed(userId: string, dismissed: string[]): Promise<void> {
  const { error } = await supabase
    .from('dismissed_suggestions')
    .upsert({ user_id: userId, suggestions: dismissed }, { onConflict: 'user_id' })

  if (error) throw error
}

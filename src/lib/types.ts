export type FoodCategory = 'love' | 'exploring' | 'curious' | 'notYet'

export interface Attempt {
  id: string
  date: string
  method: string
  liked: boolean | null
  notes: string
}

export interface Food {
  id: string
  name: string
  category: FoodCategory
  attempts: number
  lastAttempted: string | null
  notes: string
  methodUsed: string
  attemptHistory: Attempt[]
}

export interface CookingMethod {
  name: string
  description: string
  tips: string[]
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface FoodSuggestion {
  name: string
  similarTo: string
  cookingMethods: CookingMethod[]
  easyMeals: string[]
}
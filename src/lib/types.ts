export type FoodCategory = 'love' | 'exploring' | 'curious' | 'notYet'
export type FoodType = 'vegetable' | 'grain' | 'legume' | 'other'

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
  foodType: FoodType
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
  name: string;
  foodType: FoodType;
  similarTo: string[];
  cookingMethods: CookingMethod[];
  easyMeals: string[];
  image?: string;
  /** Name of a more generic parent food — used as image fallback */
  parent?: string;
}

export type RecipeCategory =
  | 'breakfast'
  | 'lunch'
  | 'dinner'
  | 'dessert'
  | 'snack'
  | 'appetizer'
  | 'side'
  | 'soup'
  | 'salad'
  | 'quick'
  | 'one-pot'
  | 'pasta'
  | 'baking'
  | 'drink'
  | 'sauce';

export interface Recipe {
  title: string;
  description: string;
  image: string;
  link: string;
  category: RecipeCategory;
  source: string;
  prepTime?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}
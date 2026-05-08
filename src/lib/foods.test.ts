import { describe, it, expect } from 'vitest'
import { getSimilarFoods, getSimilarFoodsFallback, getAllSuggestedFoods, getFoodType, foodSuggestions } from './foods'

describe('getSimilarFoods', () => {
  it('returns foods that list a known food in their similarTo', () => {
    const results = getSimilarFoods(['Broccoli'])
    expect(results.length).toBeGreaterThan(0)
    expect(results.every(r => typeof r === 'string')).toBe(true)
  })

  it('excludes foods already in the input list', () => {
    const input = ['Broccoli']
    const results = getSimilarFoods(input)
    expect(results.map(r => r.toLowerCase())).not.toContain('broccoli')
  })

  it('returns empty array for empty input', () => {
    const results = getSimilarFoods([])
    expect(results).toEqual([])
  })

  it('returns at most 5 results', () => {
    const results = getSimilarFoods(['Rice', 'Pasta', 'Tofu', 'Spinach'])
    expect(results.length).toBeLessThanOrEqual(5)
  })

  it('is case-insensitive when matching input foods', () => {
    const lower = getSimilarFoods(['broccoli'])
    const upper = getSimilarFoods(['Broccoli'])
    expect(lower).toEqual(upper)
  })
})

describe('getSimilarFoodsFallback', () => {
  const allFoods = getAllSuggestedFoods()

  it('returns popular ingredients not already in the food list', () => {
    const results = getSimilarFoodsFallback([], allFoods)
    expect(results.length).toBeGreaterThan(0)
    const popularStarters = ['Tofu', 'Chickpeas', 'Lentils', 'Sweet Potato', 'Mushrooms']
    const hasPopular = results.some(r => popularStarters.includes(r))
    expect(hasPopular).toBe(true)
  })

  it('excludes foods already in the list', () => {
    const myFoods = ['Tofu', 'Chickpeas', 'Lentils', 'Sweet Potato', 'Mushrooms']
    const results = getSimilarFoodsFallback(myFoods, allFoods)
    const myFoodsLower = myFoods.map(f => f.toLowerCase())
    expect(results.every(r => !myFoodsLower.includes(r.toLowerCase()))).toBe(true)
  })

  it('returns at most 5 results', () => {
    const results = getSimilarFoodsFallback([], allFoods)
    expect(results.length).toBeLessThanOrEqual(5)
  })

  it('falls back to versatile foods when popular ones are exhausted', () => {
    // Exclude all popular ingredients so the fallback path triggers
    const popularIngredients = ['Tofu', 'Chickpeas', 'Lentils', 'Sweet Potato', 'Mushrooms', 'Quinoa', 'Oats', 'Cauliflower', 'Spinach', 'Broccoli']
    const results = getSimilarFoodsFallback(popularIngredients, allFoods)
    expect(results.length).toBeGreaterThan(0)
    expect(results.every(r => !popularIngredients.includes(r))).toBe(true)
  })
})

describe('getFoodType', () => {
  it('returns the correct type for known foods', () => {
    expect(getFoodType('Broccoli')).toBe('vegetable')
    // Find a grain/legume/other from the actual suggestions rather than hardcoding names
    // that may not be in the database (e.g. plain 'Rice' is 'Rice (all)' in foodSuggestions)
    const grainFood = foodSuggestions.find(f => f.foodType === 'grain')
    if (grainFood) expect(getFoodType(grainFood.name)).toBe('grain')
    const legumeFood = foodSuggestions.find(f => f.foodType === 'legume')
    if (legumeFood) expect(getFoodType(legumeFood.name)).toBe('legume')
    const otherFood = foodSuggestions.find(f => f.foodType === 'other')
    if (otherFood) expect(getFoodType(otherFood.name)).toBe('other')
  })

  it('is case-insensitive', () => {
    expect(getFoodType('broccoli')).toBe('vegetable')
    expect(getFoodType('BROCCOLI')).toBe('vegetable')
  })

  it('returns "other" for unknown foods', () => {
    expect(getFoodType('UnknownXYZ')).toBe('other')
  })
})

describe('getAllSuggestedFoods', () => {
  it('returns an array of strings', () => {
    const foods = getAllSuggestedFoods()
    expect(Array.isArray(foods)).toBe(true)
    expect(foods.length).toBeGreaterThan(0)
    expect(typeof foods[0]).toBe('string')
  })

  it('contains well-known plant foods', () => {
    const foods = getAllSuggestedFoods()
    expect(foods).toContain('Broccoli')
    expect(foods).toContain('Tofu')
    expect(foods).toContain('Lentils')
  })
})

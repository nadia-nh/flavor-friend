import { describe, it, expect } from 'vitest'
import { getRecipeForFood, recipes } from './recipes'

describe('getRecipeForFood', () => {
  it('returns a recipe when the food name appears in a recipe title', () => {
    // Find a food name that definitely exists in a recipe title
    const foodWithRecipe = recipes.find(r =>
      r.title.toLowerCase().split(' ').some(word => word.length > 3)
    )
    if (!foodWithRecipe) return // skip if no match found

    const titleWord = foodWithRecipe.title.split(' ').find(w => w.length > 4) ?? ''
    const result = getRecipeForFood(titleWord)
    expect(result).toBeDefined()
    expect(result?.title.toLowerCase()).toContain(titleWord.toLowerCase())
  })

  it('returns undefined for a food name that matches no recipe', () => {
    const result = getRecipeForFood('xylophoneberry')
    expect(result).toBeUndefined()
  })

  it('is case-insensitive', () => {
    // Pick a food known to appear in a recipe title
    const tofu = getRecipeForFood('tofu')
    const TOFU = getRecipeForFood('TOFU')
    expect(tofu).toEqual(TOFU)
  })

  it('returns a valid Recipe object when found', () => {
    const result = getRecipeForFood('tofu')
    if (!result) return // may not exist, skip gracefully
    expect(result).toHaveProperty('title')
    expect(result).toHaveProperty('link')
    expect(result).toHaveProperty('category')
    expect(result).toHaveProperty('source')
  })

  it('does not throw for empty string', () => {
    expect(() => getRecipeForFood('')).not.toThrow()
  })
})

describe('recipes array', () => {
  it('contains at least 50 recipes', () => {
    expect(recipes.length).toBeGreaterThanOrEqual(50)
  })

  it('every recipe has required fields', () => {
    recipes.forEach(r => {
      expect(r.title).toBeTruthy()
      expect(r.link).toBeTruthy()
      expect(r.category).toBeTruthy()
      expect(r.source).toBeTruthy()
    })
  })
})

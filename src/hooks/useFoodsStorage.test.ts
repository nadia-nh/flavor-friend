import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useFoodsStorage } from './useFoodsStorage'
import { STORAGE_KEY } from '@/lib/constants'

vi.mock('@/lib/supabase/client', () => ({ createClient: vi.fn() }))

vi.mock('@/lib/supabase/db', () => ({
  fetchFoods: vi.fn().mockResolvedValue([]),
  saveFoods: vi.fn().mockResolvedValue(undefined),
  fetchDismissed: vi.fn().mockResolvedValue([]),
  saveDismissed: vi.fn().mockResolvedValue(undefined),
}))

const mockLocalStorage = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value },
    removeItem: (key: string) => { delete store[key] },
    clear: () => { store = {} },
  }
})()

beforeEach(() => {
  mockLocalStorage.clear()
  vi.stubGlobal('localStorage', mockLocalStorage)
})

describe('useFoodsStorage', () => {
  it('loads default foods when localStorage is empty', async () => {
    const { result } = renderHook(() => useFoodsStorage(null))
    await act(async () => {})
    expect(result.current[0].length).toBeGreaterThan(0)
    expect(result.current[0].some(f => f.name === 'Rice')).toBe(true)
  })

  it('loads default foods when localStorage has an empty array', async () => {
    mockLocalStorage.setItem(STORAGE_KEY, JSON.stringify([]))
    const { result } = renderHook(() => useFoodsStorage(null))
    await act(async () => {})
    expect(result.current[0].some(f => f.name === 'Rice')).toBe(true)
  })

  it('persists stored foods from localStorage', async () => {
    const stored = [{ id: '99', name: 'Kale', category: 'love', foodType: 'vegetable', attempts: 0, lastAttempted: null, notes: '', methodUsed: '', attemptHistory: [] }]
    mockLocalStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
    const { result } = renderHook(() => useFoodsStorage(null))
    await act(async () => {})
    expect(result.current[0]).toHaveLength(1)
    expect(result.current[0][0].name).toBe('Kale')
  })

  it('writes to localStorage when foods change', async () => {
    const { result } = renderHook(() => useFoodsStorage(null))
    await act(async () => {})
    const newFood = { id: '42', name: 'Tempeh', category: 'exploring' as const, foodType: 'other' as const, attempts: 0, lastAttempted: null, notes: '', methodUsed: '', attemptHistory: [] }
    act(() => { result.current[1](prev => [...prev, newFood]) })
    const saved = JSON.parse(mockLocalStorage.getItem(STORAGE_KEY) ?? '[]')
    expect(saved.some((f: { name: string }) => f.name === 'Tempeh')).toBe(true)
  })

  it('handles corrupt JSON gracefully and falls back to defaults', async () => {
    mockLocalStorage.setItem(STORAGE_KEY, 'not valid json')
    const { result } = renderHook(() => useFoodsStorage(null))
    await act(async () => {})
    expect(result.current[0].length).toBeGreaterThan(0)
  })

  it('migrates old notYet category to curious', async () => {
    const old = [{ id: '1', name: 'Tofu', category: 'notYet', foodType: 'other', attempts: 0, lastAttempted: null, notes: '', methodUsed: '', attemptHistory: [] }]
    mockLocalStorage.setItem(STORAGE_KEY, JSON.stringify(old))
    const { result } = renderHook(() => useFoodsStorage(null))
    await act(async () => {})
    const tofu = result.current[0].find(f => f.name === 'Tofu')
    expect(tofu?.category).toBe('curious')
  })

  it('infers foodType from food name when missing', async () => {
    const old = [{ id: '1', name: 'Broccoli', category: 'love', attempts: 0, lastAttempted: null, notes: '', methodUsed: '', attemptHistory: [] }]
    mockLocalStorage.setItem(STORAGE_KEY, JSON.stringify(old))
    const { result } = renderHook(() => useFoodsStorage(null))
    await act(async () => {})
    const broccoli = result.current[0].find(f => f.name === 'Broccoli')
    expect(broccoli?.foodType).toBe('vegetable')
  })
})

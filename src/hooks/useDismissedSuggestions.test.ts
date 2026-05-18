import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useDismissedSuggestions } from './useDismissedSuggestions'
import { DISMISSED_KEY } from '@/lib/constants'

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

describe('useDismissedSuggestions', () => {
  it('starts empty when localStorage has no dismissed key', async () => {
    const { result } = renderHook(() => useDismissedSuggestions(null))
    await act(async () => {})
    expect(result.current[0]).toEqual([])
  })

  it('loads saved dismissed suggestions from localStorage', async () => {
    mockLocalStorage.setItem(DISMISSED_KEY, JSON.stringify(['Tofu', 'Quinoa']))
    const { result } = renderHook(() => useDismissedSuggestions(null))
    await act(async () => {})
    expect(result.current[0]).toEqual(['Tofu', 'Quinoa'])
  })

  it('persists dismissed suggestions when they change', async () => {
    const { result } = renderHook(() => useDismissedSuggestions(null))
    await act(async () => {})
    act(() => { result.current[1](prev => [...prev, 'Kale']) })
    const saved = JSON.parse(mockLocalStorage.getItem(DISMISSED_KEY) ?? '[]')
    expect(saved).toContain('Kale')
  })

  it('handles corrupt JSON gracefully and starts empty', async () => {
    mockLocalStorage.setItem(DISMISSED_KEY, 'bad json {{{')
    const { result } = renderHook(() => useDismissedSuggestions(null))
    await act(async () => {})
    expect(result.current[0]).toEqual([])
  })
})

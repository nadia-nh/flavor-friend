'use client'

import { useState, useEffect } from 'react'
import { DISMISSED_KEY } from '@/lib/constants'

export function useDismissedSuggestions() {
  const [dismissed, setDismissed] = useState<string[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(DISMISSED_KEY)
      if (stored) setDismissed(JSON.parse(stored))
    } catch {}
  }, [])

  useEffect(() => {
    localStorage.setItem(DISMISSED_KEY, JSON.stringify(dismissed))
  }, [dismissed])

  return [dismissed, setDismissed] as const
}

'use client'

import { useState, useEffect, useRef } from 'react'
import { DISMISSED_KEY } from '@/lib/constants'
import * as db from '@/lib/supabase/db'

export function useDismissedSuggestions(userId: string | null) {
  const [dismissed, setDismissed] = useState<string[]>([])
  const initializedRef = useRef(false)

  useEffect(() => {
    initializedRef.current = false

    if (userId === null) {
      try {
        const stored = localStorage.getItem(DISMISSED_KEY)
        if (stored) setDismissed(JSON.parse(stored))
        else setDismissed([])
      } catch {
        setDismissed([])
      }
      initializedRef.current = true
      return
    }

    db.fetchDismissed(userId).then(cloud => {
      setDismissed(cloud)
      initializedRef.current = true
    }).catch(() => {
      try {
        const stored = localStorage.getItem(DISMISSED_KEY)
        setDismissed(stored ? JSON.parse(stored) : [])
      } catch {
        setDismissed([])
      }
      initializedRef.current = true
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  useEffect(() => {
    if (!initializedRef.current) return

    if (userId === null) {
      localStorage.setItem(DISMISSED_KEY, JSON.stringify(dismissed))
    } else {
      db.saveDismissed(userId, dismissed).catch(console.error)
    }
  }, [dismissed, userId])

  return [dismissed, setDismissed] as const
}

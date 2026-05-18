'use client'

import { useState, useRef, useEffect } from 'react'
import type { User } from '@supabase/supabase-js'

interface AuthModalProps {
  open: boolean
  user: User | null
  darkMode: boolean
  linkExpired?: boolean
  onClose: () => void
  onSignIn: (email: string) => Promise<void>
  onSignOut: () => Promise<void>
}

export function AuthModal({ open, user, darkMode, linkExpired, onClose, onSignIn, onSignOut }: AuthModalProps) {
  const dm = darkMode
  const dialogRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (open) {
      dialogRef.current?.focus()
      setSent(false)
      setEmail('')
      setError('')
    }
  }, [open])

  if (!open) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    setError('')
    try {
      await onSignIn(email.trim())
      setSent(true)
    } catch {
      setError('Could not send link. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await onSignOut()
    onClose()
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      onKeyDown={e => { if (e.key === 'Escape') onClose() }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        tabIndex={-1}
        className={`${dm ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 max-w-sm w-full focus:outline-none`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-5">
          <h3 id="auth-modal-title" className={`font-semibold text-lg ${dm ? 'text-green-300' : 'text-green-900'}`}>
            {user ? 'Your account' : 'Sign in'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">✕</button>
        </div>

        {user ? (
          <div className="space-y-4">
            <div className={`rounded-xl p-4 ${dm ? 'bg-gray-700' : 'bg-green-50'}`}>
              <p className={`text-xs mb-1 ${dm ? 'text-green-400' : 'text-green-700'}`}>Signed in as</p>
              <p className={`text-sm font-medium truncate ${dm ? 'text-gray-200' : 'text-gray-800'}`}>{user.email}</p>
            </div>
            <p className={`text-xs ${dm ? 'text-gray-400' : 'text-gray-500'}`}>
              Your data syncs automatically across all your devices.
            </p>
            <button
              onClick={handleSignOut}
              className={`w-full py-2.5 rounded-xl text-sm font-medium border transition-colors ${dm ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}
            >
              Sign out
            </button>
          </div>
        ) : linkExpired && !sent ? (
          <div className="space-y-4">
            <div className={`rounded-xl p-4 ${dm ? 'bg-amber-900/40' : 'bg-amber-50'} border ${dm ? 'border-amber-700' : 'border-amber-200'}`}>
              <p className={`text-sm font-medium mb-1 ${dm ? 'text-amber-300' : 'text-amber-800'}`}>Link already used</p>
              <p className={`text-sm ${dm ? 'text-amber-400' : 'text-amber-700'}`}>
                That sign-in link can only be used once. Enter your email below to get a new one.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="auth-email-expired" className={`block text-xs mb-1.5 ${dm ? 'text-gray-400' : 'text-gray-500'}`}>
                  Email address
                </label>
                <input
                  id="auth-email-expired"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  autoFocus
                  required
                  className={`w-full px-3 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors ${dm ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-500' : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400'}`}
                />
              </div>
              {error && <p className="text-xs text-red-500">{error}</p>}
              <button
                type="submit"
                disabled={loading || !email.trim()}
                className="w-full py-2.5 rounded-xl text-sm font-medium bg-green-700 text-white hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Sending…' : 'Send new link'}
              </button>
            </form>
          </div>
        ) : sent ? (
          <div className="space-y-4 text-center">
            <div className="text-4xl">📬</div>
            <p className={`text-sm font-medium ${dm ? 'text-gray-200' : 'text-gray-800'}`}>
              Check your email
            </p>
            <p className={`text-sm ${dm ? 'text-gray-400' : 'text-gray-500'}`}>
              We sent a sign-in link to <span className="font-medium">{email}</span>. Click it to log in — no password needed.
            </p>
            <button
              onClick={() => setSent(false)}
              className={`text-xs underline ${dm ? 'text-gray-500' : 'text-gray-400'}`}
            >
              Use a different email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className={`text-sm ${dm ? 'text-gray-400' : 'text-gray-500'}`}>
              Enter your email and we&apos;ll send you a magic link to sign in. Your data will sync across devices automatically.
            </p>
            <div>
              <label htmlFor="auth-email" className={`block text-xs mb-1.5 ${dm ? 'text-gray-400' : 'text-gray-500'}`}>
                Email address
              </label>
              <input
                id="auth-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
                className={`w-full px-3 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors ${dm ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-500' : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400'}`}
              />
            </div>
            {error && (
              <p className="text-xs text-red-500">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading || !email.trim()}
              className="w-full py-2.5 rounded-xl text-sm font-medium bg-green-700 text-white hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Sending…' : 'Send magic link'}
            </button>
            <p className={`text-xs text-center ${dm ? 'text-gray-500' : 'text-gray-400'}`}>
              No account needed — just verify your email.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}

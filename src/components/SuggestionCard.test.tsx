import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { SuggestionCard } from './SuggestionCard'
import { SWIPE_ADD_THRESHOLD, SWIPE_DETECT_THRESHOLD } from '@/lib/constants'

function makePointerEvent(type: string, clientX: number): PointerEvent {
  return new PointerEvent(type, { clientX, bubbles: true, pointerId: 1 })
}

describe('SuggestionCard — no suggestion', () => {
  it('shows an empty-state message when currentSuggestion is undefined', () => {
    render(<SuggestionCard currentSuggestion={undefined} darkMode={false} onAdd={vi.fn()} onSkip={vi.fn()} />)
    expect(screen.getByText(/no more suggestions/i)).toBeInTheDocument()
  })
})

describe('SuggestionCard — with suggestion', () => {
  let onAdd: ReturnType<typeof vi.fn>
  let onSkip: ReturnType<typeof vi.fn>

  beforeEach(() => {
    onAdd = vi.fn()
    onSkip = vi.fn()
  })

  it('renders the food name', () => {
    render(<SuggestionCard currentSuggestion="Quinoa" darkMode={false} onAdd={onAdd} onSkip={onSkip} />)
    expect(screen.getByText('Quinoa')).toBeInTheDocument()
  })

  it('calls onSkip when the Skip button is clicked', () => {
    render(<SuggestionCard currentSuggestion="Quinoa" darkMode={false} onAdd={onAdd} onSkip={onSkip} />)
    // The skip button contains '→', not the word "Skip" (which is a sibling span)
    fireEvent.click(screen.getByRole('button', { name: '→' }))
    expect(onSkip).toHaveBeenCalledOnce()
    expect(onAdd).not.toHaveBeenCalled()
  })

  it('calls onAdd when the Try it! button is clicked', () => {
    render(<SuggestionCard currentSuggestion="Quinoa" darkMode={false} onAdd={onAdd} onSkip={onSkip} />)
    // The add button contains '✓', not the words "Try it!" (which are in a sibling span)
    fireEvent.click(screen.getByRole('button', { name: '✓' }))
    expect(onAdd).toHaveBeenCalledWith('exploring')
    expect(onSkip).not.toHaveBeenCalled()
  })

  it('calls onAdd after a right swipe beyond the threshold', () => {
    render(<SuggestionCard currentSuggestion="Quinoa" darkMode={false} onAdd={onAdd} onSkip={onSkip} />)
    const card = screen.getByText('Quinoa').closest('[class*="cursor-grab"]') as HTMLElement

    fireEvent(card, makePointerEvent('pointerdown', 0))
    fireEvent(card, makePointerEvent('pointermove', SWIPE_ADD_THRESHOLD + 10))
    fireEvent(card, makePointerEvent('pointerup', SWIPE_ADD_THRESHOLD + 10))

    expect(onAdd).toHaveBeenCalledWith('exploring')
  })

  it('calls onSkip after a left swipe beyond the threshold', () => {
    render(<SuggestionCard currentSuggestion="Quinoa" darkMode={false} onAdd={onAdd} onSkip={onSkip} />)
    const card = screen.getByText('Quinoa').closest('[class*="cursor-grab"]') as HTMLElement

    fireEvent(card, makePointerEvent('pointerdown', 0))
    fireEvent(card, makePointerEvent('pointermove', -(SWIPE_ADD_THRESHOLD + 10)))
    fireEvent(card, makePointerEvent('pointerup', -(SWIPE_ADD_THRESHOLD + 10)))

    expect(onSkip).toHaveBeenCalledOnce()
  })

  it('does not trigger action for a short drag below detect threshold', () => {
    render(<SuggestionCard currentSuggestion="Quinoa" darkMode={false} onAdd={onAdd} onSkip={onSkip} />)
    const card = screen.getByText('Quinoa').closest('[class*="cursor-grab"]') as HTMLElement

    fireEvent(card, makePointerEvent('pointerdown', 0))
    fireEvent(card, makePointerEvent('pointermove', SWIPE_DETECT_THRESHOLD - 5))
    fireEvent(card, makePointerEvent('pointerup', SWIPE_DETECT_THRESHOLD - 5))

    expect(onAdd).not.toHaveBeenCalled()
    expect(onSkip).not.toHaveBeenCalled()
  })
})

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { AttemptModal } from './AttemptModal'
import { Food } from '@/lib/types'

const mockFood: Food = {
  id: '1',
  name: 'Broccoli',
  category: 'exploring',
  foodType: 'vegetable',
  attempts: 2,
  lastAttempted: '2024-01-10',
  notes: '',
  methodUsed: '',
  attemptHistory: [],
}

describe('AttemptModal', () => {
  it('renders nothing when food is null', () => {
    const { container } = render(<AttemptModal food={null} onClose={vi.fn()} onSubmit={vi.fn()} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders the food name in the heading', () => {
    render(<AttemptModal food={mockFood} onClose={vi.fn()} onSubmit={vi.fn()} />)
    expect(screen.getByText(/Log attempt: Broccoli/i)).toBeInTheDocument()
  })

  it('calls onClose when Cancel is clicked', () => {
    const onClose = vi.fn()
    render(<AttemptModal food={mockFood} onClose={onClose} onSubmit={vi.fn()} />)
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('calls onSubmit with the food id and attempt data when Save is clicked', () => {
    const onSubmit = vi.fn()
    render(<AttemptModal food={mockFood} onClose={vi.fn()} onSubmit={onSubmit} />)

    fireEvent.click(screen.getByRole('button', { name: /liked/i }))
    fireEvent.click(screen.getByRole('button', { name: /save/i }))

    expect(onSubmit).toHaveBeenCalledOnce()
    const [foodId, attempt] = onSubmit.mock.calls[0]
    expect(foodId).toBe('1')
    expect(attempt.liked).toBe(true)
    expect(attempt.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('includes typed notes in the submitted attempt', () => {
    const onSubmit = vi.fn()
    render(<AttemptModal food={mockFood} onClose={vi.fn()} onSubmit={onSubmit} />)

    fireEvent.change(screen.getByRole('textbox', { name: /notes/i }), { target: { value: 'Really enjoyed it!' } })
    fireEvent.click(screen.getByRole('button', { name: /save/i }))

    const [, attempt] = onSubmit.mock.calls[0]
    expect(attempt.notes).toBe('Really enjoyed it!')
  })

  it('shows all three rating buttons', () => {
    render(<AttemptModal food={mockFood} onClose={vi.fn()} onSubmit={vi.fn()} />)
    expect(screen.getByRole('button', { name: /liked/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /not yet/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /not sure/i })).toBeInTheDocument()
  })
})

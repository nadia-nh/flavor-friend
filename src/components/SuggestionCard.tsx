'use client'

import { useRef, useState, useEffect } from 'react'
import { FoodCategory } from '@/lib/types'
import { FOOD_TYPE_CONFIG, SWIPE_ADD_THRESHOLD, SWIPE_DETECT_THRESHOLD } from '@/lib/constants'
import { getSuggestionsForFood, getParentSuggestion } from '@/lib/foods'
import { getRecipeForFood } from '@/lib/recipes'
import { FoodTypeIcon } from '@/lib/foodIcons'

const SPOONACULAR_SLUG_OVERRIDES: Record<string, string> = {
  'oats': 'rolled-oats',
  'sweet potato': 'sweet-potato',
  'bell peppers': 'red-pepper',
  'brussels sprouts': 'brussels-sprouts',
  'green beans': 'green-beans',
  'coconut milk': 'coconut-milk',
  'textured vegetable protein': 'tvp',
  'soy curls': 'edamame',
  'black beans': 'black-beans',
  'kidney beans': 'kidney-beans',
  'chia seeds': 'chia-seeds',
  'butternut squash': 'butternut-squash',
  'nutritional yeast': 'nutritional-yeast',
  'tomatoes': 'tomato',
  'peppers': 'pepper',
  'onions': 'red-onion',
  'corn': 'corn-on-the-cob',
  'tahini': 'sesame-seeds',
  'rice (all)': 'cooked-white-rice',
  'rice (white)': 'cooked-white-rice',
  'rice (brown)': 'brown-rice',
  'beans (all)': 'black-beans',
  'pasta (all)': 'spaghetti',
  'pasta (wheat)': 'spaghetti',
  'pasta (whole wheat)': 'spaghetti',
}

function getIngredientImageUrl(foodName: string): string {
  const key = foodName.toLowerCase()
  const slug = SPOONACULAR_SLUG_OVERRIDES[key] ?? key.replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  return `https://spoonacular.com/cdn/ingredients_500x500/${slug}.jpg`
}

function getFlickrFallbackUrl(foodName: string): string {
  const clean = foodName.replace(/\s*\(.*?\)\s*/g, ' ').trim()
  const lock = Math.abs(clean.split('').reduce((h, c) => (h * 31 + c.charCodeAt(0)) | 0, 0))
  return `https://loremflickr.com/500/500/${encodeURIComponent(clean)},food?lock=${lock}`
}

type ImgFallback = 'spoonacular' | 'fooddata' | 'parentimage' | 'flickr' | 'emoji'

interface SuggestionCardProps {
  currentSuggestion: string | undefined
  darkMode: boolean
  onAdd: (category: FoodCategory) => void
  onSkip: () => void
}

export function SuggestionCard({ currentSuggestion, darkMode, onAdd, onSkip }: SuggestionCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const cardInnerRef = useRef<HTMLDivElement>(null)
  const cardDragRef = useRef<{ startX: number; deltaX: number } | null>(null)
  const [swipeDir, setSwipeDir] = useState<'left' | 'right' | null>(null)
  const [imgFallback, setImgFallback] = useState<ImgFallback>('spoonacular')
  const dm = darkMode

  useEffect(() => {
    setImgFallback('spoonacular')
  }, [currentSuggestion])

  const suggestionData = currentSuggestion ? getSuggestionsForFood(currentSuggestion) : undefined
  const exampleRecipe = currentSuggestion ? getRecipeForFood(currentSuggestion) : undefined

  if (!currentSuggestion) {
    return (
      <div className={`${dm ? 'bg-gray-800 border-green-800' : 'bg-white border-green-200'} rounded-2xl border-2 shadow-lg p-8`}>
        <p className="text-center text-gray-500">No more suggestions right now — check back later!</p>
      </div>
    )
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault()
    cardDragRef.current = { startX: e.clientX, deltaX: 0 }
    cardRef.current?.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    const drag = cardDragRef.current
    if (!drag) return
    const deltaX = e.clientX - drag.startX
    drag.deltaX = deltaX
    if (cardInnerRef.current) {
      cardInnerRef.current.style.transform = `translateX(${deltaX}px) rotate(${deltaX / 20}deg)`
    }
    setSwipeDir(deltaX > SWIPE_DETECT_THRESHOLD ? 'right' : deltaX < -SWIPE_DETECT_THRESHOLD ? 'left' : null)
  }

  const handlePointerUp = () => {
    const drag = cardDragRef.current
    if (!drag) return
    const { deltaX } = drag
    cardDragRef.current = null
    if (cardInnerRef.current) cardInnerRef.current.style.transform = ''
    setSwipeDir(null)
    if (deltaX > SWIPE_ADD_THRESHOLD) onAdd('exploring')
    else if (deltaX < -SWIPE_ADD_THRESHOLD) onSkip()
  }

  const handleImageError = () => {
    if (imgFallback === 'spoonacular') {
      const own = getSuggestionsForFood(currentSuggestion)?.image
      const parent = getParentSuggestion(currentSuggestion)?.image
      if (own) setImgFallback('fooddata')
      else if (parent) setImgFallback('parentimage')
      else setImgFallback('flickr')
    } else if (imgFallback === 'fooddata') {
      const parent = getParentSuggestion(currentSuggestion)?.image
      if (parent) setImgFallback('parentimage')
      else setImgFallback('flickr')
    } else if (imgFallback === 'parentimage') {
      setImgFallback('flickr')
    } else {
      setImgFallback('emoji')
    }
  }

  const imgSrc = imgFallback === 'spoonacular'
    ? getIngredientImageUrl(currentSuggestion)
    : imgFallback === 'fooddata'
    ? getSuggestionsForFood(currentSuggestion)?.image ?? ''
    : imgFallback === 'parentimage'
    ? getParentSuggestion(currentSuggestion)?.image ?? ''
    : getFlickrFallbackUrl(currentSuggestion)

  return (
    <>
      <div
        ref={cardRef}
        role="article"
        aria-label={`${currentSuggestion} suggestion. Use left/right arrow keys or swipe to skip or add.`}
        tabIndex={0}
        className="relative h-72 cursor-grab active:cursor-grabbing select-none touch-none focus:outline-2 focus:outline-green-400 rounded-2xl"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={e => {
          if (e.key === 'ArrowRight') { e.preventDefault(); onAdd('exploring') }
          if (e.key === 'ArrowLeft')  { e.preventDefault(); onSkip() }
        }}
      >
        <div
          ref={cardInnerRef}
          className="absolute inset-0 bg-white rounded-2xl border border-green-200 shadow-lg overflow-hidden flex flex-col"
          style={{ willChange: 'transform' }}
        >
          <div className="relative w-full flex-1 bg-green-100 flex items-center justify-center overflow-hidden">
            {imgFallback !== 'emoji'
              ? <img
                  key={`${currentSuggestion}-${imgFallback}`}
                  src={imgSrc}
                  alt={currentSuggestion}
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
              : <span className="text-7xl">🍽️</span>
            }
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
            {suggestionData && (
              <span className="absolute top-2 left-2 inline-flex items-center gap-1 bg-green-900/90 text-white text-xs font-semibold px-2 py-1 rounded-full leading-none">
                <FoodTypeIcon name={FOOD_TYPE_CONFIG[suggestionData.foodType].iconName} className="w-3.5 h-3.5" />{FOOD_TYPE_CONFIG[suggestionData.foodType].label}
              </span>
            )}
            <span className="absolute bottom-3 left-0 right-0 text-center text-white font-bold text-xl drop-shadow-lg px-4">
              {currentSuggestion}
            </span>
          </div>
        </div>
        {swipeDir === 'right' && (
          <div className="absolute inset-0 bg-green-400/30 rounded-2xl flex items-center justify-center pointer-events-none">
            <span className="text-white font-bold text-2xl drop-shadow-lg">✓ Try it!</span>
          </div>
        )}
        {swipeDir === 'left' && (
          <div className="absolute inset-0 bg-gray-400/30 rounded-2xl flex items-center justify-center pointer-events-none">
            <span className="text-white font-bold text-2xl drop-shadow-lg">→ Skip</span>
          </div>
        )}
      </div>

      {exampleRecipe && (
        <p className="text-xs text-center text-green-600 mt-2">✨ Try: {exampleRecipe.title}</p>
      )}

      <div className="flex items-center justify-around mt-6 px-8">
        <div className="flex flex-col items-center gap-1">
          <button
            onClick={onSkip}
            className="w-14 h-14 rounded-full bg-white border border-stone-300 text-stone-500 text-2xl hover:bg-stone-50 flex items-center justify-center shadow transition-colors"
          >→</button>
          <span className="text-xs text-stone-400">Skip</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <button
            onClick={() => onAdd('exploring')}
            className="w-14 h-14 rounded-full bg-green-900 text-white text-2xl hover:bg-green-800 flex items-center justify-center shadow transition-colors"
          >✓</button>
          <span className="text-xs text-green-800 font-semibold">Try it!</span>
        </div>
      </div>
    </>
  )
}

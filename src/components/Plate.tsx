'use client'

import { useRef, useState, useEffect } from 'react'
import { Food, FoodCategory } from '@/lib/types'
import {
  PLATE_CX, PLATE_CY, PLATE_R, PLATE_INNER_R, PLATE_RIM_WIDTH,
  FOOD_RING_INNER_R, FOOD_RING_OUTER_R, FOOD_CIRCLE_PAD,
  DRAG_CLICK_THRESHOLD, FOOD_TYPE_CONFIG, FOOD_TYPES,
} from '@/lib/constants'
import { getAllSuggestedFoods } from '@/lib/foods'
import { FoodTypeIcon } from '@/lib/foodIcons'

function polarToXY(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function makeSectorPath(cx: number, cy: number, outerR: number, innerR: number, startDeg: number, endDeg: number): string {
  const oS = polarToXY(cx, cy, outerR, startDeg)
  const oE = polarToXY(cx, cy, outerR, endDeg)
  const iS = polarToXY(cx, cy, innerR, startDeg)
  const iE = polarToXY(cx, cy, innerR, endDeg)
  const large = endDeg - startDeg > 180 ? 1 : 0
  return `M ${iS.x} ${iS.y} L ${oS.x} ${oS.y} A ${outerR} ${outerR} 0 ${large} 1 ${oE.x} ${oE.y} L ${iE.x} ${iE.y} A ${innerR} ${innerR} 0 ${large} 0 ${iS.x} ${iS.y} Z`
}

function getFoodCirclePositions(count: number, startDeg: number, endDeg: number, cx: number, cy: number): Array<{x: number; y: number}> {
  if (count === 0) return []
  const innerR = FOOD_RING_INNER_R
  const outerR = FOOD_RING_OUTER_R
  const usableStart = startDeg + FOOD_CIRCLE_PAD
  const usableEnd = endDeg - FOOD_CIRCLE_PAD
  const usableRange = usableEnd - usableStart
  const maxPerRow = 2
  const rows = Math.ceil(count / maxPerRow)
  const rStep = (outerR - innerR) / rows
  const positions: Array<{x: number; y: number}> = []
  let placed = 0
  for (let row = 0; row < rows && placed < count; row++) {
    const r = innerR + rStep * (row + 0.5)
    const inRow = Math.min(maxPerRow, count - placed)
    for (let i = 0; i < inRow; i++) {
      const t = inRow === 1 ? 0.5 : i / (inRow - 1)
      positions.push(polarToXY(cx, cy, r, usableStart + usableRange * t))
      placed++
    }
  }
  return positions
}

interface PlateProps {
  loveFoods: Food[]
  darkMode: boolean
  onAddFood: (name: string, category: FoodCategory) => void
  onMoveFood: (food: Food, cat: FoodCategory) => void
  onDeleteFood: (id: string) => void
  onSelectFood: (food: Food) => void
}

export function Plate({ loveFoods, darkMode, onAddFood, onMoveFood, onDeleteFood, onSelectFood }: PlateProps) {
  const plateRef = useRef<SVGSVGElement>(null)
  const plateDragRef = useRef<{ food: Food; startX: number; startY: number; curX: number; curY: number; outside: boolean } | null>(null)
  const [plateDragGhost, setPlateDragGhost] = useState<{ svgX: number; svgY: number; outside: boolean; foodId: string } | null>(null)
  const [platePopover, setPlatePopover] = useState<{ food: Food; x: number; y: number } | null>(null)
  const [plateInput, setPlateInput] = useState('')
  const [showAutocomplete, setShowAutocomplete] = useState(false)
  const allFoodNames = getAllSuggestedFoods()
  const dm = darkMode

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const drag = plateDragRef.current
      if (!drag || !plateRef.current) return
      drag.curX = e.clientX
      drag.curY = e.clientY
      const rect = plateRef.current.getBoundingClientRect()
      const svgX = (e.clientX - rect.left) / rect.width * 400
      const svgY = (e.clientY - rect.top) / rect.height * 400
      const outside = Math.sqrt((svgX - PLATE_CX) ** 2 + (svgY - PLATE_CY) ** 2) > PLATE_R + PLATE_RIM_WIDTH
      drag.outside = outside
      setPlateDragGhost({ svgX, svgY, outside, foodId: drag.food.id })
    }
    const onUp = () => {
      const drag = plateDragRef.current
      if (!drag) return
      const dist = Math.sqrt((drag.curX - drag.startX) ** 2 + (drag.curY - drag.startY) ** 2)
      if (dist < DRAG_CLICK_THRESHOLD) {
        setPlatePopover({ food: drag.food, x: drag.curX, y: drag.curY })
      } else if (drag.outside) {
        onDeleteFood(drag.food.id)
      }
      plateDragRef.current = null
      setPlateDragGhost(null)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [onDeleteFood])

  const filtered = allFoodNames.filter(n =>
    n.toLowerCase().includes(plateInput.toLowerCase()) &&
    !loveFoods.some(f => f.name.toLowerCase() === n.toLowerCase())
  ).slice(0, 6)

  return (
    <div className="flex-1">
      <svg ref={plateRef} viewBox="-30 -30 460 460" className="w-full max-w-sm mx-auto drop-shadow-xl" style={{ touchAction: 'none' }}
        role="img" aria-label={`Your plate with ${loveFoods.length} food${loveFoods.length !== 1 ? 's' : ''}. Drag a food off the plate to remove it.`}
      >
        <defs>
          <radialGradient id="rimGrad" cx="38%" cy="32%" r="68%">
            <stop offset="0%"   stopColor={dm ? '#6b7280' : '#e9ecef'} />
            <stop offset="65%"  stopColor={dm ? '#374151' : '#ced4da'} />
            <stop offset="100%" stopColor={dm ? '#1f2937' : '#adb5bd'} />
          </radialGradient>
          <radialGradient id="plateGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#ffffff" />
            <stop offset="100%" stopColor={dm ? '#1f2937' : '#fdf8f0'} />
          </radialGradient>
          <filter id="rimNoise" x="-2%" y="-2%" width="104%" height="104%">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" result="noise"/>
            <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise"/>
            <feBlend in="SourceGraphic" in2="grayNoise" mode="multiply" result="blended"/>
            <feComposite in="blended" in2="SourceGraphic" operator="in"/>
          </filter>
        </defs>

        <circle
          cx={PLATE_CX} cy={PLATE_CY} r={PLATE_R + PLATE_RIM_WIDTH}
          fill={plateDragGhost?.outside ? '#fca5a5' : 'url(#rimGrad)'}
          filter={plateDragGhost?.outside ? undefined : 'url(#rimNoise)'}
        />
        {!plateDragGhost?.outside && (() => {
          const hStart = polarToXY(PLATE_CX, PLATE_CY, PLATE_R + 5, 210)
          const hEnd   = polarToXY(PLATE_CX, PLATE_CY, PLATE_R + 5, 310)
          return (
            <path
              d={`M ${hStart.x} ${hStart.y} A ${PLATE_R + 5} ${PLATE_R + 5} 0 0 1 ${hEnd.x} ${hEnd.y}`}
              fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.35"
            />
          )
        })()}
        <circle cx={PLATE_CX} cy={PLATE_CY} r={PLATE_R} fill="url(#plateGrad)" />

        {FOOD_TYPES.map(ft => {
          const cfg = FOOD_TYPE_CONFIG[ft]
          const sectorFoods = loveFoods.filter(f => f.foodType === ft)
          const positions = getFoodCirclePositions(sectorFoods.length, cfg.startDeg, cfg.endDeg, PLATE_CX, PLATE_CY)
          const midAngle = (cfg.startDeg + cfg.endDeg) / 2
          const labelPos = polarToXY(PLATE_CX, PLATE_CY, 242, midAngle)
          return (
            <g key={ft}>
              <path d={makeSectorPath(PLATE_CX, PLATE_CY, PLATE_R, PLATE_INNER_R, cfg.startDeg, cfg.endDeg)} fill={cfg.fill} stroke="white" strokeWidth="2.5" strokeOpacity="0.7" />
              <foreignObject x={labelPos.x - 12} y={labelPos.y - 21} width={24} height={24}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                  <FoodTypeIcon name={cfg.iconName} className="w-5 h-5" style={{ color: cfg.stroke }} />
                </div>
              </foreignObject>
              <text x={labelPos.x} y={labelPos.y + 13} textAnchor="middle" dominantBaseline="central" fontSize="14" fontWeight="700" fill={cfg.stroke} fontFamily="system-ui, sans-serif">
                {cfg.label}
              </text>
              {sectorFoods.map((food, i) => {
                const pos = positions[i]
                if (!pos) return null
                const isDragging = plateDragGhost?.foodId === food.id
                return (
                  <g
                    key={food.id}
                    role="button"
                    tabIndex={0}
                    aria-label={`${food.name} — press Enter for options, drag to remove`}
                    style={{ cursor: isDragging ? 'grabbing' : 'grab', opacity: isDragging ? 0.3 : 1 }}
                    onPointerDown={e => {
                      e.preventDefault()
                      plateDragRef.current = { food, startX: e.clientX, startY: e.clientY, curX: e.clientX, curY: e.clientY, outside: false }
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        const rect = plateRef.current?.getBoundingClientRect()
                        setPlatePopover({ food, x: (rect?.left ?? 0) + (rect?.width ?? 0) / 2, y: (rect?.top ?? 0) + (rect?.height ?? 0) / 2 })
                      }
                    }}
                  >
                    <foreignObject x={pos.x - 12} y={pos.y - 12} width={24} height={24}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                        <FoodTypeIcon name={cfg.iconName} className="w-4 h-4" style={{ color: cfg.stroke }} />
                      </div>
                    </foreignObject>
                    <text x={pos.x} y={pos.y + 16} textAnchor="middle" dominantBaseline="hanging" fontSize="11" fill={cfg.textColor} fontWeight="600" fontFamily="system-ui, sans-serif">
                      {food.name.length <= 12 ? food.name : food.name.slice(0, 11) + '…'}
                    </text>
                    <title>{food.name}</title>
                  </g>
                )
              })}
            </g>
          )
        })}

        <circle cx={PLATE_CX} cy={PLATE_CY} r={PLATE_INNER_R} fill={dm ? '#075985' : '#e0f2fe'} stroke={dm ? '#38bdf8' : '#7dd3fc'} strokeWidth="1.5" />
        <circle cx={PLATE_CX} cy={PLATE_CY} r={7} fill={dm ? '#38bdf8' : '#86efac'} opacity="0.7" />

        {plateDragGhost && (() => {
          const draggedFood = loveFoods.find(f => f.id === plateDragGhost.foodId)
          const ft = draggedFood?.foodType ?? 'other'
          const cfg2 = FOOD_TYPE_CONFIG[ft]
          return (
            <g style={{ pointerEvents: 'none' }} opacity="0.85">
              <foreignObject x={plateDragGhost.svgX - 12} y={plateDragGhost.svgY - 12} width={24} height={24}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                  <FoodTypeIcon name={cfg2.iconName} className="w-5 h-5" style={{ color: cfg2.stroke }} />
                </div>
              </foreignObject>
              {plateDragGhost.outside && (
                <text x={plateDragGhost.svgX} y={plateDragGhost.svgY + 22} textAnchor="middle" fontSize="11" fill="#ef4444" fontWeight="600">Release to remove</text>
              )}
            </g>
          )
        })()}
      </svg>

      <div className="relative mt-5 max-w-sm mx-auto">
        <input
          type="text"
          value={plateInput}
          placeholder="Add food to your plate…"
          aria-label="Add food to your plate"
          role="combobox"
          aria-expanded={showAutocomplete && filtered.length > 0}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          aria-controls="plate-autocomplete"
          className={`w-full px-4 py-2.5 text-sm border rounded-2xl ${dm ? 'bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-500' : 'bg-white border-gray-300 placeholder-gray-400'} focus:outline-none focus:border-green-400`}
          onChange={e => {
            setPlateInput(e.target.value)
            setShowAutocomplete(e.target.value.length > 0)
          }}
          onFocus={() => { if (plateInput.length > 0) setShowAutocomplete(true) }}
          onBlur={() => { setTimeout(() => setShowAutocomplete(false), 200) }}
          onKeyDown={e => {
            if (e.key === 'Enter' && plateInput.trim()) {
              onAddFood(plateInput.trim(), 'love')
              setPlateInput('')
            } else if (e.key === 'Escape') {
              setShowAutocomplete(false)
            }
          }}
        />
        {showAutocomplete && filtered.length > 0 && (
          <ul id="plate-autocomplete" role="listbox" aria-label="Food suggestions" className="absolute z-20 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-36 overflow-y-auto top-full mt-1 list-none p-0 m-0">
            {filtered.map(name => (
              <li key={name} role="option" aria-selected={false}>
                <button
                  className="w-full text-left px-3 py-1.5 text-sm hover:bg-green-50 focus:bg-green-50 focus:outline-none"
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => {
                    onAddFood(name, 'love')
                    setPlateInput('')
                    setShowAutocomplete(false)
                  }}
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {platePopover && (
        <div className="fixed inset-0 z-30" onClick={() => setPlatePopover(null)}
          onKeyDown={e => { if (e.key === 'Escape') setPlatePopover(null) }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Options for ${platePopover.food.name}`}
            className="absolute bg-white rounded-2xl shadow-xl border border-gray-200 p-3 w-44"
            style={{ left: Math.min(platePopover.x, window.innerWidth - 184), top: Math.min(platePopover.y - 8, window.innerHeight - 140) }}
            onClick={e => e.stopPropagation()}
          >
            <p className="text-sm font-semibold text-gray-800 mb-2 truncate">{platePopover.food.name}</p>
            <button
              className="w-full text-left px-3 py-1.5 rounded-xl text-sm hover:bg-green-50 text-green-700 mb-1"
              onClick={() => { onMoveFood(platePopover.food, 'exploring'); setPlatePopover(null) }}
            >
              🌱 Move to Exploring
            </button>
            <button
              className="w-full text-left px-3 py-1.5 rounded-xl text-sm hover:bg-red-50 text-red-600 mb-1"
              onClick={() => { onDeleteFood(platePopover.food.id); setPlatePopover(null) }}
            >
              🗑️ Remove
            </button>
            <button
              className="w-full text-left px-3 py-1.5 rounded-xl text-sm hover:bg-gray-50 text-gray-600"
              onClick={() => { onSelectFood(platePopover.food); setPlatePopover(null) }}
            >
              Details →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

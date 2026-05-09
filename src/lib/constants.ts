import { FoodCategory, FoodType } from './types'

// Plate geometry
export const PLATE_CX = 200
export const PLATE_CY = 200
export const PLATE_R = 183
export const PLATE_INNER_R = 38
export const PLATE_RIM_WIDTH = 9
export const FOOD_RING_INNER_R = 48
export const FOOD_RING_OUTER_R = 158
export const FOOD_CIRCLE_PAD = 20

// Interaction thresholds
export const DRAG_CLICK_THRESHOLD = 8
export const SWIPE_ADD_THRESHOLD = 60
export const SWIPE_DETECT_THRESHOLD = 30

// App config
export const ATTEMPT_GOAL = 7
export const STORAGE_KEY = 'flavorfriend-foods'
export const DISMISSED_KEY = 'flavorfriend-dismissed'

export const FOOD_TYPES: FoodType[] = ['vegetable', 'grain', 'legume', 'other']
export const CATEGORIES: FoodCategory[] = ['love', 'exploring', 'curious', 'notYet']

export const FOOD_TYPE_CONFIG: Record<FoodType, {
  label: string; iconName: string; fill: string; stroke: string; textColor: string; startDeg: number; endDeg: number
}> = {
  vegetable: { label: 'Vegetables', iconName: 'Leaf',  fill: '#bbf7d0', stroke: '#16a34a', textColor: '#14532d', startDeg: 180, endDeg: 270 },
  grain:     { label: 'Grains',     iconName: 'Wheat', fill: '#fef3c7', stroke: '#d97706', textColor: '#78350f', startDeg: 270, endDeg: 360 },
  legume:    { label: 'Legumes',    iconName: 'Bean',  fill: '#fed7aa', stroke: '#c2410c', textColor: '#7c2d12', startDeg: 0,   endDeg: 90  },
  other:     { label: 'Other',      iconName: 'Nut',   fill: '#d1fae5', stroke: '#059669', textColor: '#064e3b', startDeg: 90,  endDeg: 180 },
}

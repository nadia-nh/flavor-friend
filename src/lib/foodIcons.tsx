import React from 'react'
import { Leaf, Wheat, Bean, Nut, type LucideIcon } from 'lucide-react'

export const FOOD_TYPE_ICONS: Record<string, LucideIcon> = {
  Leaf,
  Wheat,
  Bean,
  Nut,
}

export function FoodTypeIcon({ name, className, style }: { name: string; className?: string; style?: React.CSSProperties }) {
  const Icon = FOOD_TYPE_ICONS[name] ?? Leaf
  return <Icon className={className} style={style} />
}

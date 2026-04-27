# PlantPal - Developer Guide

## Project Overview
A Next.js web app for anyone looking to expand the number of plants they eat. Get plant-based cooking suggestions, track your progress, and discover new vegetables, grains, and fruits.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Storage**: Browser localStorage (no backend)

## File Structure

```
PlantPal/
├── src/
│   ├── app/
│   │   ├── globals.css       # Global Tailwind styles
│   │   ├── layout.tsx        # Root layout with metadata
│   │   └── page.tsx          # Main app component
│   └── lib/
│       ├── types.ts          # TypeScript interfaces
│       └── foods.ts         # Food suggestions database
├── package.json              # Dependencies & scripts
├── tsconfig.json             # TypeScript config
├── tailwind.config.js        # Tailwind config
├── next.config.js            # Next.js config
├── postcss.config.js         # PostCSS config
├── PLAN.md                   # Project plan
└── index.html                # Standalone HTML version (no build needed)
```

## Key Files

### `src/app/page.tsx`
Main React component containing:
- Food state management (add, delete, move between categories)
- Attempt logging modal
- Progress dashboard
- Cooking suggestions panel
- Food detail view with attempt history

### `src/lib/types.ts`
TypeScript interfaces:
- `FoodCategory` - 'love' | 'exploring' | 'curious' | 'notYet'
- `Food` - Main food item with attempts, history, notes
- `Attempt` - Individual attempt record
- `CookingMethod` - Cooking suggestion with difficulty
- `FoodSuggestion` - Full suggestion for a food

### `src/lib/foods.ts`
Data:
- `foodSuggestions` - Array of 10 foods with cooking methods
- `getSuggestionsForFood()` - Lookup by food name
- `getSimilarFoods()` - Get suggested foods based on safe foods

## Data Storage
- Key: `flavorfriend-foods` in localStorage
- Structure: JSON array of Food objects

## Commands
```bash
npm install      # Install dependencies
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint    # Run ESLint
```

## Categories
| Emoji | Category | Description |
|-------|----------|-------------|
| 🟢 | Love | Plants you already enjoy |
| 🌱 | Exploring | Plants you're actively trying |
| 🌿 | Curious | Plants you'd like to try |
| 🚫 | Not Yet | Plants you'd rather avoid |

## Features
1. **Food Management** - Add, edit, delete, categorize foods
2. **Attempt Tracking** - Log each try with method, rating, notes
3. **7-Try Milestone** - Encouragement at each attempt, special message at 7
4. **Progress Dashboard** - Visual progress bars, status categories
5. **Cooking Suggestions** - 4 methods per food with difficulty, tips, easy meals
6. **Smart Suggestions** - Recommend foods similar to your safe foods

## Adding New Foods to Suggestions
Edit `src/lib/foods.ts` - add to `foodSuggestions` array:
```typescript
{
  name: 'NewFood',
  similarTo: 'SimilarFood',
  cookingMethods: [
    { name: 'Method', description: '...', tips: [], difficulty: 'easy' }
  ],
  easyMeals: ['Meal 1', 'Meal 2']
}
```
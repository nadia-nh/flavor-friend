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
│       ├── foods.ts          # Food suggestions database (25+ foods)
│       └── recipes.ts        # Recipe database (100+ recipes)
├── public/
│   └── placeholder-vegetable.svg  # Fallback image
├── package.json              # Dependencies & scripts
├── tsconfig.json             # TypeScript config
├── tailwind.config.js        # Tailwind config
├── next.config.js            # Next.js config
├── postcss.config.js         # PostCSS config
├── PLAN.md                   # Project plan
└── README.md                 # User documentation
```

## Key Files

### `src/app/page.tsx`
Main React component containing:
- Food state management (add, delete, move between categories)
- Attempt logging modal
- Progress dashboard
- Cooking suggestions panel with images
- Recipe Browser with dynamic category filters
- Food detail view with attempt history
- Fallback suggestion system

### `src/lib/types.ts`
TypeScript interfaces:
- `FoodCategory` - 'love' | 'exploring' | 'curious' | 'notYet'
- `Food` - Main food item with attempts, history, notes
- `Attempt` - Individual attempt record
- `CookingMethod` - Cooking suggestion with difficulty
- `FoodSuggestion` - Full suggestion for a food (with image, similarTo as array)
- `RecipeCategory` - 15+ recipe categories
- `Recipe` - Recipe entry with image, source, prep time

### `src/lib/foods.ts`
Data:
- `foodSuggestions` - Array of 25+ foods with images and multiple similar foods
- `getSuggestionsForFood()` - Lookup by food name
- `getSimilarFoods()` - Get suggested foods based on safe foods (matches any similarTo)
- `getSimilarFoodsFallback()` - Fallback: popular → versatile → random
- `getAllSuggestedFoods()` - Get all food names

### `src/lib/recipes.ts`
Data:
- `recipes` - Array of 100+ recipes from 10 vegan sites
- `getRecipeForFood()` - Find recipe mentioning a specific food
- Dynamic category generation for filters

## Data Storage
- Key: `flavorfriend-foods` in localStorage
- Structure: JSON array of Food objects
- Empty array check: Falls back to default foods

## Commands
```bash
npm install      # Install dependencies
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
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
6. **Smart Suggestions** - Multi-similar-to matching, fallback system
7. **Recipe Browser** - 100+ recipes with dynamic category filters
8. **Food/Recipe Images** - Visual suggestions with example recipes
9. **Dark Mode** - Toggle between light and dark themes

## Adding New Foods to Suggestions
Edit `src/lib/foods.ts` - add to `foodSuggestions` array:
```typescript
{
  name: 'NewFood',
  similarTo: ['SimilarFood1', 'SimilarFood2', 'SimilarFood3'], // Array format
  cookingMethods: [
    { name: 'Method', description: '...', tips: [], difficulty: 'easy' }
  ],
  easyMeals: ['Meal 1', 'Meal 2'],
  image: 'https://...' // Optional: Wikimedia Commons URL
}
```

## Recipe Browser
- Recipes from: The Plant Based School, From My Bowl, Forks Over Knives, Rainbow Plant Life, Plant-Based on a Budget, Sweet Potato Soul, Plant Based RD, It Doesn't Taste Like Chicken, That Vegan Babe, Veganuary
- Dynamic category filters (only shows categories with recipes)
- Small cards: image (h-32), title (text-sm), source, prep time badge
- Fallback to placeholder image on error

## Suggestion System
1. **Primary**: Foods similar to your "Love" items (matches any similarTo)
2. **Fallback**: Popular ingredients → Most versatile (4+ methods) → Random
3. **Display**: Food image + Example recipe image for each suggestion

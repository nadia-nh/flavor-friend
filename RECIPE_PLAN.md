# Recipe Database Expansion Plan

## Overview
Expand PlantPal with a recipe database featuring 80-120 recipes from 14 popular vegan recipe websites. Users can browse recipes by category in a collapsible section with small cards showing image + title.

## Data Model

### New Types (`src/lib/types.ts`)
```typescript
type RecipeCategory = 
  | 'breakfast'
  | 'lunch' 
  | 'dinner'
  | 'dessert'
  | 'snack'
  | 'appetizer'
  | 'side'
  | 'soup'
  | 'salad'
  | 'quick'     // 30 mins or less
  | 'one-pot'
  | 'pasta'
  | 'baking'
  | 'drink'
  | 'sauce';

interface Recipe {
  title: string;
  description: string;    // 1-2 sentence description
  image: string;           // image URL from the site
  link: string;             // link to original recipe
  category: RecipeCategory;
  source: string;           // e.g., "The Plant Based School"
  prepTime?: string;        // e.g., "20 mins"
  difficulty?: 'easy' | 'medium' | 'hard';
}
```

## Recipe Sources (80-120 total)

| Source | Recipes | Notes |
|--------|---------|-------|
| The Plant Based School | 8-10 | Breakfast, soups, pasta, tofu, desserts |
| From My Bowl | 8-10 | Breakfast, soups, curries, snacks |
| Forks Over Knives | 8-10 | Mains, soups, salads, desserts |
| Rainbow Plant Life | 8-10 | Mains, breakfast, sauces, salads |
| Plant-Based on a Budget | 8-10 | Breakfast, dinners, lunches, desserts |
| PlantYou | 8-10 | Mains, breakfast, snacks, quickies |
| Plant Based News | 6-8 | Dinner, desserts, snacks |
| The Veg Space | 6-8 | Mains, baking, soups, sides |
| Sweet Potato Soul | 8-10 | Dinners, sides, salads, soups |
| My Plant-Based Family | 6-8 | Breakfast, mains, sides, salads |
| Plant Based RD | 6-8 | Breakfast, mains, salads, sweets |
| It Doesn't Taste Like Chicken | 6-8 | Breakfast, lunch/dinner, nibbles |
| That Vegan Babe | 6-8 | Breakfast, mains, desserts, snacks |

**Skip**: Love & Lemons (has non-vegan recipes)

## Category Distribution

- **Breakfast** (12-15): pancakes, muffins, oatmeal, chia pudding, tofu scramble
- **Lunch** (10-12): salads, wraps, sandwiches, bowls
- **Dinner/Mains** (15-20): pasta, curries, stir-fries, casseroles, tacos, burgers
- **Dessert** (12-15): cakes, cookies, muffins, pies, frozen treats, sweets
- **Snacks/Appetizers** (8-10): dips, hummus, bruschetta, energy balls
- **Sides** (8-10): roasted veggies, salads, mashed potatoes
- **Soups & Stews** (8-10): lentil, bean, vegetable soups
- **Quick/30-Minute** (10-12): fast meals, 30 min or less
- **One-Pot/One-Pan** (8-10): sheet pan, one-pot wonders
- **Drinks** (6-8): smoothies, lemonade, hot chocolate
- **Sauces & Condiments** (4-6): dressings, dips, sauces
- **Pasta** (6-8): various pasta dishes

## UI Implementation

### Recipe Browser Section (`src/app/page.tsx`)

**Location**: Collapsible section below the Kanban board

**Features**:
- Category filter buttons at top (Breakfast, Lunch, Dinner, Dessert, etc.)
- Grid of small recipe cards:
  - Image (thumbnail, 150x150 or similar)
  - Title only (no description visible on card)
  - Source website name
  - "View Recipe" link button
- Category grouping: "Similar recipes together" - group by category to avoid overwhelming
- Placeholder image: Use vegetable/plant/vegan logo image for recipes without images
- **Dark mode**: Respect existing dark mode, ensure cards look good in both modes

**Card Design (Small)**:
```tsx
<div className="bg-white dark:bg-gray-800 rounded-lg shadow p-2">
  <img src={recipe.image || '/placeholder-vegetable.png'} alt={recipe.title} />
  <h3 className="text-sm font-medium">{recipe.title}</h3>
  <p className="text-xs text-gray-500">{recipe.source}</p>
  <a href={recipe.link} target="_blank">View Recipe</a>
</div>
```

## Implementation Steps

1. **Update types** - Add RecipeCategory and Recipe types to `src/lib/types.ts`
2. **Create recipe database** - Add recipes to `src/lib/recipes.ts` (commit after each ~20 recipes)
3. **Add UI** - Create collapsible Recipe Browser section in `src/app/page.tsx`
4. **Style & Dark Mode** - Ensure proper styling and dark mode support (separate commit)
5. **Placeholder Image** - Add default vegetable/plant placeholder image

## Integration with Food System (Future)

**Option A**: Replace `cookingMethods`/`easyMeals` with recipe links
- When viewing food (e.g., Tofu), show 3-4 recipe cards from database

**Option B**: Keep both systems separate
- `cookingMethods`/`easyMeals` remain as-is
- Recipe Browser is independent browse-all system

**Option C**: Add "Recommended Recipes" to food detail
- Keep existing + add section showing matching recipes from database

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/lib/types.ts` | Modify | Add RecipeCategory and Recipe types |
| `src/lib/recipes.ts` | Create | New file with 80-120 recipes |
| `src/app/page.tsx` | Modify | Add collapsible Recipe Browser section |
| `public/placeholder-vegetable.png` | Create | Placeholder image for recipes |

## Commit Strategy
- Commit 1: Add types to types.ts
- Commit 2: Add first 20 recipes
- Commit 3: Add next 20 recipes (repeat until 80-120)
- Commit 4: Add Recipe Browser UI (collapsible)
- Commit 5: Style & dark mode support
- Commit 6: Add placeholder image

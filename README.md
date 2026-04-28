# PlantPal

A Next.js web app for anyone looking to expand the number of plants they eat. Get plant-based cooking suggestions, track your progress, and discover new vegetables, grains, and fruits.

## Features

- **Kanban Board** - Organize foods by category (Love, Exploring, Curious, Not Yet)
- **Drag & Drop** - Move foods between categories
- **Attempt Tracking** - Log each try with method, rating, and notes
- **Progress Rings** - Visual progress for each food (up to 7 attempts)
- **Plant-Based Cooking Suggestions** - 4 methods per food with difficulty, tips, and easy meals
- **Smart Recommendations** - Plants similar to your favorite foods (multi-match)
- **Recipe Browser** - 100+ recipes from top vegan sites with dynamic filters
- **Food Images** - See what you're trying with example recipes
- **Food Journey** - Track your progress over time
- **Dark Mode** - Toggle between light and dark themes

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Categories

| Emoji | Category | Description |
|-------|----------|-------------|
| 🟢 | Love | Plants you already enjoy |
| 🌱 | Exploring | Plants you're actively trying |
| 🌿 | Curious | Plants you'd like to try |
| 🚫 | Not Yet | Plants you'd rather avoid |

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- localStorage for data persistence

## Recipe Sources

- The Plant Based School
- From My Bowl
- Forks Over Knives
- Rainbow Plant Life (Planted)
- Plant-Based on a Budget
- Sweet Potato Soul
- Plant Based RD
- It Doesn't Taste Like Chicken
- That Vegan Babe
- Veganuary

## Smart Suggestions

The app suggests new foods based on what you already love. If no direct matches are available, it falls back to:
1. Popular ingredients (tofu, chickpeas, lentils, etc.)
2. Most versatile foods (4+ cooking methods)
3. Random selection from the database

Each suggestion shows the food image and an example recipe using that ingredient.

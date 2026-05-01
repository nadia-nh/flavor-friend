# PlantPal

A Next.js web app for anyone looking to expand the number of plants they eat. Track the foods you love, explore new ones at your own pace, and get smart suggestions based on what you already enjoy.

## Features

- **Plate visualization** — A circular plate divided into food group sectors (Vegetables, Grains, Legumes, Other). Foods you love live here as emoji icons you can drag out to remove or click for options
- **Trying Now sidebar** — Track foods you're actively experimenting with, log each attempt with method and notes, and watch a progress ring fill toward 7 tries
- **Smart suggestions** — Swipeable full-bleed photo cards that recommend new foods based on what's already on your plate. Swipe right (or tap Try it!) to add, swipe left (or tap Skip) to see the next one
- **Attempt tracking** — Log each try with cooking method, rating, and notes
- **Recipe browser** — 100+ recipes from top plant-based sites with category filters
- **Dark mode** — Toggle between light and dark themes

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

### Your Plate

Foods you love are displayed inside a plate divided into four colored sectors by food type. Each food shows its category emoji and name. You can:
- **Drag a food outside the rim** to remove it
- **Click a food** to get options: move to Exploring, remove, or view details

### Trying Now

Foods you're working up to live in the sidebar. Tap **+** to log an attempt — pick a cooking method, rate it, and add notes. A progress ring tracks how many times you've tried each food (goal: 7).

### Suggestions

The suggestion card shows a food recommended based on what you already love, with a Wikipedia photo, food group badge, and a recipe hint. Two actions:
- **Try it!** — adds the food to your plate goals (curious category)
- **Skip** — cycles to the next suggestion; the food stays in the pool and will come back around

## Categories

| Category | Description |
|----------|-------------|
| Love | Foods you already enjoy — shown on your plate |
| Exploring | Foods you're actively trying |
| Curious | Foods you'd like to try (added via suggestions) |

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- localStorage for data persistence

## Smart Suggestions

Foods are suggested based on similarity to what's already on your plate. If no direct matches exist, the app falls back to:
1. Popular ingredients (tofu, chickpeas, lentils, etc.)
2. Most versatile foods (4+ cooking methods)
3. A random selection from the database

Food images are fetched live from the Wikipedia REST API.

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

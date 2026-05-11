# PlantPal

A Next.js web app for anyone looking to expand the number of plants they eat. Track the foods you love, explore new ones at your own pace, and get smart suggestions based on what you already enjoy.

## Features

- **Plate visualization** — A circular plate divided into food group sectors (Vegetables, Grains, Legumes, Other). Foods you love live here as emoji icons you can drag out to remove or click for details
- **Trying Now sidebar** — Track foods you're actively experimenting with, log each attempt with method and notes, and watch a progress ring fill toward 7 tries
- **Smart suggestions** — Swipeable full-bleed photo cards that recommend new foods based on what's already on your plate. Swipe right (or press →) to add, swipe left (or press ←) to skip
- **Dietary filters** — Filter suggestions by gluten-free, nut-free, soy-free, oil-free, and raw-friendly tags
- **Food search** — Instantly search across all your tracked foods from the header
- **Attempt tracking** — Log each try with cooking method, rating, and notes
- **Recipe browser** — 100+ recipes from top plant-based sites with category filters
- **Progress stats** — View total foods on your plate, total attempts, most-tried food, favourite cooking methods, and per-food progress rings
- **Export / Import** — Back up your full food list to JSON and restore it on any device
- **Dark mode** — Toggle between light and dark themes
- **Accessible** — Full keyboard navigation, ARIA roles and labels, visible focus rings, and screen reader support throughout

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

```bash
npm test        # run the test suite
npm run lint    # lint the codebase
```

## How It Works

### Your Plate

Foods you love are displayed inside a plate divided into four colored sectors by food type. Each food shows its category emoji and name. You can:
- **Drag a food outside the rim** to remove it
- **Click a food** (or press Enter/Space when focused) to view details, move to Exploring, or remove

### Trying Now

Foods you're working up to live in the sidebar. Tap **+** to log an attempt — pick a cooking method, rate it, and add notes. A progress ring tracks how many times you've tried each food (goal: 7).

### Discover

The suggestion card shows a food recommended based on what you already love, with a Wikipedia photo, food group badge, and a recipe hint:
- **Try it!** (or press →) — adds the food to Exploring
- **Skip** (or press ←) — cycles to the next suggestion

Filter suggestions by dietary tag using the chips above the card. Tags are derived automatically from the food's name and type — no manual tagging required.

### Search

Type in the search bar at the top to filter across all your tracked foods. Click a result to open its detail view.

### Stats

Tap 📊 in the header to see:
- Total foods on your plate and total attempts logged
- Your most-tried food
- Top 3 cooking methods with a proportional bar chart
- Per-food progress rings for everything currently in Exploring

### Export / Import

Use the **↓ Export** button to download a `flavorfriend-backup-{date}.json` file. Use **↑ Import** to restore from that file on any device.

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
- Vitest + React Testing Library (45 tests)

## Project Structure

```
src/
  app/          # Next.js app router (page.tsx orchestrates state and tabs)
  components/   # Plate, TryingNow, SuggestionCard, RecipeBrowser,
                # AttemptModal, FoodDetailModal, StatsModal
  hooks/        # useFoodsStorage, useDismissedSuggestions
  lib/          # types.ts, constants.ts, foods.ts, recipes.ts
  test/         # Vitest setup and utilities
```

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

# FlavorFriend

A Next.js web app for adult picky eaters to expand their palate through gentle encouragement, cooking suggestions, and progress tracking.

## Features

- **Kanban Board** - Organize foods by category (Safe, Trying, Want to Try, Never)
- **Drag & Drop** - Move foods between categories
- **Attempt Tracking** - Log each try with method, rating, and notes
- **Progress Rings** - Visual progress for each food (up to 7 attempts)
- **Cooking Suggestions** - 4 methods per food with difficulty, tips, and easy meals
- **Smart Recommendations** - Foods similar to your safe foods
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
| 🟢 | Safe | Foods you already like |
| 🟡 | Trying | Foods you're actively exploring |
| 🟠 | Want to Try | Foods you'd like to attempt |
| 🔴 | Never | Foods you'd rather avoid |

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- localStorage for data persistence
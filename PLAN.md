# PlantPal - Plan

## Overview
A responsive web app for anyone looking to expand the number of plants they eat through plant-based cooking suggestions and progress tracking.

## Tech Stack
- **Frontend**: Next.js (React)
- **Styling**: Tailwind CSS
- **Storage**: Browser localStorage (no backend)
- **Deployment**: Vercel (free tier)

## Data Structure

### Food Categories
- 🟢 **Safe** - Foods already liked
- 🟡 **Learning** - Trying with encouragement
- 🔴 **Scary** - Want to try eventually
- ⚪ **New** - Suggested additions

### Food Entry Schema
```json
{
  "id": "string",
  "name": "string",
  "category": "safe" | "learning" | "scary" | "new",
  "attempts": "number",
  "lastAttempted": "date",
  "cookingMethods": ["string"],
  "notes": "string"
}
```

## Core Features

### 1. Food Selection Interface
- Searchable/pategorized food list
- Add custom foods
- Drag/drop to categorize

### 2. Learning Tracker
- Log each attempt with date + method
- Minimum 7 attempts prompts before moving to "safe"
- Gentle encouragement messages (non-judgmental)

### 3. Smart Suggestions
- "Similar to foods you like" algorithm
- Progressive difficulty suggestions
- Easy meal ideas per food

### 4. Cooking Guides
- 3-4 prep methods per food (roast small, steam, blend, etc.)
- Step-by-step beginner instructions
- Non-judgmental tips ("it's okay if it takes a few tries")

## Phase Breakdown

### Phase 1: Core UI ✅
- Food list with categories
- Add/remove/edit foods
- Local storage persistence

### Phase 2: Learning System ✅
- Attempt logging with modal
- 7x reminder logic
- Encouragement messages

### Phase 3: Suggestions ✅
- Similar food algorithm
- Cooking method database
- Easy meal recommendations

### Phase 4: Progress Tracking ✅
- Progress dashboard showing foods by status
- Visual progress bars for in-progress foods
- Attempt history per food
- Track method, liked/not, notes per attempt

### Phase 5: Polish
- Responsive design
- Onboarding flow
- Testing

### Phase 6: Modern UI Updates
- [x] Rounded corners increased to 12-16px
- [x] Subtle shadows instead of borders
- [x] Gradient headers
- [x] Glassmorphism on modals
- [x] Hover animations on food cards (scale up)
- [x] Smooth drag transitions
- [x] Toast notifications
- [x] Sticky headers when scrolling
- [x] Progress rings instead of text counters
- [x] Softer pastel colors
- [x] Dark mode support

### Future: Food Journey Updates
- [x] Change "Ready for Safe" to show count of foods moved to Safe
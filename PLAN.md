# PlantPal - Plan

## Overview
A Next.js web app for anyone looking to expand the number of plants they eat through plant-based cooking suggestions and progress tracking.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Storage**: Browser localStorage (no backend)

## Data Structure

### Food Categories
- 🟢 **Love** - Plants you already enjoy
- 🌱 **Exploring** - Plants you're actively trying
- 🌿 **Curious** - Plants you'd like to try
- 🚫 **Not Yet** - Plants you'd rather avoid

### Recipe Categories
- **Breakfast, Lunch, Dinner** - Main meals
- **Snack, Appetizer, Side** - Smaller dishes
- **Soup, Salad** - Light options
- **Dessert, Pasta** - Specific types
- **Quick, One-Pot** - Time-savers (if available)

### Food Entry Schema
```json
{
  "id": "string",
  "name": "string",
  "category": "love" | "exploring" | "curious" | "notYet",
  "attempts": "number",
  "lastAttempted": "date",
  "cookingMethods": [...],
  "notes": "string"
}
```

### Recipe Entry Schema
```json
{
  "title": "string",
  "description": "string",
  "image": "url",
  "link": "url",
  "category": "breakfast" | "lunch" | "dinner" | "dessert" | "snack" | "appetizer" | "side" | "soup" | "salad" | "pasta",
  "source": "string",
  "prepTime": "string",
  "difficulty": "easy" | "medium" | "hard"
}
```

## Core Features

### 1. Food Management
- Kanban board with 4 categories
- Add custom foods (with autocomplete from suggestions)
- Drag/drop to categorize
- Delete foods

### 2. Learning Tracker
- Log each attempt with date + method + rating
- Minimum 7 attempts prompts before considering "Love"
- Gentle encouragement messages (non-judgmental)

### 3. Recipe Browser
- Collapsible section with 100+ recipes from popular vegan sites
- Category filter (dynamically generated from available recipes)
- Small cards with image, title, source, prep time
- Direct links to full recipes

### 4. Smart Suggestions
- "Similar to foods you like" algorithm with multiple similar foods per entry
- Fallback system: Popular ingredients → Most versatile → Random
- Food images displayed with suggestion
- Example recipe shown for each suggestion

### 5. Cooking Guides
- 4 prep methods per food with difficulty and tips
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

### Phase 3: Suggestions & Recipe Browser ✅
- Similar food algorithm (multi-similar-to support)
- Cooking method database (25+ foods with images)
- Easy meal recommendations
- Recipe browser with 100+ recipes from 10 sources
- Dynamic category filters

### Phase 4: Progress Tracking ✅
- Progress dashboard showing foods by status
- Visual progress bars for in-progress foods
- Attempt history per food
- Track method, liked/not, notes per attempt

### Phase 5: Polish ✅
- Responsive design
- Dark mode support
- Rounded corners, subtle shadows, gradient headers
- Hover animations, smooth transitions
- Toast notifications

### Phase 6: Advanced Features ✅
- Multi-similar-to support for better suggestions
- Fallback suggestion system
- Food and recipe images in suggestions
- Default foods fix (empty array handling)
- Fixed broken recipe images

## Recipe Sources
1. The Plant Based School (10 recipes)
2. From My Bowl (10 recipes)
3. Forks Over Knives (10 recipes)
4. Rainbow Plant Life (10 recipes)
5. Plant-Based on a Budget (10 recipes)
6. Sweet Potato Soul (10 recipes)
7. Plant Based RD (10 recipes)
8. It Doesn't Taste Like Chicken (10 recipes)
9. That Vegan Babe (10 recipes)
10. Veganuary (10 recipes)

## Food Database
25+ plant foods with:
- Multiple similar foods (array format)
- 4 cooking methods each
- Food images (Wikimedia Commons)
- Easy meal suggestions

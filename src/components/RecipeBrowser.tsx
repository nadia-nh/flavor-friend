'use client'

import { recipes } from '@/lib/recipes'

interface RecipeBrowserProps {
  darkMode: boolean
  recipeFilter: string
  onFilterChange: (cat: string) => void
}

export function RecipeBrowser({ darkMode, recipeFilter, onFilterChange }: RecipeBrowserProps) {
  const dm = darkMode
  const recipeCategories = ['all', ...Array.from(new Set(recipes.map(r => r.category)))]

  return (
    <section className="max-w-6xl mx-auto px-4 pb-8">
      <h2 className={`text-2xl font-bold mb-4 ${dm ? 'text-gray-200' : 'text-gray-800'}`}>📖 Recipes ({recipes.length})</h2>
      <div className="flex flex-wrap gap-2 mb-6">
        {recipeCategories.map(cat => (
          <button key={cat} onClick={() => onFilterChange(cat)}
            className={`px-3 py-1 rounded-full text-sm ${recipeFilter === cat ? 'bg-green-800 text-white' : dm ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {recipes.filter(r => recipeFilter === 'all' || r.category === recipeFilter).map((recipe, idx) => (
          <div key={idx} className={`${dm ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg shadow p-2 hover:shadow-md transition-shadow`}>
            <img
              src={recipe.image || '/placeholder-vegetable.svg'}
              alt={recipe.title}
              className="w-full h-32 object-cover rounded-md mb-2"
              onError={e => { (e.target as HTMLImageElement).src = '/placeholder-vegetable.svg' }}
            />
            <h3 className={`text-sm font-medium mb-1 line-clamp-2 ${dm ? 'text-gray-200' : 'text-gray-800'}`}>{recipe.title}</h3>
            <p className={`text-xs mb-2 ${dm ? 'text-gray-400' : 'text-gray-500'}`}>{recipe.source}</p>
            {recipe.prepTime && (
              <span className={`inline-block text-xs px-2 py-0.5 rounded-full mb-2 ${dm ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700'}`}>
                ⏱ {recipe.prepTime}
              </span>
            )}
            <a href={recipe.link} target="_blank" rel="noopener noreferrer" className="block text-center text-sm bg-green-800 text-white py-1.5 rounded-lg hover:bg-green-900 transition-colors">
              View Recipe
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}

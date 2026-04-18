import { FoodSuggestion } from './types'

export const foodSuggestions: FoodSuggestion[] = [
  {
    name: 'Broccoli',
    similarTo: 'Green beans',
    cookingMethods: [
      {
        name: 'Roast with olive oil',
        description: 'Toss with oil and roast at 425°F for 15-20 minutes until crispy.',
        tips: ['Cut into small florets for faster cooking', 'Add a little lemon juice after roasting'],
        difficulty: 'easy'
      },
      {
        name: 'Steam until bright green',
        description: 'Steam for 4-5 minutes until bright green but still slightly crisp.',
        tips: ['Don\'t overcook - it should still have some crunch', 'Add a tiny bit of butter after'],
        difficulty: 'easy'
      },
      {
        name: 'Blend into sauces or soups',
        description: 'Steam well, then blend into creamy sauces or soups.',
        tips: ['Mix with cheese sauce for extra flavor', 'Adds nutrition without strong flavor'],
        difficulty: 'easy'
      },
      {
        name: 'Raw with dip',
        description: 'Cut into bite-sized pieces and serve with your favorite dip.',
        tips: ['Small pieces are less intimidating', 'Ranch dressing is a classic choice'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Broccoli cheese soup', 'Pasta with broccoli', 'Roasted broccoli side']
  },
  {
    name: 'Spinach',
    similarTo: 'Lettuce',
    cookingMethods: [
      {
        name: 'Add to smoothies',
        description: 'Blend a handful into fruit smoothies - you can\'t taste it!',
        tips: ['Freeze the spinach first', 'Use strong fruit flavors to mask any green taste'],
        difficulty: 'easy'
      },
      {
        name: 'Mix into pasta',
        description: 'Toss with warm pasta in the last minute of cooking.',
        tips: ['The heat wilts it down significantly', 'Use with creamy sauces'],
        difficulty: 'easy'
      },
      {
        name: 'Raw in salads',
        description: 'Use young, tender spinach leaves in salads.',
        tips: ['Baby spinach is more tender', 'Mix with milder lettuces'],
        difficulty: 'easy'
      },
      {
        name: 'Scrambled eggs',
        description: 'Stir a handful into scrambled eggs while cooking.',
        tips: ['Adds nutrition invisibly', 'Pairs well with cheese'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Spinach smoothies', 'Pasta with spinach', 'Eggs Florentine']
  },
  {
    name: 'Salmon',
    similarTo: 'Chicken',
    cookingMethods: [
      {
        name: 'Bake with honey glaze',
        description: 'Bake at 400°F for 12-15 minutes with honey or maple glaze.',
        tips: ['Sweet glazes make it more approachable', 'Ensure it\'s fully cooked through'],
        difficulty: 'medium'
      },
      {
        name: 'Pan-sear simple',
        description: 'Cook in a hot pan with oil for 4 minutes per side.',
        tips: ['Don\'t move it around - let it form a crust', 'Fresh rosemary or dill helps the flavor'],
        difficulty: 'medium'
      },
      {
        name: 'Canned/fish cakes',
        description: 'Use canned salmon mixed with breadcrumbs and Shape into patties.',
        tips: ['Much milder than fresh', 'Add lots of seasoning'],
        difficulty: 'easy'
      },
      {
        name: 'Pasta creamy sauce',
        description: 'Flake into creamy pasta sauces.',
        tips: ['The creamy sauce masks any fishy taste', 'Add lemon for brightness'],
        difficulty: 'medium'
      }
    ],
    easyMeals: ['Honey salmon', 'Salmon pasta', 'Salmon cakes']
  },
  {
    name: 'Mushrooms',
    similarTo: 'Meat',
    cookingMethods: [
      {
        name: 'Grilled or roasted',
        description: 'Toss with oil and grill/froast until golden.',
        tips: ['Large portobello caps are meaty', 'Season well'],
        difficulty: 'easy'
      },
      {
        name: 'Sautéed with garlic',
        description: 'Cook in butter with garlic until golden.',
        tips: ['Cook off most of the moisture', 'Add fresh thyme'],
        difficulty: 'easy'
      },
      {
        name: 'Blend into meat',
        description: 'Finely chop and mix into ground beef or turkey.',
        tips: ['Can reduce meat cost too', 'Adds texture and nutrition'],
        difficulty: 'easy'
      },
      {
        name: 'Soup or gravy',
        description: 'Cook into soups or gravies - very subtle when blended.',
        tips: ['Blend smooth for hidden nutrition', 'Pairs well with cream'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Stuffed mushrooms', 'Mushroom soup', 'Beef with mushrooms']
  },
  {
    name: 'Brussels Sprouts',
    similarTo: 'Cabbage',
    cookingMethods: [
      {
        name: 'Roast until crispy',
        description: 'Halve, toss with oil, roast at 425°F for 20-25 minutes until crispy.',
        tips: ['The crispy parts taste less bitter', 'Add balsamic glaze'],
        difficulty: 'easy'
      },
      {
        name: 'Shredded raw',
        description: 'Shred very finely and add to salads.',
        tips: ['Raw is milder than cooked', 'Massaging with dressing helps'],
        difficulty: 'easy'
      },
      {
        name: 'Fried rice',
        description: 'Add to fried rice with soy sauce and veggies.',
        tips: ['Soy sauce masks the bitterness', 'High heat helps'],
        difficulty: 'medium'
      },
      {
        name: 'With bacon',
        description: 'Cook with bacon - the bacon makes everything better.',
        tips: ['You can wrap in bacon', 'The smokiness helps'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Roasted brussels', 'Brussels fried rice', 'Bacon brussels']
  },
  {
    name: 'Bell Peppers',
    similarTo: 'Cucumber',
    cookingMethods: [
      {
        name: 'Stuff and bake',
        description: 'Stuff with rice/meat and bake at 375°F for 45 minutes.',
        tips: ['Sweet peppers are milder', 'Cheese helps the flavor'],
        difficulty: 'medium'
      },
      {
        name: 'Raw with dip',
        description: 'Cut into strips and serve with dip.',
        tips: ['Red and yellow are sweetest', 'Ranch is classic'],
        difficulty: 'easy'
      },
      {
        name: 'Fajitas',
        description: 'Sauté with onions and use in fajitas.',
        tips: ['The seasoning helps', 'Use lots of fajita spices'],
        difficulty: 'easy'
      },
      {
        name: 'Omlette',
        description: 'Sauté and add to eggs.',
        tips: ['Good breakfast option', 'Use cheese too'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Stuffed peppers', 'Fajitas', 'Pepper omelette']
  },
  {
    name: 'Cauliflower',
    similarTo: 'Potato',
    cookingMethods: [
      {
        name: 'Roasted simple',
        description: 'Cut into florets, toss with oil, roast at 425°F for 25 minutes.',
        tips: ['Get it crispy', 'Add garlic and parmesan'],
        difficulty: 'easy'
      },
      {
        name: 'Mashed',
        description: 'Steam and mash like potatoes with butter.',
        tips: ['Use cream and cheese', 'Cannot tell difference from potatoes'],
        difficulty: 'easy'
      },
      {
        name: 'Rice substitute',
        description: 'Pulse in food processor to make rice.',
        tips: ['Use as low-carb rice', 'Add to stir-fries'],
        difficulty: 'easy'
      },
      {
        name: 'Buffalo wings',
        description: 'Cover in buffalo sauce and bake - like wings!',
        tips: ['Crispy texture', 'Use ranch or blue cheese'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Mashed cauliflower', 'Cauliflower rice', 'Buffalo cauliflower']
  },
  {
    name: 'Asparagus',
    similarTo: 'Green beans',
    cookingMethods: [
      {
        name: 'Roasted with parmesan',
        description: 'Roast at 425°F for 12-15 minutes, top with parmesan.',
        tips: ['Tender inside', 'Simple and elegant'],
        difficulty: 'easy'
      },
      {
        name: 'Wrapped in bacon',
        description: 'Wrap in bacon and bake at 400°F for 20 minutes.',
        tips: ['Bacon makes everything better', 'Crunchy and tender'],
        difficulty: 'easy'
      },
      {
        name: 'Pasta',
        description: 'Cut into pieces and toss with pasta.',
        tips: ['Use with creamy sauces', 'Cut into small pieces'],
        difficulty: 'easy'
      },
      {
        name: 'Eggs',
        description: 'Cut into small pieces and add to omelette or quiche.',
        tips: ['Mild flavor when cooked', 'Good breakfast option'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Parmesan asparagus', 'Bacon asparagus', 'Asparagus eggs']
  },
  {
    name: 'Zucchini',
    similarTo: 'Cucumber',
    cookingMethods: [
      {
        name: 'Noodles',
        description: 'Spiralize or slice into noodles.',
        tips: ['Use as pasta alternative', 'Add sauce on top'],
        difficulty: 'easy'
      },
      {
        name: 'Grilled',
        description: 'Slice and grill with oil and seasonings.',
        tips: ['Get some char marks', 'Italian seasoning helps'],
        difficulty: 'easy'
      },
      {
        name: 'Baked',
        description: 'Cut into sticks and bake as "fries".',
        tips: ['Light coating helps', 'Use ranch for dipping'],
        difficulty: 'easy'
      },
      {
        name: 'In soups',
        description: 'Add to soups - melts right in.',
        tips: ['Blend if needed', 'Adds nutrition subtly'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Zucchini noodles', 'Grilled zucchini', 'Zucchini fries']
  },
  {
    name: 'Avocado',
    similarTo: 'Butter',
    cookingMethods: [
      {
        name: 'On toast',
        description: 'Mash on toast with salt and lemon.',
        tips: ['Use ripe avocado', 'Everything bagel seasoning helps'],
        difficulty: 'easy'
      },
      {
        name: 'Guacamole',
        description: 'Make simple guac with lime and cilantro.',
        tips: ['Hot sauce masks flavor', 'Add plenty of lime'],
        difficulty: 'easy'
      },
      {
        name: 'Smoothies',
        description: 'Add to chocolate smoothies.',
        tips: ['Cannot taste it', 'Makes it creamy'],
        difficulty: 'easy'
      },
      {
        name: 'Pasta',
        description: 'Blend into pesto or cream sauce.',
        tips: ['Makes sauce creamy', 'Add lots of basil'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Avocado toast', 'Guacamole', 'Avocado pasta']
  }
]

export function getSuggestionsForFood(foodName: string): FoodSuggestion | undefined {
  return foodSuggestions.find(s => 
    s.name.toLowerCase() === foodName.toLowerCase()
  )
}

export function getSimilarFoods(foods: string[]): string[] {
  return foodSuggestions
    .filter(s => !foods.some(f => f.toLowerCase() === s.name.toLowerCase()))
    .slice(0, 5)
    .map(s => s.name)
}

export function getAllSuggestedFoods(): string[] {
  return foodSuggestions.map(s => s.name)
}
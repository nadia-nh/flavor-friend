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
  },
  {
    name: 'Tofu',
    similarTo: 'Chicken',
    cookingMethods: [
      {
        name: 'Press and marinate',
        description: 'Press out water, marinate in soy sauce and spices, then pan-fry.',
        tips: ['Pressing makes it crispy', 'Longer marinate = more flavor'],
        difficulty: 'medium'
      },
      {
        name: 'Silken in smoothies',
        description: 'Blend silken tofu into fruit smoothies.',
        tips: ['Cannot taste it when blended', 'Adds protein'],
        difficulty: 'easy'
      },
      {
        name: 'Crispy baked',
        description: 'Cut into cubes, coat in cornstarch, bake at 400°F until crispy.',
        tips: ['Use extra-firm', 'Cornstarch coating is key'],
        difficulty: 'easy'
      },
      {
        name: 'Scrambled',
        description: 'Crumble and scramble with turmeric and vegetables.',
        tips: ['Use firm tofu', 'Press first for better texture'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Tofu stir-fry', 'Crispy tofu nuggets', 'Tofu scramble']
  },
  {
    name: 'Green Beans',
    similarTo: 'Broccoli',
    cookingMethods: [
      {
        name: 'Roast with garlic',
        description: 'Toss with oil and garlic, roast at 425°F for 15 minutes.',
        tips: ['Get them slightly charred', 'Add parmesan after'],
        difficulty: 'easy'
      },
      {
        name: 'Blanch and sauté',
        description: 'Blanch 2 min, then sauté with butter and almonds.',
        tips: ['Keep them slightly crunchy', 'Lemon adds brightness'],
        difficulty: 'easy'
      },
      {
        name: 'Raw with dip',
        description: 'Serve raw with your favorite dip.',
        tips: ['Cut into bite-sized pieces', 'Ranch is classic'],
        difficulty: 'easy'
      },
      {
        name: 'With bacon',
        description: 'Sauté with bacon bits and vinegar.',
        tips: ['The bacon makes everything better', 'Add red pepper flakes'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Green bean almonds', 'Green bean casserole', 'Garlic green beans']
  },
  {
    name: 'Textured Vegetable Protein',
    similarTo: 'Ground meat',
    cookingMethods: [
      {
        name: 'Rehydrate and season',
        description: 'Soak in broth for 10 min, then cook with spices.',
        tips: ['Squeeze out excess water', 'Add taco seasoning'],
        difficulty: 'easy'
      },
      {
        name: 'In chili',
        description: 'Use in place of ground beef in chili.',
        tips: ['Add liquid to rehydrate', 'Works great in soups too'],
        difficulty: 'easy'
      },
      {
        name: 'Stir-fry',
        description: 'Rehydrate and stir-fry with vegetables and soy sauce.',
        tips: ['Get some crispy bits', 'Add sesame oil'],
        difficulty: 'easy'
      },
      {
        name: ' Bolognese',
        description: 'Use in pasta sauce in place of ground meat.',
        tips: ['Blend with actual meat for过渡', 'Add mushrooms for texture'],
        difficulty: 'medium'
      }
    ],
    easyMeals: ['TVP chili', 'TVP tacos', 'Stir-fry TVP']
  },
  {
    name: 'Soy Curls',
    similarTo: 'Chicken',
    cookingMethods: [
      {
        name: 'Rehydrate and marinate',
        description: 'Soak in warm water 10 min, then marinate and pan-fry.',
        tips: ['Soak in warm water first', 'Tear into bite-sized pieces', 'Soy sauce and garlic'],
        difficulty: 'easy'
      },
      {
        name: 'Buffalo style',
        description: 'Toss with buffalo sauce and bake at 375°F for 15 min.',
        tips: ['Crispy buffalo is amazing', 'Serve with ranch'],
        difficulty: 'easy'
      },
      {
        name: 'Stir-fry',
        description: 'Rehydrate and stir-fry with vegetables.',
        tips: ['Get some char on them', 'Add hoisin sauce'],
        difficulty: 'easy'
      },
      {
        name: 'In wraps',
        description: 'Use in place of chicken in wraps or sandwiches.',
        tips: ['Slice thin for wraps', 'Pickle adds tang'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Buffalo soy curls', 'Soy curl stir-fry', 'Chicken-style wraps']
  },
  {
    name: 'Quinoa',
    similarTo: 'Rice',
    cookingMethods: [
      {
        name: 'Plain with butter',
        description: 'Cook and add butter and salt.',
        tips: ['Rinse before cooking to remove bitterness', 'Add broth for more flavor'],
        difficulty: 'easy'
      },
      {
        name: 'In salads',
        description: 'Cool and mix with vegetables and lemon dressing.',
        tips: ['Works great cold', 'Add feta and cucumber'],
        difficulty: 'easy'
      },
      {
        name: 'Fried',
        description: 'Use as a base for fried rice-style dishes.',
        tips: ['Use day-old quinoa for best results', 'Get it crispy'],
        difficulty: 'easy'
      },
      {
        name: 'Buddha bowl',
        description: 'Top with roasted vegetables and tahini dressing.',
        tips: ['Load up your favorite veggies', 'Drizzle generously'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Quinoa salad', 'Quinoa bowls', 'Fried quinoa']
  },
  {
    name: 'Sweet Potato',
    similarTo: 'Potato',
    cookingMethods: [
      {
        name: 'Bake and top',
        description: 'Bake at 400°F for 45 min, top with butter.',
        tips: ['Pierce with fork before baking', 'Cinnamon and butter classic'],
        difficulty: 'easy'
      },
      {
        name: 'Fries',
        description: 'Cut into strips, toss with oil, bake at 425°F until crispy.',
        tips: ['Don\'t overcrowd the pan', 'Salt well'],
        difficulty: 'easy'
      },
      {
        name: 'Mashed',
        description: 'Boil and mash with butter and milk.',
        tips: ['Add a little maple syrup', 'Roasted is even better'],
        difficulty: 'easy'
      },
      {
        name: 'Toast',
        description: 'Slice and toast, top with avocado or nut butter.',
        tips: ['Thin slices stay crispy', 'Sweet or savory toppings work'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Baked sweet potato', 'Sweet potato fries', 'Sweet potato toast']
  },
  {
    name: 'Lentils',
    similarTo: 'Beans',
    cookingMethods: [
      {
        name: 'Soup',
        description: 'Simmer with vegetables and broth.',
        tips: ['Red lentils cook faster', 'Blend partially for creaminess'],
        difficulty: 'easy'
      },
      {
        name: 'Dal',
        description: 'Cook with spices, serve over rice.',
        tips: ['Add cumin and turmeric', 'Finish with butter'],
        difficulty: 'medium'
      },
      {
        name: 'Salad',
        description: 'Cook and mix with vegetables and vinaigrette.',
        tips: ['Use green or brown lentils', 'Add fresh herbs'],
        difficulty: 'easy'
      },
      {
        name: 'Tacos',
        description: 'Season and use in place of ground meat.',
        tips: ['Mash slightly for better texture', 'Add taco seasoning'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Lentil soup', 'Dal', 'Lentil tacos']
  },
  {
    name: 'Chickpeas',
    similarTo: 'Beans',
    cookingMethods: [
      {
        name: 'Roasted crispy',
        description: 'Toss with oil and spices, roast at 400°F until crispy.',
        tips: ['Use canned for convenience', 'Add everything bagel seasoning'],
        difficulty: 'easy'
      },
      {
        name: 'Hummus',
        description: 'Blend with tahini, lemon, and garlic.',
        tips: ['Add ice water for smooth texture', 'Use canned chickpeas'],
        difficulty: 'easy'
      },
      {
        name: 'Curry',
        description: 'Simmer in coconut curry sauce.',
        tips: ['Mash slightly for creamier texture', 'Add spinach at the end'],
        difficulty: 'easy'
      },
      {
        name: 'Salad',
        description: 'Toss with cucumber, tomato, and dressing.',
        tips: ['Use drained canned chickpeas', 'Add feta'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Hummus', 'Chickpea curry', 'Roasted chickpeas']
  },
  {
    name: 'Oats',
    similarTo: 'Bread',
    cookingMethods: [
      {
        name: 'Overnight',
        description: 'Soak in milk or yogurt overnight, add toppings.',
        tips: ['Use rolled oats', 'Add fruit in the morning'],
        difficulty: 'easy'
      },
      {
        name: 'Baked',
        description: 'Mix and bake as oatmeal bars.',
        tips: ['Add chocolate chips', 'Banana helps bind'],
        difficulty: 'easy'
      },
      {
        name: 'Smoothie',
        description: 'Blend with frozen fruit and milk.',
        tips: ['Use rolled oats', 'Soak first if needed'],
        difficulty: 'easy'
      },
      {
        name: 'Crumble topping',
        description: 'Mix with butter and sugar for pie toppings.',
        tips: ['Mix until crumbly', 'Add cinnamon'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Overnight oats', 'Oatmeal', 'Oat bars']
  },
  {
    name: 'Edamame',
    similarTo: 'Peas',
    cookingMethods: [
      {
        name: 'Steamed',
        description: 'Boil in salted water, drain and serve.',
        tips: ['Don\'t overcook', 'Sea salt is best'],
        difficulty: 'easy'
      },
      {
        name: 'Dry fried',
        description: 'Pan-fry with seasonings until crispy.',
        tips: ['Use frozen, not thawed', 'Add soy and garlic'],
        difficulty: 'easy'
      },
      {
        name: 'Salad',
        description: 'Add to grain salads.',
        tips: ['Great protein boost', 'Works with any grain'],
        difficulty: 'easy'
      },
      {
        name: 'Hummus',
        description: 'Blend into hummus for extra protein.',
        tips: ['Use shelled edamame', 'Add sesame paste'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Steamed edamame', 'Edamame salad', 'Edamame dip']
  },
  {
    name: 'Eggplant',
    similarTo: 'Mushrooms',
    cookingMethods: [
      {
        name: 'Roasted',
        description: 'Toss with oil, roast at 425°F until soft.',
        tips: ['Salt and drain first to remove bitterness', 'Gets creamy inside'],
        difficulty: 'easy'
      },
      {
        name: 'Baba ganoush',
        description: 'Roast and blend with tahini and garlic.',
        tips: ['Char the skin for smoky flavor', 'Drizzle with olive oil'],
        difficulty: 'medium'
      },
      {
        name: 'Parmesan',
        description: 'Bread and bake with marinara and cheese.',
        tips: ['Salt and drain first', 'Use panko for crunch'],
        difficulty: 'medium'
      },
      {
        name: 'Curry',
        description: 'Add to vegetable curries.',
        tips: ['Absorbs sauce well', 'Cook until soft'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Roasted eggplant', 'Eggplant parmesan', 'Baba ganoush']
  },
  {
    name: 'Kale',
    similarTo: 'Spinach',
    cookingMethods: [
      {
        name: 'Chips',
        description: 'Toss with oil and salt, bake at 350°F until crispy.',
        tips: ['Massage with oil first', 'Watch closely - burns fast'],
        difficulty: 'easy'
      },
      {
        name: 'Salad',
        description: 'Massage with dressing, add toppings.',
        tips: ['Massaging is key for tender leaves', 'Add parmesan and croutons'],
        difficulty: 'easy'
      },
      {
        name: 'Smoothie',
        description: 'Blend with fruit - mild when mixed.',
        tips: ['Use young tender leaves', 'Banana masks green flavor'],
        difficulty: 'easy'
      },
      {
        name: 'Pasta',
        description: 'Add to pasta in last minute of cooking.',
        tips: ['Wilt down quickly', 'Garlic and lemon are classic'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Kale chips', 'Kale salad', 'Pasta with kale']
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
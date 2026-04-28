import { FoodSuggestion, Recipe } from './types'
import { recipes } from './recipes'

export const foodSuggestions: FoodSuggestion[] = [
  {
    name: 'Broccoli',
    similarTo: ['Green beans', 'Cauliflower', 'Brussels Sprouts'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Broccoli_JG1.jpg/600px-Broccoli_JG1.jpg',
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
        tips: ['Don\'t overcook - it should still have some crunch', 'Add a little olive oil after'],
        difficulty: 'easy'
      },
      {
        name: 'Blend into sauces or soups',
        description: 'Steam well, then blend into creamy sauces or soups.',
        tips: ['Mix with cashew sauce for extra flavor', 'Adds nutrition without strong flavor'],
        difficulty: 'easy'
      },
      {
        name: 'Raw with dip',
        description: 'Cut into bite-sized pieces and serve with your favorite dip.',
        tips: ['Small pieces are less intimidating', 'Hummus is a classic choice'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Roasted broccoli side', 'Pasta with broccoli', 'Broccoli soup']
  },
  {
    name: 'Spinach',
    similarTo: ['Kale', 'Lettuce', 'Swiss Chard'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Spinach_JG1.jpg/600px-Spinach_JG1.jpg',
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
        tips: ['The heat wilts it down significantly', 'Use with creamy cashew sauce'],
        difficulty: 'easy'
      },
      {
        name: 'Raw in salads',
        description: 'Use young, tender spinach leaves in salads.',
        tips: ['Baby spinach is more tender', 'Mix with milder lettuces'],
        difficulty: 'easy'
      },
      {
        name: 'Sauté with tofu',
        description: 'Stir a handful into tofu scramble while cooking.',
        tips: ['Adds nutrition invisibly', 'Pairs well with nutritional yeast'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Spinach smoothies', 'Pasta with spinach', 'Sautéed spinach']
  },
  {
    name: 'Mushrooms',
    similarTo: ['Tofu', 'Eggplant', 'Portobello'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Agaricus_bisporus_white.JPG/600px-Agaricus_bisporus_white.JPG',
    cookingMethods: [
      {
        name: 'Grilled or roasted',
        description: 'Toss with oil and grill/roast until golden.',
        tips: ['Large portobello caps are meaty', 'Season well'],
        difficulty: 'easy'
      },
      {
        name: 'Sautéed with garlic',
        description: 'Cook in olive oil with garlic until golden.',
        tips: ['Cook off most of the moisture', 'Add fresh thyme'],
        difficulty: 'easy'
      },
      {
        name: 'Blend into lentils',
        description: 'Finely chop and mix into lentil stew.',
        tips: ['Adds texture and nutrition', 'Use with hearty beans'],
        difficulty: 'easy'
      },
      {
        name: 'Soup or gravy',
        description: 'Cook into soups or gravies - very subtle when blended.',
        tips: ['Blend smooth for hidden nutrition', 'Pairs well with cashew cream'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Stuffed mushrooms', 'Mushroom soup', 'Lentil mushroom stew']
  },
  {
    name: 'Brussels Sprouts',
    similarTo: ['Cabbage', 'Broccoli', 'Kale'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Brussels_sprouts_JG1.jpg/600px-Brussels_sprouts_JG1.jpg',
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
        name: 'With maple glaze',
        description: 'Roast with maple syrup and mustard glaze.',
        tips: ['Sweet glaze makes it approachable', 'The sweetness helps'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Roasted brussels', 'Brussels fried rice', 'Maple glazed brussels']
  },
  {
    name: 'Bell Peppers',
    similarTo: ['Cucumber', 'Tomatoes', 'Zucchini'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Red_and_Yellow_Peppers.JPG/600px-Red_and_Yellow_Peppers.JPG',
    cookingMethods: [
      {
        name: 'Stuff and bake',
        description: 'Stuff with rice/beans and bake at 375°F for 45 minutes.',
        tips: ['Sweet peppers are milder', 'Nutritional yeast helps the flavor'],
        difficulty: 'medium'
      },
      {
        name: 'Raw with dip',
        description: 'Cut into strips and serve with dip.',
        tips: ['Red and yellow are sweetest', 'Hummus is classic'],
        difficulty: 'easy'
      },
      {
        name: 'Fajitas',
        description: 'Sauté with onions and use in fajitas.',
        tips: ['The seasoning helps', 'Use lots of fajita spices'],
        difficulty: 'easy'
      },
      {
        name: 'Tofu scramble',
        description: 'Sauté and add to tofu scramble.',
        tips: ['Good breakfast option', 'Use nutritional yeast too'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Stuffed peppers', 'Fajitas', 'Pepper tofu scramble']
  },
  {
    name: 'Cauliflower',
    similarTo: ['Potato', 'Broccoli', 'Romanesco'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Cauliflower_JG1.jpg/600px-Cauliflower_JG1.jpg',
    cookingMethods: [
      {
        name: 'Roasted simple',
        description: 'Cut into florets, toss with oil, roast at 425°F for 25 minutes.',
        tips: ['Get it crispy', 'Add garlic and nutritional yeast'],
        difficulty: 'easy'
      },
      {
        name: 'Mashed',
        description: 'Steam and mash like potatoes with olive oil.',
        tips: ['Use cashew cream and nutritional yeast', 'Tastes like cheesy potatoes'],
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
        tips: ['Crispy texture', 'Use hummus or cashew ranch'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Mashed cauliflower', 'Cauliflower rice', 'Buffalo cauliflower']
  },
  {
    name: 'Asparagus',
    similarTo: ['Green beans', 'Broccoli', 'Celery'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Asparagus_officinalis_with_crumbs.JPG/600px-Asparagus_officinalis_with_crumbs.JPG',
    cookingMethods: [
      {
        name: 'Roasted with nutritional yeast',
        description: 'Roast at 425°F for 12-15 minutes, top with nutritional yeast.',
        tips: ['Tender inside', 'Simple and elegant'],
        difficulty: 'easy'
      },
      {
        name: 'Wrapped in tofu',
        description: 'Wrap in smoked tofu and bake at 400°F for 20 minutes.',
        tips: ['Smoked tofu adds depth', 'Crunchy and tender'],
        difficulty: 'easy'
      },
      {
        name: 'Pasta',
        description: 'Cut into pieces and toss with pasta.',
        tips: ['Use with creamy cashew sauce', 'Cut into small pieces'],
        difficulty: 'easy'
      },
      {
        name: 'Tofu scramble',
        description: 'Cut into small pieces and add to tofu scramble.',
        tips: ['Mild flavor when cooked', 'Good breakfast option'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Parmesan asparagus', 'Tofu-wrapped asparagus', 'Asparagus tofu scramble']
  },
  {
    name: 'Zucchini',
    similarTo: ['Cucumber', 'Squash', 'Patty Pan'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Zucchini_JG1.jpg/600px-Zucchini_JG1.jpg',
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
        tips: ['Light coating helps', 'Use hummus for dipping'],
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
    similarTo: ['Oil', 'Nuts', 'Olives'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Avocado_Hass.jpeg/600px-Avocado_Hass.jpeg',
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
    similarTo: ['Tempeh', 'Soy Curls', 'Chickpeas'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Firm_tofu_JG1.jpg/600px-Firm_tofu_JG1.jpg',
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
    similarTo: ['Broccoli', 'Asparagus', 'Snap Peas'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Green_beans_2.jpg/600px-Green_beans_2.jpg',
    cookingMethods: [
      {
        name: 'Roast with garlic',
        description: 'Toss with oil and garlic, roast at 425°F for 15 minutes.',
        tips: ['Get them slightly charred', 'Add nutritional yeast after'],
        difficulty: 'easy'
      },
      {
        name: 'Blanch and sauté',
        description: 'Blanch 2 min, then sauté with olive oil and almonds.',
        tips: ['Keep them slightly crunchy', 'Lemon adds brightness'],
        difficulty: 'easy'
      },
      {
        name: 'Raw with dip',
        description: 'Serve raw with your favorite dip.',
        tips: ['Cut into bite-sized pieces', 'Hummus is classic'],
        difficulty: 'easy'
      },
      {
        name: 'With maple glaze',
        description: 'Sauté with maple syrup and vinegar.',
        tips: ['The sweetness makes everything better', 'Add red pepper flakes'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Green bean almonds', 'Green bean casserole', 'Garlic green beans']
  },
  {
    name: 'Textured Vegetable Protein',
    similarTo: ['Lentils', 'Tofu', 'Soy Curls'],
    cookingMethods: [
      {
        name: 'Rehydrate and season',
        description: 'Soak in broth for 10 min, then cook with spices.',
        tips: ['Squeeze out excess water', 'Add taco seasoning'],
        difficulty: 'easy'
      },
      {
        name: 'In chili',
        description: 'Use in place of lentils in chili.',
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
        name: 'Bolognese',
        description: 'Use in pasta sauce in place of lentils.',
        tips: ['Blend with mushrooms for texture', 'Add herbs for depth'],
        difficulty: 'medium'
      }
    ],
    easyMeals: ['TVP chili', 'TVP tacos', 'Stir-fry TVP']
  },
  {
    name: 'Soy Curls',
    similarTo: ['Tofu', 'Tempeh', 'Textured Vegetable Protein'],
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
        tips: ['Crispy buffalo is amazing', 'Serve with cashew ranch'],
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
        description: 'Use in place of tofu in wraps or sandwiches.',
        tips: ['Slice thin for wraps', 'Pickle adds tang'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Buffalo soy curls', 'Soy curl stir-fry', 'Tofu-style wraps']
  },
  {
    name: 'Quinoa',
    similarTo: ['Rice', 'Couscous', 'Bulgur'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Quinoa_100g.jpg/600px-Quinoa_100g.jpg',
    cookingMethods: [
      {
        name: 'Plain with olive oil',
        description: 'Cook and add olive oil and salt.',
        tips: ['Rinse before cooking to remove bitterness', 'Add broth for more flavor'],
        difficulty: 'easy'
      },
      {
        name: 'In salads',
        description: 'Cool and mix with vegetables and lemon dressing.',
        tips: ['Works great cold', 'Add hemp seeds and cucumber'],
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
    similarTo: ['Potato', 'Carrots', 'Yams'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Sweet_Potatos_-_10.jpg/600px-Sweet_Potatos_-_10.jpg',
    cookingMethods: [
      {
        name: 'Bake and top',
        description: 'Bake at 400°F for 45 min, top with tahini.',
        tips: ['Pierce with fork before baking', 'Maple syrup and cinnamon classic'],
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
        description: 'Boil and mash with olive oil and plant milk.',
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
    similarTo: ['Beans', 'Split Peas', 'Textured Vegetable Protein'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Lentils_%28really%29.jpg/600px-Lentils_%28really%29.jpg',
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
        tips: ['Add cumin and turmeric', 'Finish with coconut oil'],
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
        description: 'Season and use in place of walnuts in tacos.',
        tips: ['Mash slightly for better texture', 'Add taco seasoning'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Lentil soup', 'Dal', 'Lentil tacos']
  },
  {
    name: 'Chickpeas',
    similarTo: ['Beans', 'Lentils', 'Peanuts'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Chickpeas_1.jpg/600px-Chickpeas_1.jpg',
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
        tips: ['Use drained canned chickpeas', 'Add hemp seeds'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Hummus', 'Chickpea curry', 'Roasted chickpeas']
  },
  {
    name: 'Oats',
    similarTo: ['Bread', 'Barley', 'Rice'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Oatmeal_1.jpg/600px-Oatmeal_1.jpg',
    cookingMethods: [
      {
        name: 'Overnight',
        description: 'Soak in plant milk or yogurt overnight, add toppings.',
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
        description: 'Blend with frozen fruit and plant milk.',
        tips: ['Use rolled oats', 'Soak first if needed'],
        difficulty: 'easy'
      },
      {
        name: 'Crumble topping',
        description: 'Mix with coconut oil and maple syrup for pie toppings.',
        tips: ['Mix until crumbly', 'Add cinnamon'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Overnight oats', 'Oatmeal', 'Oat bars']
  },
  {
    name: 'Edamame',
    similarTo: ['Peas', 'Lentils', 'Soybeans'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Edamame_soybeans_in_pod.jpg/600px-Edamame_soybeans_in_pod.jpg',
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
    similarTo: ['Mushrooms', 'Zucchini', 'Tomatoes'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Eggplant_with_calories.jpg/600px-Eggplant_with_calories.jpg',
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
        description: 'Bread and bake with marinara and nutritional yeast.',
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
    similarTo: ['Spinach', 'Swiss Chard', 'Collard Greens'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Kale_-_Trinidad_and_Tobago.jpg/600px-Kale_-_Trinidad_and_Tobago.jpg',
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
        tips: ['Massaging is key for tender leaves', 'Add nutritional yeast and croutons'],
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
  },
  {
    name: 'Pasta',
    similarTo: ['Bread', 'Rice', 'Couscous'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Cooked_pasta.jpg/600px-Cooked_pasta.jpg',
    cookingMethods: [
      {
        name: 'Plain with olive oil',
        description: 'Cook and toss with olive oil and nutritional yeast.',
        tips: ['Simple is classic', 'Add a little pasta water'],
        difficulty: 'easy'
      },
      {
        name: 'With sauce',
        description: 'Toss with your favorite jarred sauce.',
        tips: ['Marinara or alfredo work well', 'Heat the sauce first'],
        difficulty: 'easy'
      },
      {
        name: 'Garlic and oil',
        description: 'Sauté garlic in olive oil, toss with pasta.',
        tips: ['Add red pepper flakes', 'Fresh parsley helps'],
        difficulty: 'easy'
      },
      {
        name: 'With nutritional yeast',
        description: 'Mix with cashew cream or nutritional yeast.',
        tips: ['Lots of yeast adds cheesy flavor', 'Add breadcrumbs on top'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Olive oil pasta', 'Pasta with sauce', 'Garlic pasta']
  },
  {
    name: 'Rice',
    similarTo: ['Bread', 'Quinoa', 'Barley'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Rice_grains_-_close-up_view.jpg/600px-Rice_grains_-_close-up_view.jpg',
    cookingMethods: [
      {
        name: 'Plain with olive oil',
        description: 'Cook and add olive oil and salt.',
        tips: ['Simple base', 'Add soy sauce if desired'],
        difficulty: 'easy'
      },
      {
        name: 'Fried rice',
        description: 'Cook, then fry with tofu and vegetables.',
        tips: ['Day-old rice works best', 'High heat is key'],
        difficulty: 'easy'
      },
      {
        name: 'With broth',
        description: 'Cook in vegetable broth for more flavor.',
        tips: ['Use vegetable broth', 'Add herbs after'],
        difficulty: 'easy'
      },
      {
        name: 'Rice bowl',
        description: 'Top with tofu and vegetables.',
        tips: ['Teriyaki or curry toppings work great', 'Add edamame'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Plain rice', 'Fried rice', 'Rice bowls']
  },
  {
    name: 'Carrots',
    similarTo: ['Sweet potato', 'Bell Peppers', 'Beets'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Carrots_%28Daucus_carota_subsp._sativa%29_-_bunch.jpg/600px-Carrots_%28Daucus_carota_subsp._sativa%29_-_bunch.jpg',
    cookingMethods: [
      {
        name: 'Roast with oil',
        description: 'Cut into sticks, toss with oil, roast at 425°F for 20 minutes.',
        tips: ['Cut uniformly for even cooking', 'Honey or maple glaze helps'],
        difficulty: 'easy'
      },
      {
        name: 'Raw with dip',
        description: 'Cut into sticks and serve with hummus or dip.',
        tips: ['Baby carrots are convenient', 'Cut into small pieces'],
        difficulty: 'easy'
      },
      {
        name: 'Grated in salads',
        description: 'Grate raw and add to salads.',
        tips: ['Adds sweetness and crunch', 'Pair with raisins'],
        difficulty: 'easy'
      },
      {
        name: 'In soups',
        description: 'Add to soups and blend for creaminess.',
        tips: ['Blends smooth for hidden nutrition', 'Pairs with ginger'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Roasted carrots', 'Carrot sticks', 'Carrot soup']
  },
  {
    name: 'Onions',
    similarTo: ['Garlic', 'Shallots', 'Leeks'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Onions_-_a_bunch.jpg/600px-Onions_-_a_bunch.jpg',
    cookingMethods: [
      {
        name: 'Sautéed',
        description: 'Dice and sauté in oil until translucent.',
        tips: ['Cook slowly for sweetness', 'Don\'t burn them'],
        difficulty: 'easy'
      },
      {
        name: 'Caramelized',
        description: 'Cook slowly in oil for 30 minutes until brown.',
        tips: ['Takes patience but worth it', 'Add a pinch of salt'],
        difficulty: 'medium'
      },
      {
        name: 'Raw in salsa',
        description: 'Dice finely and add to fresh salsa.',
        tips: ['Red onions are milder', 'Soak in water to reduce bite'],
        difficulty: 'easy'
      },
      {
        name: 'Roasted whole',
        description: 'Wrap in foil and roast at 400°F for 45 minutes.',
        tips: ['Skin should be charred', 'Squeeze out the soft inside'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Sautéed onions', 'Caramelized onions', 'Onion salsa']
  },
  {
    name: 'Garlic',
    similarTo: ['Onions', 'Shallots', 'Leeks'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Garlic_bulbs_and_cloves.jpg/600px-Garlic_bulbs_and_cloves.jpg',
    cookingMethods: [
      {
        name: 'Minced in oil',
        description: 'Mince and sauté in oil for 1-2 minutes.',
        tips: ['Don\'t burn it - turns bitter', 'Use fresh for best flavor'],
        difficulty: 'easy'
      },
      {
        name: 'Roasted whole',
        description: 'Wrap head in foil, roast at 400°F for 40 minutes.',
        tips: ['Squeeze out soft cloves', 'Spread on bread like butter'],
        difficulty: 'easy'
      },
      {
        name: 'Raw in dressing',
        description: 'Mince and whisk into salad dressings.',
        tips: ['Use sparingly raw', 'Pairs with lemon and olive oil'],
        difficulty: 'easy'
      },
      {
        name: 'In marinades',
        description: 'Crush and add to tofu/tempeh marinades.',
        tips: ['Mash with salt to make a paste', 'Let marinate for flavor'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Garlic bread', 'Garlic pasta', 'Roasted garlic']
  },
  {
    name: 'Tomatoes',
    similarTo: ['Bell Peppers', 'Eggplant', 'Zucchini'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_julienne.jpg/600px-Tomato_julienne.jpg',
    cookingMethods: [
      {
        name: 'Roasted',
        description: 'Cut in half, drizzle with oil, roast at 400°F for 30 minutes.',
        tips: ['Cherry tomatoes roast faster', 'Add balsamic for depth'],
        difficulty: 'easy'
      },
      {
        name: 'Fresh in salsa',
        description: 'Dice and mix with onion, cilantro, lime.',
        tips: ['Use ripe tomatoes', 'Add jalapeño for heat'],
        difficulty: 'easy'
      },
      {
        name: 'Sauce base',
        description: 'Sauté with garlic and herbs for pasta sauce.',
        tips: ['Cook down until thick', 'Add basil at the end'],
        difficulty: 'easy'
      },
      {
        name: 'Stuffed and baked',
        description: 'Hollow out, stuff with breadcrumbs, bake at 375°F.',
        tips: ['Use large tomatoes', 'Add nutritional yeast to filling'],
        difficulty: 'medium'
      }
    ],
    easyMeals: ['Roasted tomatoes', 'Fresh salsa', 'Tomato sauce']
  },
  {
    name: 'Cucumber',
    similarTo: ['Zucchini', 'Celery', 'Jicama'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Cucumbers.jpg/600px-Cucumbers.jpg',
    cookingMethods: [
      {
        name: 'Raw in salads',
        description: 'Slice and toss with lemon and herbs.',
        tips: ['Peel if skin is bitter', 'Salt to draw out moisture'],
        difficulty: 'easy'
      },
      {
        name: 'Pickled',
        description: 'Slice and pickle in vinegar brine.',
        tips: ['Quick pickle in 24 hours', 'Add dill and garlic'],
        difficulty: 'easy'
      },
      {
        name: 'In smoothies',
        description: 'Peel and blend with fruit.',
        tips: ['Mild flavor when blended', 'Pairs with melon'],
        difficulty: 'easy'
      },
      {
        name: 'Sushi',
        description: 'Cut into strips for vegan sushi.',
        tips: ['Seedless varieties work best', 'Pair with avocado'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Cucumber salad', 'Pickles', 'Cucumber smoothie']
  },
  {
    name: 'Peppers',
    similarTo: ['Bell Peppers', 'Chili Peppers', 'Poblano'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Pimentoes.jpg/600px-Pimentoes.jpg',
    cookingMethods: [
      {
        name: 'Roasted',
        description: 'Cut into strips, toss with oil, roast at 425°F.',
        tips: ['Char the skin for smoky flavor', 'Red and yellow are sweeter'],
        difficulty: 'easy'
      },
      {
        name: 'Raw with dip',
        description: 'Slice and serve with hummus or dip.',
        tips: ['Remove seeds and membranes', 'Sweet varieties are milder'],
        difficulty: 'easy'
      },
      {
        name: 'Stir-fry',
        description: 'Chop and add to stir-fries.',
        tips: ['Keep pieces large for crunch', 'Cook briefly to stay crisp'],
        difficulty: 'easy'
      },
      {
        name: 'Stuffed and baked',
        description: 'Fill with rice/beans, bake at 375°F for 45 min.',
        tips: ['Use sweet bell peppers', 'Top with nutritional yeast'],
        difficulty: 'medium'
      }
    ],
    easyMeals: ['Roasted peppers', 'Pepper strips', 'Stuffed peppers']
  },
  {
    name: 'Ginger',
    similarTo: ['Garlic', 'Turmeric', 'Galangal'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Ginger_roots.jpg/600px-Ginger_roots.jpg',
    cookingMethods: [
      {
        name: 'Minced in stir-fry',
        description: 'Mince and add to hot oil for 30 seconds.',
        tips: ['Don\'t burn it', 'Pairs with garlic and soy'],
        difficulty: 'easy'
      },
      {
        name: 'Grated in dressing',
        description: 'Grate fresh and whisk into dressings.',
        tips: ['Use microplane for fine grate', 'Pairs with sesame oil'],
        difficulty: 'easy'
      },
      {
        name: 'In tea',
        description: 'Simmer slices in water for ginger tea.',
        tips: ['Add lemon and honey', 'Great for digestion'],
        difficulty: 'easy'
      },
      {
        name: 'In marinades',
        description: 'Grate and add to tofu/tempeh marinades.',
        tips: ['Let marinate for flavor', 'Pairs with soy sauce'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Ginger tea', 'Stir-fry ginger', 'Ginger dressing']
  },
  {
    name: 'Cashews',
    similarTo: ['Almonds', 'Pecans', 'Hazelnuts'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Cashew_Nuts_-_Kerala.jpg/600px-Cashew_Nuts_-_Kerala.jpg',
    cookingMethods: [
      {
        name: 'Soaked and blended',
        description: 'Soak 4 hours, blend into cream.',
        tips: ['Use for vegan cheese sauces', 'Soak in hot water to speed up'],
        difficulty: 'easy'
      },
      {
        name: 'Roasted salty',
        description: 'Toss with oil and salt, roast at 350°F for 15 min.',
        tips: ['Watch closely - burn fast', 'Add nutritional yeast'],
        difficulty: 'easy'
      },
      {
        name: 'Cashew butter',
        description: 'Blend in food processor until smooth.',
        tips: ['Add oil if too thick', 'Use in smoothies'],
        difficulty: 'medium'
      },
      {
        name: 'In curries',
        description: 'Add raw cashews to curries for creaminess.',
        tips: ['Blend into sauce', 'Add at the end'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Cashew cream', 'Roasted cashews', 'Cashew butter']
  },
  {
    name: 'Coconut Milk',
    similarTo: ['Almond Milk', 'Oat Milk', 'Cream'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Coconut_milk%2C_extracted_from_grated_coconut%2C_Thailand.jpg/600px-Coconut_milk%2C_extracted_from_grated_coconut%2C_Thailand.jpg',
    cookingMethods: [
      {
        name: 'In curries',
        description: 'Add to curries for rich, creamy texture.',
        tips: ['Full-fat is creamiest', 'Shake can well before opening'],
        difficulty: 'easy'
      },
      {
        name: 'In smoothies',
        description: 'Add a splash for creaminess.',
        tips: ['Use canned, not carton', 'Blends smooth'],
        difficulty: 'easy'
      },
      {
        name: 'Whipped cream',
        description: 'Chill can, scoop solid fat, whip with sugar.',
        tips: ['Use full-fat only', 'Chill bowl and beaters too'],
        difficulty: 'medium'
      },
      {
        name: 'In soups',
        description: 'Stir into soups for creamy texture.',
        tips: ['Add at end to prevent curdling', 'Works in sweet or savory'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Coconut curry', 'Coconut smoothie', 'Coconut whipped cream']
  },
  {
    name: 'Almonds',
    similarTo: ['Cashews', 'Walnuts', 'Pecans'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Blanched_almonds_and_almond_flour.jpg/600px-Blanched_almonds_and_almond_flour.jpg',
    cookingMethods: [
      {
        name: 'Raw as snack',
        description: 'Eat raw or roasted as snack.',
        tips: ['Soak overnight to activate', 'Roast with salt'],
        difficulty: 'easy'
      },
      {
        name: 'Almond butter',
        description: 'Blend in food processor until smooth.',
        tips: ['Add oil if too thick', 'Use in smoothies'],
        difficulty: 'medium'
      },
      {
        name: 'Sliced in salads',
        description: 'Top salads with sliced almonds.',
        tips: ['Toast first for more flavor', 'Pairs with fruit salads'],
        difficulty: 'easy'
      },
      {
        name: 'Almond flour',
        description: 'Grind and use in baking.',
        tips: ['Blanch first for white flour', 'Store in freezer'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Almond butter', 'Roasted almonds', 'Almond salad']
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
    .filter(s => s.similarTo.some(similar => 
      foods.some(f => f.toLowerCase() === similar.toLowerCase())
    ))
    .slice(0, 5)
    .map(s => s.name)
}

export function getSimilarFoodsFallback(foods: string[], allFoods: string[]): string[] {
  // First try popular ingredients not yet tried
  const popularIngredients = ['Tofu', 'Chickpeas', 'Lentils', 'Sweet Potato', 'Mushrooms', 'Quinoa', 'Oats', 'Cauliflower', 'Spinach', 'Broccoli']
  const available = popularIngredients.filter(p => 
    !foods.some(f => f.toLowerCase() === p.toLowerCase()) &&
    allFoods.some(a => a.toLowerCase() === p.toLowerCase())
  )
  if (available.length > 0) return available.slice(0, 5)
  
  // Then try most versatile (foods with 4+ cooking methods)
  const versatile = foodSuggestions
    .filter(s => s.cookingMethods.length >= 4)
    .filter(s => !foods.some(f => f.toLowerCase() === s.name.toLowerCase()))
    .map(s => s.name)
  if (versatile.length > 0) return versatile.slice(0, 5)
  
  // Random fallback
  const remaining = allFoods.filter(a => 
    !foods.some(f => f.toLowerCase() === a.toLowerCase())
  )
  return remaining.sort(() => Math.random() - 0.5).slice(0, 5)
}

export function getRecipeForFood(foodName: string): Recipe | undefined {
  const nameLower = foodName.toLowerCase()
  return recipes.find(r => 
    r.title.toLowerCase().includes(nameLower) || 
    r.description.toLowerCase().includes(nameLower)
  )
}

export function getAllSuggestedFoods(): string[] {
  return foodSuggestions.map(s => s.name)
}

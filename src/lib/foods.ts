import { FoodSuggestion, FoodType, DietaryTag } from './types'

export const foodSuggestions: FoodSuggestion[] = [
  {
    name: 'Broccoli',
    foodType: 'vegetable',
    similarTo: ['Green beans', 'Cauliflower', 'Brussels Sprouts'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Broccoli_JG1.jpg/320px-Broccoli_JG1.jpg',
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
    foodType: 'vegetable',
    similarTo: ['Kale', 'Lettuce', 'Swiss Chard'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Spinach_JG1.jpg/320px-Spinach_JG1.jpg',
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
    foodType: 'vegetable',
    similarTo: ['Tofu', 'Eggplant', 'Portobello'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Agaricus_bisporus_white.JPG/320px-Agaricus_bisporus_white.JPG',
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
    foodType: 'vegetable',
    similarTo: ['Cabbage', 'Broccoli', 'Kale'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Brussels_sprouts_JG1.jpg/320px-Brussels_sprouts_JG1.jpg',
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
    foodType: 'vegetable',
    similarTo: ['Cucumber', 'Tomatoes', 'Zucchini'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Red_and_Yellow_Peppers.JPG/320px-Red_and_Yellow_Peppers.JPG',
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
    foodType: 'vegetable',
    similarTo: ['Potato', 'Broccoli', 'Romanesco'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Cauliflower_JG1.jpg/320px-Cauliflower_JG1.jpg',
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
    foodType: 'vegetable',
    similarTo: ['Green beans', 'Broccoli', 'Celery'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Asparagus_officinalis_with_crumbs.JPG/320px-Asparagus_officinalis_with_crumbs.JPG',
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
    foodType: 'vegetable',
    similarTo: ['Cucumber', 'Squash', 'Patty Pan'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Zucchini_JG1.jpg/320px-Zucchini_JG1.jpg',
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
    foodType: 'vegetable',
    similarTo: ['Oil', 'Nuts', 'Olives'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Avocado_Hass.jpeg/320px-Avocado_Hass.jpeg',
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
    foodType: 'legume',
    similarTo: ['Tempeh', 'Soy Curls', 'Chickpeas'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Firm_tofu_JG1.jpg/320px-Firm_tofu_JG1.jpg',
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
    foodType: 'vegetable',
    similarTo: ['Broccoli', 'Asparagus', 'Snap Peas'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Green_beans_2.jpg/320px-Green_beans_2.jpg',
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
    foodType: 'legume',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Soja_tvp.jpg/320px-Soja_tvp.jpg',
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
    foodType: 'legume',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Soybeans.jpg/320px-Soybeans.jpg',
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
    foodType: 'grain',
    similarTo: ['Rice', 'Couscous', 'Bulgur'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Quinoa_100g.jpg/320px-Quinoa_100g.jpg',
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
    foodType: 'vegetable',
    similarTo: ['Potato', 'Carrots', 'Yams'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Sweet_Potatos_-_10.jpg/320px-Sweet_Potatos_-_10.jpg',
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
    foodType: 'legume',
    similarTo: ['Beans', 'Split Peas', 'Textured Vegetable Protein'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Lentils_%28really%29.jpg/320px-Lentils_%28really%29.jpg',
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
    foodType: 'legume',
    similarTo: ['Beans', 'Lentils', 'Peanuts'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Chickpeas_1.jpg/320px-Chickpeas_1.jpg',
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
    foodType: 'grain',
    similarTo: ['Bread', 'Barley', 'Rice'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Oatmeal_1.jpg/320px-Oatmeal_1.jpg',
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
    foodType: 'legume',
    similarTo: ['Peas', 'Lentils', 'Soybeans'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Edamame_soybeans_in_pod.jpg/320px-Edamame_soybeans_in_pod.jpg',
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
    foodType: 'vegetable',
    similarTo: ['Mushrooms', 'Zucchini', 'Tomatoes'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Eggplant_with_calories.jpg/320px-Eggplant_with_calories.jpg',
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
    foodType: 'vegetable',
    similarTo: ['Spinach', 'Swiss Chard', 'Collard Greens'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Kale_-_Trinidad_and_Tobago.jpg/320px-Kale_-_Trinidad_and_Tobago.jpg',
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
    name: 'Pasta (All)',
    foodType: 'grain',
    similarTo: ['Bread', 'Rice (All)', 'Couscous'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Cooked_pasta.jpg/320px-Cooked_pasta.jpg',
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
    name: 'Pasta (Wheat)',
    foodType: 'grain',
    parent: 'Pasta (All)',
    similarTo: ['Pasta (All)', 'Pasta (Whole Wheat)', 'Rice (White)', 'Couscous'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Cooked_pasta.jpg/320px-Cooked_pasta.jpg',
    cookingMethods: [
      {
        name: 'Al dente',
        description: 'Boil in well-salted water, cook 1-2 min less than package says.',
        tips: ['Taste as you go', 'Reserve pasta water to loosen sauces'],
        difficulty: 'easy'
      },
      {
        name: 'Baked pasta',
        description: 'Undercook slightly, toss with sauce, bake covered at 375°F.',
        tips: ['Uncover last 10 min for a crust', 'Great for batch cooking'],
        difficulty: 'easy'
      },
      {
        name: 'Cold pasta salad',
        description: 'Cook, rinse cold, toss with vegetables and vinaigrette.',
        tips: ['Short shapes like penne work best', 'Add chickpeas for protein'],
        difficulty: 'easy'
      },
      {
        name: 'With pesto',
        description: 'Toss hot pasta with fresh or jarred pesto.',
        tips: ['Add a splash of pasta water', 'Top with toasted pine nuts'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Spaghetti marinara', 'Pasta salad', 'Pesto pasta']
  },
  {
    name: 'Pasta (Whole Wheat)',
    foodType: 'grain',
    parent: 'Pasta (All)',
    similarTo: ['Pasta (All)', 'Pasta (Wheat)', 'Rice (Brown)', 'Barley'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Cooked_pasta.jpg/320px-Cooked_pasta.jpg',
    cookingMethods: [
      {
        name: 'With hearty sauces',
        description: 'Pair with robust sauces like bolognese or arrabbiata.',
        tips: ['Stronger flavour holds up to bold sauces', 'Cook until fully tender'],
        difficulty: 'easy'
      },
      {
        name: 'Cold grain bowl',
        description: 'Cook, cool, and use like a grain in bowls.',
        tips: ['Nutty flavour works well with roasted vegetables', 'Toss with lemon dressing'],
        difficulty: 'easy'
      },
      {
        name: 'Soup',
        description: 'Add to vegetable soups in the last 10 min of cooking.',
        tips: ['It swells and thickens the soup', 'Add extra broth if needed'],
        difficulty: 'easy'
      },
      {
        name: 'With olive oil and greens',
        description: 'Toss with wilted spinach or kale, garlic, and olive oil.',
        tips: ['Simple preparation lets the nuttiness shine', 'Add lemon and chilli flakes'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Whole wheat bolognese', 'Whole wheat grain bowl', 'Pasta e fagioli']
  },
  {
    name: 'Rice (All)',
    foodType: 'grain',
    similarTo: ['Bread', 'Quinoa', 'Barley', 'Pasta (All)'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Rice_grains_-_close-up_view.jpg/320px-Rice_grains_-_close-up_view.jpg',
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
    name: 'Rice (White)',
    foodType: 'grain',
    parent: 'Rice (All)',
    similarTo: ['Rice (All)', 'Rice (Brown)', 'Quinoa', 'Barley'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Rice_grains_-_close-up_view.jpg/320px-Rice_grains_-_close-up_view.jpg',
    cookingMethods: [
      {
        name: 'Steamed',
        description: 'Rinse well and steam or cook with a 1:1.5 water ratio.',
        tips: ['Rinsing removes excess starch for fluffier rice', 'Rest covered for 5 min after cooking'],
        difficulty: 'easy'
      },
      {
        name: 'Fried rice',
        description: 'Use day-old white rice for the best fried rice.',
        tips: ['Cold rice fries better than fresh', 'High heat and quick movement is key'],
        difficulty: 'easy'
      },
      {
        name: 'Congee',
        description: 'Simmer in a large amount of broth until thick and porridge-like.',
        tips: ['Takes 45-60 min of simmering', 'Top with ginger and green onions'],
        difficulty: 'easy'
      },
      {
        name: 'Sushi rice',
        description: 'Season cooked short-grain white rice with rice vinegar.',
        tips: ['Short-grain or sushi rice is stickier', 'Fan while folding in vinegar'],
        difficulty: 'medium'
      }
    ],
    easyMeals: ['Steamed white rice', 'Fried rice', 'Congee']
  },
  {
    name: 'Rice (Brown)',
    foodType: 'grain',
    parent: 'Rice (All)',
    similarTo: ['Rice (All)', 'Rice (White)', 'Quinoa', 'Barley'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Brown_rice.jpg/320px-Brown_rice.jpg',
    cookingMethods: [
      {
        name: 'Steamed',
        description: 'Cook with a 1:2 water ratio for 40-45 min.',
        tips: ['Takes longer than white rice', 'Toasting in oil first adds nuttiness'],
        difficulty: 'easy'
      },
      {
        name: 'Brown rice bowls',
        description: 'Use as a hearty base for grain bowls with roasted veg.',
        tips: ['Nutty flavour pairs well with tahini', 'Batch cook and refrigerate'],
        difficulty: 'easy'
      },
      {
        name: 'Fried rice',
        description: 'Use day-old brown rice in stir-fries.',
        tips: ['Chewier texture than white rice fried rice', 'Add sesame oil at the end'],
        difficulty: 'easy'
      },
      {
        name: 'Stuffed peppers',
        description: 'Mix cooked brown rice with beans and spices to stuff peppers.',
        tips: ['Pre-cook the rice fully before stuffing', 'Adds fibre and chew'],
        difficulty: 'medium'
      }
    ],
    easyMeals: ['Brown rice bowls', 'Fried brown rice', 'Stuffed peppers']
  },
  {
    name: 'Carrots',
    foodType: 'vegetable',
    similarTo: ['Sweet potato', 'Bell Peppers', 'Beets'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Carrots_%28Daucus_carota_subsp._sativa%29_-_bunch.jpg/320px-Carrots_%28Daucus_carota_subsp._sativa%29_-_bunch.jpg',
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
    foodType: 'vegetable',
    similarTo: ['Garlic', 'Shallots', 'Leeks'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Onions_-_a_bunch.jpg/320px-Onions_-_a_bunch.jpg',
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
    foodType: 'vegetable',
    similarTo: ['Onions', 'Shallots', 'Leeks'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Garlic_bulbs_and_cloves.jpg/320px-Garlic_bulbs_and_cloves.jpg',
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
    foodType: 'vegetable',
    similarTo: ['Bell Peppers', 'Eggplant', 'Zucchini'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_julienne.jpg/320px-Tomato_julienne.jpg',
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
    foodType: 'vegetable',
    similarTo: ['Zucchini', 'Celery', 'Jicama'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Cucumbers.jpg/320px-Cucumbers.jpg',
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
    foodType: 'vegetable',
    similarTo: ['Bell Peppers', 'Chili Peppers', 'Poblano'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Pimentoes.jpg/320px-Pimentoes.jpg',
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
    foodType: 'vegetable',
    similarTo: ['Garlic', 'Turmeric', 'Galangal'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Ginger_roots.jpg/320px-Ginger_roots.jpg',
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
    foodType: 'other',
    similarTo: ['Almonds', 'Pecans', 'Hazelnuts'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Cashew_Nuts_-_Kerala.jpg/320px-Cashew_Nuts_-_Kerala.jpg',
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
    foodType: 'other',
    similarTo: ['Almond Milk', 'Oat Milk', 'Cream'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Coconut_milk%2C_extracted_from_grated_coconut%2C_Thailand.jpg/320px-Coconut_milk%2C_extracted_from_grated_coconut%2C_Thailand.jpg',
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
    foodType: 'other',
    similarTo: ['Cashews', 'Walnuts', 'Pecans'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Blanched_almonds_and_almond_flour.jpg/320px-Blanched_almonds_and_almond_flour.jpg',
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
  },
  {
    name: 'Beans (All)',
    foodType: 'legume',
    similarTo: ['Chickpeas', 'Lentils', 'Tofu'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Black_beans.jpg/320px-Black_beans.jpg',
    cookingMethods: [
      {
        name: 'From a can',
        description: 'Drain, rinse, and warm in a pan with garlic and olive oil.',
        tips: ['The fastest way to add protein', 'Season well with salt and cumin'],
        difficulty: 'easy'
      },
      {
        name: 'From dried',
        description: 'Soak overnight, then simmer in fresh water for 1-2 hours.',
        tips: ['Better texture than canned', 'Add aromatics like bay leaf and garlic'],
        difficulty: 'medium'
      },
      {
        name: 'Mashed as a spread',
        description: 'Mash cooked beans with olive oil, lemon, and garlic.',
        tips: ['Great on toast or in sandwiches', 'Add roasted garlic for depth'],
        difficulty: 'easy'
      },
      {
        name: 'In stews and soups',
        description: 'Add to soups and stews for hearty protein.',
        tips: ['They thicken the broth naturally', 'Add in the last 20 min to keep shape'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Bean tacos', 'Bean soup', 'Beans on toast']
  },
  {
    name: 'Black Beans',
    foodType: 'legume',
    parent: 'Beans (All)',
    similarTo: ['Beans (All)', 'Chickpeas', 'Lentils', 'Kidney Beans'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Black_beans.jpg/320px-Black_beans.jpg',
    cookingMethods: [
      {
        name: 'Tacos or burritos',
        description: 'Season canned black beans with cumin and garlic, warm through.',
        tips: ['Mash some for creamier texture', 'Add lime juice at the end'],
        difficulty: 'easy'
      },
      {
        name: 'Black bean soup',
        description: 'Simmer with onion, garlic, and vegetable broth until thick.',
        tips: ['Blend half for creamy texture', 'Top with lime and cilantro'],
        difficulty: 'easy'
      },
      {
        name: 'Black bean burgers',
        description: 'Mash with oats and spices, form patties, pan-fry or bake.',
        tips: ['Chill patties before cooking', 'Add smoked paprika for depth'],
        difficulty: 'medium'
      },
      {
        name: 'Rice and beans',
        description: 'Serve over white rice with sofrito seasoning.',
        tips: ['Use canned beans for convenience', 'Add a bay leaf while warming'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Black bean tacos', 'Black bean soup', 'Rice and beans']
  },
  {
    name: 'Tempeh',
    foodType: 'legume',
    similarTo: ['Tofu', 'Soy Curls', 'Seitan'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Tempeh.jpg/320px-Tempeh.jpg',
    cookingMethods: [
      {
        name: 'Marinate and pan-fry',
        description: 'Slice thin, marinate in soy sauce and garlic, fry until golden.',
        tips: ['Steam for 10 min first to reduce bitterness', 'Press out moisture before marinating'],
        difficulty: 'easy'
      },
      {
        name: 'Crumbled in bolognese',
        description: 'Crumble and brown with tomatoes and herbs.',
        tips: ['Smaller crumbles soak up sauce better', 'Add nutritional yeast'],
        difficulty: 'easy'
      },
      {
        name: 'Baked with glaze',
        description: 'Slice, coat in maple-soy glaze, bake at 400°F for 20 min.',
        tips: ['Flip halfway through', 'Gets nicely caramelized'],
        difficulty: 'easy'
      },
      {
        name: 'BLT sandwich',
        description: 'Slice thin, marinate in smoky sauce, fry until crispy.',
        tips: ['Liquid smoke adds depth', 'Get it really crispy'],
        difficulty: 'medium'
      }
    ],
    easyMeals: ['Tempeh stir-fry', 'Tempeh bolognese', 'Tempeh BLT']
  },
  {
    name: 'Seitan',
    foodType: 'legume',
    similarTo: ['Tempeh', 'Tofu', 'Soy Curls'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Seitan_pieces.jpg/320px-Seitan_pieces.jpg',
    cookingMethods: [
      {
        name: 'Stir-fry',
        description: 'Slice and stir-fry with soy sauce and vegetables.',
        tips: ['High heat gets a good sear', 'Add hoisin for extra flavor'],
        difficulty: 'easy'
      },
      {
        name: 'Roast whole',
        description: 'Season and roast as a centrepiece at 375°F for 45 min.',
        tips: ['Baste with marinade as it cooks', 'Rest before slicing'],
        difficulty: 'medium'
      },
      {
        name: 'Kebabs',
        description: 'Cube, skewer with vegetables, grill or roast.',
        tips: ['Marinate overnight for best flavor', 'Use sturdy vegetables'],
        difficulty: 'easy'
      },
      {
        name: 'Sandwich slices',
        description: 'Slice thin and pan-fry with herbs for sandwiches.',
        tips: ['Use store-bought for convenience', 'Mustard and pickles complement well'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Seitan stir-fry', 'Seitan roast', 'Seitan kebabs']
  },
  {
    name: 'Peas',
    foodType: 'legume',
    similarTo: ['Edamame', 'Green Beans', 'Snap Peas'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Garden_peas_-_studio.jpg/320px-Garden_peas_-_studio.jpg',
    cookingMethods: [
      {
        name: 'Mashed peas on toast',
        description: 'Cook and mash with mint and lemon, spread on toast.',
        tips: ['Frozen peas work perfectly', 'Add a little olive oil'],
        difficulty: 'easy'
      },
      {
        name: 'Pea soup',
        description: 'Simmer with onion and broth, blend until smooth.',
        tips: ['Add fresh mint at the end', 'A swirl of oat cream is great'],
        difficulty: 'easy'
      },
      {
        name: 'Fried rice',
        description: 'Toss into fried rice in the last minute of cooking.',
        tips: ['Frozen peas go straight in', 'They cook in 1-2 minutes'],
        difficulty: 'easy'
      },
      {
        name: 'Pasta with peas',
        description: 'Blend into a creamy pea sauce or toss in whole.',
        tips: ['Blend half for a vibrant sauce', 'Add lemon and basil'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Pea soup', 'Mushy peas', 'Pea pasta']
  },
  {
    name: 'Corn',
    foodType: 'grain',
    similarTo: ['Peas', 'Bell Peppers', 'Carrots'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Corn_Cob.jpg/320px-Corn_Cob.jpg',
    cookingMethods: [
      {
        name: 'Grilled on the cob',
        description: 'Grill whole cobs over medium heat, turning every 3 min.',
        tips: ['Brush with herb butter or chilli oil', 'Char marks add flavour'],
        difficulty: 'easy'
      },
      {
        name: 'Corn salsa',
        description: 'Mix charred or raw corn with tomato, onion, and lime.',
        tips: ['Char in a dry pan for sweetness', 'Great with black beans'],
        difficulty: 'easy'
      },
      {
        name: 'Corn chowder',
        description: 'Simmer with potato, broth, and coconut milk.',
        tips: ['Blend part of it for creaminess', 'Add smoked paprika'],
        difficulty: 'easy'
      },
      {
        name: 'Elote style',
        description: 'Brush cooked cob with mayo, chilli, and lime.',
        tips: ['Use vegan mayo', 'Nutritional yeast works instead of cheese'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Grilled corn', 'Corn salsa', 'Corn chowder']
  },
  {
    name: 'Beets',
    foodType: 'vegetable',
    similarTo: ['Carrots', 'Sweet Potato', 'Turnip'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Beet_%28raw%29.jpg/320px-Beet_%28raw%29.jpg',
    cookingMethods: [
      {
        name: 'Roasted',
        description: 'Wrap in foil and roast at 400°F for 45-60 min until tender.',
        tips: ['Skins slip off easily after roasting', 'Wear gloves to avoid staining'],
        difficulty: 'easy'
      },
      {
        name: 'Beet hummus',
        description: 'Blend roasted beets with chickpeas, tahini, and lemon.',
        tips: ['Stunning pink colour', 'Slightly sweeter than classic hummus'],
        difficulty: 'easy'
      },
      {
        name: 'Raw grated salad',
        description: 'Grate raw and toss with lemon dressing.',
        tips: ['Use a box grater or food processor', 'Pairs well with apple'],
        difficulty: 'easy'
      },
      {
        name: 'Pickled',
        description: 'Slice and pickle in vinegar brine with spices.',
        tips: ['Quick pickle takes just a few hours', 'Great on grain bowls'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Roasted beets', 'Beet hummus', 'Pickled beets']
  },
  {
    name: 'Leeks',
    foodType: 'vegetable',
    similarTo: ['Onions', 'Garlic', 'Shallots'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Leeks.jpg/320px-Leeks.jpg',
    cookingMethods: [
      {
        name: 'Sautéed in butter',
        description: 'Slice and cook slowly in oil until soft and sweet.',
        tips: ['Low heat brings out the sweetness', 'Add a pinch of salt early'],
        difficulty: 'easy'
      },
      {
        name: 'Leek and potato soup',
        description: 'Simmer with potato and broth, blend until silky.',
        tips: ['Use the white and light green parts', 'Add oat cream at the end'],
        difficulty: 'easy'
      },
      {
        name: 'Roasted whole',
        description: 'Halve lengthways, brush with oil, roast at 400°F for 25 min.',
        tips: ['Cut side down first for caramelisation', 'Add lemon after roasting'],
        difficulty: 'easy'
      },
      {
        name: 'In pasta',
        description: 'Sauté until soft, toss with pasta and white wine.',
        tips: ['Pairs beautifully with lemon', 'Add capers for saltiness'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Leek soup', 'Sautéed leeks', 'Leek pasta']
  },
  {
    name: 'Butternut Squash',
    foodType: 'vegetable',
    similarTo: ['Sweet Potato', 'Pumpkin', 'Carrots'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Butternut_squash.jpg/320px-Butternut_squash.jpg',
    cookingMethods: [
      {
        name: 'Roasted cubes',
        description: 'Cube, toss with oil and spices, roast at 425°F for 25 min.',
        tips: ['Don\'t overcrowd the pan', 'Cinnamon or smoked paprika work well'],
        difficulty: 'easy'
      },
      {
        name: 'Soup',
        description: 'Roast, then blend with broth, ginger, and coconut milk.',
        tips: ['Roasting before blending adds depth', 'Add a little maple syrup'],
        difficulty: 'easy'
      },
      {
        name: 'Stuffed',
        description: 'Halve and roast, fill cavity with grains and vegetables.',
        tips: ['Scoop out seeds first', 'A showstopper for guests'],
        difficulty: 'medium'
      },
      {
        name: 'Pasta sauce',
        description: 'Blend roasted squash with broth for a creamy pasta sauce.',
        tips: ['Add nutritional yeast for cheesy flavour', 'Sage is a classic pairing'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Squash soup', 'Roasted squash', 'Stuffed squash']
  },
  {
    name: 'Celery',
    foodType: 'vegetable',
    similarTo: ['Cucumber', 'Fennel', 'Asparagus'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Celery_in_a_farmers_market.jpg/320px-Celery_in_a_farmers_market.jpg',
    cookingMethods: [
      {
        name: 'Raw with nut butter',
        description: 'Cut into sticks and serve with peanut or almond butter.',
        tips: ['Classic snack', 'Add raisins for "ants on a log"'],
        difficulty: 'easy'
      },
      {
        name: 'In soups and stews',
        description: 'Chop and add as part of a mirepoix base.',
        tips: ['Use leaves too — lots of flavour', 'Cook until translucent'],
        difficulty: 'easy'
      },
      {
        name: 'Braised',
        description: 'Halve stalks, brown in oil, braise in broth for 20 min.',
        tips: ['Totally transforms the flavour', 'Goes well with lemon and capers'],
        difficulty: 'easy'
      },
      {
        name: 'Juice or smoothie',
        description: 'Juice raw or blend into green smoothies.',
        tips: ['Pairs with apple and ginger', 'Mild flavour when diluted'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Celery sticks', 'Celery soup', 'Mirepoix base']
  },
  {
    name: 'Walnuts',
    foodType: 'other',
    similarTo: ['Almonds', 'Pecans', 'Cashews'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Walnut_-_whole_and_open.jpg/320px-Walnut_-_whole_and_open.jpg',
    cookingMethods: [
      {
        name: 'Walnut meat',
        description: 'Pulse with tamari and spices for a taco filling.',
        tips: ['Don\'t over-process — keep some texture', 'Add smoked paprika'],
        difficulty: 'easy'
      },
      {
        name: 'Toasted on salads',
        description: 'Toast in a dry pan until fragrant, add to salads.',
        tips: ['Watch closely — they burn fast', 'Pairs with bitter greens'],
        difficulty: 'easy'
      },
      {
        name: 'Walnut pesto',
        description: 'Blend with basil, garlic, lemon, and olive oil.',
        tips: ['Cheaper than pine nuts', 'Use on pasta or as a dip'],
        difficulty: 'easy'
      },
      {
        name: 'In baking',
        description: 'Chop and fold into muffins, banana bread, or brownies.',
        tips: ['Toast first for more flavour', 'Pairs well with chocolate'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Walnut tacos', 'Walnut pesto', 'Walnut banana bread']
  },
  {
    name: 'Peanuts',
    foodType: 'other',
    similarTo: ['Cashews', 'Almonds', 'Chickpeas'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Peanuts_on_a_white_background.jpg/320px-Peanuts_on_a_white_background.jpg',
    cookingMethods: [
      {
        name: 'Peanut butter',
        description: 'Blend roasted peanuts in a food processor until smooth.',
        tips: ['Add a pinch of salt', 'Use in sauces, on toast, or in smoothies'],
        difficulty: 'easy'
      },
      {
        name: 'Peanut sauce',
        description: 'Mix peanut butter, soy sauce, lime, ginger, and water.',
        tips: ['Adjust thickness with water', 'Great on noodles or as a dip'],
        difficulty: 'easy'
      },
      {
        name: 'Roasted as snack',
        description: 'Toss with oil and salt, roast at 350°F for 15 min.',
        tips: ['Add chilli powder or cumin', 'Cool completely before storing'],
        difficulty: 'easy'
      },
      {
        name: 'In stir-fries',
        description: 'Scatter whole peanuts over stir-fried noodles or vegetables.',
        tips: ['Add at the end to keep crunch', 'Pairs with sesame and soy'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Peanut butter toast', 'Peanut noodles', 'Peanut sauce']
  },
  {
    name: 'Mango',
    foodType: 'other',
    similarTo: ['Peach', 'Pineapple', 'Papaya'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Hapus_Mango.jpg/320px-Hapus_Mango.jpg',
    cookingMethods: [
      {
        name: 'Fresh in salsa',
        description: 'Dice and mix with red onion, jalapeño, lime, and cilantro.',
        tips: ['Use ripe but firm mango', 'Great on tacos or with chips'],
        difficulty: 'easy'
      },
      {
        name: 'Smoothies',
        description: 'Blend frozen mango with banana and plant milk.',
        tips: ['Frozen mango gives thick texture', 'No ice needed'],
        difficulty: 'easy'
      },
      {
        name: 'Mango sticky rice',
        description: 'Serve sliced mango over coconut sticky rice.',
        tips: ['Use glutinous rice', 'Sweeten coconut milk with sugar'],
        difficulty: 'medium'
      },
      {
        name: 'Grilled',
        description: 'Slice and grill until caramelised, serve with lime.',
        tips: ['Use slightly underripe mango', 'Chilli and lime is a classic combo'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Mango smoothie', 'Mango salsa', 'Mango sticky rice']
  },
  {
    name: 'Barley',
    foodType: 'grain',
    similarTo: ['Quinoa', 'Rice', 'Farro'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Barley_%28Hordeum_vulgare%29.jpg/320px-Barley_%28Hordeum_vulgare%29.jpg',
    cookingMethods: [
      {
        name: 'Grain bowl base',
        description: 'Cook in broth and use as a hearty base for bowls.',
        tips: ['Use pearl barley for faster cooking', 'Absorbs dressing well'],
        difficulty: 'easy'
      },
      {
        name: 'Barley soup',
        description: 'Simmer with mushrooms, carrots, and herbs.',
        tips: ['Thickens the broth naturally', 'Great in a slow cooker'],
        difficulty: 'easy'
      },
      {
        name: 'Risotto-style',
        description: 'Cook slowly with stock, adding liquid gradually.',
        tips: ['Creamy without cheese', 'Finish with nutritional yeast'],
        difficulty: 'medium'
      },
      {
        name: 'Salad',
        description: 'Cook and cool, toss with roasted vegetables and vinaigrette.',
        tips: ['Great at room temperature', 'Holds dressing well'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Barley soup', 'Barley bowl', 'Barley risotto']
  },
  {
    name: 'Chia Seeds',
    foodType: 'other',
    similarTo: ['Hemp Seeds', 'Flaxseed', 'Oats'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Chia_seeds_-_Salvia_hispanica.jpg/320px-Chia_seeds_-_Salvia_hispanica.jpg',
    cookingMethods: [
      {
        name: 'Chia pudding',
        description: 'Mix with plant milk and refrigerate overnight.',
        tips: ['3 tbsp chia per cup of milk', 'Stir after 10 min to prevent clumping'],
        difficulty: 'easy'
      },
      {
        name: 'In smoothies',
        description: 'Add 1 tbsp to any smoothie for extra nutrition.',
        tips: ['They swell slightly when blended', 'Adds omega-3s invisibly'],
        difficulty: 'easy'
      },
      {
        name: 'Egg replacement',
        description: 'Mix 1 tbsp chia with 3 tbsp water, rest 5 min.',
        tips: ['Works in muffins and pancakes', 'Slightly denser result'],
        difficulty: 'easy'
      },
      {
        name: 'Sprinkled on bowls',
        description: 'Sprinkle over oatmeal, yogurt, or salads.',
        tips: ['No prep needed', 'Adds crunch and nutrition'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Chia pudding', 'Chia smoothie', 'Chia oatmeal']
  },
  {
    name: 'Tahini',
    foodType: 'other',
    similarTo: ['Nut Butter', 'Cashews', 'Almonds'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Tahini_%28Sesame_Seed_Paste%29.jpg/320px-Tahini_%28Sesame_Seed_Paste%29.jpg',
    cookingMethods: [
      {
        name: 'Tahini dressing',
        description: 'Whisk with lemon juice, garlic, and water until creamy.',
        tips: ['Add water gradually to get right consistency', 'Drizzle over everything'],
        difficulty: 'easy'
      },
      {
        name: 'Hummus base',
        description: 'Blend with chickpeas, lemon, and garlic.',
        tips: ['Good tahini makes great hummus', 'Add ice water for silky texture'],
        difficulty: 'easy'
      },
      {
        name: 'Baked goods',
        description: 'Substitute for butter in cookies or brownies.',
        tips: ['Adds a subtle nutty flavour', 'Works in halva too'],
        difficulty: 'easy'
      },
      {
        name: 'Drizzle on roasted veg',
        description: 'Thin with lemon and water, drizzle over roasted vegetables.',
        tips: ['Classic with roasted aubergine', 'Add za\'atar for Middle Eastern vibes'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Tahini dressing', 'Hummus', 'Tahini cookies']
  },
  {
    name: 'Kidney Beans',
    foodType: 'legume',
    parent: 'Beans (All)',
    similarTo: ['Beans (All)', 'Black Beans', 'Chickpeas', 'Lentils'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/RedKidneyBeans.jpg/320px-RedKidneyBeans.jpg',
    cookingMethods: [
      {
        name: 'Chilli',
        description: 'Simmer with tomatoes, spices, and vegetables.',
        tips: ['Smoked paprika adds depth', 'Serve over rice or with cornbread'],
        difficulty: 'easy'
      },
      {
        name: 'Bean salad',
        description: 'Toss with cucumber, onion, and vinaigrette.',
        tips: ['Rinse canned beans well', 'Add fresh herbs and lemon'],
        difficulty: 'easy'
      },
      {
        name: 'Kidney bean curry',
        description: 'Simmer in tomato-based curry sauce (rajma).',
        tips: ['A North Indian classic', 'Let it simmer long for rich flavour'],
        difficulty: 'medium'
      },
      {
        name: 'Mashed as a spread',
        description: 'Mash with garlic and lemon as a toast or sandwich spread.',
        tips: ['Season generously', 'Add roasted red pepper for extra flavour'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Bean chilli', 'Bean salad', 'Rajma curry']
  },
  {
    name: 'Millet',
    foodType: 'grain',
    similarTo: ['Quinoa', 'Couscous', 'Barley'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Foxtail_millet_in_a_bowl.jpg/320px-Foxtail_millet_in_a_bowl.jpg',
    cookingMethods: [
      {
        name: 'Porridge',
        description: 'Cook in plant milk until creamy, like oatmeal.',
        tips: ['Stir frequently to prevent sticking', 'Top with fruit and maple syrup'],
        difficulty: 'easy'
      },
      {
        name: 'Fluffy grain base',
        description: 'Toast dry in pan then cook in broth for a fluffy texture.',
        tips: ['Toasting first brings out a nutty flavour', 'Works like couscous'],
        difficulty: 'easy'
      },
      {
        name: 'Polenta-style',
        description: 'Cook with extra water, stirring until thick.',
        tips: ['Cools into a sliceable loaf', 'Pan-fry slices until golden'],
        difficulty: 'medium'
      },
      {
        name: 'In patties',
        description: 'Mix cooked millet with beans and spices, form patties.',
        tips: ['Chill before frying', 'Holds together well when cold'],
        difficulty: 'medium'
      }
    ],
    easyMeals: ['Millet porridge', 'Millet grain bowl', 'Millet polenta']
  },
  {
    name: 'Nutritional Yeast',
    foodType: 'other',
    similarTo: ['Tahini', 'Cashews', 'Miso'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Nutritional_Yeast.jpg/320px-Nutritional_Yeast.jpg',
    cookingMethods: [
      {
        name: 'Cheese sauce',
        description: 'Blend with soaked cashews, lemon, garlic, and plant milk.',
        tips: ['More yeast = more cheesy flavour', 'Use on pasta or nachos'],
        difficulty: 'easy'
      },
      {
        name: 'Sprinkled on pasta',
        description: 'Sprinkle generously over pasta like parmesan.',
        tips: ['Toast briefly in a dry pan for nuttier flavour', 'No prep needed'],
        difficulty: 'easy'
      },
      {
        name: 'Popcorn seasoning',
        description: 'Toss freshly popped corn with nutritional yeast and salt.',
        tips: ['Add smoked paprika too', 'Toss while still hot so it sticks'],
        difficulty: 'easy'
      },
      {
        name: 'In scrambles',
        description: 'Stir into tofu scramble for an eggy, cheesy flavour.',
        tips: ['Add kala namak (black salt) for eggy aroma', 'Works in quiches too'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Cheesy pasta', 'Nooch popcorn', 'Cheesy scramble']
  },
  {
    name: 'Pumpkin',
    foodType: 'vegetable',
    similarTo: ['Butternut Squash', 'Sweet Potato', 'Carrots'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/FrancePumpkin.jpg/320px-FrancePumpkin.jpg',
    cookingMethods: [
      {
        name: 'Roasted wedges',
        description: 'Cut into wedges, brush with oil and spices, roast at 400°F.',
        tips: ['Skin is edible when roasted', 'Add cinnamon and chilli for contrast'],
        difficulty: 'easy'
      },
      {
        name: 'Pumpkin soup',
        description: 'Roast and blend with broth, ginger, and coconut milk.',
        tips: ['Roasting deepens the flavour', 'Top with pumpkin seeds'],
        difficulty: 'easy'
      },
      {
        name: 'Pumpkin puree in baking',
        description: 'Use canned or roasted puree in muffins and pancakes.',
        tips: ['Replaces some fat in recipes', 'Add cinnamon and nutmeg'],
        difficulty: 'easy'
      },
      {
        name: 'Stuffed pumpkin',
        description: 'Hollow small pumpkin and fill with grains and mushrooms.',
        tips: ['Season inside before filling', 'Pre-roast the pumpkin first'],
        difficulty: 'medium'
      }
    ],
    easyMeals: ['Pumpkin soup', 'Roasted pumpkin', 'Pumpkin muffins']
  },
  {
    name: 'Cabbage',
    foodType: 'vegetable',
    similarTo: ['Brussels Sprouts', 'Kale', 'Bok Choy'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Cabbage_and_cross_section_on_white.jpg/320px-Cabbage_and_cross_section_on_white.jpg',
    cookingMethods: [
      {
        name: 'Slaw',
        description: 'Shred finely and toss with vinaigrette or creamy dressing.',
        tips: ['Salt and let sit 10 min to soften', 'Add apple or carrot for sweetness'],
        difficulty: 'easy'
      },
      {
        name: 'Stir-fried',
        description: 'Slice and stir-fry with garlic, soy sauce, and sesame oil.',
        tips: ['High heat is key', 'Cooks down fast — don\'t overcook'],
        difficulty: 'easy'
      },
      {
        name: 'Fermented (sauerkraut)',
        description: 'Shred, salt, and ferment in a jar for 5-7 days.',
        tips: ['Keep submerged under brine', 'Taste daily until tangy enough'],
        difficulty: 'medium'
      },
      {
        name: 'Stuffed cabbage rolls',
        description: 'Blanch leaves and fill with rice and beans, bake in sauce.',
        tips: ['Blanch just until pliable', 'Use a tomato or mushroom sauce'],
        difficulty: 'medium'
      }
    ],
    easyMeals: ['Coleslaw', 'Stir-fried cabbage', 'Sauerkraut']
  },
  // ── Batch 1 additions ────────────────────────────────────────────
  {
    name: 'Bread (All)',
    foodType: 'grain',
    similarTo: ['Bread (Whole Wheat)', 'Sourdough', 'Tortillas', 'Oats'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Fresh_made_bread_05.jpg/320px-Fresh_made_bread_05.jpg',
    cookingMethods: [
      {
        name: 'Toast and top',
        description: 'Toast a thick slice and pile on avocado, hummus, or nut butter.',
        tips: ['Day-old bread toasts better', 'Try seeded or multigrain varieties'],
        difficulty: 'easy'
      },
      {
        name: 'Sandwiches and wraps',
        description: 'Use as the base for plant-based sandwiches with loads of veggies.',
        tips: ['Hummus works as a spread instead of butter', 'Add roasted veg for warmth'],
        difficulty: 'easy'
      },
      {
        name: 'Homemade simple loaf',
        description: 'Mix flour, yeast, salt and water; knead, prove and bake at 220°C.',
        tips: ['A Dutch oven gives a great crust', 'Let it cool fully before slicing'],
        difficulty: 'medium'
      },
      {
        name: 'Bread for soups and stews',
        description: 'Serve thick slices alongside soups to mop up the broth.',
        tips: ['Crusty bread holds up better than soft sandwich bread', 'Brush with olive oil and grill'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Avocado toast', 'Hummus sandwich', 'Soup with crusty bread']
  },
  {
    name: 'Bread (Whole Wheat)',
    foodType: 'grain',
    parent: 'Bread (All)',
    similarTo: ['Bread (All)', 'Sourdough', 'Oats', 'Barley'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Fresh_made_bread_05.jpg/320px-Fresh_made_bread_05.jpg',
    cookingMethods: [
      {
        name: 'Avocado toast',
        description: 'Toast two slices, smash avocado on top, season with lemon and chilli flakes.',
        tips: ['Whole wheat toast holds toppings better than white', 'Add sliced tomato or a sprinkle of seeds'],
        difficulty: 'easy'
      },
      {
        name: 'French toast',
        description: 'Dip slices in a mix of oat milk, banana and cinnamon, then pan-fry.',
        tips: ['Slightly stale bread soaks better', 'Serve with maple syrup and berries'],
        difficulty: 'easy'
      },
      {
        name: 'Hearty sandwiches',
        description: 'Load with roasted vegetables, hummus, and greens.',
        tips: ['Whole wheat adds a nutty flavour that pairs well with earthy fillings', 'Press in a panini press for extra texture'],
        difficulty: 'easy'
      },
      {
        name: 'Breadcrumbs',
        description: 'Blitz stale slices into crumbs and use to coat tofu or top casseroles.',
        tips: ['Freeze bread before blitzing for finer crumbs', 'Toast the crumbs in a dry pan for crunch'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Avocado toast', 'Veggie sandwich', 'French toast with maple syrup']
  },
  {
    name: 'Sourdough',
    foodType: 'grain',
    parent: 'Bread (All)',
    similarTo: ['Bread (All)', 'Bread (Whole Wheat)', 'Pasta (All)'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Sourdough_bread_and_starter.jpg/320px-Sourdough_bread_and_starter.jpg',
    cookingMethods: [
      {
        name: 'Toast with toppings',
        description: 'The tang of sourdough pairs beautifully with creamy toppings like avocado or white bean spread.',
        tips: ['Slice thick — thin slices crumble', 'Grill cut-side down in a dry pan if no toaster'],
        difficulty: 'easy'
      },
      {
        name: 'Panzanella bread salad',
        description: 'Cube stale sourdough, toss with tomatoes, basil, capers and olive oil.',
        tips: ['Day-old sourdough is perfect here', 'Let it sit 20 min so the bread absorbs the juices'],
        difficulty: 'easy'
      },
      {
        name: 'Tartines (open sandwiches)',
        description: 'Top a thick slice with seasonal vegetables, legumes or nut-based cheese.',
        tips: ['Treat it like a mini pizza — sky\'s the limit', 'Broil briefly for a warm, melty finish'],
        difficulty: 'easy'
      },
      {
        name: 'Home baking with starter',
        description: 'Maintain a live starter and bake your own loaves over 24–48 hours.',
        tips: ['Score the top before baking for a good rise', 'Steam in a Dutch oven for a crackly crust'],
        difficulty: 'hard'
      }
    ],
    easyMeals: ['Sourdough avocado toast', 'Panzanella', 'Open-face roasted veg tartine']
  },
  {
    name: 'Jackfruit',
    foodType: 'vegetable',
    similarTo: ['Mushrooms', 'Tofu', 'Tempeh', 'Eggplant'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1g/Fresh_jackfruit.jpg/320px-Fresh_jackfruit.jpg',
    cookingMethods: [
      {
        name: 'BBQ pulled jackfruit',
        description: 'Drain canned young jackfruit, shred with a fork, cook in BBQ sauce until caramelised.',
        tips: ['Use young green jackfruit in brine — not ripe sweet jackfruit', 'Fry off a little first to remove excess moisture'],
        difficulty: 'easy'
      },
      {
        name: 'Tacos or burritos',
        description: 'Season spiced shredded jackfruit with cumin, smoked paprika and lime.',
        tips: ['Top with slaw and avocado for contrast', 'Char tortillas briefly over a gas flame'],
        difficulty: 'easy'
      },
      {
        name: 'Jackfruit curry',
        description: 'Simmer chunks in a rich coconut milk curry sauce until tender.',
        tips: ['It absorbs flavours very well — use a bold spice mix', 'Break into chunks rather than shredding for a chunkier texture'],
        difficulty: 'easy'
      },
      {
        name: 'Jackfruit "pulled pork" sandwich',
        description: 'Pile BBQ jackfruit on a roll with pickles and coleslaw.',
        tips: ['Toasted buns hold up better', 'Add a dash of liquid smoke for depth'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['BBQ jackfruit tacos', 'Pulled jackfruit sandwich', 'Jackfruit curry']
  },
  {
    name: 'Lettuce',
    foodType: 'vegetable',
    similarTo: ['Spinach', 'Kale', 'Cabbage', 'Swiss Chard'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Salad_garden.jpg/320px-Salad_garden.jpg',
    cookingMethods: [
      {
        name: 'Simple green salad',
        description: 'Tear leaves and dress with olive oil, lemon juice and a pinch of salt.',
        tips: ['Dry the leaves thoroughly after washing — dressing won\'t stick to wet leaves', 'Dress right before serving'],
        difficulty: 'easy'
      },
      {
        name: 'Lettuce wraps',
        description: 'Use large, cupped leaves (e.g. butter or iceberg) as vessels for fillings.',
        tips: ['Firm lettuces like iceberg hold fillings best', 'Fill with spiced tempeh, lentils or tofu crumble'],
        difficulty: 'easy'
      },
      {
        name: 'Grilled romaine',
        description: 'Halve a romaine heart, brush with oil and grill cut-side down for 2 minutes.',
        tips: ['Surprisingly flavourful — the heat mellows the bitterness', 'Finish with lemon and capers'],
        difficulty: 'easy'
      },
      {
        name: 'In grain bowls',
        description: 'Use as a fresh base underneath warm grains and roasted veg.',
        tips: ['The contrast of warm and cool is the point', 'Dress the lettuce separately so it doesn\'t wilt'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Green salad', 'Lettuce wraps', 'Grain bowl with greens']
  },
  {
    name: 'Couscous',
    foodType: 'grain',
    similarTo: ['Bulgur', 'Farro', 'Quinoa', 'Rice (All)'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/01_Couscous.jpg/320px-01_Couscous.jpg',
    cookingMethods: [
      {
        name: 'Instant steam method',
        description: 'Pour boiling water or broth over couscous (1:1 ratio), cover and leave 5 minutes, then fluff.',
        tips: ['Use vegetable broth instead of water for more flavour', 'Fluff with a fork, not a spoon'],
        difficulty: 'easy'
      },
      {
        name: 'Couscous salad',
        description: 'Cool cooked couscous and toss with chopped vegetables, herbs and lemon dressing.',
        tips: ['Roasted veg works especially well', 'Add chickpeas for protein'],
        difficulty: 'easy'
      },
      {
        name: 'Stuffed peppers or squash',
        description: 'Mix cooked couscous with herbs, dried fruit and nuts, stuff into vegetables and bake.',
        tips: ['Dried apricots or cranberries add a lovely sweetness', 'Toast pine nuts separately and stir in after'],
        difficulty: 'easy'
      },
      {
        name: 'Warm grain bowl',
        description: 'Serve freshly steamed couscous topped with roasted vegetables and tahini dressing.',
        tips: ['Works beautifully with Moroccan-spiced vegetables', 'Add preserved lemon for brightness'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Couscous salad', 'Stuffed peppers with couscous', 'Moroccan-spiced grain bowl']
  },
  {
    name: 'Farro',
    foodType: 'grain',
    similarTo: ['Barley', 'Bulgur', 'Couscous', 'Quinoa'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Farro_salad.jpg/320px-Farro_salad.jpg',
    cookingMethods: [
      {
        name: 'Boiled and seasoned',
        description: 'Simmer in salted water for 25–30 min until tender but chewy, drain and dress with olive oil.',
        tips: ['Soak overnight to cut cooking time by half', 'It stays pleasantly chewy — don\'t overcook'],
        difficulty: 'easy'
      },
      {
        name: 'Farro grain bowl',
        description: 'Use as a hearty base under roasted veg, legumes and dressing.',
        tips: ['Batch cook at the start of the week', 'Pairs well with earthy vegetables like beets or mushrooms'],
        difficulty: 'easy'
      },
      {
        name: 'Farro risotto (farrotto)',
        description: 'Cook farro like risotto — toast, then add warm broth ladle by ladle.',
        tips: ['Stir frequently but it\'s more forgiving than rice risotto', 'Finish with nutritional yeast for a cheesy note'],
        difficulty: 'medium'
      },
      {
        name: 'Cold farro salad',
        description: 'Toss cooked, cooled farro with roasted veg, fresh herbs and vinaigrette.',
        tips: ['Holds up well for days in the fridge', 'Great with white beans and sun-dried tomatoes'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Farro grain bowl', 'Farro salad with roasted veg', 'Farrotto with mushrooms']
  },
  {
    name: 'Bulgur',
    foodType: 'grain',
    similarTo: ['Couscous', 'Farro', 'Quinoa', 'Millet'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Bulgur-Weizen.jpg/320px-Bulgur-Weizen.jpg',
    cookingMethods: [
      {
        name: 'Quick soak',
        description: 'Pour boiling water over fine bulgur (1:1.5 ratio), cover 15–20 min, fluff.',
        tips: ['Fine bulgur needs no cooking at all — just hot water', 'Coarse bulgur benefits from a brief simmer'],
        difficulty: 'easy'
      },
      {
        name: 'Tabbouleh',
        description: 'Soak fine bulgur, then toss with masses of parsley, mint, tomato, lemon and olive oil.',
        tips: ['Parsley should dominate — it\'s a herb salad, not a grain salad', 'Make ahead and let flavours meld for an hour'],
        difficulty: 'easy'
      },
      {
        name: 'Stuffed vegetables',
        description: 'Mix cooked bulgur with herbs and spices and stuff into peppers or tomatoes.',
        tips: ['Partly pre-cook the veg before stuffing', 'Pine nuts and currants are a classic addition'],
        difficulty: 'easy'
      },
      {
        name: 'Bulgur pilaf',
        description: 'Toast in a dry pan, then simmer in broth with onions and spices.',
        tips: ['Toasting adds a nutty depth', 'Pairs well with lentils for protein'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Tabbouleh', 'Stuffed peppers with bulgur', 'Bulgur pilaf with lentils']
  },
  {
    name: 'White Beans',
    foodType: 'legume',
    similarTo: ['Beans (All)', 'Chickpeas', 'Lentils', 'Kidney Beans'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/White_beans.jpg/320px-White_beans.jpg',
    cookingMethods: [
      {
        name: 'On toast',
        description: 'Heat canned beans with garlic, olive oil and lemon, serve on crusty toast.',
        tips: ['Mash some of the beans into the oil for a creamy texture', 'Fresh thyme or rosemary elevates this a lot'],
        difficulty: 'easy'
      },
      {
        name: 'White bean soup',
        description: 'Simmer with garlic, tomatoes, kale and broth for a hearty Italian-style soup.',
        tips: ['Use an immersion blender on a portion to make it creamy', 'A parmesan rind (or nutritional yeast) adds depth'],
        difficulty: 'easy'
      },
      {
        name: 'Mashed as a spread',
        description: 'Blend with lemon, garlic, olive oil and herbs for a smooth, creamy dip.',
        tips: ['White beans make the creamiest dip — creamier than chickpeas', 'Try with roasted garlic instead of raw'],
        difficulty: 'easy'
      },
      {
        name: 'In pasta e fagioli',
        description: 'Simmer with small pasta shapes, tomatoes, garlic and sage for a thick Italian stew.',
        tips: ['Mash some beans to thicken the sauce', 'This is a one-pot meal in under 30 minutes'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['White beans on toast', 'Tuscan white bean soup', 'White bean dip with veg']
  },
  {
    name: 'Sunflower Seeds',
    foodType: 'other',
    similarTo: ['Pumpkin Seeds', 'Hemp Seeds', 'Sesame Seeds', 'Almonds'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Sunflower_seeds.jpg/320px-Sunflower_seeds.jpg',
    cookingMethods: [
      {
        name: 'Toasted on salads',
        description: 'Dry-toast in a hot pan for 3–4 min until golden, sprinkle over salads or grain bowls.',
        tips: ['Watch carefully — they burn quickly', 'A pinch of tamari while toasting adds a savoury crunch'],
        difficulty: 'easy'
      },
      {
        name: 'Sunflower seed butter',
        description: 'Blend roasted sunflower seeds in a food processor until smooth and creamy.',
        tips: ['Patience — it goes through a dry, crumbly phase before turning creamy', 'A pinch of salt and a splash of oil help'],
        difficulty: 'easy'
      },
      {
        name: 'In baking',
        description: 'Add to muffins, breads, granola bars or cookies for crunch and nutrition.',
        tips: ['They pair well with oats and dried fruit', 'Use as a nut-free substitute in most baked goods'],
        difficulty: 'easy'
      },
      {
        name: 'As a coating',
        description: 'Press tofu or tempeh into ground sunflower seeds before baking for a crunchy crust.',
        tips: ['Blitz in a food processor for finer crumbs', 'Season the seeds with smoked paprika and garlic powder'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Toasted seed salad', 'Sunflower seed butter on toast', 'Seeded granola']
  },
  {
    name: 'Pumpkin Seeds',
    foodType: 'other',
    similarTo: ['Sunflower Seeds', 'Hemp Seeds', 'Sesame Seeds', 'Walnuts'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Pepitas.jpg/320px-Pepitas.jpg',
    cookingMethods: [
      {
        name: 'Spiced and roasted',
        description: 'Toss with olive oil, smoked paprika and salt, roast at 180°C for 10 min.',
        tips: ['Spread in a single layer for even toasting', 'Add cumin and chilli for a Mexican twist'],
        difficulty: 'easy'
      },
      {
        name: 'Sprinkled on soups',
        description: 'Add a handful to the top of blended soups like butternut squash or tomato.',
        tips: ['Toast first for more flavour', 'A drizzle of oil alongside the seeds looks beautiful'],
        difficulty: 'easy'
      },
      {
        name: 'In granola',
        description: 'Add to homemade granola for protein and a satisfying crunch.',
        tips: ['Mix with oats, maple syrup and coconut oil before baking', 'Add after baking if you want them to stay green'],
        difficulty: 'easy'
      },
      {
        name: 'Pumpkin seed pesto',
        description: 'Blend with basil, garlic, lemon and olive oil as a nut-free pesto.',
        tips: ['A great substitute for pine nuts', 'Toast lightly first for a deeper flavour'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Spiced pumpkin seeds as snack', 'Soup with seed garnish', 'Pumpkin seed pesto pasta']
  },
  {
    name: 'Miso',
    foodType: 'other',
    similarTo: ['Nutritional Yeast', 'Tahini', 'Coconut Milk', 'Tempeh'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Miso_in_a_bowl.jpg/320px-Miso_in_a_bowl.jpg',
    cookingMethods: [
      {
        name: 'Miso soup',
        description: 'Dissolve a spoonful in hot (not boiling) water, add tofu, seaweed and spring onion.',
        tips: ['Never boil miso — it kills the beneficial bacteria and dulls the flavour', 'White miso is mildest; red miso is deeper and saltier'],
        difficulty: 'easy'
      },
      {
        name: 'Miso dressing',
        description: 'Whisk with rice vinegar, sesame oil, ginger and a little maple syrup.',
        tips: ['Use white miso for dressings — less overpowering', 'Works beautifully on shredded cabbage or cucumber'],
        difficulty: 'easy'
      },
      {
        name: 'Miso glaze',
        description: 'Mix with maple syrup and a little rice vinegar; brush on tofu, aubergine or carrots before roasting.',
        tips: ['Watch the heat — the sugars caramelise fast', 'A thick glaze needs 20–25 min at 200°C'],
        difficulty: 'easy'
      },
      {
        name: 'Stir into sauces and soups',
        description: 'Add a teaspoon to any sauce or broth for instant umami depth.',
        tips: ['Stir in at the very end off the heat', 'Pairs well with cashew cream, tahini or coconut milk'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Miso soup with tofu', 'Miso-glazed aubergine', 'Miso dressing on salad']
  },
  // ── Batch 2 additions ────────────────────────────────────────────
  {
    name: 'Swiss Chard',
    foodType: 'vegetable',
    similarTo: ['Spinach', 'Kale', 'Lettuce', 'Beets'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Rainbow_chard.jpg/320px-Rainbow_chard.jpg',
    cookingMethods: [
      {
        name: 'Sautéed with garlic',
        description: 'Separate stems from leaves; cook stems 3 min first, then add leaves for 2 more.',
        tips: ['The stems are edible and have great texture — don\'t throw them away', 'A splash of lemon at the end brightens everything'],
        difficulty: 'easy'
      },
      {
        name: 'Wilted into pasta',
        description: 'Add torn chard leaves to hot pasta during the last minute of cooking.',
        tips: ['The heat wilts it beautifully', 'Pairs well with white beans and garlic'],
        difficulty: 'easy'
      },
      {
        name: 'Chard gratin',
        description: 'Layer blanched chard with a cashew béchamel and breadcrumbs, then bake until golden.',
        tips: ['Squeeze out excess water from the chard after blanching', 'Nutritional yeast adds a cheesy depth to the sauce'],
        difficulty: 'medium'
      },
      {
        name: 'Raw in salads',
        description: 'Use young, tender chard leaves raw, torn into salads.',
        tips: ['Baby chard is milder and more tender', 'Massage with dressing to soften the leaves'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Sautéed chard with garlic', 'Pasta with chard and white beans', 'Chard gratin']
  },
  {
    name: 'Bok Choy',
    foodType: 'vegetable',
    similarTo: ['Cabbage', 'Swiss Chard', 'Spinach', 'Broccoli'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Bok_choy_cut.jpg/320px-Bok_choy_cut.jpg',
    cookingMethods: [
      {
        name: 'Stir-fried',
        description: 'Halve baby bok choy, stir-fry in a very hot pan with garlic and ginger for 3–4 min.',
        tips: ['High heat is essential for the right texture', 'A splash of soy sauce or tamari at the end'],
        difficulty: 'easy'
      },
      {
        name: 'Steamed',
        description: 'Steam whole baby bok choy for 4–5 minutes and dress with sesame oil and tamari.',
        tips: ['Don\'t overcook — it should still have some bite', 'Top with toasted sesame seeds'],
        difficulty: 'easy'
      },
      {
        name: 'In miso soup or ramen',
        description: 'Add halved bok choy to simmering broth in the last few minutes.',
        tips: ['It wilts perfectly in hot broth', 'Baby bok choy works best for noodle soups'],
        difficulty: 'easy'
      },
      {
        name: 'Roasted',
        description: 'Halve, brush with sesame-miso glaze and roast at 200°C for 15 min.',
        tips: ['Cut side down first for caramelisation', 'Flip halfway through for even colour'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Stir-fried bok choy with tofu', 'Miso soup with bok choy', 'Roasted bok choy with sesame']
  },
  {
    name: 'Artichoke',
    foodType: 'vegetable',
    similarTo: ['Asparagus', 'Fennel', 'Leeks', 'Cauliflower'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Cynara_cardunculus_subsp._scolymus0.jpg/320px-Cynara_cardunculus_subsp._scolymus0.jpg',
    cookingMethods: [
      {
        name: 'Canned in pasta or dips',
        description: 'Use jarred artichoke hearts as an instant addition to pasta, salads or blended dips.',
        tips: ['Canned artichokes are just as good as fresh for most dishes', 'Drain and rinse before using'],
        difficulty: 'easy'
      },
      {
        name: 'Whole steamed artichokes',
        description: 'Steam trimmed artichokes for 30–40 minutes; eat leaf by leaf with a dipping sauce.',
        tips: ['The heart at the base is the best part', 'Serve with tahini or lemon-garlic dip'],
        difficulty: 'medium'
      },
      {
        name: 'Artichoke dip',
        description: 'Blend canned artichoke hearts with cashew cream, garlic and lemon for a creamy dip.',
        tips: ['Bake at 180°C for 20 min for a warm, bubbly version', 'Serve with crusty bread or crackers'],
        difficulty: 'easy'
      },
      {
        name: 'Grilled artichoke hearts',
        description: 'Halve jarred hearts, brush with oil and grill until lightly charred.',
        tips: ['Great in grain bowls or on flatbreads', 'Marinate in garlic and herbs overnight'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Artichoke pasta', 'Warm artichoke dip', 'Grain bowl with artichokes']
  },
  {
    name: 'Fennel',
    foodType: 'vegetable',
    similarTo: ['Celery', 'Leeks', 'Onions', 'Artichoke'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Fenchel.jpg/320px-Fenchel.jpg',
    cookingMethods: [
      {
        name: 'Raw in salads',
        description: 'Shave very thinly with a mandolin or sharp knife; dress with lemon and olive oil.',
        tips: ['The anise flavour mellows when shaved thin', 'Pairs beautifully with citrus and fresh herbs'],
        difficulty: 'easy'
      },
      {
        name: 'Roasted until caramelised',
        description: 'Cut into wedges, toss with oil and roast at 200°C for 25–30 min until golden.',
        tips: ['Roasting transforms the flavour — becomes sweeter and milder', 'Squeeze lemon over at the end'],
        difficulty: 'easy'
      },
      {
        name: 'Braised in broth',
        description: 'Halve bulbs and braise slowly in vegetable broth until very tender.',
        tips: ['Low and slow gives a silky texture', 'Add white wine or a squeeze of orange for depth'],
        difficulty: 'easy'
      },
      {
        name: 'In soups',
        description: 'Dice and cook with onion and garlic as an aromatic base for soups.',
        tips: ['The fronds make a beautiful garnish', 'Pairs well with tomatoes, beans and potatoes'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Shaved fennel salad', 'Roasted fennel with lemon', 'Fennel and white bean soup']
  },
  {
    name: 'Split Peas',
    foodType: 'legume',
    similarTo: ['Lentils', 'Peas', 'Mung Beans', 'Beans (All)'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Split_peas.jpg/320px-Split_peas.jpg',
    cookingMethods: [
      {
        name: 'Split pea soup',
        description: 'Simmer green or yellow split peas with smoked paprika, garlic and carrots until very thick.',
        tips: ['No soaking needed — split peas cook in 45–60 min', 'Blending half the soup gives a creamy texture'],
        difficulty: 'easy'
      },
      {
        name: 'Dal',
        description: 'Cook yellow split peas into a smooth dal with turmeric, cumin and ginger.',
        tips: ['Yellow split peas are interchangeable with chana dal in many recipes', 'A tarka (fried spice oil) poured over the top is the finishing touch'],
        difficulty: 'easy'
      },
      {
        name: 'Split pea dip',
        description: 'Cook until very soft, then blend with lemon, garlic and olive oil.',
        tips: ['Like a smoother, earthier hummus', 'Great on toast or with crudités'],
        difficulty: 'easy'
      },
      {
        name: 'In stews',
        description: 'Add split peas to stews to thicken them naturally as they cook.',
        tips: ['They break down and add body without any blending', 'Start with a smaller quantity as they expand'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Split pea soup', 'Yellow dal', 'Split pea dip on toast']
  },
  {
    name: 'Mung Beans',
    foodType: 'legume',
    similarTo: ['Split Peas', 'Lentils', 'Edamame', 'Peas'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Mung_beans_green.jpg/320px-Mung_beans_green.jpg',
    cookingMethods: [
      {
        name: 'Sprouted',
        description: 'Soak overnight, rinse twice daily for 2–3 days until sprouts appear.',
        tips: ['One of the easiest foods to sprout at home', 'Sprouts are great raw in salads or stir-fries'],
        difficulty: 'easy'
      },
      {
        name: 'Mung bean dal',
        description: 'Simmer whole or split mung beans with turmeric, ginger and garlic.',
        tips: ['Split mung beans cook very quickly (20–25 min)', 'Lighter than other dals — good for a simple meal'],
        difficulty: 'easy'
      },
      {
        name: 'Stir-fried sprouts',
        description: 'Toss fresh mung sprouts in a hot pan with garlic, ginger and tamari for 2–3 min.',
        tips: ['Keep the heat high for crunch', 'They cook extremely fast — 2 minutes is enough'],
        difficulty: 'easy'
      },
      {
        name: 'In soups and curries',
        description: 'Add whole cooked mung beans to soups or curries for a mild, earthy protein.',
        tips: ['They hold their shape better than lentils', 'Pairs well with coconut milk and fresh coriander'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Mung bean dal', 'Sprouted mung salad', 'Mung bean soup']
  },
  {
    name: 'Fava Beans',
    foodType: 'legume',
    similarTo: ['White Beans', 'Edamame', 'Peas', 'Chickpeas'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Broad_beans_in_pod.jpg/320px-Broad_beans_in_pod.jpg',
    cookingMethods: [
      {
        name: 'Simple with olive oil',
        description: 'Cook peeled beans in salted water for 3–4 min; dress with good olive oil and sea salt.',
        tips: ['Peel the grey outer skin after blanching for the best texture', 'Fresh or frozen both work well'],
        difficulty: 'easy'
      },
      {
        name: 'Fava bean dip (ful medames)',
        description: 'Mash cooked fava beans with lemon, garlic, cumin and olive oil.',
        tips: ['A North African/Middle Eastern staple — incredibly satisfying', 'Top with a drizzle of oil and fresh herbs'],
        difficulty: 'easy'
      },
      {
        name: 'In pasta or risotto',
        description: 'Toss peeled fava beans through pasta with mint, lemon and olive oil.',
        tips: ['Add at the last minute so they stay bright green', 'Pairs beautifully with asparagus in spring'],
        difficulty: 'easy'
      },
      {
        name: 'In grain salads',
        description: 'Add to farro, couscous or barley salads for texture and protein.',
        tips: ['They keep their shape well when cooked correctly', 'Combine with fresh herbs and a zingy vinaigrette'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Ful medames on toast', 'Fava bean pasta with mint', 'Fava bean grain salad']
  },
  {
    name: 'Hemp Seeds',
    foodType: 'other',
    similarTo: ['Sunflower Seeds', 'Chia Seeds', 'Flaxseeds', 'Pumpkin Seeds'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Hempseeds.jpg/320px-Hempseeds.jpg',
    cookingMethods: [
      {
        name: 'Sprinkled on anything',
        description: 'Add 2–3 tablespoons to smoothies, porridge, salads or grain bowls raw.',
        tips: ['No prep needed — they\'re soft enough to eat straight from the bag', 'Their mild nutty flavour works in both sweet and savoury dishes'],
        difficulty: 'easy'
      },
      {
        name: 'In smoothies',
        description: 'Blend into fruit or green smoothies for protein and healthy fats.',
        tips: ['They blend completely smooth — no gritty texture', 'A great alternative to protein powder'],
        difficulty: 'easy'
      },
      {
        name: 'Hemp seed dressing',
        description: 'Blend with lemon juice, garlic, water and herbs for a creamy dairy-free dressing.',
        tips: ['Creates a naturally thick, creamy consistency', 'Use in place of tahini or cashew cream'],
        difficulty: 'easy'
      },
      {
        name: 'In baking',
        description: 'Add to muffins, energy balls or homemade granola bars.',
        tips: ['A protein boost without changing the texture much', 'Pair with oats and dates for no-bake energy balls'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Hemp seed smoothie', 'Porridge with hemp seeds', 'Hemp seed dressing on salad']
  },
  {
    name: 'Flaxseeds',
    foodType: 'other',
    similarTo: ['Chia Seeds', 'Hemp Seeds', 'Sesame Seeds', 'Sunflower Seeds'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Flax_seeds.jpg/320px-Flax_seeds.jpg',
    cookingMethods: [
      {
        name: 'Flax egg (egg replacer)',
        description: 'Mix 1 tablespoon ground flaxseed with 3 tablespoons water; rest 5 min until gel forms.',
        tips: ['Use ground (not whole) flaxseeds for the gel to work', 'Replaces one egg in most baked goods'],
        difficulty: 'easy'
      },
      {
        name: 'Ground in porridge',
        description: 'Stir a tablespoon of ground flaxseed into oats or other porridge.',
        tips: ['Ground is more nutritious than whole — your body can\'t break down the whole seeds', 'Adds a very mild nutty flavour'],
        difficulty: 'easy'
      },
      {
        name: 'In baking',
        description: 'Add ground flaxseed to bread, muffins or pancakes for nutrition and binding.',
        tips: ['Replaces or reduces the need for other binders', 'Golden flaxseed has a slightly milder flavour than brown'],
        difficulty: 'easy'
      },
      {
        name: 'Flax crackers',
        description: 'Mix ground flaxseeds with water and seasoning; spread thin and bake until crisp.',
        tips: ['This actually works entirely on flax\'s binding properties', 'Season boldly — these need good flavour'],
        difficulty: 'medium'
      }
    ],
    easyMeals: ['Flax egg in vegan baking', 'Ground flax in porridge', 'Seeded loaf with flaxseed']
  },
  {
    name: 'Sesame Seeds',
    foodType: 'other',
    similarTo: ['Tahini', 'Sunflower Seeds', 'Hemp Seeds', 'Pumpkin Seeds'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Sesame_seeds_white.jpg/320px-Sesame_seeds_white.jpg',
    cookingMethods: [
      {
        name: 'Toasted as garnish',
        description: 'Dry-toast in a pan for 2–3 min until golden and fragrant; sprinkle on stir-fries, bowls and salads.',
        tips: ['Toast in a dry pan — no oil needed', 'Shake the pan constantly to prevent burning'],
        difficulty: 'easy'
      },
      {
        name: 'Sesame dressing',
        description: 'Mix toasted sesame oil, tamari, rice vinegar and a pinch of sugar for a classic Asian dressing.',
        tips: ['Toasted sesame oil is very strong — use just a teaspoon', 'Great on cucumber, edamame or noodle salads'],
        difficulty: 'easy'
      },
      {
        name: 'Coating for tofu',
        description: 'Press tofu in sesame seeds before pan-frying for a crunchy golden crust.',
        tips: ['Press tofu dry first for better adhesion', 'Mix with black sesame seeds for visual contrast'],
        difficulty: 'easy'
      },
      {
        name: 'In baking',
        description: 'Sprinkle on bread, rolls or crackers before baking; mix into cookie doughs.',
        tips: ['Black sesame seeds have a slightly more intense flavour', 'Brush with a little water to help seeds stick to dough'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Sesame noodles', 'Sesame-crusted tofu', 'Rice bowl with sesame dressing']
  },
  {
    name: 'Banana',
    foodType: 'other',
    similarTo: ['Mango', 'Avocado', 'Oats', 'Coconut Milk'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Chocolate-Chip-Cookies.jpg/320px-Banana-Chocolate-Chip-Cookies.jpg',
    cookingMethods: [
      {
        name: 'Banana nice cream',
        description: 'Blend frozen bananas in a food processor until smooth and creamy — like ice cream.',
        tips: ['Bananas must be fully ripe (very spotty) and frozen solid', 'Add peanut butter, cacao or berries for variety'],
        difficulty: 'easy'
      },
      {
        name: 'In smoothies',
        description: 'Add half a frozen banana for sweetness and creaminess without dairy.',
        tips: ['Peel and freeze in chunks before blending', 'Pairs with spinach, peanut butter, oat milk or berries'],
        difficulty: 'easy'
      },
      {
        name: 'Banana bread',
        description: 'Mash very ripe bananas into a simple batter with oat flour, oat milk and maple syrup.',
        tips: ['The riper the banana, the sweeter and more flavourful the bread', 'Add walnuts or chocolate chips'],
        difficulty: 'easy'
      },
      {
        name: 'As an egg replacer in baking',
        description: 'Use half a mashed banana in place of one egg in pancakes, muffins and cookies.',
        tips: ['Works best in recipes where a little banana flavour is welcome', 'Pair with cinnamon, vanilla or chocolate'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Banana nice cream', 'Banana smoothie', 'Vegan banana bread']
  },
  // ── Batch 3 additions ────────────────────────────────────────────
  {
    name: 'Parsnips',
    foodType: 'vegetable',
    similarTo: ['Carrots', 'Turnips', 'Butternut Squash', 'Sweet Potato'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Parsnip_on_white.jpg/320px-Parsnip_on_white.jpg',
    cookingMethods: [
      {
        name: 'Roasted',
        description: 'Peel, halve and roast at 200°C for 25–30 min until golden and caramelised.',
        tips: ['Parboil for 5 min first for a fluffy interior', 'A drizzle of maple syrup in the last 10 min adds gorgeous colour'],
        difficulty: 'easy'
      },
      {
        name: 'Mashed',
        description: 'Boil until very soft, mash with oat milk and olive oil.',
        tips: ['A little grated nutmeg is the classic addition', 'Mix half and half with potato for a more familiar flavour'],
        difficulty: 'easy'
      },
      {
        name: 'Soup',
        description: 'Roast parsnips first, then blend with vegetable stock and a hint of curry powder.',
        tips: ['Roasting deepens the flavour significantly before blending', 'A swirl of coconut milk makes it luxurious'],
        difficulty: 'easy'
      },
      {
        name: 'Parsnip chips',
        description: 'Slice very thinly with a peeler, toss in oil and bake at 180°C until crisp.',
        tips: ['Watch carefully — they go from golden to burnt fast', 'Season with rosemary and sea salt'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Roasted parsnips', 'Parsnip and apple soup', 'Parsnip mash']
  },
  {
    name: 'Radishes',
    foodType: 'vegetable',
    similarTo: ['Turnips', 'Carrots', 'Cucumber', 'Beets'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Radishes.jpg/320px-Radishes.jpg',
    cookingMethods: [
      {
        name: 'Raw in salads',
        description: 'Slice thinly and add to salads for a peppery crunch.',
        tips: ['Soaking in ice water for 10 min removes some of the sharpness', 'Slice paper-thin on a mandolin for the best texture'],
        difficulty: 'easy'
      },
      {
        name: 'Pickled',
        description: 'Slice and cover with rice vinegar, sugar and salt for 30 min.',
        tips: ['Quick-pickled radishes are a revelation — sweet, sharp, bright pink', 'Use as a taco or ramen topping'],
        difficulty: 'easy'
      },
      {
        name: 'Roasted',
        description: 'Halve and roast at 200°C for 20 min — the heat mellows and sweetens them.',
        tips: ['They lose their sharp bite completely when roasted', 'Toss with butter beans and fresh herbs'],
        difficulty: 'easy'
      },
      {
        name: 'Radish tacos topping',
        description: 'Slice thinly and use as a fresh topping on tacos and grain bowls.',
        tips: ['Combine with avocado and pickled jalapeños for contrast', 'The texture and colour are beautiful'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Radish and cucumber salad', 'Quick-pickled radishes', 'Grain bowl with roasted radishes']
  },
  {
    name: 'Tortillas',
    foodType: 'grain',
    similarTo: ['Bread (All)', 'Bread (Whole Wheat)', 'Couscous', 'Rice (All)'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Flour_tortillas.jpg/320px-Flour_tortillas.jpg',
    cookingMethods: [
      {
        name: 'Wraps and burritos',
        description: 'Fill with beans, rice, roasted veg and avocado and wrap tightly.',
        tips: ['Warm the tortilla first so it stays pliable and doesn\'t crack', 'Layer ingredients in the centre, not across the whole surface'],
        difficulty: 'easy'
      },
      {
        name: 'Tacos',
        description: 'Char briefly over a gas flame or in a dry pan for 30 seconds each side.',
        tips: ['Corn tortillas have better flavour for tacos; flour for burritos', 'Keep warm in a folded tea towel'],
        difficulty: 'easy'
      },
      {
        name: 'Quesadillas',
        description: 'Fill with beans and roasted veg, fold and pan-fry until crispy.',
        tips: ['Press down with a spatula for even contact', 'A cashew cheese spread works well as a filling binder'],
        difficulty: 'easy'
      },
      {
        name: 'Tortilla chips',
        description: 'Cut into wedges, brush with oil, bake at 180°C for 10–12 min until crispy.',
        tips: ['Season with cumin and smoked paprika before baking', 'Much better than shop-bought and uses up stale tortillas'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Bean and veggie burrito', 'Jackfruit tacos', 'Quesadillas with black beans']
  },
  {
    name: 'Buckwheat',
    foodType: 'grain',
    similarTo: ['Quinoa', 'Millet', 'Oats', 'Barley'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Buckwheat_kasha.jpg/320px-Buckwheat_kasha.jpg',
    cookingMethods: [
      {
        name: 'Buckwheat porridge (kasha)',
        description: 'Simmer toasted buckwheat groats in water (1:2 ratio) for 15 min.',
        tips: ['Toast in a dry pan first until nutty and fragrant', 'Despite the name, it\'s naturally gluten-free'],
        difficulty: 'easy'
      },
      {
        name: 'In grain bowls',
        description: 'Use cooked buckwheat as a nutty base for roasted veg and tahini dressing.',
        tips: ['The earthy flavour pairs well with mushrooms and root vegetables', 'Batch cook at the start of the week'],
        difficulty: 'easy'
      },
      {
        name: 'Buckwheat pancakes',
        description: 'Mix buckwheat flour with oat milk and a flax egg for hearty, nutty pancakes.',
        tips: ['The flavour is bold — add vanilla and maple syrup to balance', 'Pairs well with blueberries or banana'],
        difficulty: 'easy'
      },
      {
        name: 'Soba noodles',
        description: 'Cook soba (buckwheat noodles) per package; serve cold with sesame dressing.',
        tips: ['Rinse in cold water after cooking to stop them sticking', 'Check the label — some soba contains wheat too'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Buckwheat porridge', 'Soba noodle salad', 'Grain bowl with roasted veg']
  },
  {
    name: 'Polenta',
    foodType: 'grain',
    similarTo: ['Millet', 'Buckwheat', 'Rice (All)', 'Oats'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Polenta.jpg/320px-Polenta.jpg',
    cookingMethods: [
      {
        name: 'Creamy soft polenta',
        description: 'Whisk fine polenta into boiling salted water (1:4 ratio), stir constantly for 15 min.',
        tips: ['Keep stirring to avoid lumps', 'Stir in olive oil and nutritional yeast at the end for a cheesy finish'],
        difficulty: 'easy'
      },
      {
        name: 'Set and slice',
        description: 'Pour cooked polenta into a tin, cool until firm, then slice and pan-fry or bake.',
        tips: ['Oil the tin so it releases cleanly', 'Top the slices with roasted veg or tomato sauce'],
        difficulty: 'easy'
      },
      {
        name: 'Grilled polenta',
        description: 'Cut set polenta into slabs and grill until golden and marked.',
        tips: ['Brush with herb oil before grilling for flavour', 'Serve as a gluten-free pizza base alternative'],
        difficulty: 'easy'
      },
      {
        name: 'Polenta with ragu',
        description: 'Serve creamy polenta topped with a rich lentil or mushroom sauce.',
        tips: ['The sweetness of polenta balances earthy sauces beautifully', 'A classic Italian combination'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Creamy polenta with mushrooms', 'Grilled polenta slabs', 'Polenta with lentil ragu']
  },
  {
    name: 'Pine Nuts',
    foodType: 'other',
    similarTo: ['Cashews', 'Almonds', 'Sunflower Seeds', 'Walnuts'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Pine_nuts.jpg/320px-Pine_nuts.jpg',
    cookingMethods: [
      {
        name: 'Toasted as garnish',
        description: 'Dry-toast in a pan on medium heat for 3–4 min, stirring constantly until golden.',
        tips: ['They burn extremely easily — never leave the pan', 'Sprinkle over pasta, salads or grain bowls'],
        difficulty: 'easy'
      },
      {
        name: 'Classic basil pesto',
        description: 'Blend with fresh basil, garlic, olive oil and nutritional yeast.',
        tips: ['Use good-quality olive oil for the best flavour', 'Freeze pesto in ice cube trays for portion-sized servings'],
        difficulty: 'easy'
      },
      {
        name: 'In stuffings',
        description: 'Mix with dried fruit, herbs and grains to stuff peppers, squash or cabbage leaves.',
        tips: ['A combination of pine nuts and raisins is a classic Mediterranean flavour pairing', 'Toast first for depth'],
        difficulty: 'easy'
      },
      {
        name: 'In baking',
        description: 'Press into focaccia dough before baking or scatter over tarts.',
        tips: ['They get beautifully golden in the oven', 'Pair with rosemary for a classic Italian flavour'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Basil pesto pasta', 'Toasted pine nut salad', 'Roasted veg with pine nuts']
  },
  {
    name: 'Pistachios',
    foodType: 'other',
    similarTo: ['Cashews', 'Almonds', 'Pine Nuts', 'Walnuts'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Pistachiosopen.jpg/320px-Pistachiosopen.jpg',
    cookingMethods: [
      {
        name: 'Crushed as a crust',
        description: 'Blitz pistachios and press onto tofu or firm polenta before baking.',
        tips: ['The green colour is striking and the flavour is amazing', 'Mix with breadcrumbs for a lighter coating'],
        difficulty: 'easy'
      },
      {
        name: 'In salads',
        description: 'Roughly chop and scatter over salads for colour, crunch and richness.',
        tips: ['Pairs beautifully with citrus, beets and fresh herbs', 'Use unsalted for cooking, salted for snacking'],
        difficulty: 'easy'
      },
      {
        name: 'Pistachio cream / butter',
        description: 'Blend until smooth for a rich, green nut butter.',
        tips: ['Blanch first for a brighter green colour', 'Expensive but stunning on toast or in desserts'],
        difficulty: 'medium'
      },
      {
        name: 'In rice dishes',
        description: 'Stir into pilafs or rice dishes with saffron, dried fruit and herbs.',
        tips: ['A classic Persian flavour combination', 'Add at the end so they keep their crunch'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Pistachio-crusted tofu', 'Beet salad with pistachios', 'Saffron rice with pistachios']
  },
  {
    name: 'Hazelnuts',
    foodType: 'other',
    similarTo: ['Almonds', 'Walnuts', 'Cashews', 'Pine Nuts'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Hazelnuts.jpg/320px-Hazelnuts.jpg',
    cookingMethods: [
      {
        name: 'Roasted and skinned',
        description: 'Roast at 180°C for 10–12 min, then rub in a tea towel to remove the papery skins.',
        tips: ['The skin is bitter — removing it makes a huge difference', 'They don\'t need to be perfectly skinned'],
        difficulty: 'easy'
      },
      {
        name: 'Hazelnut butter',
        description: 'Blend roasted, skinned hazelnuts until very smooth and creamy.',
        tips: ['The base of the world\'s most famous chocolate spread', 'Add cacao powder and maple syrup for a homemade version'],
        difficulty: 'easy'
      },
      {
        name: 'In salads',
        description: 'Roughly chop and scatter over salads, especially bitter greens.',
        tips: ['Pairs classically with beets, citrus and Belgian endive', 'Toast briefly before using for more flavour'],
        difficulty: 'easy'
      },
      {
        name: 'In baking',
        description: 'Add to brownies, biscuits or tarts for a deep nutty flavour.',
        tips: ['Hazelnut flour (blitzed hazelnuts) makes incredible gluten-free bakes', 'Pair with chocolate, coffee or orange'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Homemade chocolate hazelnut spread', 'Hazelnut and beet salad', 'Hazelnut brownies']
  },
  {
    name: 'Natto',
    foodType: 'legume',
    similarTo: ['Tempeh', 'Miso', 'Tofu', 'Edamame'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Natto_Mito.jpg/320px-Natto_Mito.jpg',
    cookingMethods: [
      {
        name: 'Over rice',
        description: 'Stir with the included sauce and mustard packets, serve over hot steamed rice.',
        tips: ['The classic Japanese way — stir vigorously to develop the stringy texture', 'Top with spring onion, sesame seeds and a little tamari'],
        difficulty: 'easy'
      },
      {
        name: 'In sushi rolls',
        description: 'Use as a filling in maki rolls alongside cucumber and avocado.',
        tips: ['A natto roll is a classic Japanese staple', 'The strong flavour pairs well with pickled ginger'],
        difficulty: 'medium'
      },
      {
        name: 'In miso soup',
        description: 'Stir a spoonful of natto into miso soup just before serving.',
        tips: ['It adds protein and probiotic benefit', 'Don\'t cook it — add at the end off the heat'],
        difficulty: 'easy'
      },
      {
        name: 'On toast',
        description: 'Spread on toast with avocado and a drizzle of tamari.',
        tips: ['A surprisingly good fusion combination', 'Start with a small amount if you\'re new to the flavour'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Natto over rice', 'Natto miso soup', 'Natto toast with avocado']
  },
  {
    name: 'Kimchi',
    foodType: 'vegetable',
    similarTo: ['Cabbage', 'Miso', 'Ginger', 'Peppers'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Korean_kimchi.jpg/320px-Korean_kimchi.jpg',
    cookingMethods: [
      {
        name: 'As a condiment',
        description: 'Serve straight from the jar alongside rice, noodles or grain bowls.',
        tips: ['No prep needed — it\'s ready to eat', 'A small serving goes a long way — it\'s very flavourful'],
        difficulty: 'easy'
      },
      {
        name: 'Kimchi fried rice',
        description: 'Stir-fry day-old rice with chopped kimchi, tamari and toasted sesame oil.',
        tips: ['Use old, cold rice for the best texture — it won\'t clump', 'Add edamame or tofu for protein'],
        difficulty: 'easy'
      },
      {
        name: 'Kimchi pancakes (kimchijeon)',
        description: 'Mix chopped kimchi with flour and water to make crispy, savoury pancakes.',
        tips: ['Use a generous amount of oil for the crispy edge', 'Serve with a tamari-vinegar dipping sauce'],
        difficulty: 'easy'
      },
      {
        name: 'Kimchi soup (kimchi jjigae)',
        description: 'Simmer older kimchi with tofu, mushrooms and gochugaru in vegetable broth.',
        tips: ['Older, more sour kimchi is best for soups', 'The longer it simmers, the better it tastes'],
        difficulty: 'easy'
      }
    ],
    easyMeals: ['Kimchi fried rice', 'Kimchi pancakes', 'Kimchi and tofu soup']
  }
]
export function getSuggestionsForFood(foodName: string): FoodSuggestion | undefined {
  return foodSuggestions.find(s =>
    s.name.toLowerCase() === foodName.toLowerCase()
  )
}

export function getParentSuggestion(foodName: string): FoodSuggestion | undefined {
  const food = getSuggestionsForFood(foodName)
  if (!food?.parent) return undefined
  return getSuggestionsForFood(food.parent)
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

export function getAllSuggestedFoods(): string[] {
  return foodSuggestions.map(s => s.name)
}

export function getFoodType(name: string): FoodType {
  const match = foodSuggestions.find(s => s.name.toLowerCase() === name.toLowerCase())
  return match?.foodType ?? 'other'
}

const GLUTEN_PATTERNS = ['wheat', 'barley', 'rye', 'spelt', 'seitan', 'pasta', 'bread', 'farro', 'couscous', 'bulgur', 'kamut', 'triticale']
const NUT_PATTERNS    = ['almond', 'cashew', 'walnut', 'pecan', 'peanut', 'pistachio', 'hazelnut', 'brazil nut', 'pine nut', 'macadamia', 'tahini', 'nut butter']
const SOY_PATTERNS    = ['tofu', 'tempeh', 'edamame', 'soy', 'miso', 'tamari']

export function getTagsForFood(name: string): DietaryTag[] {
  const lower = name.toLowerCase()
  const tags: DietaryTag[] = []
  if (!GLUTEN_PATTERNS.some(p => lower.includes(p))) tags.push('gluten-free')
  if (!NUT_PATTERNS.some(p => lower.includes(p)))    tags.push('nut-free')
  if (!SOY_PATTERNS.some(p => lower.includes(p)))    tags.push('soy-free')
  const food = foodSuggestions.find(s => s.name.toLowerCase() === lower)
  if (food?.foodType === 'vegetable') {
    tags.push('raw-friendly')
    tags.push('oil-free')
  }
  return tags
}

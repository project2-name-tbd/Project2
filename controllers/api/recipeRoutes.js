const router = require("express").Router();
const { Recipe, recipeJoin, User, Ingredient } = require("../../models");

// post new recipe from new-recipe form
router.post("/", async (req, res) => {
  try {
    const dbRecipe = await Recipe.create({
      title: req.body.title,
      description: req.body.description,
      owner_id: req.session.user_id,
      timestamp: new Date().toLocaleString(),
    });
    console.log(req.body.recipeName);
    console.log(dbRecipe);

    const { ingredients } = req.body;
    // for each ingredient
    for (let i = 0; i < ingredients.length; i++) {
      // lookup ingredient from ingredient table
      const [ingredientFind] = await Ingredient.findOrCreate({
        where: { term: ingredients[i].term },
      });

      console.log("ingredientFind:", ingredientFind);
      // set recipe id
      const ingredientDetails = {
        recipe_id: dbRecipe.id,
        ingredient_id: ingredientFind.id,
        unitOfMeasure: ingredients[i].unitOfMeasure,
        quantity: ingredients[i].quantity,
      };
      console.log("ingredientdetails", ingredientDetails);
      await recipeJoin.create(ingredientDetails);
    }

    console.log(ingredients);
    res.status(200).json(dbRecipe);
    console.table(dbRecipe);
    console.table(ingredients);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get the recipe that the user just published, and render is on recipe handlebars
router.get("/", async (req, res) => {
  try {

    const newRecipe = await Recipe.findOne({
      where: { owner_id: req.session.user_id },
      order: [["timestamp", "DESC"]],
      include: [ 
        {
          model: Ingredient,
          through: recipeJoin,
          as: "ingredients",
          attributes: ['id', 'term'],
        },
      ]
    });
  
    const recipe = newRecipe.get({ plain: true });
    
    
    recipe.ingredients = recipe.ingredients.map((ingredient) => {
      return {
        term: ingredient.term,
        quantity: ingredient.recipeJoin.quantity,
        unitOfMeasure: ingredient.recipeJoin.unitOfMeasure
      }
    })
    res.render('recipe', {recipe, logged_in: true})

  }  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

// get this user's recipe that they have selected, by id, and render recipe handlebars
router.get("/:id", async (req, res) => {
  try {
    const dbSavedRecipe = await Recipe.findByPk(req.params.id, {
      where: {owner_id: req.session.user_id},
      include: [ 
        {
          model: Ingredient,
          through: recipeJoin,
          as: "ingredients",
        },
      ] 
    });
    

    const recipe = dbSavedRecipe.get({ plain: true });
    
    
    recipe.ingredients = recipe.ingredients.map((ingredient) => {
      return {
        term: ingredient.term,
        quantity: ingredient.recipeJoin.quantity,
        unitOfMeasure: ingredient.recipeJoin.unitOfMeasure
      }
    });
    console.log("getting recipe by ID", recipe);
    res.render('recipe', {recipe, logged_in: true});

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// delete a recipe by the recipe id
router.delete('/:id', async (req, res) => {
  try {
    const recipeData = await Recipe.destroy({
      where: {
        id: req.params.id,
        owner_id: 6,
      },
    });
    console.log(recipeData)

    if (!recipeData) {
      res.status(404).json({ message: 'No recipe found with this id!' });
      return;
    }
    
    res.status(200).json({message: 'successfully removed this recipe!'});
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;


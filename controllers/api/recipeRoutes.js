const router = require("express").Router();
const { Recipe, recipeJoin, User, Ingredient } = require("../../models");

// post routes from front end when user creates their new recipe
router.post("/", async (req, res) => {
  try {
    const dbRecipe = await Recipe.create({
      title: req.body.title,
      description: req.body.description,
      owner_id: req.session.user_id,
      timestamp: new Date().toLocaleDateString(),
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

// get route for new-recipe.handlebars

// Display the saved recipes
router.get("/", async (req, res) => {
  try {

    const newRecipe = await Recipe.findOne({
      where: { owner_id: 6 },
      order: [["timestamp", "DESC"]],
      include: [ 
        { model: recipeJoin,
          attributes: ['recipe_id', 'ingredient_id', 'unitOfMeasure', 'quantity', ],
         }, 
        {
          model: Ingredient,
          through: recipeJoin,
          as: "ingredients",
          attributes: ['id', 'term'],
        },
      ]
    });
  

   
    const recipes = newRecipe.get({ plain: true });
    // console.log(recipes);
    
    const recipeDetails = recipes.recipeJoins;

    var jsonObj = {};
    for(let i=0; i < recipes.recipeJoins.length; i++){
      jsonObj[i] = recipes.recipeJoins[i];
    }
    
    console.log(jsonObj);
    console.log(jsonObj[0].unitOfMeasure);
    // res.status(200).json(recipes);
    console.log(recipes);
    console.log(recipes.recipeJoins.length);
    
    res.render('recipe', {recipes, jsonObj, logged_in: true})

  }  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

    

    // res.render("recipe", { recipe, logged_in: true });

router.get("/:id", async (req, res) => {
  try {
    const dbSavedRecipes = await Recipe.findByPk(req.params.id, {
      where: {owner_id: req.session.user_id},
      include: [{ model: recipeJoin }, {model: Ingredient,  through: recipeJoin,
        as: "ingredients",}, { model: User }],
    });


    if (!dbSavedRecipes) {
      console.log("No recipes to display");
      return;
    }

    const recipes = dbSavedRecipes.get({ plain: true });
    console.log("getting recipe by ID", recipes)
    res.render("recipe", { recipes, logged_in: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

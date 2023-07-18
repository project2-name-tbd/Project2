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
    const dbRecipes = await Recipe.findOne({
      where: { owner_id: 6},
      order: [ [ 'timestamp', 'DESC' ]],
      include: [
      //   {
      //     model: Recipe,
      //     through: recipeJoin,
      //     as: "recipes",
      //   },
        {
          model: Ingredient,
          through: recipeJoin,
          as: "ingredients",
        },
      ],
    });

    console.log(dbRecipes);
    // map((recipe) => recipe.

    const recipes = dbRecipes.get({ plain: true });
    console.log(recipes);

    res.status(200).json(dbRecipes);

    res.render("recipe", { recipes });
    

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// router.get("/:id", async (req, res) => {
//   try {
//     const dbSavedRecipes = await Recipe.findByPk(req.params.id, {
//       include: [{ model: recipeJoin }, { model: User }],
//     });

//     if (!dbSavedRecipes) {
//       console.log("No recipes to display");
//       return;
//     }

//     const savedRecipes = dbRecipes.get({ plain: true });
//     res.render("recipe", { savedRecipes });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

module.exports = router;

const router = require("express").Router();
const { Recipe, recipeJoin, User } = require("../../models");

// post routes from front end when user creates their new recipe
router.post("/", async (req, res) => {
  try {
    const dbRecipe = await Recipe.create({
      title: req.body.recipeName,
      description: req.body.recipeDescription,
      ingredients: req.body.ingredientString,
      unitOfMeasure: req.body.measurementString,
      quantity: req.body.quantityString,
      owner_id: req.session.user_id,
      timestamp: new Date().toLocaleDateString(),
    });

    res.status(200).json(dbRecipe);
    console.table(dbRecipe);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get route for new-recipe.handlebars

// Display the saved recipes
// router.get("/", async (req, res) => {
//   try {
//     const dbRecipes = await Recipe.findAll({
//       include: [
//         {
//           model: Recipe,
//           attributes: [
//               "id",
//               "title",
//               "description",
//               "measurement",
//               "owner_id"
//             ],
//         },
//       ],
//     });
//     const allRecipes = dbRecipes.get({ plain: true });
//     res.render("recipe", { allRecipes });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

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

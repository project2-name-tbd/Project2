const router = require("express").Router();
const { User, Recipe, recipeJoin } = require("../models");
const withAuth = require("../utils/auth");

// get request, after client loggs in, presented with list of their saved recipes (on right side of page?)

router.get("/signup", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

router.get("/login", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/", withAuth, async (req, res) => {
  try {
    const recipeData = await Recipe.findAll({
      where: { owner_id: req.session.user_id },
    });

    const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));

    // res.status(200).json(recipes)
    console.log(recipes, "is this working");
    res.render("homepage", { recipes, logged_in: true });
    
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/new-recipe", withAuth, async (req, res) => {
  
     res.render("new-recipe", {logged_in: true});
});

router.get("/recipe", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  // When adding new ingredient, quantity, and unit, can just concatenate with , + word. Need comma to delimit into array

  console.log("here");
  try {
    const recipeData = await Recipe.findByPk(req.params.id, {
      // include: [{ model: Recipe, through: recipeJoin, as: 'userRecipes' }]
    });
    // console.log(recipeData[0].ingredients);
    // for (var i = 0; i < recipeData.length; i++) {
    //   const ingredientsArray = recipeData[i].ingredients.split(",");
    //   const unitsArray = recipeData[i].unitOfMeasure.split(",");
    //   const quantityArray = recipeData[i].quantity.split(",");

    //   console.log(ingredientsArray);
    //   console.log(unitsArray);
    //   console.log(quantityArray);

    //   for (var j = 0; j < ingredientsArray.length; j++) {
    //     console.log(` PRINTING OUT EACH INGREDIENT ITEM: ${quantityArray[i]} ${unitsArray[i]} ${ingredientsArray[i]}`);
    //   }
    // }
    
    res.status(200).send(recipeData);
  } 
  catch (err) {
    res.status(500).json(err);
  }

  res.render("recipe", { logged_in: true });

});

module.exports = router;

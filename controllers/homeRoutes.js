const router = require("express").Router();
const { User, Recipe, recipeJoin } = require("../models");
const withAuth = require("../utils/auth");

// render the signup page
router.get("/signup", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

// render the login page
router.get("/login", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

// get all recipes this user has created, and render on homepage
router.get("/", withAuth, async (req, res) => {
  try {
    const recipeData = await Recipe.findAll({
      where: { owner_id: req.session.user_id },
    });

    const noRecipe = recipeData.length === 0;

    const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));

    // res.status(200).json(recipes)
    console.log(recipes, "is this working");
    res.render("homepage", { recipes, noRecipe, logged_in: true });
    
  } catch (err) {
    res.status(500).json(err);
  }
});

// get new-recipe form
router.get("/new-recipe", withAuth, async (req, res) => {
  
     res.render("new-recipe", {logged_in: true});
});

// 
router.get("/recipe", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  app.get("/public", (req, res) => {
    res.render("assets");
});

  console.log("here");
  try {
    const recipeData = await Recipe.findByPk(req.params.id, {
      include: [{ model: Recipe, through: recipeJoin, as: 'userRecipes' }]
    });
    
    res.status(200).send(recipeData);
  } 
  catch (err) {
    res.status(500).json(err);
  }

  res.render("recipe", { logged_in: true });

});

module.exports = router;

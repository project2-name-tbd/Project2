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

const router = require("express").Router();
const { User, Recipe } = require("../models");
const withAuth = require("../utils/auth");

// get request, after client loggs in, presented with list of their saved recipes (on right side of page?)

router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

router.get("/login", (req, res) => {
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
    res.render("homepage", { recipes });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/new-recipe", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("new-recipe");
});

router.get("/recipe", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("recipe");
});

module.exports = router;

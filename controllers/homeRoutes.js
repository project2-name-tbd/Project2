const router = require("express").Router();
const { User, Recipe } = require("../models");
const withAuth = require("../utils/auth");

// get request, after client loggs in, presented with list of their saved recipes (on right side of page?)

router.get("/:id", withAuth, async (req, res) => {
  try {
    const userRecipes = await Recipe.findAll({
      where: {
        owner_id: req.params.id,
      },
    });
    res.render("homepage", {
      userRecipes,
    });
    // const userRecipe = res.render("homepage", {
    //   users,
    //   logged_in: req.session.logged_in,
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

router.get("/new-recipe", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("new-recipe");
});

module.exports = router;

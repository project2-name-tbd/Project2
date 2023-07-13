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
    const userRecipes = await Recipe.findAll({
      where: {
        owner_id: req.session.User.id,
      },
    });
    console.log(userRecipes)
    res.status(200).json(userRecipes)
    res.render("homepage", {
      userRecipes,
    });
   
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

module.exports = router;

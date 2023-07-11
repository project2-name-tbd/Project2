const router = require("express").Router();
const { Recipe, recipeJoin, User } = require("../../models");

// put routes from front end when user creates their new recipe
router.post("/", async (req, res) => {
  try {
    const dbRecipe = await Recipe.create({
      title: req.body.title,
      description: req.body.description,
      measurement: req.body.measurement,
      ingredients: req.body.ingredients, //this will be a list, need to update to account for multiple items
      created_by: req.body.username,
      timestamp: new Date().toLocaleDateString(),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Display the saved recipes
router.post("/", async (req, res) => {});

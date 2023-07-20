const router = require("express").Router();
const { Recipe, recipeJoin, User, Ingredient } = require("../../models");
const {Op} = require("sequelize");

// send ingredient that starts with the letter user has typed in
router.get("/:term", async (req, res) => {
  console.log("YOU MADE IT");
  try {
    const ingredientData = await Ingredient.findAll({
      where: { term: {[Op.startsWith]: req.params.term}}, 
      limit: 10,
    });
    console.log(ingredientData);

    res.status(200).send(ingredientData);
    console.table("hello");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

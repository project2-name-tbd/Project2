const router = require("express").Router();
const { Recipe, recipeJoin, User, Ingredient } = require("../../models");

router.get("/:term", async (req, res) => {
  console.log("YOU MADE IT");
  try {
    const ingredientData = await Ingredient.findOne({
      where: { term: req.params.term },
    });
    console.log(ingredientData.term);

    res.status(200).send(ingredientData.term);
    console.table("hello");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

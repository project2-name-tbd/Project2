const sequelize = require("../config/connection");
const { User, Recipe, Ingredient, recipeJoin } = require("../models");

const userData = require("./userData.json");
const ingredientList = require("./ingredient-list.json");
const recipe = require("./recipe.json");
const joinedRecipe = require("./recipe-join.json");
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Ingredient.bulkCreate(ingredientList, {
    individualHooks: true,
    returning: true,
  });
  await Recipe.bulkCreate(recipe, {
    individualHooks: true,
    returning: true,
  });
  await recipeJoin.bulkCreate(joinedRecipe, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();

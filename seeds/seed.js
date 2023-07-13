const sequelize = require("../config/connection");
const { User, Recipe, Ingredient } = require("../models");

// const userData = require("./userData.json");
const ingredientList = require("./ingredient-list.json");
const recipe = require("./recipe.json");
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // await User.bulkCreate(userData, {
  //   individualHooks: true,
  //   returning: true,
  // });

  await Ingredient.bulkCreate(ingredientList, {
    individualHooks: true,
    returning: true,
  });
  await Recipe.bulkCreate(recipe, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();

const User = require("./User");
const Recipe = require("./recipe");
const recipeJoin = require("./recipeJoin");
const Ingredient = require("./ingredient");

// many to many relationships between:
// users have many recipes saved,

User.hasMany(Recipe, {
  foreignKey: "owner_id",
});

Recipe.belongsTo(User, {
  foreignKey: "owner_id",
});

Recipe.belongsToMany(Ingredient, {
  through: {
    model: recipeJoin, unique: false
  }, 
  as: "ingredients"
});

Ingredient.belongsToMany(Recipe, {
  through: {
    model: recipeJoin, unique: false
  }, 
  as: "recipes"
})

// recipeJoin.belongsTo(Recipe, {
//   foreignKey: "recipe_id",
// });


module.exports = { User, Recipe, recipeJoin, Ingredient };

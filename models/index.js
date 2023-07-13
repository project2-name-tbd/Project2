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

recipeJoin.belongsTo(User, {
  foreignKey: "user_id",
});
recipeJoin.belongsTo(Recipe, {
  foreignKey: "recipe_id",
});
Recipe.hasMany(recipeJoin, {
  foreignKey: "recipe_id",
});
User.hasMany(recipeJoin, {
  foreignKey: "user_id",
});

module.exports = { User, Recipe, recipeJoin, Ingredient };

const User = require("./User");
const Recipe = require("./recipe");
const recipeJoin = require("./recipeJoin");

module.exports = { User };

// many to many relationships between:
// users have many recipes saved,

User.belongsToMany(Recipe, {
  through: recipeJoin,
  foreignKey: "user_id",
  otherKey: "recipe_id",
});

Recipe.belongsToMany(User, {
  through: recipeJoin,
  foreignKey: "recipe_id",
  otherKey: "user_id",
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

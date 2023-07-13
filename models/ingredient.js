const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Ingredient extends Model {}

Ingredient.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    ingredientId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    searchValue: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    term: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    useCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "ingredient",
  }
);

module.exports = Ingredient;

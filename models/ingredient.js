const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Ingredient extends Model {}

Ingredient.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    ingredientId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    searchValue: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    term: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    useCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
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

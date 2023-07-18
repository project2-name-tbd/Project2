const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class recipeJoin extends Model {}

recipeJoin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    recipe_id: {
      type: DataTypes.INTEGER,
      allowNull:false,
      references: {
        model: "recipe",
        key: "id",
        unique: false,
      },
    },
    ingredient_id: {
      type: DataTypes.INTEGER,
      allowNull:false,
      references: {
        model: "ingredient",
        key: "id",
        unique: false,
      },
    },
    unitOfMeasure: {
      type: DataTypes.STRING,
    },
    quantity: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    modelName: "recipeJoin",
  }
);

module.exports = recipeJoin;

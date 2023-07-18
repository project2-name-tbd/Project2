const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/connection");

class Recipe extends Model {}

Recipe.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Recipe",
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Recipe description",
    },
    //   recipe-level setting that controls metric/us
    // measurement: {
    //   type: DataTypes.BOOLEAN,
    //   allowNull: true,
    //   defaultValue: true,
    // },
    //   not sure how to do ingredient list... array of objects?
    // ingredients: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
    // unitOfMeasure: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
    // quantity: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: "CASCADE",
      references: {
        model: "user",
        key: "id",
      },
    },
    timestamp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "recipe",
  }
);

module.exports = Recipe;

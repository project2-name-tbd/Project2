const { Model, DataTypes } = require("sequelize");
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
      defaultValue: 'Recipe'
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Recipe description'
    },
    //   recipe-level setting that controls metric/us
    measurement: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    //   not sure how to do ingredient list... array of objects?
    // ingredient_id: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    //   references: {
    //     model: 'ingredient',
    //     key: 'id'
    //   }
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

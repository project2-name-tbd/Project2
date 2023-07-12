const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Recipe extends Model {}

Recipe.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  //   recipe-level setting that controls metric/us
  measurement: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  //   not sure how to do ingredient list... array of objects? 
  ingredients: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'ingredient', 
      key: 'id'
    }
  },
  created_by: {
    type: DataTypes.STRING,
    allowNull: true,
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
});

module.exports = Recipe;

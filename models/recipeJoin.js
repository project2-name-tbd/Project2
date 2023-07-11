const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class recipeJoin extends Model {}

recipeJoin.init( {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
            model:'user',
            key: 'id' 
        }
      }, 
      recipe_id: {
    type: DataTypes.INTEGER,
        references: {
            model:'recipe',
            key: 'id'   
        }
      }, 
      {
        sequelize,
        timestamps: true,
        underscored: true,
        freezeTableName: true,
        modelName: 'recipeJoin',
    }
})
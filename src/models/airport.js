'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airport extends Model {
    static associate(models) {
       this.belongsTo(models.City,{
        foreignKey:'cityId',
        onDelete :'CASCADE'
       });
    }
  }
  Airport.init({
    name: {
      type:DataTypes.STRING,
      allowNull : false,
      unique : true
    },
    code:{
      type: DataTypes.STRING,
      allowNull : false,
      unique : true
    }, 
    address : {
      type: DataTypes.STRING,
      unique : true
    },
    cityId: {
      type : DataTypes.INTEGER,
      allowNull : false,
      unique : true
    }
    
  }, {
    sequelize,
    modelName: 'Airport',
  });
  return Airport;
};
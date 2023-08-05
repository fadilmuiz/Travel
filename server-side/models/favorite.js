'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Travel, {foreignKey: "TravelId"})
      this.belongsTo(models.User, {foreignKey : "UserId"})
    }
  }
  Favorite.init({
    UserId: DataTypes.INTEGER,
    TravelId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    street: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Favorite',
  });
  return Favorite;
};
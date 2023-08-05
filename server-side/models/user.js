'use strict';
const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Favorite, {foreignKey: "UserId"})
    }
  }
  User.init({
    username: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull: {
          msg: 'name is required'
        },
        notEmpty: {
          msg: 'name is required'
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Email is required'
        },
        notEmpty: {
          msg: 'Email is required'
        },
        isEmail: {
          msg: 'Invalid email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password is required'
        },
        notEmpty: {
          msg: 'Password is required'
        }
      }
    },
    status: {
      type:DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instance)=>{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(instance.password , salt);
    instance.password = hash;
  })
  return User;
};
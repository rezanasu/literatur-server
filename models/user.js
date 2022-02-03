'use strict';
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);


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
      User.belongsToMany(models.Book, {through: models.User_Read, foreignKey: "userId"})
      User.hasMany(models.User_Read, {foreignKey: "userId"})
      User.belongsToMany(models.Book, {through: models.Favourite, foreignKey: "userId"})
      User.belongsToMany(models.Book, {through: models.Wishlist, foreignKey: "userId"})
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Email cannot be empty"
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Username cannot be empty"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password cannot be empty"
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        const hash = bcrypt.hashSync(instance.password, salt)
        instance.password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};
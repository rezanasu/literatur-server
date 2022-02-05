'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.belongsToMany(models.User, {as: "User_Favourite", through: models.Favourite, foreignKey: "bookId"})
      Book.belongsToMany(models.User, {as: "User_Wishlist", through: models.Wishlist, foreignKey: "bookId"})
      Book.belongsToMany(models.User, {through: models.User_Read, foreignKey: "bookId"})
      Book.belongsToMany(models.Author, {as: "BookAuthor", through: models.Book_Author, foreignKey: "bookId"})
      Book.belongsToMany(models.Genre, {through: models.Book_Genre, foreignKey: "bookId"})
    }
  }
  Book.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Title cannot be empty"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [0, 255],
          msg: "Maximum character length for Description is 255"
        } 
      }
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Year cannot be empty"
        }
      }
    },
    publisher: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Publisher cannot be empty"
        }
      }
    },
    coverImage: DataTypes.STRING,
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        if(!instance.status) {
          instance.status = "unread"
        }
      } 
    },  
    sequelize,
    modelName: 'Book',
  });
  return Book;
};
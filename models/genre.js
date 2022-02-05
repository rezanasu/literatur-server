'use strict';
const {
  Model, InstanceError
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Genre.belongsToMany(models.Book, {through: models.Book_Genre, foreignKey: "genreId"})
    }
  }
  Genre.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: "Name cannot be empty"
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        instance.name = (instance.name).toLowerCase();
        instance.name = (instance.name).trim();
      }
    },
    sequelize,
    modelName: 'Genre',
  });
  return Genre;
};
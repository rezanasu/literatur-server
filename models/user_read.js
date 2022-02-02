'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Read extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User_Read.belongsTo(models.User, {foreignKey: "userId"});
      User_Read.belongsTo(models.Book, {foreignKey: "bookId"});
    }
  }
  User_Read.init({
    status: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [["unread", "in progress", "read"]],
          msg: "Only between unread, in progress and read are allowed"
        }
      }
    },
    userId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        if(!instance.status) {
          instance.status = "unread"
        }
      } 
    },  
    sequelize,
    modelName: 'User_Read',
  });
  return User_Read;
};
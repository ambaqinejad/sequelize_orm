'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  const conditions = {
    type: DataTypes.STRING,
    allowNull: false,
  }

  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Post}) {
      // define association here
      this.hasMany(Post, {foreignKey: "userId", as: "posts"})
    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  User.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    firstName: {...conditions, validate: {
      notNull: { msg: "User must have a first name"},
      notEmpty: { msg: "User first name must not be empty."}
    }},
    lastName: {...conditions, validate: {
      notNull: { msg: "User must have a last name"},
      notEmpty: { msg: "User last name must not be empty."}}},
    email: {...conditions, unique: true, validate: {
      notNull: { msg: "User must have an email"},
      notEmpty: { msg: "User email must not be empty."}}},
    role: {...conditions, validate: {
      notNull: { msg: "User must have a role"},
      notEmpty: { msg: "User role must not be empty."}}}
  }, {
    sequelize,
    tableName: "users",
    modelName: 'User',
  });
  return User;
};
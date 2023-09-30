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
    firstName: {...conditions},
    lastName: {...conditions},
    email: {...conditions, unique: true},
    role: {...conditions}
  }, {
    sequelize,
    tableName: "users",
    modelName: 'User',
  });
  return User;
};
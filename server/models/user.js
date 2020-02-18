'use strict';
module.exports = (sequelize, DataTypes) => {
  const {hash} = require('../helpers/hash');
  const {Model} = sequelize.Sequelize;
  class User extends Model{}

  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(instance, options) {
        instance.password = hash(instance.password);
      }
    },
    sequelize
  })

  User.associate = function(models) {
    // associations can be defined here

  };
  return User;
};
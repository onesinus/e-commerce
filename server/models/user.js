'use strict';
module.exports = (sequelize, DataTypes) => {
  const {hash} = require('../helpers/hash');
  const {Model} = sequelize.Sequelize;
  class User extends Model{}

  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Email cannot be empty!"
        },
        isEmail: {
          args: true,
          msg: "Invalid email format, e.g: onesinus231@gmail.com"
        },
        isExist: function(value) {
          return User.count({ where: { email: value } })
            .then(count => {
              if (count != 0 && this.createdAt) {
                throw new Error('Email is already exist.');
              }
          });
        },
      },
    },
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(instance, options) {
        if (!instance.role) {
          instance.role = 'User';
        }
        instance.password = hash(instance.password);
      }
    },
    sequelize
  })

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Transaction);
    User.hasMany(models.Love);
    User.hasMany(models.Bookmark);
    
  };
  return User;
};
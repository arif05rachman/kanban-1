'use strict';
const {encrypt} = require('../helpers/passwordBcrypt')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Name Cannot Be Null'
        },
        notEmpty: true,
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Email Cannot Be Null'
        },
        isEmail: {
          args: true,
          msg: "Email Malformed"
        },
        notEmpty: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Password Cannot Be Null'
        },
        notEmpty: true,
      }
    }
  }, {
      hooks: {
      beforeCreate(user, option) {
          user.password = encrypt(user.password)
      }
    },
    sequelize
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Task)
  };
  return User;
};

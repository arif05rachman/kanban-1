'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: {
      type: DataTypes.STRING,
      isNull: false,
      validate: {
        notEmpty: true
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      isNull: false,
      validate: {
        notEmpty: true
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      isNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {sequelize});
  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo(models.User)
    Task.belongsTo(models.Category)
  };
  return Task;
};
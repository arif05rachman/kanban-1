'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      isNull: false,
      validate: {
        notEmpty: true,
      }
    }
  }, {sequelize});
  Category.associate = function (models) {
    Category.hasMany(models.Task)
    // associations can be defined here
  };
  return Category;
};
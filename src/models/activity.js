'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  };
  Activity.init({
    email: {
      type:  DataTypes.STRING,
      defaultValue: ''
    },
    title: {
      type:  DataTypes.STRING,
    },
    created_at: {
      type:  DataTypes.DATE,
    },
    updated_at: {
      type:  DataTypes.DATE,
    },
    deleted_at: {
      type:  DataTypes.DATE,
      defaultValue: null
    },
  }, {
    sequelize,
    modelName: 'activity',
    createdAt: false,
    updatedAt: false
  });
  return Activity;
};
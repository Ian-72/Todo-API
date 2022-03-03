'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  todo.init({
    activity_group_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    is_active: {
      type: DataTypes.STRING,
      defaultValue: true
    },
    priority: {
      type: DataTypes.STRING,
      defaultValue: 'very-high'
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: {
      type: DataTypes.DATE,
      defaultValue: null
    }
  }, {
    sequelize,
    createdAt: false,
    updatedAt: false,
    modelName: 'todo',
  });
  return todo;
};
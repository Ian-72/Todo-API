const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // associate to activity model through fk activity_group_id
      this.belongsTo(models.activity, {
        foreignKey: 'activity_group_id',
        sourceKey: 'activity_group_id',
        uniqueKey: 'fk_todos.activity_group_id_activities.id',
      });
    }
  }
  Todo.init({
    title: DataTypes.STRING,
    is_active: {
      type: DataTypes.STRING,
      defaultValue: true,
    },
    priority: {
      type: DataTypes.STRING,
      defaultValue: 'very-high',
    },
  }, {
    sequelize,
    indexes: [
      // Create a index
      {
        unique: false,
        fields: ['id', 'activity_group_id'],
      },
    ],
    paranoid: true, // enable deletedAt
    underscored: true,
    // change name for createdAt, updatedAt, and deletedAt
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    modelName: 'todo',
  });
  return Todo;
};

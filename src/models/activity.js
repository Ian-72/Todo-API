const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // associate to todo model
      this.hasMany(models.todo, { foreignKey: 'activity_group_id', targetKey: 'id' });
    }
  }
  Activity.init({
    email: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    title: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    indexes: [
      // Create a index
      {
        unique: false,
        fields: ['id'],
      },
    ],
    paranoid: true, // enable deletedAt
    underscored: true,
    // change name for createdAt, updatedAt, and deletedAt
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    modelName: 'activity',
  });
  return Activity;
};

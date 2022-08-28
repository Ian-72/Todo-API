module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('todos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      activity_group_id: {
        // type: Sequelize.INTEGER
        type: Sequelize.INTEGER,
        references: { model: 'activities', key: 'id' },
      },
      title: {
        type: Sequelize.STRING,
      },
      is_active: {
        type: Sequelize.STRING,
      },
      priority: {
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
    });
    // * -------- create foreign key --------- * //
    await queryInterface.addConstraint('todos', {
      fields: ['activity_group_id'],
      type: 'foreign key',
      name: 'fk_todos.activity_group_id_activities.id', // optional
      references: {
        table: 'activities',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('todos');
  },
};

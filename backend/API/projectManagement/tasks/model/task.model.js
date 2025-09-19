module.exports = (sequelize, Sequelize) => {
  const tbl_task_management = sequelize.define(
    "TASK_MANAGEMENT",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },

      task_title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      task_description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      priority: {
        type: Sequelize.ENUM("Critical", "High", "Medium", "Low", "Lowest"),
        allowNull: false,
        defaultValue: "Lowest",
      },
      severity: {
        type: Sequelize.ENUM(
          "Blocker",
          "Critical",
          "Major",
          "Minor",
          "Trivial"
        ),
        allowNull: false,
        defaultValue: "Trivial",
      },

      parent_task_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "TASK_MANAGEMENT",
          key: "id",
        },
      },

      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      status: {
        type: Sequelize.ENUM(
          "Backlog",
          "Blocked",
          "ToDo",
          "In-Progress",
          "On-Hold",
          "Cancelled",
          "Completed"
        ),
        defaultValue: "Backlog",
      },
    },
    { freezeTableName: true }
  );
  return tbl_task_management;
};

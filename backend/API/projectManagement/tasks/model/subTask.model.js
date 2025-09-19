module.exports = (sequelize, Sequelize) => {
  const tbl_subtask_management = sequelize.define(
    "SUBTASK_MANAGEMENT",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },

      entity_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      subtask_title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      subtask_description: {
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

      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      status: {
        type: Sequelize.ENUM(
          "ToDo",
          "In-Progress",
          "On-Hold",
          "Cancelled",
          "Completed"
        ),
        defaultValue: "ToDo",
      },
    },
    { freezeTableName: true }
  );
  return tbl_subtask_management;
};

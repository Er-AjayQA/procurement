module.exports = (sequelize, Sequelize) => {
  const tbl_workflowEmployeeMapping_master = sequelize.define(
    "WORKFLOW_EMPLOYEE_MAPPING_MASTER",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      level: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    },
    { freezeTableName: true }
  );
  return tbl_workflowEmployeeMapping_master;
};

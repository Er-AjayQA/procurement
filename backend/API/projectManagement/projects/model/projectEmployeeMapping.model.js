module.exports = (sequelize, Sequelize) => {
  const tbl_project_employee_mapping = sequelize.define(
    "PROJECT_EMPLOYEE_MAPPING",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },

      assigned_date: {
        type: Sequelize.DATE,
        allowNull: true,
        set(value) {
          this.setDataValue("assigned_date", value === "" ? null : value);
        },
      },
      removed_date: {
        type: Sequelize.DATE,
        allowNull: true,
        set(value) {
          this.setDataValue("removed_date", value === "" ? null : value);
        },
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
  return tbl_project_employee_mapping;
};

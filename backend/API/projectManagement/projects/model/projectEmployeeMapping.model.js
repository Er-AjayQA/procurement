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

      unique_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dep_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
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

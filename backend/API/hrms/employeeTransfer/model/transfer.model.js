module.exports = (sequelize, Sequelize) => {
  const tbl_employee_transfer = sequelize.define(
    "EMPLOYEE_TRANSFER",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },

      // Current Details
      transfer_date: {
        type: Sequelize.DATEONLY("YYYY-MM-DD"),
        allowNull: false,
      },
      detailed_reason: {
        type: Sequelize.TEXT,
        allowNull: true,
        set(value) {
          this.setDataValue("reason", value === "" ? null : value);
        },
      },

      // Destination Details
      new_salary: {
        type: Sequelize.INTEGER,
        allowNull: true,
        set(value) {
          this.setDataValue("new_salary", value === "" ? null : value);
        },
      },

      approval_status: {
        type: Sequelize.ENUM(
          "DRAFT",
          "PENDING",
          "APPROVED",
          "REJECTED",
          "COMPLETED"
        ),
        defaultValue: "PENDING",
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
  return tbl_employee_transfer;
};

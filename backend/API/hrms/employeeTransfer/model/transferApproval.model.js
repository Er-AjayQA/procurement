module.exports = (sequelize, Sequelize) => {
  const tbl_employee_transfer_approval = sequelize.define(
    "EMPLOYEE_TRANSFER_APPROVAL",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      approval_type: {
        type: Sequelize.ENUM("CURRENT_MANAGER", "NEW_MANAGER", "HR", "FINANCE"),
        allowNull: false,
      },
      approver_status: {
        type: Sequelize.ENUM("PENDING", "APPROVED", "REJECTED"),
        defaultValue: "PENDING",
      },
      comments: {
        type: Sequelize.TEXT,
        allowNull: true,
        set(value) {
          this.setDataValue("comments", value === "" ? null : value);
        },
      },
      acted_at: {
        type: Sequelize.DATE,
        allowNull: true,
        set(value) {
          this.setDataValue("acted_at", value === "" ? null : value);
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
  return tbl_employee_transfer_approval;
};

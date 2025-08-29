module.exports = (sequelize, Sequelize) => {
  const tbl_ticket_allocation = sequelize.define(
    "TICKET_ALLOCATION",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      approver_status: {
        type: Sequelize.ENUM("PENDING", "ESCALATED", "CLOSE"),
        defaultValue: "PENDING",
      },
      remark: {
        type: Sequelize.TEXT,
        allowNull: true,
        set(value) {
          this.setDataValue("remark", value === "" ? null : value);
        },
      },
      acted_on: {
        type: Sequelize.DATE,
        allowNull: true,
        set(value) {
          this.setDataValue("acted_on", value === "" ? null : value);
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
  return tbl_ticket_allocation;
};

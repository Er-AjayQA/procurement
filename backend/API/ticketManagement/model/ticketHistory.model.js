module.exports = (sequelize, Sequelize) => {
  const tbl_ticket_history = sequelize.define(
    "TICKET_HISTORY",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      executive_name: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("executive_name", value === "" ? null : value);
        },
      },
      executive_code: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("executive_code", value === "" ? null : value);
        },
      },
      current_status: {
        type: Sequelize.ENUM("OPEN", "PENDING", "ESCALATED", "CLOSE"),
        defaultValue: "OPEN",
      },
      action_taken: {
        type: Sequelize.TEXT,
        allowNull: true,
        set(value) {
          this.setDataValue("action_taken", value === "" ? null : value);
        },
      },
      executive_remark: {
        type: Sequelize.TEXT,
        allowNull: true,
        set(value) {
          this.setDataValue("executive_remark", value === "" ? null : value);
        },
      },
      created_on: {
        type: Sequelize.DATE,
        allowNull: true,
        set(value) {
          this.setDataValue("created_on", value === "" ? null : value);
        },
      },
      action_date: {
        type: Sequelize.DATE,
        allowNull: true,
        set(value) {
          this.setDataValue("action_date", value === "" ? null : value);
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
  return tbl_ticket_history;
};

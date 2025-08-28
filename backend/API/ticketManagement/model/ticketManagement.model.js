module.exports = (sequelize, Sequelize) => {
  const tbl_ticket_management = sequelize.define(
    "TICKET_MANAGEMENT",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      ticket_type: {
        type: Sequelize.ENUM("Self", "Colleague"),
        allowNull: false,
        defaultValue: "Self",
      },
      ticket_subject: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      ticket_description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      ticket_status: {
        type: Sequelize.ENUM("OPEN", "CLOSE", "ESCALATED"),
        defaultValue: "OPEN",
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
  return tbl_ticket_management;
};

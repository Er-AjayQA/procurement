module.exports = (sequelize, Sequelize) => {
  const tbl_event_ticket_type = sequelize.define(
    "EVENT_TICKET_TYPES",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      event_ticket_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      event_ticket_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      event_ticket_quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tickets_sold: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      sales_start_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      sales_end_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      event_ticket_description: {
        type: Sequelize.TEXT,
        allowNull: true,
        set(value) {
          this.setDataValue(
            "event_ticket_description",
            value === "" ? null : value
          );
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
  return tbl_event_ticket_type;
};

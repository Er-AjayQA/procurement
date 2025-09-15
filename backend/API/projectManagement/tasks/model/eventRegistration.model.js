module.exports = (sequelize, Sequelize) => {
  const tbl_event_registration = sequelize.define(
    "EVENT_REGISTRATION",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      member_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      member_email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      member_contact_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      member_contact: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      registration_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      registration_status: {
        type: Sequelize.ENUM("CONFIRMED", "CANCELLED", "PENDING"),
        allowNull: false,
        defaultValue: "PENDING",
      },
      payment_status: {
        type: Sequelize.ENUM(
          "PENDING",
          "PAID",
          "FAILED",
          "REFUNDED",
          "PARTIALLY_REFUNDED"
        ),
        allowNull: false,
        defaultValue: "PENDING",
      },
      amount_paid: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      payment_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      payment_date: {
        type: Sequelize.DATE,
        allowNull: true,
        set(value) {
          this.setDataValue("payment_date", value === "" ? null : value);
        },
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    },
    { freezeTableName: true }
  );
  return tbl_event_registration;
};

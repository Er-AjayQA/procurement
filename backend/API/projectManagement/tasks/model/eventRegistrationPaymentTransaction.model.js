module.exports = (sequelize, Sequelize) => {
  const tbl_event_registration_payment_transactions = sequelize.define(
    "EVENT_REGISTRATION_PAYMENT_TRANSACTIONS",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      payment_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      transaction_type: {
        type: Sequelize.ENUM("PAYMENT", "REFUND", "CANCELLATION"),
        allowNull: false,
      },
      transaction_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      from_account: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      to_account: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      transaction_status: {
        type: Sequelize.ENUM("COMPLETED", "PENDING", "FAILED", "PROCESSING"),
        allowNull: false,
        defaultValue: "PENDING",
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    },
    { freezeTableName: true }
  );
  return tbl_event_registration_payment_transactions;
};

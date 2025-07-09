module.exports = (sequelize, Sequelize) => {
  const tbl_vendor_bank_mapped = sequelize.define(
    "VENDOR_BANK_MAPPED",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      bank_branch: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      account_holder_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bank_address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bank_account_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bank_unique_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bank_swift_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bank_iban_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bank_nuit_code: {
        type: Sequelize.STRING,
        allowNull: false,
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
  return tbl_vendor_bank_mapped;
};

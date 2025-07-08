module.exports = (sequelize, Sequelize) => {
  const tbl_vendor_master = sequelize.define(
    "VENDOR_MASTER",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vendor_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vendor_address: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      vendor_country_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vendor_contact_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vendor_alt_country_code: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("alt_country_code", value == "" ? null : value);
        },
      },
      vendor_alt_contact_number: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue(
            "vendor_alt_contact_number",
            value == "" ? null : value
          );
        },
      },
      vendor_emailId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vendor_web_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vendor_category: {
        type: Sequelize.ENUM("International", "Domestic"),
        allowNull: false,
        defaultValue: "Domestic",
      },
      vendor_currency_type: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("vendor_currency_type", value == "" ? null : value);
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
  return tbl_vendor_master;
};

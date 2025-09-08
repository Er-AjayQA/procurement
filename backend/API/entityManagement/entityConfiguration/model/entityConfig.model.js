module.exports = (sequelize, Sequelize) => {
  const tbl_entity_configuration = sequelize.define(
    "ENTITY_CONFIGURATION",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },

      // BASIC DETAILS
      logo: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("logo", value === "" ? null : value);
        },
      },
      entity_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      entity_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      display_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      entity_code_prefix: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      entity_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      // COMMUNICATION INFORMATION
      email_domain: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("email_domain", value === "" ? null : value);
        },
      },
      email_signature: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("email_signature", value === "" ? null : value);
        },
      },
      contact_country_code: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue(
            "contact_country_code",
            value === "" ? null : value
          );
        },
      },
      contact_no: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("contact_no", value === "" ? null : value);
        },
      },
      default_time_zone: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("default_time_zone", value === "" ? null : value);
        },
      },
      business_hours: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("business_hours", value === "" ? null : value);
        },
      },
      local_currency: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("local_currency", value === "" ? null : value);
        },
      },
      tax_info: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("tax_info", value === "" ? null : value);
        },
      },
      language_preference: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("language_preference", value === "" ? null : value);
        },
      },

      // SMTP DETAILS
      smtp_server_address: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("smtp_server_address", value === "" ? null : value);
        },
      },
      smtp_port_no: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("smtp_port_no", value === "" ? null : value);
        },
      },
      username: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("username", value === "" ? null : value);
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("password", value === "" ? null : value);
        },
      },

      // REGIONAL SETTINGS
      date_format: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("date_format", value === "" ? null : value);
        },
      },
      time_format: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("time_format", value === "" ? null : value);
        },
      },
      date_time_format: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("date_time_format", value === "" ? null : value);
        },
      },
      thousand_separator: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("thousand_separator", value === "" ? null : value);
        },
      },
      decimal_separator: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("decimal_separator", value === "" ? null : value);
        },
      },
      currency_symbol: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("currency_symbol", value === "" ? null : value);
        },
      },
      currency_symbol_position: {
        type: Sequelize.ENUM("Start", "End"),
        allowNull: false,
        defaultValue: "End",
      },
      number_of_decimal: {
        type: Sequelize.INTEGER,
        allowNull: true,
        set(value) {
          this.setDataValue("number_of_decimal", value === "" ? null : value);
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
  return tbl_entity_configuration;
};

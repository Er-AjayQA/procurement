module.exports = (sequelize, Sequelize) => {
  const tbl_branch_master = sequelize.define(
    "BRANCH_MASTER",
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
      branch_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      branch_contact_person: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      country_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      branch_contact_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      alt_country_code: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("alt_country_code", value == "" ? null : value);
        },
      },
      branch_alt_contact_number: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue(
            "branch_alt_contact_number",
            value == "" ? null : value
          );
        },
      },
      branch_emailId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      branch_alt_emailId: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("branch_alt_email_id", value == "" ? null : value);
        },
      },
      branch_address: {
        type: Sequelize.TEXT,
        allowNull: true,
        set(value) {
          this.setDataValue("branch_alt_email_id", value == "" ? null : value);
        },
      },
      billing_status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
  return tbl_branch_master;
};

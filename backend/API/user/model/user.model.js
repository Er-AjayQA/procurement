module.exports = (sequelize, Sequelize) => {
  const tbl_user_master = sequelize.define(
    "USER_MASTER",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        primaryKey: true,
      },
      emp_code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      userImage: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
        set(value) {
          this.setDataValue("userImage", value === "" ? null : value);
        },
      },
      contact_no: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      alt_contact_no: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
        set(value) {
          this.setDataValue("alt_contact_no", value === "" ? null : value);
        },
      },
      dob: {
        type: Sequelize.DATEONLY("YYYY-MM-DD"),
        allowNull: false,
      },
      gender: {
        type: Sequelize.ENUM("Male", "Female", "Other"),
        allowNull: false,
      },
      personal_email: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
        set(value) {
          this.setDataValue("personal_email", value === "" ? null : value);
        },
      },
      official_email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      reporting_manager_id: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
        set(value) {
          this.setDataValue(
            "reporting_manager_id",
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
  return tbl_user_master;
};

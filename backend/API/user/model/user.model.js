module.exports = (sequelize, Sequelize) => {
  const tbl_user_master = sequelize.define(
    "USER_MASTER",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        // unique: true,
        allowNull: false,
        primaryKey: true,
      },
      emp_code: {
        type: Sequelize.STRING,
        allowNull: false,
        // unique: true,
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
        // unique: true,
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
        // unique: true,
      },
      reporting_manager_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: {
          model: "USER_MASTER", // or 'tbl_user_master'
          key: "id",
        },
        set(value) {
          this.setDataValue(
            "reporting_manager_id",
            value === "" ? null : value
          );
        },
      },
      start_working_date: {
        type: Sequelize.DATEONLY("YYYY-MM-DD"),
        allowNull: true,
        set(value) {
          this.setDataValue("start_working_date", value === "" ? null : value);
        },
      },
      probation_end_date: {
        type: Sequelize.DATEONLY("YYYY-MM-DD"),
        allowNull: true,
        set(value) {
          this.setDataValue("probation_end_date", value === "" ? null : value);
        },
      },
      present_country_address: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "COUNTRY_MASTER", // or 'tbl_country_master'
          key: "id",
        },
        set(value) {
          this.setDataValue(
            "present_country_address",
            value === "" ? null : value
          );
        },
      },
      present_state_address: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "STATE_MASTER", // or 'tbl_state_master'
          key: "id",
        },
        set(value) {
          this.setDataValue(
            "present_state_address",
            value === "" ? null : value
          );
        },
      },
      present_city_address: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "CITY_MASTER", // or 'tbl_city_master'
          key: "id",
        },
        set(value) {
          this.setDataValue(
            "present_city_address",
            value === "" ? null : value
          );
        },
      },
      present_address: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("present_address", value === "" ? null : value);
        },
      },
      permanent_country_address: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "COUNTRY_MASTER", // or 'tbl_country_master'
          key: "id",
        },
        set(value) {
          this.setDataValue(
            "permanent_country_address",
            value === "" ? null : value
          );
        },
      },
      permanent_state_address: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "STATE_MASTER", // or 'tbl_state_master'
          key: "id",
        },
        set(value) {
          this.setDataValue(
            "permanent_state_address",
            value === "" ? null : value
          );
        },
      },
      permanent_city_address: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "CITY_MASTER", // or 'tbl_city_master'
          key: "id",
        },
        set(value) {
          this.setDataValue(
            "permanent_city_address",
            value === "" ? null : value
          );
        },
      },
      permanent_address: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("permanent_address", value === "" ? null : value);
        },
      },
      nationality: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("nationality", value === "" ? null : value);
        },
      },
      personal_state: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "STATE_MASTER", // or 'tbl_state_master'
          key: "id",
        },
        set(value) {
          this.setDataValue("personal_state", value === "" ? null : value);
        },
      },
      personal_city: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "CITY_MASTER", // or 'tbl_city_master'
          key: "id",
        },
        set(value) {
          this.setDataValue("personal_city", value === "" ? null : value);
        },
      },
      dire_number: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("dire_number", value === "" ? null : value);
        },
      },
      driving_license: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("driving_license", value === "" ? null : value);
        },
      },
      blood_group: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("blood_group", value === "" ? null : value);
        },
      },
      id_number: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("id_number", value === "" ? null : value);
        },
      },
      id_issue_date: {
        type: Sequelize.DATEONLY("YYYY-MM-DD"),
        allowNull: true,
        set(value) {
          this.setDataValue("id_issue_date", value === "" ? null : value);
        },
      },
      id_exp_date: {
        type: Sequelize.DATEONLY("YYYY-MM-DD"),
        allowNull: true,
        set(value) {
          this.setDataValue("id_exp_date", value === "" ? null : value);
        },
      },
      passport_number: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("passport_number", value === "" ? null : value);
        },
      },
      passport_issue_date: {
        type: Sequelize.DATEONLY("YYYY-MM-DD"),
        allowNull: true,
        set(value) {
          this.setDataValue("passport_issue_date", value === "" ? null : value);
        },
      },
      passport_exp_date: {
        type: Sequelize.DATEONLY("YYYY-MM-DD"),
        allowNull: true,
        set(value) {
          this.setDataValue("passport_exp_date", value === "" ? null : value);
        },
      },
      tax_number: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("tax_number", value === "" ? null : value);
        },
      },
      marital_status: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("marital_status", value === "" ? null : value);
        },
      },
      base_salary: {
        type: Sequelize.BIGINT,
        allowNull: true,
        set(value) {
          this.setDataValue("base_salary", value === "" ? null : value);
        },
      },
      daily_working_hours: {
        type: Sequelize.BIGINT,
        allowNull: true,
        set(value) {
          this.setDataValue("daily_working_hours", value === "" ? null : value);
        },
      },
      monthly_working_hours: {
        type: Sequelize.BIGINT,
        allowNull: true,
        set(value) {
          this.setDataValue(
            "monthly_working_hours",
            value === "" ? null : value
          );
        },
      },
      salary_per_day: {
        type: Sequelize.BIGINT,
        allowNull: true,
        set(value) {
          this.setDataValue("salary_per_day", value === "" ? null : value);
        },
      },
      salary_per_hour: {
        type: Sequelize.BIGINT,
        allowNull: true,
        set(value) {
          this.setDataValue("salary_per_hour", value === "" ? null : value);
        },
      },
      total_monthly_hours: {
        type: Sequelize.BIGINT,
        allowNull: true,
        set(value) {
          this.setDataValue("total_monthly_hours", value === "" ? null : value);
        },
      },
      weekly_hours: {
        type: Sequelize.BIGINT,
        allowNull: true,
        set(value) {
          this.setDataValue("weekly_hours", value === "" ? null : value);
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

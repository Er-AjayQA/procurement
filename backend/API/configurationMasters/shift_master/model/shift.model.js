module.exports = (sequelize, Sequelize) => {
  const tbl_shift_master = sequelize.define(
    "SHIFT_MASTER",
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
      start_time: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      end_time: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      shift_duration: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sites: {
        type: Sequelize.STRING,
        set(value) {
          this.setDataValue("sites", value === "" ? null : value);
        },
      },
      off_days: {
        type: Sequelize.STRING,
        set(value) {
          this.setDataValue("off_days", value === "" ? null : value);
        },
      },
      working_hours_per_month: {
        type: Sequelize.STRING,
        set(value) {
          this.setDataValue(
            "working_hours_per_month",
            value === "" ? null : value
          );
        },
      },
      working_days_per_month: {
        type: Sequelize.STRING,
        set(value) {
          this.setDataValue(
            "working_days_per_month",
            value === "" ? null : value
          );
        },
      },
      observations: {
        type: Sequelize.STRING,
        set(value) {
          this.setDataValue("observations", value === "" ? null : value);
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
  return tbl_shift_master;
};

module.exports = (sequelize, Sequelize) => {
  const tbl_allowance_master = sequelize.define(
    "ALLOWANCE_MASTER",
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
      domestic_allowance: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("domestic_allowance", value === "" ? null : value);
        },
      },
      international_allowance: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue(
            "international_allowance",
            value === "" ? null : value
          );
        },
      },
      is_taxable: {
        type: Sequelize.BOOLEAN,
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
  return tbl_allowance_master;
};

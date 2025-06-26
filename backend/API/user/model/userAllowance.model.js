module.exports = (sequelize, Sequelize) => {
  const tbl_userAllowance_master = sequelize.define(
    "USER_ALLOWANCE_MASTER",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      amount: {
        type: Sequelize.STRING,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    },
    { freezeTableName: true }
  );
  return tbl_userAllowance_master;
};

module.exports = (sequelize, Sequelize) => {
  const tbl_state_master = sequelize.define(
    "STATE_MASTER",
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
      country: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    { freezeTableName: true }
  );
  return tbl_state_master;
};

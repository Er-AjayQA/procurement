module.exports = (sequelize, Sequelize) => {
  const tbl_city_master = sequelize.define(
    "CITY_MASTER",
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
    },
    { freezeTableName: true }
  );
  return tbl_city_master;
};

module.exports = (sequelize, Sequelize) => {
  const tbl_country_master = sequelize.define(
    "COUNTRY_MASTER",
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
      country_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    { freezeTableName: true }
  );
  return tbl_country_master;
};

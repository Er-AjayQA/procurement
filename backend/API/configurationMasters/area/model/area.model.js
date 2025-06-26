module.exports = (sequelize, Sequelize) => {
  const tbl_area_master = sequelize.define(
    "AREA_MASTER",
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
  return tbl_area_master;
};

module.exports = (sequelize, Sequelize) => {
  const tbl_service_master = sequelize.define(
    "SERVICE_MASTER",
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
      service_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mvp: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      service_desc: {
        type: Sequelize.TEXT,
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
  return tbl_service_master;
};

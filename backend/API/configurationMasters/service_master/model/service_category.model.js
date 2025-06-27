module.exports = (sequelize, Sequelize) => {
  const tbl_service_category_master = sequelize.define(
    "SERVICE_CATEGORY_MASTER",
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
      service_category_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      service_category_description: {
        type: Sequelize.TEXT,
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
  return tbl_service_category_master;
};

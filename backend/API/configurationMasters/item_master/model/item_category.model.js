module.exports = (sequelize, Sequelize) => {
  const tbl_item_category_master = sequelize.define(
    "ITEM_CATEGORY_MASTER",
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
      item_category_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      item_category_description: {
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
  return tbl_item_category_master;
};

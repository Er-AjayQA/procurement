module.exports = (sequelize, Sequelize) => {
  const tbl_item_master = sequelize.define(
    "ITEM_MASTER",
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
      item_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mvp: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      bar_code_type: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      manage_by: {
        type: Sequelize.ENUM("Batch", "Serial"),
        allowNull: false,
      },
      item_desc: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      threshold_stock: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      item_type: {
        type: Sequelize.ENUM("Item", "Assets"),
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
  return tbl_item_master;
};

module.exports = (sequelize, Sequelize) => {
  const tbl_rbac_menu_master = sequelize.define(
    "RBAC_MENU_MASTER",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      menu_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      menu_icon: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("menu_icon", value === "" ? null : value);
        },
      },
      menu_endpoint: {
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
  return tbl_rbac_menu_master;
};

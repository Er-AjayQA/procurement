module.exports = (sequelize, Sequelize) => {
  const tbl_rbac_submenu_master = sequelize.define(
    "RBAC_SUBMENU_MASTER",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      submenu_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      submenu_icon: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("submenu_icon", value === "" ? null : value);
        },
      },
      submenu_endpoint: {
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
  return tbl_rbac_submenu_master;
};

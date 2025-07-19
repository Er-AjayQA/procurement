module.exports = (sequelize, Sequelize) => {
  const tbl_rbac_submodule_master = sequelize.define(
    "RBAC_SUBMODULE_MASTER",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      submodule_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      submodule_icon: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("submenu_icon", value === "" ? null : value);
        },
      },
      submodule_endpoint: {
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
  return tbl_rbac_submodule_master;
};

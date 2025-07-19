module.exports = (sequelize, Sequelize) => {
  const tbl_rbac_module_master = sequelize.define(
    "RBAC_MODULE_MASTER",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      module_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      module_icon: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("module_icon", value === "" ? null : value);
        },
      },
      module_endpoint: {
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
  return tbl_rbac_module_master;
};

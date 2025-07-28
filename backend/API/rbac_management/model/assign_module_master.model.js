module.exports = (sequelize, Sequelize) => {
  const tbl_rbac_assign_module_master = sequelize.define(
    "RBAC_ASSIGN_MODULE_MASTER",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      read: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      write: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      delete: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
  return tbl_rbac_assign_module_master;
};

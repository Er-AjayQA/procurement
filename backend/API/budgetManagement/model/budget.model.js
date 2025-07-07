module.exports = (sequelize, Sequelize) => {
  const tbl_budget_management = sequelize.define(
    "BUDGET_MANAGEMENT",
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
      code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      budget_type: {
        type: Sequelize.ENUM("capex", "opex"),
        allowNull: false,
      },
      budget_amount: {
        type: Sequelize.BIGINT,
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
  return tbl_budget_management;
};

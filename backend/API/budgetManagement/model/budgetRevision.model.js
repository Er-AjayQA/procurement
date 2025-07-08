module.exports = (sequelize, Sequelize) => {
  const tbl_budget_revision_history = sequelize.define(
    "BUDGET_REVISION_HISTORY",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      type: {
        type: Sequelize.ENUM("increase", "decrease"),
        allowNull: false,
      },
      revise_amount: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      allocation_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      total_amount: {
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
  return tbl_budget_revision_history;
};

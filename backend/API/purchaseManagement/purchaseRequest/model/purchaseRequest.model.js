module.exports = (sequelize, Sequelize) => {
  const tbl_purchase_request = sequelize.define(
    "PURCHASE_REQUEST",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      pr_type: {
        type: Sequelize.ENUM("item-pr", "service-pr"),
        allowNull: false,
      },
      pr_emp_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      PR_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      emp_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdOn: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
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
  return tbl_purchase_request;
};

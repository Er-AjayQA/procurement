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
      emp_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdOn: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Date.now(),
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

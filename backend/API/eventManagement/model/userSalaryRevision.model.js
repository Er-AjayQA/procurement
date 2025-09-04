module.exports = (sequelize, Sequelize) => {
  const tbl_user_salary_revision = sequelize.define(
    "USER_SALARY_REVISION",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      month: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      new_salary: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      old_salary: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      revision_percent: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      remark: {
        type: Sequelize.TEXT,
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
  return tbl_user_salary_revision;
};

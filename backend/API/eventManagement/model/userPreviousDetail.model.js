module.exports = (sequelize, Sequelize) => {
  const tbl_user_previous_employer_detail = sequelize.define(
    "USER_PREVIOUS_EMPLOYER_DETAIL",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      company_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      from_date: {
        type: Sequelize.DATEONLY("YYYY-MM-DD"),
        allowNull: true,
      },
      to_date: {
        type: Sequelize.DATEONLY("YYYY-MM-DD"),
        allowNull: true,
      },
      last_drawn_salary: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      reason_of_leaving: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    },
    { freezeTableName: true }
  );
  return tbl_user_previous_employer_detail;
};

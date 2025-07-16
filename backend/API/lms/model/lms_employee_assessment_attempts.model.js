module.exports = (sequelize, Sequelize) => {
  const tbl_lms_employee_assessment_attempt = sequelize.define(
    "LMS_EMPLOYEE_ASSESSMENT_ATTEMPT",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      total_marks: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      final_status: {
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
  return tbl_lms_employee_assessment_attempt;
};

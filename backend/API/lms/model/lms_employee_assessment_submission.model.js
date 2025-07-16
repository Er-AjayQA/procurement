module.exports = (sequelize, Sequelize) => {
  const tbl_lms_employee_assessment_submission = sequelize.define(
    "LMS_EMPLOYEE_ASSESSMENT_SUBMISSION",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      allContentStatus: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      isContentComplete: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isAssessmentComplete: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isCourseComplete: {
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
  return tbl_lms_employee_assessment_submission;
};

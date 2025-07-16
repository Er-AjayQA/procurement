module.exports = (sequelize, Sequelize) => {
  const tbl_lms_assign_employee_course = sequelize.define(
    "LMS_ASSIGN_EMPLOYEE_COURSE",
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
      attempt_left: {
        type: Sequelize.INTEGER,
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
  return tbl_lms_assign_employee_course;
};

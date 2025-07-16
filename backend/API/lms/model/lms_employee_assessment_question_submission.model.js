module.exports = (sequelize, Sequelize) => {
  const tbl_lms_employee_assessment_question_submission = sequelize.define(
    "LMS_EMPLOYEE_ASSESSMENT_SUBMISSION",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      employee_answer: {
        type: Sequelize.TEXT,
        allowNull: true,
        set(value) {
          this.setDataValue("employee_answer", value === "" ? null : value);
        },
      },
      answer_status: {
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
  return tbl_lms_employee_assessment_question_submission;
};

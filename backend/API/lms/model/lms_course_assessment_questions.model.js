module.exports = (sequelize, Sequelize) => {
  const tbl_lms_course_assessment_questions = sequelize.define(
    "LMS_COURSE_ASSESSMENT_QUESTION",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      assessment_question_type: {
        type: Sequelize.ENUM("MCQ", "true/false"),
        allowNull: false,
      },
      assessment_question_title: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      assessment_correct_answer: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      assessment_question_options: {
        type: Sequelize.JSON,
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
  return tbl_lms_course_assessment_questions;
};

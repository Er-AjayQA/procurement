module.exports = (sequelize, Sequelize) => {
  const tbl_lms_course_assessment = sequelize.define(
    "LMS_COURSE_ASSESSMENT",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      assessment_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      marks_per_question: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      assessment_passing_percent: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      assessment_time: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      assessment_max_attempts: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      total_marks: {
        type: Sequelize.INTEGER,
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
  return tbl_lms_course_assessment;
};

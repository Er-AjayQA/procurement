module.exports = (sequelize, Sequelize) => {
  const tbl_lms_course_assessment_results = sequelize.define(
    "LMS_COURSE_ASSESSMENT_RESULTS",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      total_marks: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      obtained_marks: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      isPass: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
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
  return tbl_lms_course_assessment_results;
};

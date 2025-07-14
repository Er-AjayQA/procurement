module.exports = (sequelize, Sequelize) => {
  const tbl_lms_course = sequelize.define(
    "LMS_COURSE",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      course_type: {
        type: Sequelize.ENUM("commonContent", "contentWithAssessment"),
        allowNull: false,
      },
      course_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      course_trainer: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      course_format: {
        type: Sequelize.ENUM("Live", "Offline", "Online"),
        allowNull: false,
      },
      course_objective: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      course_expected_results: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      is_certified: {
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
  return tbl_lms_course;
};

module.exports = (sequelize, Sequelize) => {
  const tbl_lms_assign_course = sequelize.define(
    "LMS_ASSIGN_COURSE",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      assign_type: {
        type: Sequelize.ENUM(
          "allEmployees",
          "department",
          "designation",
          "employees"
        ),
        allowNull: false,
      },
      start_date: {
        type: Sequelize.DATEONLY("YYYY-MM-DD"),
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATEONLY("YYYY-MM-DD"),
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
  return tbl_lms_assign_course;
};

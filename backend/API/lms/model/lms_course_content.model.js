module.exports = (sequelize, Sequelize) => {
  const tbl_lms_course_content = sequelize.define(
    "LMS_COURSE_CONTENT",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      content_type: {
        type: Sequelize.ENUM(
          "PDF",
          "Image",
          "Video",
          "Word Document",
          "Excel Sheet",
          "Audio"
        ),
        allowNull: false,
      },
      content_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content_link: {
        type: Sequelize.TEXT,
        allowNull: true,
        set(value) {
          this.setDataValue("content_link", value === "" ? null : value);
        },
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
  return tbl_lms_course_content;
};

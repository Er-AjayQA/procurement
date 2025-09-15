module.exports = (sequelize, Sequelize) => {
  const tbl_project_management = sequelize.define(
    "PROJECT_MANAGEMENT",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },

      // BASIC DETAILS
      project_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      project_title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      project_description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      project_start_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      target_end_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      // CLIENT DETAILS
      client_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      client_contact_person: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      client_email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      client_contact_country_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      client_contact_no: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      status: {
        type: Sequelize.ENUM("DRAFT", "In-Progress", "Completed", "Delivered"),
        allowNull: false,
        defaultValue: "DRAFT",
      },
    },
    { freezeTableName: true }
  );
  return tbl_project_management;
};

module.exports = (sequelize, Sequelize) => {
  const tbl_vendor_mapped_user = sequelize.define(
    "VENDOR_MAPPED_USER",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      associated_person_country_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      associated_person_contact_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      associated_person_emailId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      associated_person_designation: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      associated_person_department: {
        type: Sequelize.STRING,
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
  return tbl_vendor_mapped_user;
};

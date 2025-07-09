module.exports = (sequelize, Sequelize) => {
  const tbl_vendor_document_mapped = sequelize.define(
    "VENDOR_DOCUMENT_MAPPED",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      document_type: {
        type: Sequelize.ENUM("PDF", "DOC", "JPG", "JPEG", "DOCX"),
        allowNull: false,
      },
      document_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      document_expiry_date: {
        type: Sequelize.DATEONLY("YYYY-MM-DD"),
        allowNull: false,
      },
      document_notification_required: {
        type: Sequelize.BOOLEAN,
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
  return tbl_vendor_document_mapped;
};

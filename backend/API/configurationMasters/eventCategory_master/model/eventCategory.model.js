module.exports = (sequelize, Sequelize) => {
  const tbl_event_category = sequelize.define(
    "EVENT_CATEGORY",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      event_category_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      event_category_description: {
        type: Sequelize.TEXT,
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
  return tbl_event_category;
};

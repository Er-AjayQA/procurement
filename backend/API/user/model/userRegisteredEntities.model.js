module.exports = (sequelize, Sequelize) => {
  const tbl_user_registered_entities = sequelize.define(
    "USER_REGISTERED_ENTITY_MASTER",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
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
  return tbl_user_registered_entities;
};

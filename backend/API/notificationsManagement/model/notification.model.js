module.exports = (sequelize, Sequelize) => {
  const tbl_notification_master = sequelize.define(
    "NOTIFICATION_MASTER",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      archieve_status: {
        type: Sequelize.ENUM("archieve", "non-archieve"),
        allowNull: false,
        defaultValue: "non-archieve",
      },
      isReaded: {
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
  return tbl_notification_master;
};

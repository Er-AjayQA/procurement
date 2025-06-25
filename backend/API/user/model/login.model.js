module.exports = (sequelize, Sequelize) => {
  const tbl_login_master = sequelize.define(
    "LOGIN_MASTER",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        primaryKey: true,
      },
      official_email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    },
    { freezeTableName: true }
  );
  return tbl_login_master;
};

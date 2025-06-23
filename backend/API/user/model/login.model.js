module.exports = (sequelize, Sequelize) => {
  const tbl_login = sequelize.define(
    "LOGIN",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        primaryKey: true,
      },
      email: {
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
  return tbl_login;
};

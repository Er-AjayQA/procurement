module.exports = (sequelize, Sequelize) => {
  const tbl_department_master = sequelize.define(
    "DEPARTMENT_MASTER",
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
      dep_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      department_head_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "USER_MASTER", // or whatever your user table is called
          key: "id",
        },
      },
      dept_head_name: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("dept_head_name", value === "" ? null : value);
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
  return tbl_department_master;
};

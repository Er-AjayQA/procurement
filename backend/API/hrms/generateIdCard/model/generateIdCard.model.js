module.exports = (sequelize, Sequelize) => {
  const tbl_generate_id_card = sequelize.define(
    "GENERATE_ID_CARD",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("image", value === "" ? null : value);
        },
      },
      emp_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      designation: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("designation", value === "" ? null : value);
        },
      },
      branch: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("branch", value === "" ? null : value);
        },
      },
      contact_no: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("contact_no", value === "" ? null : value);
        },
      },
      dob: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("dob", value === "" ? null : value);
        },
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("email", value === "" ? null : value);
        },
      },
      join_date: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("join_date", value === "" ? null : value);
        },
      },
      blood_group: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("blood_group", value === "" ? null : value);
        },
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("address", value === "" ? null : value);
        },
      },
      signature: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("signature", value === "" ? null : value);
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
  return tbl_generate_id_card;
};

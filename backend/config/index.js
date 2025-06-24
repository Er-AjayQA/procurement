// ========== IMPORT STATEMENTS ========== //
const dbConfig = require("./db.config");
const Sequelize = require("sequelize");

// ========== DB CONFIG ========== //
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// ========== MODEL ========== //
// User Details Tables
db.tbl_user = require("../API/user/model/user.model")(sequelize, Sequelize);
// Login Details Tables
db.tbl_login = require("../API/user/model/login.model")(sequelize, Sequelize);
// Department Table
db.tbl_department =
  require("../API/configurationMasters/department/model/department.model")(
    sequelize,
    Sequelize
  );
// Designation Table
db.tbl_designation =
  require("../API/configurationMasters//designation/model/designation.model")(
    sequelize,
    Sequelize
  );

// ========== RELATIONS ========== //
// Relation B/W User and Department Tables
db.tbl_department.hasMany(db.tbl_user, {
  foreignKey: "dep_id",
});
db.tbl_user.belongsTo(db.tbl_department, {
  foreignKey: "dep_id",
});

// Relation B/W User and Designation Tables
db.tbl_designation.hasMany(db.tbl_user, {
  foreignKey: "designation_id",
});
db.tbl_user.belongsTo(db.tbl_designation, {
  foreignKey: "designation_id",
});

// Relation B/W User and Login Tables
db.tbl_user.hasMany(db.tbl_login, {
  foreignKey: "user_id",
});
db.tbl_login.belongsTo(db.tbl_user, {
  foreignKey: "user_id",
});

// Relation B/W Department and User Tables
db.tbl_user.hasMany(db.tbl_department, {
  foreignKey: "department_head_id",
});
db.tbl_department.belongsTo(db.tbl_user, {
  foreignKey: "department_head_id",
});

// ========== EXPORTS ========== //
module.exports = db;

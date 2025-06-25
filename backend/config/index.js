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
db.tbl_user_master = require("../API/user/model/user.model")(
  sequelize,
  Sequelize
);

// Login Details Tables
db.tbl_login_master = require("../API/user/model/login.model")(
  sequelize,
  Sequelize
);

// Department Master Table
db.tbl_department_master =
  require("../API/configurationMasters/department/model/department.model")(
    sequelize,
    Sequelize
  );

// Designation Master Table
db.tbl_designation_master =
  require("../API/configurationMasters/designation/model/designation.model")(
    sequelize,
    Sequelize
  );

// Employment Type Master Table
db.tbl_employmentType_master =
  require("../API/configurationMasters/employmentType/model/employmentType.model")(
    sequelize,
    Sequelize
  );

// Area Master Table
db.tbl_area_master =
  require("../API/configurationMasters/area/model/area.model")(
    sequelize,
    Sequelize
  );

// Contract Type Master Table
db.tbl_contractType_master =
  require("../API/configurationMasters/contractType/model/contractType.model")(
    sequelize,
    Sequelize
  );

// ========== RELATIONS ========== //
// Relation B/W User and Login Tables
db.tbl_user_master.hasMany(db.tbl_login_master, {
  foreignKey: "user_id",
});
db.tbl_login_master.belongsTo(db.tbl_user_master, {
  foreignKey: "user_id",
});

// Relation B/W User and Department Master Tables
db.tbl_department_master.hasMany(db.tbl_user_master, {
  foreignKey: "dep_id",
});
db.tbl_user_master.belongsTo(db.tbl_department_master, {
  foreignKey: "dep_id",
});

// Relation B/W User and Designation Master Tables
db.tbl_designation_master.hasMany(db.tbl_user_master, {
  foreignKey: "designation_id",
});
db.tbl_user_master.belongsTo(db.tbl_designation_master, {
  foreignKey: "designation_id",
});

// Relation B/W User and Employment-Type Master Tables
db.tbl_employmentType_master.hasMany(db.tbl_user_master, {
  foreignKey: "emp_type_id",
});
db.tbl_user_master.belongsTo(db.tbl_employmentType_master, {
  foreignKey: "emp_type_id",
});

// Relation B/W User and Contract-Type Master Tables
db.tbl_contractType_master.hasMany(db.tbl_user_master, {
  foreignKey: "contract_type_id",
});
db.tbl_user_master.belongsTo(db.tbl_contractType_master, {
  foreignKey: "contract_type_id",
});

// Relation B/W Department Master and User Tables
db.tbl_user_master.hasMany(db.tbl_department_master, {
  foreignKey: "department_head_id",
});
db.tbl_department_master.belongsTo(db.tbl_user_master, {
  foreignKey: "department_head_id",
});

// Relation B/W Area Master and Department Master Tables
db.tbl_department_master.hasMany(db.tbl_area_master, {
  foreignKey: "dept_id",
});
db.tbl_area_master.belongsTo(db.tbl_department_master, {
  foreignKey: "dept_id",
});

// Relation B/W Area Master and User Tables
db.tbl_area_master.hasMany(db.tbl_user_master, {
  foreignKey: "area_id",
});
db.tbl_user_master.belongsTo(db.tbl_area_master, {
  foreignKey: "area_id",
});

// ========== EXPORTS ========== //
module.exports = db;

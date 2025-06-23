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

// ========== RELATIONS ========== //
// Relation B/W User and Login Tables
db.tbl_user.hasMany(db.tbl_login, {
  foreignKey: "user_id",
});
db.tbl_login.belongsTo(db.tbl_user, {
  foreignKey: "user_id",
});

// ========== EXPORTS ========== //
module.exports = db;

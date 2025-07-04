// ========== REQUIRE STATEMENTS ========== //
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

// Allowance Master Table
db.tbl_allowance_master =
  require("../API/configurationMasters/allowance/model/allowance.model")(
    sequelize,
    Sequelize
  );

// User Allowance Master Table
db.tbl_userAllowance_master = require("../API/user/model/userAllowance.model")(
  sequelize,
  Sequelize
);

// Item Category Master Table
db.tbl_item_category_master =
  require("../API/configurationMasters/item_master/model/item_category.model")(
    sequelize,
    Sequelize
  );

// UOM Master Table
db.tbl_uom_master = require("../API/configurationMasters/uom/model/uom.model")(
  sequelize,
  Sequelize
);

// Item Master Table
db.tbl_item_master =
  require("../API/configurationMasters/item_master/model/item_master.model")(
    sequelize,
    Sequelize
  );

// Item Specification Master Table
db.tbl_item_specification =
  require("../API/configurationMasters/item_master/model/item_specification.model")(
    sequelize,
    Sequelize
  );

// Service Category Master Table
db.tbl_service_category_master =
  require("../API/configurationMasters/service_master/model/service_category.model")(
    sequelize,
    Sequelize
  );

// Service Master Table
db.tbl_service_master =
  require("../API/configurationMasters/service_master/model/service_master.model")(
    sequelize,
    Sequelize
  );

// Country Master Table
db.tbl_country_master =
  require("../API/configurationMasters/country/model/country.model")(
    sequelize,
    Sequelize
  );

// State Master Table
db.tbl_state_master =
  require("../API/configurationMasters/states/model/states.model")(
    sequelize,
    Sequelize
  );

// Bank Master Table
db.tbl_bank_master =
  require("../API/configurationMasters/bank_master/model/bank_master.model")(
    sequelize,
    Sequelize
  );

// City Master Table
db.tbl_city_master =
  require("../API/configurationMasters/city_master/model/city.model")(
    sequelize,
    Sequelize
  );

// Employee Family Details Table
db.tbl_user_family_detail = require("../API/user/model/familyDetails.model")(
  sequelize,
  Sequelize
);

// Employee Previous Employer Details Table
db.tbl_user_previous_employer_detail =
  require("../API/user/model/userPreviousDetail.model")(sequelize, Sequelize);

// Shift Master Table
db.tbl_shift_master =
  require("../API/configurationMasters/shift_master/model/shift.model")(
    sequelize,
    Sequelize
  );

// User Salary Revision Table
db.tbl_user_salary_revision =
  require("../API/user/model/userSalaryRevision.model")(sequelize, Sequelize);

// Workflow Type Master Table
db.tbl_workflow_type_master =
  require("../API/configurationMasters/workflow/model/workflowType.model")(
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

// Relation B/W Allowance Master and User Allowance Master Tables
db.tbl_allowance_master.hasMany(db.tbl_userAllowance_master, {
  foreignKey: "allowance_id",
});
db.tbl_userAllowance_master.belongsTo(db.tbl_allowance_master, {
  foreignKey: "allowance_id",
});

// Relation B/W User Master and User Allowance Master Tables
db.tbl_user_master.hasMany(db.tbl_userAllowance_master, {
  foreignKey: "user_id",
});
db.tbl_userAllowance_master.belongsTo(db.tbl_user_master, {
  foreignKey: "user_id",
});

// Relation B/W Item Master and Item Category Tables
db.tbl_item_category_master.hasMany(db.tbl_item_master, {
  foreignKey: "item_category_id",
});
db.tbl_item_master.belongsTo(db.tbl_item_category_master, {
  foreignKey: "item_category_id",
});

// Relation B/W Item Master and Item Specification Tables
db.tbl_item_master.hasMany(db.tbl_item_specification, {
  foreignKey: "item_id",
});
db.tbl_item_specification.belongsTo(db.tbl_item_master, {
  foreignKey: "item_id",
});

// Relation B/W Item Master and UOM Master Tables
db.tbl_uom_master.hasMany(db.tbl_item_master, {
  foreignKey: "uom_id",
});
db.tbl_item_master.belongsTo(db.tbl_uom_master, {
  foreignKey: "uom_id",
});

// Relation B/W Service Master and Service Category Master Tables
db.tbl_service_category_master.hasMany(db.tbl_service_master, {
  foreignKey: "service_category_id",
});
db.tbl_service_master.belongsTo(db.tbl_service_category_master, {
  foreignKey: "service_category_id",
});

// Relation B/W Country Master and State Master Tables
db.tbl_country_master.hasMany(db.tbl_state_master, {
  foreignKey: "country_id",
});
db.tbl_state_master.belongsTo(db.tbl_country_master, {
  foreignKey: "country_id",
});

// Relation B/W Country Master and City Master Tables
db.tbl_country_master.hasMany(db.tbl_city_master, {
  foreignKey: "country_id",
});
db.tbl_city_master.belongsTo(db.tbl_country_master, {
  foreignKey: "country_id",
});

// Relation B/W State Master and City Master Tables
db.tbl_state_master.hasMany(db.tbl_city_master, {
  foreignKey: "state_id",
});
db.tbl_city_master.belongsTo(db.tbl_state_master, {
  foreignKey: "state_id",
});

// Relation B/W User Master and User Family Details Tables
db.tbl_user_master.hasMany(db.tbl_user_family_detail, {
  foreignKey: "user_id",
});
db.tbl_user_family_detail.belongsTo(db.tbl_user_master, {
  foreignKey: "user_id",
});

// Relation B/W User Master and User User Previous Employer Details Tables
db.tbl_user_master.hasMany(db.tbl_user_previous_employer_detail, {
  foreignKey: "user_id",
});
db.tbl_user_previous_employer_detail.belongsTo(db.tbl_user_master, {
  foreignKey: "user_id",
});

// Relation B/W User Master and Shift Master Tables
db.tbl_shift_master.hasMany(db.tbl_user_master, {
  foreignKey: "shift_id",
});
db.tbl_user_master.belongsTo(db.tbl_shift_master, {
  foreignKey: "shift_id",
});

// Relation B/W User Master and User Salary Revision Tables
db.tbl_user_master.hasMany(db.tbl_user_salary_revision, {
  foreignKey: "user_id",
});
db.tbl_user_salary_revision.belongsTo(db.tbl_user_master, {
  foreignKey: "user_id",
});

// Relation B/W User Master and Bank Master Tables
db.tbl_bank_master.hasMany(db.tbl_user_master, {
  foreignKey: "bank_id",
});
db.tbl_user_master.belongsTo(db.tbl_bank_master, {
  foreignKey: "bank_id",
});

// ========== EXPORTS ========== //
module.exports = db;

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

// Role Type Master Table
db.tbl_role_master =
  require("../API/configurationMasters/role_master/model/role.model")(
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

// Branch Master Table
db.tbl_branch_master =
  require("../API/configurationMasters/branch_master/model/branch.model")(
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

// Workflow Table
db.tbl_workflow_master =
  require("../API/configurationMasters/workflow/model/workflow.model")(
    sequelize,
    Sequelize
  );

// Workflow Employee Mapping Table
db.tbl_workflowEmployeeMapping_master =
  require("../API/configurationMasters/workflow/model/workflowEmployeeMapping.model")(
    sequelize,
    Sequelize
  );

// Budget Management Table
db.tbl_budget_management =
  require("../API/budgetManagement/model/budget.model")(sequelize, Sequelize);

// Budget Revision Table
db.tbl_budget_revision_history =
  require("../API/budgetManagement/model/budgetRevision.model")(
    sequelize,
    Sequelize
  );

// Vendor Master Table
db.tbl_vendor_master = require("../API/vendorManagement/model/vendor.model")(
  sequelize,
  Sequelize
);

// Vendor Employee Mapped Table
db.tbl_vendor_user_mapped =
  require("../API/vendorManagement/model/vendorUserMapped.model")(
    sequelize,
    Sequelize
  );

// Vendor Bank Mapped Table
db.tbl_vendor_bank_mapped =
  require("../API/vendorManagement/model/vendorBankMapped.model")(
    sequelize,
    Sequelize
  );

// Vendor Document Mapped Table
db.tbl_vendor_document_mapped =
  require("../API/vendorManagement/model/vendorDocumentMapped.model")(
    sequelize,
    Sequelize
  );

// Course Category Table
db.tbl_course_category =
  require("../API/configurationMasters/courseCategory_master/model/courseCategory.model")(
    sequelize,
    Sequelize
  );

// LMS Course Table
db.tbl_lms_course = require("../API/lms/model/lms_course.model")(
  sequelize,
  Sequelize
);

// LMS Course Content Table
db.tbl_lms_course_content =
  require("../API/lms/model/lms_course_content.model")(sequelize, Sequelize);

// LMS Course Assessments Table
db.tbl_lms_course_assessment =
  require("../API/lms/model/lms_course_assessment.model")(sequelize, Sequelize);

// LMS Course Assessments Questions Table
db.tbl_lms_course_assessment_questions =
  require("../API/lms/model/lms_course_assessment_questions.model")(
    sequelize,
    Sequelize
  );

// LMS Assign Course Table
db.tbl_lms_assign_course = require("../API/lms/model/lms_assign_course.model")(
  sequelize,
  Sequelize
);

// LMS Assign Employee Course Table
db.tbl_lms_assign_employee_course =
  require("../API/lms/model/lms_assign_employee_course.model")(
    sequelize,
    Sequelize
  );

// LMS Employee Assessment Question Submission Table
db.tbl_lms_employee_assessment_question_submission =
  require("../API/lms/model/lms_employee_assessment_question_submission.model")(
    sequelize,
    Sequelize
  );

// LMS Employee Assessment Results Table
db.tbl_lms_course_assessment_results =
  require("../API/lms/model/lms_course_assessment_results.model")(
    sequelize,
    Sequelize
  );

// // Purchase Request Table
// db.tbl_purchase_request =
//   require("../API/purchaseManagement/purchaseRequest/model/purchaseRequest.model")(
//     sequelize,
//     Sequelize
//   );

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

// Relation B/W User Master and Role Master Tables
db.tbl_role_master.hasMany(db.tbl_user_master, {
  foreignKey: "role_id",
});
db.tbl_user_master.belongsTo(db.tbl_role_master, {
  foreignKey: "role_id",
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

// Relation B/W Branch Master and User Master Tables
db.tbl_branch_master.hasMany(db.tbl_user_master, {
  foreignKey: "branch_id",
});
db.tbl_user_master.belongsTo(db.tbl_branch_master, {
  foreignKey: "branch_id",
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

// Relation B/W Workflow Type and Workflow Tables
db.tbl_workflow_type_master.hasMany(db.tbl_workflow_master, {
  foreignKey: "workflow_type_id",
});
db.tbl_workflow_master.belongsTo(db.tbl_workflow_type_master, {
  foreignKey: "workflow_type_id",
});

// Relation B/W Workflow and Department Master Tables
db.tbl_department_master.hasMany(db.tbl_workflow_master, {
  foreignKey: "dept_id",
});
db.tbl_workflow_master.belongsTo(db.tbl_department_master, {
  foreignKey: "dept_id",
});

// Relation B/W Workflow Employee Mapping and Workflow Master Tables
db.tbl_workflow_master.hasMany(db.tbl_workflowEmployeeMapping_master, {
  foreignKey: "workflow_id",
});
db.tbl_workflowEmployeeMapping_master.belongsTo(db.tbl_workflow_master, {
  foreignKey: "workflow_id",
});

// Relation B/W Workflow Employee Mapping and Role Master Tables
db.tbl_role_master.hasMany(db.tbl_workflowEmployeeMapping_master, {
  foreignKey: "role_id",
});
db.tbl_workflowEmployeeMapping_master.belongsTo(db.tbl_role_master, {
  foreignKey: "role_id",
});

// Relation B/W Workflow Employee Mapping and User Master Tables
db.tbl_user_master.hasMany(db.tbl_workflowEmployeeMapping_master, {
  foreignKey: "user_id",
});
db.tbl_workflowEmployeeMapping_master.belongsTo(db.tbl_user_master, {
  foreignKey: "user_id",
});

// Relation B/W Budget Management and Department Master Tables
db.tbl_department_master.hasMany(db.tbl_budget_management, {
  foreignKey: "dept_id",
});
db.tbl_budget_management.belongsTo(db.tbl_department_master, {
  foreignKey: "dept_id",
});

// Relation B/W Budget Management and Budget Revision History Tables
db.tbl_budget_management.hasMany(db.tbl_budget_revision_history, {
  foreignKey: "budget_id",
});
db.tbl_budget_revision_history.belongsTo(db.tbl_budget_management, {
  foreignKey: "budget_id",
});

// Relation B/W Country Master and  Branch Master Tables
db.tbl_country_master.hasMany(db.tbl_branch_master, {
  foreignKey: "country_id",
  as: "country_details",
});
db.tbl_branch_master.belongsTo(db.tbl_country_master, {
  foreignKey: "country_id",
  as: "country_details",
});

// Relation B/W State Master and  Branch Master Tables
db.tbl_state_master.hasMany(db.tbl_branch_master, {
  foreignKey: "state_id",
  as: "state_details",
});
db.tbl_branch_master.belongsTo(db.tbl_state_master, {
  foreignKey: "state_id",
  as: "state_details",
});

// Relation B/W City Master and  Branch Master Tables
db.tbl_city_master.hasMany(db.tbl_branch_master, {
  foreignKey: "city_id",
  as: "city_details",
});
db.tbl_branch_master.belongsTo(db.tbl_city_master, {
  foreignKey: "city_id",
  as: "city_details",
});

// Relation B/W Country Master and  Vendor Master Tables
db.tbl_country_master.hasMany(db.tbl_vendor_master, {
  foreignKey: "vendor_country_id",
  as: "vendor_country_details",
});
db.tbl_vendor_master.belongsTo(db.tbl_country_master, {
  foreignKey: "vendor_country_id",
  as: "vendor_country_details",
});

// Relation B/W State Master and  Vendor Master Tables
db.tbl_state_master.hasMany(db.tbl_vendor_master, {
  foreignKey: "vendor_state_id",
  as: "vendor_state_details",
});
db.tbl_vendor_master.belongsTo(db.tbl_state_master, {
  foreignKey: "vendor_state_id",
  as: "vendor_state_details",
});

// Relation B/W City Master and  Vendor Master Tables
db.tbl_city_master.hasMany(db.tbl_vendor_master, {
  foreignKey: "vendor_city_id",
  as: "vendor_city_details",
});
db.tbl_vendor_master.belongsTo(db.tbl_city_master, {
  foreignKey: "vendor_city_id",
  as: "vendor_city_details",
});

// Relation B/W Vendor Master and  Vendor Mapped Employee Tables
db.tbl_vendor_master.hasMany(db.tbl_vendor_user_mapped, {
  foreignKey: "vendor_id",
});
db.tbl_vendor_user_mapped.belongsTo(db.tbl_vendor_master, {
  foreignKey: "vendor_id",
});

// Relation B/W Vendor Master and  Vendor Mapped Bank Tables
db.tbl_vendor_master.hasMany(db.tbl_vendor_bank_mapped, {
  foreignKey: "vendor_id",
});
db.tbl_vendor_bank_mapped.belongsTo(db.tbl_vendor_master, {
  foreignKey: "vendor_id",
});

// Relation B/W Vendor Bank Mapped and  Country Master Tables
db.tbl_country_master.hasMany(db.tbl_vendor_bank_mapped, {
  foreignKey: "vendor_bank_country_id",
  as: "vendor_bank_country_details",
});
db.tbl_vendor_bank_mapped.belongsTo(db.tbl_country_master, {
  foreignKey: "vendor_bank_country_id",
  as: "vendor_bank_country_details",
});

// Relation B/W Vendor Bank Mapped and  State Master Tables
db.tbl_state_master.hasMany(db.tbl_vendor_bank_mapped, {
  foreignKey: "vendor_bank_state_id",
  as: "vendor_bank_state_details",
});
db.tbl_vendor_bank_mapped.belongsTo(db.tbl_state_master, {
  foreignKey: "vendor_bank_state_id",
  as: "vendor_bank_state_details",
});

// Relation B/W Vendor Bank Mapped and  City Master Tables
db.tbl_city_master.hasMany(db.tbl_vendor_bank_mapped, {
  foreignKey: "vendor_bank_city_id",
  as: "vendor_bank_city_details",
});
db.tbl_vendor_bank_mapped.belongsTo(db.tbl_city_master, {
  foreignKey: "vendor_bank_city_id",
  as: "vendor_bank_city_details",
});

// Relation B/W Vendor Master and Vendor Document Mapped Tables
db.tbl_vendor_master.hasMany(db.tbl_vendor_document_mapped, {
  foreignKey: "vendor_id",
});
db.tbl_vendor_document_mapped.belongsTo(db.tbl_vendor_master, {
  foreignKey: "vendor_id",
});

// Relation B/W LMS Course and Course Category Tables
db.tbl_course_category.hasMany(db.tbl_lms_course, {
  foreignKey: "course_category_id",
});
db.tbl_lms_course.belongsTo(db.tbl_course_category, {
  foreignKey: "course_category_id",
});

// Relation B/W LMS Course and LMS Course Content Tables
db.tbl_lms_course.hasMany(db.tbl_lms_course_content, {
  foreignKey: "course_id",
});
db.tbl_lms_course_content.belongsTo(db.tbl_lms_course, {
  foreignKey: "course_id",
});

// Relation B/W LMS Course and LMS Course Assessment Tables
db.tbl_lms_course.hasMany(db.tbl_lms_course_assessment, {
  foreignKey: "course_id",
});
db.tbl_lms_course_assessment.belongsTo(db.tbl_lms_course, {
  foreignKey: "course_id",
});

// Relation B/W LMS Course Assessment and LMS Course Assessment Questions Tables
db.tbl_lms_course_assessment.hasMany(db.tbl_lms_course_assessment_questions, {
  foreignKey: "assessment_id",
  as: "assessmentQuestions",
});
db.tbl_lms_course_assessment_questions.belongsTo(db.tbl_lms_course_assessment, {
  foreignKey: "assessment_id",
  as: "assessmentQuestions",
});

// Relation B/W LMS Course and LMS Course Assessment Questions Tables
db.tbl_lms_course.hasMany(db.tbl_lms_course_assessment_questions, {
  foreignKey: "course_id",
});
db.tbl_lms_course_assessment_questions.belongsTo(db.tbl_lms_course, {
  foreignKey: "course_id",
});

// Relation B/W LMS Course and LMS Assign Course Tables
db.tbl_lms_course.hasMany(db.tbl_lms_assign_course, {
  foreignKey: "course_id",
});
db.tbl_lms_assign_course.belongsTo(db.tbl_lms_course, {
  foreignKey: "course_id",
});

// Relation B/W LMS Assign Course and LMS Assign Employee Course Tables
db.tbl_lms_assign_course.hasMany(db.tbl_lms_assign_employee_course, {
  foreignKey: "course_assign_id",
});
db.tbl_lms_assign_employee_course.belongsTo(db.tbl_lms_assign_course, {
  foreignKey: "course_assign_id",
});

// Relation B/W LMS Assign Employee Course and User Master Tables
db.tbl_user_master.hasMany(db.tbl_lms_assign_employee_course, {
  foreignKey: "user_id",
});
db.tbl_lms_assign_employee_course.belongsTo(db.tbl_user_master, {
  foreignKey: "user_id",
});

// Relation B/W LMS Employee Assessment Submission and LMS Course Assessment Tables
db.tbl_lms_course_assessment.hasMany(
  db.tbl_lms_employee_assessment_question_submission,
  {
    foreignKey: "assessment_id",
  }
);
db.tbl_lms_employee_assessment_question_submission.belongsTo(
  db.tbl_lms_course_assessment,
  {
    foreignKey: "assessment_id",
  }
);

// Relation B/W LMS Employee Assessment Submission and LMS Course Assessment Question Tables
db.tbl_lms_course_assessment_questions.hasMany(
  db.tbl_lms_employee_assessment_question_submission,
  {
    foreignKey: "question_id",
  }
);
db.tbl_lms_employee_assessment_question_submission.belongsTo(
  db.tbl_lms_course_assessment_questions,
  {
    foreignKey: "question_id",
  }
);

// Relation B/W LMS Employee Assessment Submission and LMS Assessment Result Tables
db.tbl_lms_course_assessment_results.hasMany(
  db.tbl_lms_employee_assessment_question_submission,
  {
    foreignKey: "result_id",
  }
);
db.tbl_lms_employee_assessment_question_submission.belongsTo(
  db.tbl_lms_course_assessment_results,
  {
    foreignKey: "result_id",
  }
);

// Relation B/W LMS Employee Assign Course and LMS Course Tables
db.tbl_lms_course.hasMany(db.tbl_lms_assign_employee_course, {
  foreignKey: "course_id",
});
db.tbl_lms_assign_employee_course.belongsTo(db.tbl_lms_course, {
  foreignKey: "course_id",
});

// Relation B/W LMS Employee Assessment Result and User Master Tables
db.tbl_user_master.hasMany(db.tbl_lms_course_assessment_results, {
  foreignKey: "user_id",
});
db.tbl_lms_course_assessment_results.belongsTo(db.tbl_user_master, {
  foreignKey: "user_id",
});

// Relation B/W LMS Employee Assign Course and LMS Employee Assessment Result Tables
db.tbl_lms_assign_course.hasMany(db.tbl_lms_course_assessment_results, {
  foreignKey: "course_assign_id",
});
db.tbl_lms_course_assessment_results.belongsTo(db.tbl_lms_assign_course, {
  foreignKey: "course_assign_id",
});

// // Relation B/W User Master and Purchase Request Tables
// db.tbl_user_master.hasMany(db.tbl_purchase_request, {
//   foreignKey: "user_id",
// });
// db.tbl_purchase_request.belongsTo(db.tbl_user_master, {
//   foreignKey: "user_id",
// });

// // Relation B/W Department Master and Purchase Request Tables
// db.tbl_department_master.hasMany(db.tbl_purchase_request, {
//   foreignKey: "dept_id",
// });
// db.tbl_purchase_request.belongsTo(db.tbl_department_master, {
//   foreignKey: "dept_id",
// });

// // Relation B/W Budget Management and Purchase Request Tables
// db.tbl_budget_management.hasMany(db.tbl_purchase_request, {
//   foreignKey: "budget_id",
// });
// db.tbl_purchase_request.belongsTo(db.tbl_budget_management, {
//   foreignKey: "budget_id",
// });

// // Relation B/W City Master and Purchase Request Tables
// db.tbl_state_master.hasMany(db.tbl_purchase_request, {
//   foreignKey: "pr_delivery_state_id",
// });
// db.tbl_purchase_request.belongsTo(db.tbl_state_master, {
//   foreignKey: "pr_delivery_state_id",
// });

// **************************** RBAC **************************** //
// RBAC Module Master Table
db.tbl_rbac_module_master =
  require("../API/rbac_management/model/module_master.model")(
    sequelize,
    Sequelize
  );

// RBAC SubModule Master Table
db.tbl_rbac_submodule_master =
  require("../API/rbac_management/model/subModule_master.model")(
    sequelize,
    Sequelize
  );

db.tbl_rbac_assign_module_master =
  require("../API/rbac_management/model/assign_module_master.model")(
    sequelize,
    Sequelize
  );

// Relation B/W RBAC Module Master and RBAC SubModule Master Tables
db.tbl_rbac_module_master.hasMany(db.tbl_rbac_submodule_master, {
  foreignKey: "rbac_module_id",
});
db.tbl_rbac_submodule_master.belongsTo(db.tbl_rbac_module_master, {
  foreignKey: "rbac_module_id",
});

// Relation B/W Module Master and Assigned Module Tables
db.tbl_rbac_module_master.hasMany(db.tbl_rbac_assign_module_master, {
  foreignKey: "module_id",
});
db.tbl_rbac_assign_module_master.belongsTo(db.tbl_rbac_module_master, {
  foreignKey: "module_id",
});

// Relation B/W SubModule Master and Assigned Module Tables
db.tbl_rbac_submodule_master.hasMany(db.tbl_rbac_assign_module_master, {
  foreignKey: "submodule_id",
});
db.tbl_rbac_assign_module_master.belongsTo(db.tbl_rbac_submodule_master, {
  foreignKey: "submodule_id",
});

// Relation B/W User Master and Assigned Module Tables
db.tbl_user_master.hasMany(db.tbl_rbac_assign_module_master, {
  foreignKey: "user_id",
});
db.tbl_rbac_assign_module_master.belongsTo(db.tbl_user_master, {
  foreignKey: "user_id",
});

// Relation B/W Role Master and Assigned Module Tables
db.tbl_role_master.hasMany(db.tbl_rbac_assign_module_master, {
  foreignKey: "role_id",
});
db.tbl_rbac_assign_module_master.belongsTo(db.tbl_role_master, {
  foreignKey: "role_id",
});
// ========== EXPORTS ========== //
module.exports = db;

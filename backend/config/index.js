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
  require("../API/workflowManagement/model/workflowType.model")(
    sequelize,
    Sequelize
  );

// Workflow Table
db.tbl_workflow_master =
  require("../API/workflowManagement/model/workflow.model")(
    sequelize,
    Sequelize
  );

// Workflow Employee Mapping Table
db.tbl_workflowEmployeeMapping_master =
  require("../API/workflowManagement/model/workflowEmployeeMapping.model")(
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

// Notifications Master Table
db.tbl_notification_master =
  require("../API/notificationsManagement/model/notification.model")(
    sequelize,
    Sequelize
  );

// Transfer Type Master Table
db.tbl_transfer_type_master =
  require("../API/configurationMasters/transferType_master/model/transferType_master.model")(
    sequelize,
    Sequelize
  );

// Transfer Reason Master Table
db.tbl_transfer_reason_master =
  require("../API/configurationMasters/transferReason_master/model/transferReason_master.model")(
    sequelize,
    Sequelize
  );

// Employee Transfer  Master Table
db.tbl_employee_transfer =
  require("../API/hrms/employeeTransfer/model/transfer.model")(
    sequelize,
    Sequelize
  );

// Employee Transfer Approval Master Table
db.tbl_employee_transfer_approval =
  require("../API/hrms/employeeTransfer/model/transferApproval.model")(
    sequelize,
    Sequelize
  );

// Generate ID Card Table
db.tbl_generate_id_card =
  require("../API/hrms/generateIdCard/model/generateIdCard.model")(
    sequelize,
    Sequelize
  );

// Ticket Category Table
db.tbl_ticket_category_master =
  require("../API/configurationMasters/ticket_category_master/model/ticket_category.model")(
    sequelize,
    Sequelize
  );

// Ticket Management Table
db.tbl_ticket_management =
  require("../API/ticketManagement/model/ticketManagement.model")(
    sequelize,
    Sequelize
  );

// Ticket Allocation Table
db.tbl_ticket_allocation =
  require("../API/ticketManagement/model/ticketAllocation.model")(
    sequelize,
    Sequelize
  );

// Ticket History Table
db.tbl_ticket_history =
  require("../API/ticketManagement/model/ticketHistory.model")(
    sequelize,
    Sequelize
  );

// Event Category Table
db.tbl_event_category =
  require("../API/configurationMasters/eventCategory_master/model/eventCategory.model")(
    sequelize,
    Sequelize
  );

// Event Management Table
db.tbl_event_management = require("../API/eventManagement/model/event.model")(
  sequelize,
  Sequelize
);

// Event Registration Table
db.tbl_event_registration =
  require("../API/eventManagement/model/eventRegistration.model")(
    sequelize,
    Sequelize
  );

// Event Tickets Table
db.tbl_event_ticket_type =
  require("../API/eventManagement/model/eventTicket.model")(
    sequelize,
    Sequelize
  );

// Event Registration Cancel Table
db.tbl_event_registration_payment_transactions =
  require("../API/eventManagement/model/eventRegistrationPaymentTransaction.model")(
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

// Relation B/W ID Card and User Tables
db.tbl_generate_id_card.hasMany(db.tbl_user_master, {
  foreignKey: "card_id",
});
db.tbl_user_master.belongsTo(db.tbl_generate_id_card, {
  foreignKey: "card_id",
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

// Relation B/W User Master and Notification Master Tables
db.tbl_user_master.hasMany(db.tbl_notification_master, {
  foreignKey: "user_id",
});
db.tbl_notification_master.belongsTo(db.tbl_user_master, {
  foreignKey: "user_id",
});

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

// Relation B/W Employee Master and Employee Transfer Tables (Requested for User ID)
db.tbl_user_master.hasMany(db.tbl_employee_transfer, {
  foreignKey: "requested_for_user_id",
});
db.tbl_employee_transfer.belongsTo(db.tbl_user_master, {
  foreignKey: "requested_for_user_id",
});

// Relation B/W Role Master and Employee Transfer Tables (From Role)
db.tbl_role_master.hasMany(db.tbl_employee_transfer, {
  foreignKey: "from_role_id",
});
db.tbl_employee_transfer.belongsTo(db.tbl_role_master, {
  foreignKey: "from_role_id",
});

// Relation B/W Role Master and Employee Transfer Tables (To Role)
db.tbl_role_master.hasMany(db.tbl_employee_transfer, {
  foreignKey: "to_role_id",
});
db.tbl_employee_transfer.belongsTo(db.tbl_role_master, {
  foreignKey: "to_role_id",
});

// Relation B/W Department Master and Employee Transfer Tables (From Department)
db.tbl_department_master.hasMany(db.tbl_employee_transfer, {
  foreignKey: "from_dept_id",
});
db.tbl_employee_transfer.belongsTo(db.tbl_department_master, {
  foreignKey: "from_dept_id",
});

// Relation B/W Department Master and Employee Transfer Tables (To Department)
db.tbl_department_master.hasMany(db.tbl_employee_transfer, {
  foreignKey: "to_dept_id",
});
db.tbl_employee_transfer.belongsTo(db.tbl_department_master, {
  foreignKey: "to_dept_id",
});

// Relation B/W Designation Master and Employee Transfer Tables (From Designation)
db.tbl_designation_master.hasMany(db.tbl_employee_transfer, {
  foreignKey: "from_desig_id",
});
db.tbl_employee_transfer.belongsTo(db.tbl_designation_master, {
  foreignKey: "from_desig_id",
});

// Relation B/W Designation Master and Employee Transfer Tables (To Designation)
db.tbl_designation_master.hasMany(db.tbl_employee_transfer, {
  foreignKey: "to_desig_id",
});
db.tbl_employee_transfer.belongsTo(db.tbl_designation_master, {
  foreignKey: "to_desig_id",
});

// Relation B/W Branch Master and Employee Transfer Tables (From Branch)
db.tbl_branch_master.hasMany(db.tbl_employee_transfer, {
  foreignKey: "from_branch_id",
});
db.tbl_employee_transfer.belongsTo(db.tbl_branch_master, {
  foreignKey: "from_branch_id",
});

// Relation B/W Branch Master and Employee Transfer Tables (To Branch)
db.tbl_branch_master.hasMany(db.tbl_employee_transfer, {
  foreignKey: "to_branch_id",
});
db.tbl_employee_transfer.belongsTo(db.tbl_branch_master, {
  foreignKey: "to_branch_id",
});

// Relation B/W Transfer Type and Employee Transfer Tables
db.tbl_transfer_type_master.hasMany(db.tbl_employee_transfer, {
  foreignKey: "transfer_type_id",
});
db.tbl_employee_transfer.belongsTo(db.tbl_transfer_type_master, {
  foreignKey: "transfer_type_id",
});

// Relation B/W Transfer Reason and Employee Transfer Tables
db.tbl_transfer_reason_master.hasMany(db.tbl_employee_transfer, {
  foreignKey: "transfer_reason_id",
});
db.tbl_employee_transfer.belongsTo(db.tbl_transfer_reason_master, {
  foreignKey: "transfer_reason_id",
});

// Relation B/W User Master and Employee Transfer Tables (Requested By User ID)
db.tbl_user_master.hasMany(db.tbl_employee_transfer, {
  foreignKey: "requested_by_user_id",
});
db.tbl_employee_transfer.belongsTo(db.tbl_user_master, {
  foreignKey: "requested_by_user_id",
});

// Relation B/W User Master and Employee Transfer Tables (For Current Reported To User)
db.tbl_user_master.hasMany(db.tbl_employee_transfer, {
  foreignKey: "current_report_to_user_id",
});
db.tbl_employee_transfer.belongsTo(db.tbl_user_master, {
  foreignKey: "current_report_to_user_id",
});

// Relation B/W User Master and Employee Transfer Tables (For Reported To User)
db.tbl_user_master.hasMany(db.tbl_employee_transfer, {
  foreignKey: "report_to_user_id",
});
db.tbl_employee_transfer.belongsTo(db.tbl_user_master, {
  foreignKey: "report_to_user_id",
});

// Relation B/W Transfer Approval and Employee Transfer Tables (For Reported To User)
db.tbl_employee_transfer.hasMany(db.tbl_employee_transfer_approval, {
  foreignKey: "transfer_id",
});
db.tbl_employee_transfer_approval.belongsTo(db.tbl_employee_transfer, {
  foreignKey: "transfer_id",
});

// Relation B/W User Master and Employee Transfer Tables (For Reported To User)
db.tbl_user_master.hasMany(db.tbl_employee_transfer_approval, {
  foreignKey: "approver_id",
});
db.tbl_employee_transfer_approval.belongsTo(db.tbl_user_master, {
  foreignKey: "approver_id",
});

// Relation B/W User Master and Employee ID Table
db.tbl_user_master.hasMany(db.tbl_generate_id_card, {
  foreignKey: "user_id",
});
db.tbl_generate_id_card.belongsTo(db.tbl_user_master, {
  foreignKey: "user_id",
});

// ========================================== TICKET MANAGEMENT ========================================== //
// Relation B/W User Master and Ticket Management Tables (Created By User)
db.tbl_user_master.hasMany(db.tbl_ticket_management, {
  foreignKey: "created_by_user_id",
});
db.tbl_ticket_management.belongsTo(db.tbl_user_master, {
  foreignKey: "created_by_user_id",
});

// Relation B/W User Master and Ticket Management Tables (Created For User)
db.tbl_user_master.hasMany(db.tbl_ticket_management, {
  foreignKey: "user_id",
});
db.tbl_ticket_management.belongsTo(db.tbl_user_master, {
  foreignKey: "user_id",
});

// Relation B/W Department Master and Ticket Management Tables
db.tbl_department_master.hasMany(db.tbl_ticket_management, {
  foreignKey: "created_for_dept_id",
});
db.tbl_ticket_management.belongsTo(db.tbl_department_master, {
  foreignKey: "created_for_dept_id",
});

// Relation B/W Ticket Category Master and Ticket Management Tables
db.tbl_ticket_category_master.hasMany(db.tbl_ticket_management, {
  foreignKey: "ticket_category_id",
});
db.tbl_ticket_management.belongsTo(db.tbl_ticket_category_master, {
  foreignKey: "ticket_category_id",
});

// Relation B/W Ticket Management and Ticket Allocation Tables
db.tbl_ticket_management.hasMany(db.tbl_ticket_allocation, {
  foreignKey: "ticket_id",
});
db.tbl_ticket_allocation.belongsTo(db.tbl_ticket_management, {
  foreignKey: "ticket_id",
});

// Relation B/W User Master and Ticket Allocation Tables
db.tbl_user_master.hasMany(db.tbl_ticket_allocation, {
  foreignKey: "allocated_to_user_id",
});
db.tbl_ticket_allocation.belongsTo(db.tbl_user_master, {
  foreignKey: "allocated_to_user_id",
});

// Relation B/W Ticket Management and Ticket History Tables
db.tbl_ticket_management.hasMany(db.tbl_ticket_history, {
  foreignKey: "ticket_id",
});
db.tbl_ticket_history.belongsTo(db.tbl_ticket_management, {
  foreignKey: "ticket_id",
});

// ========================================== EVENT MANAGEMENT ========================================== //
// Relation B/W Event Category Master And Event Management Tables
db.tbl_event_category.hasMany(db.tbl_event_management, {
  foreignKey: "event_category_id",
});
db.tbl_event_management.belongsTo(db.tbl_event_category, {
  foreignKey: "event_category_id",
});

// Relation B/W Country Master And Event Management Tables
db.tbl_country_master.hasMany(db.tbl_event_management, {
  foreignKey: "event_country_id",
});
db.tbl_event_management.belongsTo(db.tbl_country_master, {
  foreignKey: "event_country_id",
});

// Relation B/W State Master And Event Management Tables
db.tbl_state_master.hasMany(db.tbl_event_management, {
  foreignKey: "event_state_id",
});
db.tbl_event_management.belongsTo(db.tbl_state_master, {
  foreignKey: "event_state_id",
});

// Relation B/W City Master And Event Management Tables
db.tbl_city_master.hasMany(db.tbl_event_management, {
  foreignKey: "event_city_id",
});
db.tbl_event_management.belongsTo(db.tbl_city_master, {
  foreignKey: "event_city_id",
});

// Relation B/W User Master And Event Management Tables
db.tbl_user_master.hasMany(db.tbl_event_management, {
  foreignKey: "event_organizer_id",
});
db.tbl_event_management.belongsTo(db.tbl_user_master, {
  foreignKey: "event_organizer_id",
});

// Relation B/W Event Ticket And Event Management Tables
db.tbl_event_management.hasMany(db.tbl_event_ticket_type, {
  foreignKey: "event_id",
});
db.tbl_event_ticket_type.belongsTo(db.tbl_event_management, {
  foreignKey: "event_id",
});

// Relation B/W Event Management And Event Registration Tables
db.tbl_event_management.hasMany(db.tbl_event_registration, {
  foreignKey: "event_id",
});
db.tbl_event_registration.belongsTo(db.tbl_event_management, {
  foreignKey: "event_id",
});

// Relation B/W Event Ticket And Event Registration Tables
db.tbl_event_ticket_type.hasMany(db.tbl_event_registration, {
  foreignKey: "event_ticket_id",
});
db.tbl_event_registration.belongsTo(db.tbl_event_ticket_type, {
  foreignKey: "event_ticket_id",
});

// Relation B/W Event Management And Event Payment Transaction Tables
db.tbl_event_management.hasMany(db.tbl_event_registration, {
  foreignKey: "event_id",
});
db.tbl_event_registration.belongsTo(db.tbl_event_management, {
  foreignKey: "event_id",
});

// Relation B/W Event Registration And Event Payment Transaction Tables
db.tbl_event_registration.hasMany(
  db.tbl_event_registration_payment_transactions,
  {
    foreignKey: "registration_id",
  }
);
db.tbl_event_registration_payment_transactions.belongsTo(
  db.tbl_event_registration,
  {
    foreignKey: "registration_id",
  }
);

// ========== EXPORTS ========== //
module.exports = db;

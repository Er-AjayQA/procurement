// ========== REQUIRE STATEMENTS ========== //
const DB = require("../../../../config/index");
const { generateUniqueCode } = require("../../../../helper/generateUniqueCode");

// ========== CREATE WORKFLOW CONTROLLER ========== //
module.exports.createWorkflow = async (req, res) => {
  try {
    const data = req.body;

    // Check if Workflow already exist
    const isAlreadyExist = await DB.tbl_workflow_master.findOne({
      where: {
        [DB.Sequelize.Op.and]: [
          { workflow_type_id: data.workflow_type_id },
          { dept_id: data.dept_id },
          { isDeleted: false },
        ],
      },
    });

    if (isAlreadyExist) {
      return res
        .status(400)
        .send({ success: false, message: "Workflow Already Exist!" });
    } else {
      if (!data.employees) {
      } else {
        const transaction = await DB.sequelize.transaction();

        try {
          const newWorkflow = await DB.tbl_workflow_master.create(
            { workflow_type_id: data.workflow_type_id, dept_id: data.dept_id },
            { transaction }
          );

          await DB.tbl_workflowEmployeeMapping_master.bulkCreate(
            data.employees.map((employee) => ({
              workflow_id: newWorkflow.id,
              level: employee.level,
              role_id: employee.role_id,
              user_id: employee.user_id,
            })),
            { transaction }
          );

          await transaction.commit();
          return res.status(200).send({
            success: true,
            status: "Workflow Created Successfully!",
            data: newWorkflow,
          });
        } catch (error) {
          console.log("Error in Creating Workflow", error);
          await transaction.rollback();
          throw error;
        }
      }
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE WORKFLOW CONTROLLER ========== //
module.exports.updateWorkflow = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    // Check if Workflow exist
    const isWorkflowExist = await DB.tbl_workflow_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isWorkflowExist) {
      return res
        .status(400)
        .send({ success: false, message: "Workflow Not Found!" });
    } else {
      const duplicateWorkflow = await DB.tbl_workflow_master.findOne({
        where: {
          id: { [DB.Sequelize.Op.ne]: id },
          [DB.Sequelize.Op.and]: [
            { workflow_type_id: data.workflow_type_id },
            { dept_id: data.dept_id },
            { isDeleted: false },
          ],
        },
      });

      if (duplicateWorkflow) {
        return res.status(409).send({
          success: false,
          message: "Workflow For Selected Department Already Exist!",
        });
      } else {
        const transaction = await DB.sequelize.transaction();
        try {
          const updateWorkflow = await DB.tbl_workflow_master.update(data, {
            where: { id },
            transaction,
          });

          return res.status(200).send({
            success: true,
            status: "Workflow Updated Successfully!",
            data: updateWorkflow,
          });
        } catch (error) {}
      }
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET WORKFLOW DETAILS CONTROLLER ========== //
module.exports.getWorkflowDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
    SELECT D.*, U.name AS department_head_name, U.emp_code
    FROM DEPARTMENT_MASTER AS D
    LEFT JOIN USER_MASTER AS U ON U.id= D.department_head_id
    WHERE D.id=${id} AND D.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Department Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get Department Details Successfully!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL WORKFLOW DETAILS CONTROLLER ========== //
module.exports.getAllWorkflowDetails = async (req, res) => {
  try {
    const query = `
            SELECT D.*, U.emp_code, U.name As department_head_name
            FROM DEPARTMENT_MASTER AS D
            LEFT JOIN USER_MASTER AS U on U.id=D.department_head_id
            WHERE D.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Departments Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get All Departments List!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE WORKFLOW CONTROLLER ========== //
module.exports.updateWorkflowStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user already exist
    const isDepartmentExist = await DB.tbl_department_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isDepartmentExist) {
      return res
        .status(400)
        .send({ success: false, message: "Department Not Found!" });
    } else {
      const updateStatus = await isDepartmentExist.update({
        status: !isDepartmentExist.status,
      });
      return res.status(200).send({
        success: true,
        status: "Status Changed Successfully!",
        data: updateStatus,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== DELETE WORKFLOW CONTROLLER ========== //
module.exports.deleteWorkflow = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Department already exist
    const isDepartmentExist = await DB.tbl_department_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isDepartmentExist) {
      return res
        .status(400)
        .send({ success: false, message: "Department Not Found!" });
    } else {
      await isDepartmentExist.update({
        isDeleted: true,
      });
      return res.status(200).send({
        success: true,
        status: "Department Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

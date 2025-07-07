// ========== REQUIRE STATEMENTS ========== //
const DB = require("../../../../config/index");
const { generateUniqueCode } = require("../../../../helper/generateUniqueCode");

// ========== CREATE PURCHASE REQUEST CONTROLLER ========== //
module.exports.createPR = async (req, res) => {
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

// ========== UPDATE PURCHASE REQUEST CONTROLLER ========== //
module.exports.updatePR = async (req, res) => {
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
        const updateWorkflow = await DB.tbl_workflow_master.update(data, {
          where: { id },
        });

        // Destroy the previous employee mapping before creating new
        await DB.tbl_workflowEmployeeMapping_master.destroy({
          where: { workflow_id: id },
        });

        // Adding new Employee mapping
        await DB.tbl_workflowEmployeeMapping_master.bulkCreate(
          data.employees.map((employee) => ({
            workflow_id: id,
            level: employee.level,
            role_id: employee.role_id,
            user_id: employee.user_id,
          }))
        );

        return res.status(200).send({
          success: true,
          status: "Workflow Updated Successfully!",
          data: updateWorkflow,
        });
      }
    }
  } catch (error) {
    if (transaction) await transaction.rollback();
    console.log("Error in Creating Workflow", error);
    return res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET PURCHASE REQUEST DETAILS CONTROLLER ========== //
module.exports.getPRDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
    SELECT W.*, WT.name, D.name AS department
    FROM WORKFLOW_MASTER AS W
    LEFT JOIN WORKFLOW_TYPE_MASTER AS WT ON WT.id=W.workflow_type_id
    LEFT JOIN DEPARTMENT_MASTER AS D ON D.id=W.dept_id
    WHERE W.id=${id} AND W.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    // Get Employee Mapping Details
    const employeeMappingDetails =
      await DB.tbl_workflowEmployeeMapping_master.findAll({
        where: { workflow_id: id },
      });

    const workflowEmployeeDetails = await Promise.all(
      employeeMappingDetails.map(async (employee) => {
        const details = await DB.tbl_user_master.findOne({
          attributes: ["id", "name"],
          where: { id: employee.user_id },
          include: {
            model: DB.tbl_role_master,
            attributes: ["id", "name"],
            where: { isDeleted: false },
          },
        });

        return details;
      })
    );

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Workflow Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get Workflow Details Successfully!",
        data: { ...getAllData, workflowEmployeeDetails },
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL PURCHASE REQUEST DETAILS CONTROLLER ========== //
module.exports.getAllPRDetails = async (req, res) => {
  try {
    const query = `
            SELECT W.*, WT.name, D.name AS department
            FROM WORKFLOW_MASTER AS W
            LEFT JOIN WORKFLOW_TYPE_MASTER AS WT ON WT.id=W.workflow_type_id
            LEFT JOIN DEPARTMENT_MASTER AS D ON D.id=W.dept_id
            WHERE W.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Workflows Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get All Workflows List!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE PURCHASE REQUEST CONTROLLER ========== //
module.exports.updatePRStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Workflow already exist
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
      const updateStatus = await isWorkflowExist.update({
        status: !isWorkflowExist.status,
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

// ========== DELETE PURCHASE REQUEST CONTROLLER ========== //
module.exports.deletePR = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Workflow already exist
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
      await isWorkflowExist.update({
        isDeleted: true,
      });
      return res.status(200).send({
        success: true,
        status: "Workflow Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

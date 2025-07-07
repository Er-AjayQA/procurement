// ========== REQUIRE STATEMENTS ========== //
const DB = require("../../../config/index");
const { generateUniqueCode } = require("../../../helper/generateUniqueCode");

// ========== CREATE BUDGET CONTROLLER ========== //
module.exports.createBudget = async (req, res) => {
  try {
    const data = req.body;

    // Check if Budget already exist
    const isAlreadyExist = await DB.tbl_budget_management.findOne({
      where: {
        [DB.Sequelize.Op.and]: [
          { name: data.name },
          { dept_id: data.dept_id },
          { isDeleted: false },
        ],
      },
    });

    if (isAlreadyExist) {
      return res.status(400).send({
        success: false,
        message: "Budget Name for Selected Department Already Exist!",
      });
    } else {
      const getDepartmentDetails = await DB.tbl_department_master.findOne({
        where: { id: data.dept_id },
      });

      if (!getDepartmentDetails) {
        return res.status(404).send({
          success: false,
          status: "Department Not Found!",
        });
      } else {
        let code = await generateUniqueCode(
          `${getDepartmentDetails.dep_code + "CC"}`,
          `${(getDepartmentDetails.dep_code + "CC").length}`,
          "code",
          "BUDGET_MANAGEMENT"
        );
        const newBudget = await DB.tbl_budget_management.create({
          name: data.name,
          code: code,
          budget_type: data.budget_type,
          budget_amount: data.budget_amount,
          dept_id: data.dept_id,
        });

        return res.status(200).send({
          success: true,
          status: "Budget Created Successfully!",
          data: newBudget,
        });
      }
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE BUDGET CONTROLLER ========== //
module.exports.updateBudget = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    // Check if Budget exist
    const isBudgetExist = await DB.tbl_budget_management.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isBudgetExist) {
      return res
        .status(400)
        .send({ success: false, message: "Budget Not Found!" });
    } else {
      const duplicateBudget = await DB.tbl_budget_management.findOne({
        where: {
          id: { [DB.Sequelize.Op.ne]: id },
          [DB.Sequelize.Op.and]: [
            { name: data.name },
            { dept_id: data.dept_id },
            { isDeleted: false },
          ],
        },
      });

      if (duplicateBudget) {
        return res.status(409).send({
          success: false,
          message: "Budget Name For Selected Department Already Exist!",
        });
      } else {
        const updateBudget = await DB.tbl_budget_management.update(data, {
          where: { id },
        });

        return res.status(200).send({
          success: true,
          status: "Budget Updated Successfully!",
          data: updateBudget,
        });
      }
    }
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET BUDGET DETAILS CONTROLLER ========== //
module.exports.getBudgetDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
    SELECT B.*, D.name AS department
    FROM BUDGET_MANAGEMENT AS B
    LEFT JOIN DEPARTMENT_MASTER AS D ON D.id=B.dept_id
    WHERE B.id=${id} AND B.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Budget Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get Budget Details Successfully!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL BUDGET DETAILS CONTROLLER ========== //
module.exports.getAllBudgetDetails = async (req, res) => {
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

// ========== UPDATE BUDGET CONTROLLER ========== //
module.exports.updateBudgetStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Workflow already exist
    const isBudgetExist = await DB.tbl_workflow_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isBudgetExist) {
      return res
        .status(400)
        .send({ success: false, message: "Workflow Not Found!" });
    } else {
      const updateStatus = await isBudgetExist.update({
        status: !isBudgetExist.status,
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

// ========== DELETE BUDGET CONTROLLER ========== //
module.exports.deleteBudget = async (req, res) => {
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

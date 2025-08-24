// ========== REQUIRE STATEMENTS ========== //
const DB = require("../../../config/index");

// ========== CREATE WORKFLOW CONTROLLER ========== //
module.exports.createWorkflowType = async (req, res) => {
  try {
    const data = req.body;

    // Check if Workflow Type already exist
    const isAlreadyExist = await DB.tbl_workflow_type_master.findOne({
      where: {
        name: data.name,
        isDeleted: false,
      },
    });

    if (isAlreadyExist) {
      return res
        .status(400)
        .send({ success: false, message: "Workflow Type Already Exist!" });
    } else {
      const newWorkflowType = await DB.tbl_workflow_type_master.create(data);
      return res.status(200).send({
        success: true,
        status: "Workflow Type Created Successfully!",
        data: newWorkflowType,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE WORKFLOW CONTROLLER ========== //
module.exports.updateWorkflowType = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    // Check if Workflow Type already exist
    const isWorkflowTypeExist = await DB.tbl_workflow_type_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isWorkflowTypeExist) {
      return res
        .status(400)
        .send({ success: false, message: "Workflow Type Not Found!" });
    } else {
      const duplicateWorkflowType = await DB.tbl_workflow_type_master.findOne({
        where: {
          id: { [DB.Sequelize.Op.ne]: id },
          name: data.name,
          isDeleted: false,
        },
      });

      if (duplicateWorkflowType) {
        return res
          .status(409)
          .send({ success: false, message: "Department Name Already Exist!" });
      } else {
        const updateWorkflowType = await isWorkflowTypeExist.update(data);
        return res.status(200).send({
          success: true,
          status: "Workflow Type Updated Successfully!",
          data: updateWorkflowType,
        });
      }
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET WORKFLOW DETAILS CONTROLLER ========== //
module.exports.getWorkflowTypeDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
    SELECT W.*
    FROM WORKFLOW_TYPE_MASTER AS W
    WHERE W.id=${id} AND W.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Workflow Type Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get Workflow Type Details Successfully!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL WORKFLOW DETAILS CONTROLLER ========== //
module.exports.getAllWorkflowTypeDetails = async (req, res) => {
  try {
    const query = `
            SELECT W.*
            FROM WORKFLOW_TYPE_MASTER AS W
            WHERE W.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Workflow Types Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get All Workflow Types List!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== DELETE WORKFLOW CONTROLLER ========== //
module.exports.deleteWorkflowType = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Workflow Type already exist
    const isWorkflowTypeExist = await DB.tbl_workflow_type_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isWorkflowTypeExist) {
      return res
        .status(400)
        .send({ success: false, message: "Workflow Type Not Found!" });
    } else {
      await isWorkflowTypeExist.update({
        isDeleted: true,
      });
      return res.status(200).send({
        success: true,
        status: "Workflow Type Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== IMPORT STATEMENTS ========== //
const DB = require("../../../../config/index");

// ========== CREATE DESIGNATION CONTROLLER ========== //
module.exports.createDesignation = async (req, res) => {
  try {
    const data = req.body;

    // Check if Designation already exist
    const isAlreadyExist = await DB.tbl_designation_master.findOne({
      where: {
        name: data.name,
        isDeleted: false,
      },
    });

    if (isAlreadyExist) {
      return res
        .status(400)
        .send({ success: false, message: "Designation Already Exist!" });
    } else {
      const newDesignation = await DB.tbl_designation_master.create(data);
      return res.status(200).send({
        success: true,
        status: "Designation Created Successfully!",
        data: newDesignation,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE DESIGNATION CONTROLLER ========== //
module.exports.updateDesignation = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    // Check if Designation already exist
    const isDesignationExist = await DB.tbl_designation_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isDesignationExist) {
      return res
        .status(400)
        .send({ success: false, message: "Designation Not Found!" });
    } else {
      const duplicateDesignation = await DB.tbl_designation_master.findOne({
        where: {
          id: { [DB.Sequelize.Op.ne]: id },
          name: data.name,
          isDeleted: false,
        },
      });

      if (duplicateDesignation) {
        return res.status(409).send({
          success: false,
          message: "Designation Name Already Exist!",
        });
      } else {
        const updateDesignation = await isDesignationExist.update(data);
        return res.status(200).send({
          success: true,
          status: "Designation Updated Successfully!",
          data: updateDesignation,
        });
      }
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET DESIGNATION DETAILS CONTROLLER ========== //
module.exports.getDesignationDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
    SELECT D.*
    FROM DESIGNATION_MASTER AS D
    WHERE D.id=${id}
    AND D.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Designation Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get Designation Details Successfully!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL DESIGNATION DETAILS CONTROLLER ========== //
module.exports.getAllDesignationDetails = async (req, res) => {
  try {
    const query = `
            SELECT D.*
            FROM DESIGNATION_MASTER AS D
            WHERE D.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Designations Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get All Designations List!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE DESIGNATION CONTROLLER ========== //
module.exports.updateDesignationStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Designation already exist
    const isDesignationExist = await DB.tbl_designation_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isDesignationExist) {
      return res
        .status(400)
        .send({ success: false, message: "Designation Not Found!" });
    } else {
      const updateStatus = await isDesignationExist.update({
        status: !isDesignationExist.status,
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

// ========== DELETE DESIGNATION CONTROLLER ========== //
module.exports.deleteDesignation = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Designation already exist
    const isDesignationExist = await DB.tbl_designation_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isDesignationExist) {
      return res
        .status(400)
        .send({ success: false, message: "Designation Not Found!" });
    } else {
      await isDesignationExist.update({
        isDeleted: true,
      });
      return res.status(200).send({
        success: true,
        status: "Designation Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

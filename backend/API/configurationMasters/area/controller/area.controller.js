// ========== IMPORT STATEMENTS ========== //
const DB = require("../../../../config/index");

// ========== CREATE AREA CONTROLLER ========== //
module.exports.createArea = async (req, res) => {
  try {
    const data = req.body;

    // Check if Area already exist
    const isAlreadyExist = await DB.tbl_area_master.findOne({
      where: {
        [DB.Sequelize.Op.and]: [
          { name: data.name },
          { dept_id: data.dept_id },
          { isDeleted: false },
        ],
      },
    });

    if (isAlreadyExist) {
      return res
        .status(400)
        .send({ success: false, message: "Area Already Exist!" });
    } else {
      const newArea = await DB.tbl_area_master.create(data);
      return res.status(200).send({
        success: true,
        status: "Area Created Successfully!",
        data: newArea,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE AREA CONTROLLER ========== //
module.exports.updateArea = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    // Check if Designation already exist
    const isDesignationExist = await DB.tbl_designation.findOne({
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
      const updateDesignation = await isDesignationExist.update(data);
      return res.status(200).send({
        success: true,
        status: "Designation Updated Successfully!",
        data: updateDesignation,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET AREA DETAILS CONTROLLER ========== //
module.exports.getAreaDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
    SELECT D.*
    FROM DESIGNATION AS D
    WHERE D.id=${id}`;

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

// ========== GET ALL AREA DETAILS CONTROLLER ========== //
module.exports.getAllAreaDetails = async (req, res) => {
  try {
    const query = `
            SELECT D.*
            FROM DESIGNATION AS D`;

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

// ========== UPDATE AREA CONTROLLER ========== //
module.exports.updateAreaStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Designation already exist
    const isDesignationExist = await DB.tbl_designation.findOne({
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

// ========== DELETE AREA CONTROLLER ========== //
module.exports.deleteArea = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Designation already exist
    const isDesignationExist = await DB.tbl_designation.findOne({
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

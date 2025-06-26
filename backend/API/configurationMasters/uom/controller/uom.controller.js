// ========== IMPORT STATEMENTS ========== //
const DB = require("../../../../config/index");

// ========== CREATE UOM CONTROLLER ========== //
module.exports.createUom = async (req, res) => {
  try {
    const data = req.body;

    // Check if UOM already exist
    const isAlreadyExist = await DB.tbl_uom_master.findOne({
      where: {
        name: data.name,
        isDeleted: false,
      },
    });

    if (isAlreadyExist) {
      return res
        .status(400)
        .send({ success: false, message: "UOM Already Exist!" });
    } else {
      const newUom = await DB.tbl_uom_master.create(data);
      return res.status(200).send({
        success: true,
        status: "UOM Created Successfully!",
        data: newUom,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE UOM CONTROLLER ========== //
module.exports.updateUom = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    // Check if UOM already exist
    const isUomExist = await DB.tbl_uom_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isUomExist) {
      return res
        .status(400)
        .send({ success: false, message: "UOM Not Found!" });
    } else {
      const duplicateUom = await DB.tbl_uom_master.findOne({
        where: {
          id: { [DB.Sequelize.Op.ne]: id },
          name: data.name ? data.name : isUomExist.name,
          isDeleted: false,
        },
      });

      if (duplicateUom) {
        return res
          .status(409)
          .send({ success: false, message: "UOM Name Already Exist!" });
      } else {
        const updateUom = await isUomExist.update(data);
        return res.status(200).send({
          success: true,
          status: "UOM Updated Successfully!",
          data: updateUom,
        });
      }
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET UOM DETAILS CONTROLLER ========== //
module.exports.getUomDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
    SELECT U.*
    FROM UOM_MASTER AS U
    WHERE U.id=${id} AND U.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "UOM Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get UOM Details Successfully!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL UOM DETAILS CONTROLLER ========== //
module.exports.getAllUomDetails = async (req, res) => {
  try {
    const query = `
    SELECT U.*
    FROM UOM_MASTER AS U
    WHERE U.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "UOM Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get All UOM List!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE UOM CONTROLLER ========== //
module.exports.updateUomStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if UOM already exist
    const isUomExist = await DB.tbl_uom_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isUomExist) {
      return res
        .status(400)
        .send({ success: false, message: "UOM Not Found!" });
    } else {
      const updateStatus = await isUomExist.update({
        status: !isUomExist.status,
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

// ========== DELETE UOM CONTROLLER ========== //
module.exports.deleteUom = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if UOM already exist
    const isUomExist = await DB.tbl_uom_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isUomExist) {
      return res
        .status(400)
        .send({ success: false, message: "UOM Not Found!" });
    } else {
      await isUomExist.update({
        isDeleted: true,
      });
      return res.status(200).send({
        success: true,
        status: "UOM Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

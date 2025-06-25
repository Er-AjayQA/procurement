// ========== IMPORT STATEMENTS ========== //
const DB = require("../../../../config/index");

// ========== CREATE ALLOWANCE CONTROLLER ========== //
module.exports.createAllowance = async (req, res) => {
  try {
    const data = req.body;

    // Check if Allowance already exist
    const isAlreadyExist = await DB.tbl_allowance_master.findOne({
      where: {
        name: data.name,
        isDeleted: false,
      },
    });

    if (isAlreadyExist) {
      return res
        .status(400)
        .send({ success: false, message: "Allowance Name Already Exist!" });
    } else {
      const newAllowance = await DB.tbl_allowance_master.create(data);
      return res.status(200).send({
        success: true,
        status: "Allowance Created Successfully!",
        data: newAllowance,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE ALLOWANCE CONTROLLER ========== //
module.exports.updateAllowance = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    // Check if Allowance already exist
    const isAllowanceExist = await DB.tbl_allowance_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isAllowanceExist) {
      return res
        .status(400)
        .send({ success: false, message: "Allowance Not Found!" });
    } else {
      const duplicateAllowance = await DB.tbl_allowance_master.findOne({
        where: {
          id: { [DB.Sequelize.Op.ne]: id },
          name: data.name,
          isDeleted: false,
        },
      });

      if (duplicateAllowance) {
        return res
          .status(409)
          .send({ success: false, message: "Allowance Name Already Exist!" });
      } else {
        const updateAllowance = await isAllowanceExist.update(data);
        return res.status(200).send({
          success: true,
          status: "Allowance Updated Successfully!",
          data: updateAllowance,
        });
      }
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALLOWANCE DETAILS CONTROLLER ========== //
module.exports.getAllowanceDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
    SELECT A.*
    FROM ALLOWANCE_MASTER AS A
    WHERE A.id=${id} AND A.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Allowance Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get Allowance Details Successfully!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL ALLOWANCE DETAILS CONTROLLER ========== //
module.exports.getAllAllowanceDetails = async (req, res) => {
  try {
    const query = `
    SELECT A.*
    FROM ALLOWANCE_MASTER AS A
    WHERE A.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Allowance Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get All Allowance List!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE ALLOWANCE CONTROLLER ========== //
module.exports.updateAllowanceStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Allowance already exist
    const isAllowanceExist = await DB.tbl_allowance_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isAllowanceExist) {
      return res
        .status(400)
        .send({ success: false, message: "Allowance Not Found!" });
    } else {
      const updateStatus = await isAllowanceExist.update({
        status: !isAllowanceExist.status,
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

// ========== DELETE ALLOWANCE CONTROLLER ========== //
module.exports.deleteAllowance = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Allowance already exist
    const isAllowanceExist = await DB.tbl_allowance_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isAllowanceExist) {
      return res
        .status(400)
        .send({ success: false, message: "Allowance Not Found!" });
    } else {
      await isAllowanceExist.update({
        isDeleted: true,
      });
      return res.status(200).send({
        success: true,
        status: "Allowance Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== REQUIRE STATEMENTS ========== //
const DB = require("../../../../config/index");

// ========== CREATE SHIFT CONTROLLER ========== //
module.exports.createShift = async (req, res) => {
  try {
    const data = req.body;

    // Check if Shift already exist
    const isAlreadyExist = await DB.tbl_shift_master.findOne({
      where: {
        name: data.name,
        isDeleted: false,
      },
    });

    if (isAlreadyExist) {
      return res
        .status(400)
        .send({ success: false, message: "Shift Already Exist!" });
    } else {
      const newShift = await DB.tbl_shift_master.create(data);
      return res.status(200).send({
        success: true,
        status: "Shift Created Successfully!",
        data: newShift,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE SHIFT CONTROLLER ========== //
module.exports.updateShift = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    // Check if Shift already exist
    const isShiftExist = await DB.tbl_shift_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isShiftExist) {
      return res
        .status(400)
        .send({ success: false, message: "Shift Not Found!" });
    } else {
      const duplicateShift = await DB.tbl_shift_master.findOne({
        where: {
          id: { [DB.Sequelize.Op.ne]: id },
          name: data.name ? data.name : isShiftExist.name,
          isDeleted: false,
        },
      });

      if (duplicateShift) {
        return res
          .status(409)
          .send({ success: false, message: "Shift Name Already Exist!" });
      } else {
        const updateShift = await isShiftExist.update(data);
        return res.status(200).send({
          success: true,
          status: "Shift Updated Successfully!",
          data: updateShift,
        });
      }
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET SHIFT DETAILS CONTROLLER ========== //
module.exports.getShiftDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
    SELECT S.*
    FROM SHIFT_MASTER AS S
    WHERE S.id=${id} AND S.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Shift Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get Shift Details Successfully!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL SHIFT DETAILS CONTROLLER ========== //
module.exports.getAllShiftDetails = async (req, res) => {
  try {
    const query = `
    SELECT S.*
    FROM SHIFT_MASTER AS S
    WHERE S.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Shift Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get All Shifts List!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE SHIFT CONTROLLER ========== //
module.exports.updateShiftStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Shift already exist
    const isShiftExist = await DB.tbl_shift_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isShiftExist) {
      return res
        .status(400)
        .send({ success: false, message: "Shift Not Found!" });
    } else {
      const updateStatus = await isShiftExist.update({
        status: !isShiftExist.status,
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

// ========== DELETE SHIFT CONTROLLER ========== //
module.exports.deleteShift = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Shift already exist
    const isShiftExist = await DB.tbl_shift_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isShiftExist) {
      return res
        .status(400)
        .send({ success: false, message: "Shift Not Found!" });
    } else {
      await isShiftExist.update({
        isDeleted: true,
      });
      return res.status(200).send({
        success: true,
        status: "Shift Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

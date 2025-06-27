// ========== IMPORT STATEMENTS ========== //
const DB = require("../../../../config/index");
const { generateUniqueCode } = require("../../../../helper/generateUniqueCode");

// ========== CREATE BANK CONTROLLER ========== //
module.exports.createBank = async (req, res) => {
  try {
    const data = req.body;

    // Check if Bank already exist
    const isAlreadyExist = await DB.tbl_bank_master.findOne({
      where: {
        name: data.name,
        isDeleted: false,
      },
    });

    if (isAlreadyExist) {
      return res
        .status(400)
        .send({ success: false, message: "Bank Already Exist!" });
    } else {
      let code = await generateUniqueCode(
        "BANK",
        4,
        "bank_code",
        "BANK_MASTER"
      );
      data.bank_code = code;

      const newBank = await DB.tbl_bank_master.create(data);
      return res.status(200).send({
        success: true,
        status: "Bank Created Successfully!",
        data: newBank,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE BANK CONTROLLER ========== //
module.exports.updateBank = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    // Check if Bank already exist
    const isBankExist = await DB.tbl_bank_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isBankExist) {
      return res
        .status(400)
        .send({ success: false, message: "Bank Not Found!" });
    } else {
      const duplicateBank = await DB.tbl_bank_master.findOne({
        where: {
          id: { [DB.Sequelize.Op.ne]: id },
          name: data.name ? data.name : isBankExist.name,
          isDeleted: false,
        },
      });

      if (duplicateBank) {
        return res
          .status(409)
          .send({ success: false, message: "Bank Name Already Exist!" });
      } else {
        const updateBank = await isBankExist.update(data);
        return res.status(200).send({
          success: true,
          status: "Bank Updated Successfully!",
          data: updateBank,
        });
      }
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET BANK DETAILS CONTROLLER ========== //
module.exports.getBankDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
    SELECT B.*
    FROM BANK_MASTER AS B
    WHERE B.id=${id} AND B.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Bank Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get Bank Details Successfully!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL BANK DETAILS CONTROLLER ========== //
module.exports.getAllBankDetails = async (req, res) => {
  try {
    const query = `
    SELECT B.*
    FROM BANK_MASTER AS B
    WHERE B.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Bank Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get All Bank List!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE BANK CONTROLLER ========== //
module.exports.updateBankStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Bank already exist
    const isBankExist = await DB.tbl_bank_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isBankExist) {
      return res
        .status(400)
        .send({ success: false, message: "Bank Not Found!" });
    } else {
      const updateStatus = await isBankExist.update({
        status: !isBankExist.status,
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

// ========== DELETE BANK CONTROLLER ========== //
module.exports.deleteBank = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Bank already exist
    const isBankExist = await DB.tbl_bank_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isBankExist) {
      return res
        .status(400)
        .send({ success: false, message: "Bank Not Found!" });
    } else {
      await isBankExist.update({
        isDeleted: true,
      });
      return res.status(200).send({
        success: true,
        status: "Bank Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

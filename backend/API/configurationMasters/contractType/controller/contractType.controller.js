// ========== IMPORT STATEMENTS ========== //
const DB = require("../../../../config/index");

// ========== CREATE CONTRACT TYPE CONTROLLER ========== //
module.exports.createContractType = async (req, res) => {
  try {
    const data = req.body;

    // Check if Contract-Type already exist
    const isAlreadyExist = await DB.tbl_contractType_master.findOne({
      where: {
        name: data.name,
        isDeleted: false,
      },
    });

    if (isAlreadyExist) {
      return res
        .status(400)
        .send({ success: false, message: "Contract-Type Already Exist!" });
    } else {
      const newEmploymentType = await DB.tbl_contractType_master.create(data);
      return res.status(200).send({
        success: true,
        status: "Contract-Type Created Successfully!",
        data: newEmploymentType,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE CONTRACT TYPE CONTROLLER ========== //
module.exports.updateContractType = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    // Check if Contract-Type already exist
    const isContractTypeExist = await DB.tbl_contractType_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isContractTypeExist) {
      return res
        .status(400)
        .send({ success: false, message: "Contract-Type Not Found!" });
    } else {
      const checkName = await DB.tbl_contractType_master.findOne({
        where: {
          id: { [DB.Sequelize.Op.ne]: id },
          name: data.name,
          isDeleted: false,
        },
      });

      if (checkName) {
        return res.status(409).send({
          success: false,
          message: "Contract-Type Name Already Exist!",
        });
      } else {
        const updateContractType = await isContractTypeExist.update(data);
        return res.status(200).send({
          success: true,
          status: "Contract-Type Updated Successfully!",
          data: updateContractType,
        });
      }
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET CONTRACT TYPE DETAILS CONTROLLER ========== //
module.exports.getContractTypeDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
    SELECT C.*
    FROM CONTRACT_TYPE_MASTER AS C
    WHERE C.id=${id} AND C.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Contract-Type Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get Contract-Type Details Successfully!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL CONTRACT TYPE DETAILS CONTROLLER ========== //
module.exports.getAllContractTypesDetails = async (req, res) => {
  try {
    const query = `
            SELECT C.*
            FROM CONTRACT_TYPE_MASTER AS C
            WHERE C.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Contract-Type Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get All Contract-Types List!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE CONTRACT TYPE CONTROLLER ========== //
module.exports.updateContractTypeStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Contract-Type already exist
    const isContractTypeExist = await DB.tbl_contractType_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isContractTypeExist) {
      return res
        .status(400)
        .send({ success: false, message: "Contract-Type Not Found!" });
    } else {
      const updateStatus = await isContractTypeExist.update({
        status: !isContractTypeExist.status,
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

// ========== DELETE CONTRACT TYPE CONTROLLER ========== //
module.exports.deleteContractType = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Contract-Type already exist
    const isContractTypeExist = await DB.tbl_contractType_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isContractTypeExist) {
      return res
        .status(400)
        .send({ success: false, message: "Contract-Type Not Found!" });
    } else {
      await isContractTypeExist.update({
        isDeleted: true,
      });
      return res.status(200).send({
        success: true,
        status: "Contract-Type Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

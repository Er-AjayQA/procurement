// ========== REQUIRE STATEMENTS ========== //
const DB = require("../../../config/index");

// ========== CREATE MODULE MASTER CONTROLLER ========== //
module.exports.createModule = async (req, res) => {
  try {
    const data = req.body;

    const checkIfModuleExist = await DB.tbl_rbac_module_master.findOne({
      where: {
        [DB.Sequelize.Op.or]: [
          {
            module_name: DB.Sequelize.where(
              DB.Sequelize.fn("LOWER", DB.Sequelize.col("module_name")),
              DB.Sequelize.fn("LOWER", data.module_name)
            ),
          },
          {
            module_endpoint: DB.Sequelize.where(
              DB.Sequelize.fn("LOWER", DB.Sequelize.col("module_endpoint")),
              DB.Sequelize.fn("LOWER", data.module_endpoint)
            ),
          },
        ],
        isDeleted: false,
      },
    });

    if (checkIfModuleExist) {
      return res
        .status(409)
        .send({ success: false, message: "Module Already Exist" });
    }

    const createModule = await DB.tbl_rbac_module_master.create({
      module_name: data.module_name,
      module_icon: data.module_icon,
      module_endpoint: data.module_endpoint,
    });

    return res.status(201).send({
      success: true,
      message: "Module Created Successfully!",
    });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE MODULE MASTER CONTROLLER ========== //
module.exports.updateModule = async (req, res) => {
  try {
    const data = req.body;

    const isModuleExist = await DB.tbl_rbac_module_master.findOne({
      where: { id: req.params.id, isDeleted: false },
    });

    if (!isModuleExist) {
      return res
        .status(404)
        .send({ success: false, message: "Module Not Exist!" });
    } else {
      // Check for duplicate record while updating
      const checkDuplicate = await DB.tbl_rbac_module_master.findOne({
        where: {
          id: { [DB.Sequelize.Op.ne]: req.params.id },
          isDeleted: false,
          [DB.Sequelize.Op.or]: [
            {
              module_name: DB.Sequelize.where(
                DB.Sequelize.fn("LOWER", DB.Sequelize.col("module_name")),
                DB.Sequelize.fn("LOWER", data.module_name)
              ),
            },
            {
              module_endpoint: DB.Sequelize.where(
                DB.Sequelize.fn("LOWER", DB.Sequelize.col("module_endpoint")),
                DB.Sequelize.fn("LOWER", data.module_endpoint)
              ),
            },
          ],
        },
      });

      if (checkDuplicate) {
        return res.status(409).send({
          success: true,
          message: "Module Name or Menu Endpoint Already Exist!",
        });
      }

      const updateModule = await DB.tbl_rbac_module_master.update(data, {
        where: { id: req.params.id },
      });
      return res.status(201).send({
        success: true,
        message: "Module Updated Successfully!",
      });
    }
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL MODULE MASTER DETAILS CONTROLLER ========== //
module.exports.getAllModuleDetails = async (req, res) => {
  try {
    const query = `
    SELECT RM.*
       FROM RBAC_MODULE_MASTER AS RM
       WHERE RM.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Modules Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get Modules Details Successfully!",
        records: getAllData.length,
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE MODULE MASTER CONTROLLER ========== //
module.exports.updateModuleStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Menu exist
    const isModuleExist = await DB.tbl_rbac_module_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isModuleExist) {
      return res
        .status(400)
        .send({ success: false, message: "Module Not Found!" });
    } else {
      const updateStatus = await isModuleExist.update({
        status: !isModuleExist.status,
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

// ========== DELETE MODULE MASTER CONTROLLER ========== //
module.exports.deleteModule = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Module exist
    const isModuleExist = await DB.tbl_rbac_module_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isModuleExist) {
      return res
        .status(400)
        .send({ success: false, message: "Module Not Found!" });
    } else {
      await isModuleExist.update({
        isDeleted: true,
      });
      return res.status(200).send({
        success: true,
        status: "Module Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

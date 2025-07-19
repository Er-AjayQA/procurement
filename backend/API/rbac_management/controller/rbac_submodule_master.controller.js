// ========== REQUIRE STATEMENTS ========== //
const DB = require("../../../config/index");

// ========== CREATE SUBMODULE MASTER CONTROLLER ========== //
module.exports.createSubModule = async (req, res) => {
  try {
    const data = req.body;

    const checkIfSubModuleExist = await DB.tbl_rbac_submodule_master.findOne({
      where: {
        [DB.Sequelize.Op.or]: [
          {
            [DB.Sequelize.Op.and]: [
              {
                rbac_module_id: DB.Sequelize.where(
                  DB.Sequelize.fn("LOWER", DB.Sequelize.col("rbac_module_id")),
                  DB.Sequelize.fn("LOWER", data.rbac_module_id)
                ),
              },
              {
                submodule_name: DB.Sequelize.where(
                  DB.Sequelize.fn("LOWER", DB.Sequelize.col("submodule_name")),
                  DB.Sequelize.fn("LOWER", data.submodule_name)
                ),
              },
            ],
          },

          {
            submodule_endpoint: DB.Sequelize.where(
              DB.Sequelize.fn("LOWER", DB.Sequelize.col("submodule_endpoint")),
              DB.Sequelize.fn("LOWER", data.submodule_endpoint)
            ),
          },
        ],
        isDeleted: false,
      },
    });

    if (checkIfSubModuleExist) {
      return res
        .status(409)
        .send({ success: false, message: "SubModule Already Exist" });
    }

    const createModule = await DB.tbl_rbac_submodule_master.create({
      rbac_module_id: data.rbac_module_id,
      submodule_name: data.submodule_name,
      submodule_icon: data.submodule_icon,
      submodule_endpoint: data.submodule_endpoint,
    });

    return res.status(201).send({
      success: true,
      message: "SubModule Created Successfully!",
    });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE SUBMODULE MASTER CONTROLLER ========== //
module.exports.updateSubModule = async (req, res) => {
  try {
    const data = req.body;

    const isSubModuleExist = await DB.tbl_rbac_submodule_master.findOne({
      where: { id: req.params.id, isDeleted: false },
    });

    if (!isSubModuleExist) {
      return res
        .status(404)
        .send({ success: false, message: "SubModule Not Exist!" });
    } else {
      // Check for duplicate record while updating
      const checkDuplicate = await DB.tbl_rbac_submodule_master.findOne({
        where: {
          id: { [DB.Sequelize.Op.ne]: req.params.id },
          isDeleted: false,
          [DB.Sequelize.Op.or]: [
            {
              [DB.Sequelize.Op.and]: [
                {
                  rbac_module_id: DB.Sequelize.where(
                    DB.Sequelize.fn(
                      "LOWER",
                      DB.Sequelize.col("rbac_module_id")
                    ),
                    DB.Sequelize.fn("LOWER", data.rbac_module_id)
                  ),
                },
                {
                  submodule_name: DB.Sequelize.where(
                    DB.Sequelize.fn(
                      "LOWER",
                      DB.Sequelize.col("submodule_name")
                    ),
                    DB.Sequelize.fn("LOWER", data.submodule_name)
                  ),
                },
              ],
            },

            {
              submodule_endpoint: DB.Sequelize.where(
                DB.Sequelize.fn(
                  "LOWER",
                  DB.Sequelize.col("submodule_endpoint")
                ),
                DB.Sequelize.fn("LOWER", data.submodule_endpoint)
              ),
            },
          ],
        },
      });

      if (checkDuplicate) {
        return res.status(409).send({
          success: true,
          message: "SubModule Name or SubModule Endpoint Already Exist!",
        });
      }

      const updateModule = await DB.tbl_rbac_submodule_master.update(data, {
        where: { id: req.params.id },
      });
      return res.status(201).send({
        success: true,
        message: "SubModule Updated Successfully!",
      });
    }
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL SUBMODULE MASTER DETAILS CONTROLLER ========== //
module.exports.getAllSubModuleDetails = async (req, res) => {
  try {
    const query = `
    SELECT RSM.id, RSM.submodule_name, RSM.submodule_icon, RSM.submodule_endpoint, RSM.rbac_module_id, RM.module_name, RSM.isDeleted, RSM.status 
       FROM RBAC_SUBMODULE_MASTER AS RSM
       LEFT JOIN RBAC_MODULE_MASTER AS RM ON RM.id=RSM.rbac_module_id
       WHERE RSM.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "SubModules Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get SubModules Details Successfully!",
        records: getAllData.length,
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE SUBMODULE MASTER CONTROLLER ========== //
module.exports.updateSubModuleStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if SubModule exist
    const isSubModuleExist = await DB.tbl_rbac_submodule_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isSubModuleExist) {
      return res
        .status(400)
        .send({ success: false, message: "SubModule Not Found!" });
    } else {
      const updateStatus = await isSubModuleExist.update({
        status: !isSubModuleExist.status,
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

// ========== DELETE SUBMODULE MASTER CONTROLLER ========== //
module.exports.deleteSubModule = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if SubModule exist
    const isSubModuleExist = await DB.tbl_rbac_submodule_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isSubMenuExist) {
      return res
        .status(400)
        .send({ success: false, message: "SubModule Not Found!" });
    } else {
      await isSubModuleExist.update({
        isDeleted: true,
      });
      return res.status(200).send({
        success: true,
        status: "SubModule Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

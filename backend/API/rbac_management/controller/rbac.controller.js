// ========== REQUIRE STATEMENTS ========== //
const DB = require("../../../config/index");

// ***************************** MODULES CONTROLLERS ***************************** //

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
    const getAllData = await DB.tbl_rbac_module_master.findAll({
      attributes: ["id", "module_name", "module_icon", "module_endpoint"],
      where: { isDeleted: false, status: true },
      include: [
        {
          model: DB.tbl_rbac_submodule_master,
          attributes: [
            "id",
            "submodule_name",
            "submodule_icon",
            "submodule_endpoint",
            "rbac_module_id",
          ],
          where: { isDeleted: false, status: true },
        },
      ],
    });

    if (!getAllData) {
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

// ========== UPDATE MODULE STATUS MASTER CONTROLLER ========== //
module.exports.updateModuleStatus = async (req, res) => {
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
      const getAllSubmodules = await DB.tbl_rbac_submodule_master.findAll({
        where: { rbac_module_id: id, isDeleted: false },
      });

      // Changing status of all Submodules of Master Module
      if (getAllSubmodules) {
        getAllSubmodules.map(async (data) => {
          await DB.tbl_rbac_submodule_master.update(
            { status: !data.status },
            {
              where: { id: data.id },
            }
          );
        });
      }
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

    console.log(id);

    // Check if Module exist
    const isModuleExist = await DB.tbl_rbac_module_master.findOne({
      where: {
        id,
        isDeleted: false,
        status: true,
      },
    });

    if (!isModuleExist) {
      return res
        .status(400)
        .send({ success: false, message: "Module Not Found!" });
    } else {
      const getAllSubmodules = await DB.tbl_rbac_submodule_master.findAll({
        where: { rbac_module_id: id, isDeleted: false },
      });

      // Deleting all Submodules of Master Module
      if (getAllSubmodules) {
        getAllSubmodules.map(async (data) => {
          await DB.tbl_rbac_submodule_master.update(
            { isDeleted: true },
            {
              where: { id: data.id },
            }
          );
        });
      }

      await isModuleExist.update(
        {
          isDeleted: true,
        },
        { where: { id } }
      );
      return res.status(200).send({
        success: true,
        status: "Module Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ***************************** SUBMODULES CONTROLLERS ***************************** //

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

// ========== UPDATE SUBMODULE STATUS MASTER CONTROLLER ========== //
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

// ***************************** MODULES ACCESS CONTROLLERS ***************************** //

// ========== ASSIGN MODULE MASTER CONTROLLER ========== //
module.exports.assignModule = async (req, res) => {
  const transaction = await DB.sequelize.transaction();
  try {
    const { user_id, role_id, module_list } = req.body;

    if (module_list && module_list.length > 0) {
      // Destroy Data
      await DB.tbl_rbac_assign_module_master.destroy({ where: { user_id } });

      module_list.map(async (data) => {
        await DB.tbl_rbac_assign_module_master.create(
          {
            user_id: user_id,
            role_id: role_id,
            module_id: data.module_id,
            submodule_id: data.submodule_id,
            read: data.read,
            write: data.write,
            delete: data.delete,
          },
          transaction
        );
      }),
        await transaction.commit();

      return res.status(201).send({
        success: true,
        message: "Module Assigned Successfully!",
      });
    }
  } catch (error) {
    await transaction.rollback();
    return res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET USER ASSIGN MODULE CONTROLLER ========== //
module.exports.getAssignModule = async (req, res) => {
  const transaction = await DB.sequelize.transaction();
  try {
    const { id } = req.params;

    const userExist = await DB.tbl_user_master.findOne({
      where: { id, isDeleted: false, status: true },
    });

    if (!userExist) {
      return res.status(404).send({
        success: false,
        message: "No User Found!",
      });
    }

    const getAllAssignedModules =
      await DB.tbl_rbac_assign_module_master.findAll({
        where: { user_id: id },
        include: [
          {
            model: DB.tbl_rbac_module_master,
            attributes: ["id", "module_name", "module_icon", "module_endpoint"],
          },
          {
            model: DB.tbl_rbac_submodule_master,
            attributes: [
              "id",
              "submodule_name",
              "submodule_icon",
              "submodule_endpoint",
            ],
          },
        ],
        order: [["module_id", "ASC"]],
      });

    if (!getAllAssignedModules) {
      return res.status(404).send({
        success: false,
        message: "No Module Assigned!",
      });
    }

    // Group by module
    const groupedByModule = getAllAssignedModules.reduce((acc, assignment) => {
      const moduleId = assignment.module_id;

      if (!acc[moduleId]) {
        acc[moduleId] = {
          module: {
            id: assignment.RBAC_MODULE_MASTER.id,
            name: assignment.RBAC_MODULE_MASTER.module_name,
            icon: assignment.RBAC_MODULE_MASTER.module_icon,
            endpoint: assignment.RBAC_MODULE_MASTER.module_endpoint,
            submodules: [],
          },
        };
      }

      acc[moduleId].module.submodules.push({
        id: assignment?.RBAC_SUBMODULE_MASTER?.id,
        name: assignment?.RBAC_SUBMODULE_MASTER?.submodule_name,
        icon: assignment?.RBAC_SUBMODULE_MASTER?.submodule_icon,
        endpoint: assignment?.RBAC_SUBMODULE_MASTER?.submodule_endpoint,
        permissions: {
          read: assignment.read,
          write: assignment.write,
          delete: assignment.delete,
        },
      });

      return acc;
    }, {});

    // Convert to array format
    const groupedModulesArray = Object.values(groupedByModule);

    return res.status(200).send({
      success: true,
      message: "Get Assigned Modules!",
      data: groupedModulesArray,
    });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).send({ success: false, message: error.message });
  }
};

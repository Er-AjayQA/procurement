// ========== REQUIRE STATEMENTS ========== //
const DB = require("../../../config/index");

// ========== CREATE SUBMODULE MASTER CONTROLLER ========== //
module.exports.createSubModule = async (req, res) => {
  try {
    const data = req.body;

    const checkIfSubMenuExist = await DB.tbl_rbac_submenu_master.findOne({
      where: {
        [DB.Sequelize.Op.or]: [
          {
            [DB.Sequelize.Op.and]: [
              {
                rbac_menu_id: DB.Sequelize.where(
                  DB.Sequelize.fn("LOWER", DB.Sequelize.col("rbac_menu_id")),
                  DB.Sequelize.fn("LOWER", data.rbac_menu_id)
                ),
              },
              {
                submenu_name: DB.Sequelize.where(
                  DB.Sequelize.fn("LOWER", DB.Sequelize.col("submenu_name")),
                  DB.Sequelize.fn("LOWER", data.submenu_name)
                ),
              },
            ],
          },

          {
            submenu_endpoint: DB.Sequelize.where(
              DB.Sequelize.fn("LOWER", DB.Sequelize.col("submenu_endpoint")),
              DB.Sequelize.fn("LOWER", data.submenu_endpoint)
            ),
          },
        ],
        isDeleted: false,
      },
    });

    if (checkIfSubMenuExist) {
      return res
        .status(409)
        .send({ success: false, message: "SubMenu Already Exist" });
    }

    const createMenu = await DB.tbl_rbac_submenu_master.create({
      rbac_menu_id: data.rbac_menu_id,
      submenu_name: data.submenu_name,
      submenu_icon: data.submenu_icon,
      submenu_endpoint: data.submenu_endpoint,
    });

    return res.status(201).send({
      success: true,
      message: "SubMenu Created Successfully!",
      menuDetail: createMenu,
    });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE SUBMODULE MASTER CONTROLLER ========== //
module.exports.updateSubModule = async (req, res) => {
  try {
    const data = req.body;

    const isSubMenuExist = await DB.tbl_rbac_submenu_master.findOne({
      where: { id: req.params.id, isDeleted: false },
    });

    if (!isSubMenuExist) {
      return res
        .status(404)
        .send({ success: false, message: "SubMenu Not Exist!" });
    } else {
      // Check for duplicate record while updating
      const checkDuplicate = await DB.tbl_rbac_submenu_master.findOne({
        where: {
          id: { [DB.Sequelize.Op.ne]: req.params.id },
          isDeleted: false,
          [DB.Sequelize.Op.or]: [
            {
              [DB.Sequelize.Op.and]: [
                {
                  rbac_menu_id: DB.Sequelize.where(
                    DB.Sequelize.fn("LOWER", DB.Sequelize.col("rbac_menu_id")),
                    DB.Sequelize.fn("LOWER", data.rbac_menu_id)
                  ),
                },
                {
                  submenu_name: DB.Sequelize.where(
                    DB.Sequelize.fn("LOWER", DB.Sequelize.col("submenu_name")),
                    DB.Sequelize.fn("LOWER", data.submenu_name)
                  ),
                },
              ],
            },

            {
              submenu_endpoint: DB.Sequelize.where(
                DB.Sequelize.fn("LOWER", DB.Sequelize.col("submenu_endpoint")),
                DB.Sequelize.fn("LOWER", data.submenu_endpoint)
              ),
            },
          ],
        },
      });

      if (checkDuplicate) {
        return res.status(409).send({
          success: true,
          message: "SubMenu Name or SubMenu Endpoint Already Exist!",
        });
      }

      const updateMenu = await DB.tbl_rbac_submenu_master.update(data, {
        where: { id: req.params.id },
      });
      return res.status(201).send({
        success: true,
        message: "SubMenu Updated Successfully!",
        updatedMenu: updateMenu,
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
    SELECT RSM.id, RSM.submenu_name, RSM.submenu_icon, RSM.submenu_endpoint, RSM.rbac_menu_id, RM.menu_name, RSM.isDeleted, RSM.status 
       FROM RBAC_SUBMENU_MASTER AS RSM
       LEFT JOIN RBAC_MENU_MASTER AS RM ON RM.id=RSM.rbac_menu_id
       WHERE RSM.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "SubMenus Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get SubMenus Details Successfully!",
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

    // Check if SubMenu exist
    const isSubMenuExist = await DB.tbl_rbac_submenu_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isSubMenuExist) {
      return res
        .status(400)
        .send({ success: false, message: "SubMenu Not Found!" });
    } else {
      const updateStatus = await isSubMenuExist.update({
        status: !isSubMenuExist.status,
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

    // Check if SubMenu exist
    const isSubMenuExist = await DB.tbl_rbac_submenu_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isSubMenuExist) {
      return res
        .status(400)
        .send({ success: false, message: "SubMenu Not Found!" });
    } else {
      await isSubMenuExist.update({
        isDeleted: true,
      });
      return res.status(200).send({
        success: true,
        status: "SubMenu Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

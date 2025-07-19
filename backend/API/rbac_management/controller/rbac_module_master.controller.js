// ========== REQUIRE STATEMENTS ========== //
const DB = require("../../../config/index");

// ========== CREATE MODULE MASTER CONTROLLER ========== //
module.exports.createModule = async (req, res) => {
  try {
    const data = req.body;

    const checkIfMenuExist = await DB.tbl_rbac_menu_master.findOne({
      where: {
        [DB.Sequelize.Op.or]: [
          {
            menu_name: DB.Sequelize.where(
              DB.Sequelize.fn("LOWER", DB.Sequelize.col("menu_name")),
              DB.Sequelize.fn("LOWER", data.menu_name)
            ),
          },
          {
            menu_endpoint: DB.Sequelize.where(
              DB.Sequelize.fn("LOWER", DB.Sequelize.col("menu_endpoint")),
              DB.Sequelize.fn("LOWER", data.menu_endpoint)
            ),
          },
        ],
        isDeleted: false,
      },
    });

    if (checkIfMenuExist) {
      return res
        .status(409)
        .send({ success: false, message: "Menu Already Exist" });
    }

    const createMenu = await DB.tbl_rbac_menu_master.create({
      menu_name: data.menu_name,
      menu_icon: data.menu_icon,
      menu_endpoint: data.menu_endpoint,
    });

    return res.status(201).send({
      success: true,
      message: "Menu Created Successfully!",
      menuDetail: createMenu,
    });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE MODULE MASTER CONTROLLER ========== //
module.exports.updateModule = async (req, res) => {
  try {
    const data = req.body;

    const isMenuExist = await DB.tbl_rbac_menu_master.findOne({
      where: { id: req.params.id, isDeleted: false },
    });

    if (!isMenuExist) {
      return res
        .status(404)
        .send({ success: false, message: "Menu Not Exist!" });
    } else {
      // Check for duplicate record while updating
      const checkDuplicate = await DB.tbl_rbac_menu_master.findOne({
        where: {
          id: { [DB.Sequelize.Op.ne]: req.params.id },
          isDeleted: false,
          [DB.Sequelize.Op.or]: [
            {
              menu_name: DB.Sequelize.where(
                DB.Sequelize.fn("LOWER", DB.Sequelize.col("menu_name")),
                DB.Sequelize.fn("LOWER", data.menu_name)
              ),
            },
            {
              menu_endpoint: DB.Sequelize.where(
                DB.Sequelize.fn("LOWER", DB.Sequelize.col("menu_endpoint")),
                DB.Sequelize.fn("LOWER", data.menu_endpoint)
              ),
            },
          ],
        },
      });

      if (checkDuplicate) {
        return res.status(409).send({
          success: true,
          message: "Menu Name or Menu Endpoint Already Exist!",
        });
      }

      const updateMenu = await DB.tbl_rbac_menu_master.update(data, {
        where: { id: req.params.id },
      });
      return res.status(201).send({
        success: true,
        message: "Menu Updated Successfully!",
        updatedMenu: updateMenu,
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
       FROM RBAC_MENU_MASTER AS RM
       WHERE RM.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Menus Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get Menus Details Successfully!",
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
    const isMenuExist = await DB.tbl_rbac_menu_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isMenuExist) {
      return res
        .status(400)
        .send({ success: false, message: "Menu Not Found!" });
    } else {
      const updateStatus = await isMenuExist.update({
        status: !isMenuExist.status,
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

    // Check if Menu exist
    const isMenuExist = await DB.tbl_rbac_menu_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isMenuExist) {
      return res
        .status(400)
        .send({ success: false, message: "Menu Not Found!" });
    } else {
      await isMenuExist.update({
        isDeleted: true,
      });
      return res.status(200).send({
        success: true,
        status: "Menu Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

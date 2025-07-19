// ========== REQUIRE STATEMENTS ========== //
const DB = require("../../../config/index");

// ========== CREATE MODULE MASTER CONTROLLER ========== //
module.exports.assignModule = async (req, res) => {
  const transaction = await DB.sequelize.transaction();
  try {
    const data = req.body;

    if (data.menu_list && data.menu_list.length > 0) {
      const recordsToBeCreated = data.menu_list.flatMap((menu) => {
        return menu.submenu_list.map((submenu) => ({
          user_id: data.user_id,
          role_id: data.role_id,
          menu_id: menu.menu_id,
          submenu_id: submenu.submenu_id,
          read: submenu.read,
          write: submenu.write,
          delete: submenu.delete,
        }));
      });
      await DB.tbl_rbac_assign_menu_master.bulkCreate(recordsToBeCreated, {
        transaction,
      });

      await transaction.commit();

      return res.status(201).send({
        success: true,
        message: "Menu Assigned Successfully!",
      });
    }
  } catch (error) {
    await transaction.rollback();
    return res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL ASSIGNED MODULE DETAILS CONTROLLER ========== //
module.exports.getAllAssignedModuleDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const getData = await DB.tbl_rbac_assign_module_master.findAll({
      attributes: ["module_id", "submodule_id", "read", "write", "delete"],
      where: { user_id: id, isDeleted: false },
    });

    if (getData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "No Modules Assigned Found!" });
    } else {
      const getSubModulesDetails = await Promise.all(
        getData.map(async (data) => {
          let submoduleDetail;
          const submodule = await DB.tbl_rbac_assign_module_master.findOne({
            attributes: ["id", "submodule_name"],
            where: { id: data.submodule_id, isDeleted: false },
          });

          return (submoduleDetail = {
            submodule,
            read: data.read,
            write: data.write,
            delete: data.delete,
          });
        })
      );

      return res.status(200).send({
        success: true,
        status: "All Assigned Modules Fetched Successfully!",
        records: getData.length,
        data: getSubModulesDetails,
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

// ========== REQUIRE STATEMENTS ========== //
const DB = require("../../../../config/index");
const { generateUniqueCode } = require("../../../../helper/generateUniqueCode");

// ========== CREATE ITEM CATEGORY CONTROLLER ========== //
module.exports.createItemCategory = async (req, res) => {
  try {
    const data = req.body;

    // Check if Item-Category already exist
    const isAlreadyExist = await DB.tbl_item_category_master.findOne({
      where: {
        name: data.name,
        isDeleted: false,
      },
    });

    if (isAlreadyExist) {
      return res
        .status(400)
        .send({ success: false, message: "Item-Category Already Exist!" });
    } else {
      let code = await generateUniqueCode(
        "ITEMCAT",
        7,
        "item_category_code",
        "ITEM_CATEGORY_MASTER"
      );
      data.item_category_code = code;

      const newItemCategory = await DB.tbl_item_category_master.create(data);
      return res.status(200).send({
        success: true,
        status: "Item-Category Created Successfully!",
        data: newItemCategory,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE ITEM CATEGORY CONTROLLER ========== //
module.exports.updateItemCategory = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    // Check if Item-Category already exist
    const isItemCategoryExist = await DB.tbl_item_category_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isItemCategoryExist) {
      return res
        .status(400)
        .send({ success: false, message: "Item-Category Not Found!" });
    } else {
      const duplicateDataName = await DB.tbl_item_category_master.findOne({
        where: {
          id: { [DB.Sequelize.Op.ne]: id },
          name: data.name ? data.name : isItemCategoryExist.name,
          isDeleted: false,
        },
      });

      if (duplicateDataName) {
        return res.status(409).send({
          success: false,
          message: "Item-Category Name Already Exist!",
        });
      } else {
        const updateItemCategory = await isItemCategoryExist.update(data);
        return res.status(200).send({
          success: true,
          status: "Item-Category Updated Successfully!",
          data: updateItemCategory,
        });
      }
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ITEM CATEGORY DETAILS CONTROLLER ========== //
module.exports.getItemCategoryDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
    SELECT IC.*
    FROM ITEM_CATEGORY_MASTER AS IC
    WHERE IC.id=${id} AND IC.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Item-Category Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get Item-Category Details Successfully!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL ITEM CATEGORY DETAILS CONTROLLER ========== //
module.exports.getAllItemCategoryDetails = async (req, res) => {
  try {
    const query = `
            SELECT IC.*
            FROM ITEM_CATEGORY_MASTER AS IC
            WHERE IC.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Item-Categories Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get All Item-Categories List!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE ITEM CATEGORY CONTROLLER ========== //
module.exports.updateItemCategoryStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Item-Category already exist
    const isItemCategoryExist = await DB.tbl_item_category_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isItemCategoryExist) {
      return res
        .status(400)
        .send({ success: false, message: "Item-Category Not Found!" });
    } else {
      const updateStatus = await isItemCategoryExist.update({
        status: !isItemCategoryExist.status,
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

// ========== DELETE ITEM CATEGORY CONTROLLER ========== //
module.exports.deleteItemCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Item-Category already exist
    const isItemCategoryExist = await DB.tbl_item_category_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isItemCategoryExist) {
      return res
        .status(400)
        .send({ success: false, message: "Item-Category Not Found!" });
    } else {
      await isItemCategoryExist.update({
        isDeleted: true,
      });
      return res.status(200).send({
        success: true,
        status: "Item-Category Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

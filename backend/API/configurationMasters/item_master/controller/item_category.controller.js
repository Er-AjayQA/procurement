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
        name: data?.name,
        entity_id: req?.selectedEntity,
        isDeleted: false,
      },
    });

    if (isAlreadyExist) {
      return res
        .status(409)
        .send({ success: false, message: "Item-Category Already Exist!" });
    } else {
      let code = await generateUniqueCode(
        "ITEMCAT",
        7,
        "item_category_code",
        "ITEM_CATEGORY_MASTER"
      );
      data.item_category_code = code;

      const newItemCategory = await DB.tbl_item_category_master.create({
        ...data,
        entity_id: req?.selectedEntity,
      });
      return res.status(201).send({
        success: true,
        message: "Item-Category Created Successfully!",
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
        entity_id: req?.selectedEntity,
        isDeleted: false,
      },
    });

    if (!isItemCategoryExist) {
      return res
        .status(404)
        .send({ success: false, message: "Item-Category Not Found!" });
    } else {
      const duplicateDataName = await DB.tbl_item_category_master.findOne({
        where: {
          id: { [DB.Sequelize.Op.ne]: id },
          name: data.name ? data.name : isItemCategoryExist.name,
          entity_id: req?.selectedEntity,
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
        return res.status(201).send({
          success: true,
          message: "Item-Category Updated Successfully!",
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
        .status(404)
        .send({ success: false, message: "Item-Category Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        message: "Get Item-Category Details Successfully!",
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
    const limit = parseInt(req.body.limit) || 10;
    const page = parseInt(req.body.page) || 1;
    const offset = (page - 1) * limit;
    const filter = req.body.filter || null;

    const whereClause = { entity_id: req?.selectedEntity, isDeleted: false };

    if (filter.name !== undefined || filter.name !== "") {
      whereClause.name = { [DB.Sequelize.Op.like]: [`%${filter.name}%`] };
    }

    const totalRecords = await DB.tbl_item_category_master.count({
      whereClause,
    });
    const totalPages = Math.ceil(totalRecords / limit);

    const getAllData = await DB.tbl_item_category_master.findAll({
      where: whereClause,
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
    });

    if (!getAllData || getAllData.length === 0) {
      return res
        .status(404)
        .send({ success: false, message: "Item-Categories Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        message: "Get All Item-Categories List!",
        data: getAllData,
        pagination: {
          currentPage: page,
          itemsPerPage: limit,
          totalItems: getAllData.length,
          totalPages: totalPages,
        },
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
        .status(404)
        .send({ success: false, message: "Item-Category Not Found!" });
    } else {
      const updateStatus = await isItemCategoryExist.update({
        status: !isItemCategoryExist.status,
      });
      return res.status(201).send({
        success: true,
        message: "Status Changed Successfully!",
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
        .status(404)
        .send({ success: false, message: "Item-Category Not Found!" });
    } else {
      await isItemCategoryExist.update({
        isDeleted: true,
      });
      return res.status(201).send({
        success: true,
        message: "Item-Category Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

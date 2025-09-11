// ========== REQUIRE STATEMENTS ========== //
const DB = require("../../../../config/index");
const { generateUniqueCode } = require("../../../../helper/generateUniqueCode");

// ========== CREATE ITEM CONTROLLER ========== //
module.exports.createItem = async (req, res) => {
  try {
    const data = req.body;

    // Check if Item already exist
    const isAlreadyExist = await DB.tbl_item_master.findOne({
      where: {
        name: data.name,
        item_category_id: data.item_category_id,
        entity_id: req?.selectedEntity,
        isDeleted: false,
      },
    });

    if (isAlreadyExist) {
      return res.status(409).send({
        success: false,
        message: "Item Already Exist in Selected Category!",
      });
    } else {
      let code = await generateUniqueCode(
        "ITEM",
        4,
        "item_code",
        "ITEM_MASTER"
      );
      data.item_code = code;

      const newItem = await DB.tbl_item_master.create({
        ...data,
        entity_id: req?.selectedEntity,
      });

      // Adding the specifications if any
      if (data.specifications.length > 0) {
        data.specifications.map(async (spec) => {
          await DB.tbl_item_specification.create({
            spec_type: spec.type,
            spec_description: spec.description,
            item_id: newItem.id,
          });
        });
      }

      return res.status(201).send({
        success: true,
        message: "Item Created Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE ITEM CONTROLLER ========== //
module.exports.updateItem = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    // Check if Item already exist
    const isItemExist = await DB.tbl_item_master.findOne({
      where: {
        id,
        entity_id: req?.selectedEntity,
        isDeleted: false,
      },
    });

    if (!isItemExist) {
      return res
        .status(404)
        .send({ success: false, message: "Item Not Found!" });
    } else {
      const duplicateItem = await DB.tbl_item_master.findOne({
        where: {
          id: { [DB.Sequelize.Op.ne]: id },
          name: data.name ? data.name : isItemExist.name,
          item_category_id: data.item_category_id
            ? data.item_category_id
            : isItemExist.item_category_id,
          entity_id: req?.selectedEntity,
          isDeleted: false,
        },
      });

      if (duplicateItem) {
        return res
          .status(409)
          .send({ success: false, message: "Item Name Already Exist!" });
      } else {
        const updateItem = await isItemExist.update(data);

        if (data.specifications && data.specifications.length > 0) {
          await DB.tbl_item_specification.destroy({ where: { item_id: id } });

          data.specifications.map(async (specs) => {
            await DB.tbl_item_specification.create({
              spec_type: specs.type,
              spec_description: specs.description,
              item_id: id,
            });
          });
        }

        return res.status(201).send({
          success: true,
          message: "Item Updated Successfully!",
        });
      }
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ITEM DETAILS CONTROLLER ========== //
module.exports.getItemDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
    SELECT IM.*, IC.name AS item_category_name, IC.item_category_code, U.name as uom_name,
    JSON_ARRAYAGG(
          JSON_OBJECT(
              'item_specification_id', ISS.id,
              'type', ISS.spec_type,
              'description', ISS.spec_description
            )
      ) AS specifications
    FROM ITEM_MASTER AS IM
    LEFT JOIN UOM_MASTER AS U ON U.id=IM.uom_id
    LEFT JOIN ITEM_SPECIFICATION AS ISS ON ISS.item_id=IM.id
    LEFT JOIN ITEM_CATEGORY_MASTER AS IC ON IC.id=IM.item_category_id
    WHERE IM.id=${id} AND IM.isDeleted=false
    GROUP BY IM.id`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(404)
        .send({ success: false, message: "Item Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        message: "Get Item Details Successfully!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL ITEM DETAILS CONTROLLER ========== //
module.exports.getAllItemDetails = async (req, res) => {
  try {
    const limit = parseInt(req.body.limit) || 10;
    const page = parseInt(req.body.page) || 1;
    const offset = (page - 1) * limit;
    const filter = req.body.filter || null;

    const whereClause = { entity_id: req?.selectedEntity, isDeleted: false };

    if (filter.name !== undefined || filter.name !== "") {
      whereClause.name = { [DB.Sequelize.Op.like]: [`%${filter.name}%`] };
    }

    if (
      filter.item_category_id !== undefined ||
      filter.item_category_id !== ""
    ) {
      whereClause.item_category_id = {
        [DB.Sequelize.Op.like]: [`%${filter.item_category_id}%`],
      };
    }

    const totalRecords = await DB.tbl_item_category_master.count({
      whereClause,
    });
    const totalPages = Math.ceil(totalRecords / limit);

    const getAllData = await DB.tbl_item_master.findAll({
      include: [
        {
          model: DB.tbl_item_category_master,
        },
        {
          model: DB.tbl_uom_master,
        },
      ],
      where: whereClause,
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
    });

    if (!getAllData || getAllData.length === 0) {
      return res
        .status(404)
        .send({ success: false, message: "Items Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        message: "Get All Items List!",
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

// ========== UPDATE ITEM CONTROLLER ========== //
module.exports.updateItemStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Item already exist
    const isItemExist = await DB.tbl_item_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isItemExist) {
      return res
        .status(404)
        .send({ success: false, message: "Item Not Found!" });
    } else {
      const updateStatus = await isItemExist.update({
        status: !isItemExist.status,
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

// ========== DELETE ITEM CONTROLLER ========== //
module.exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Item already exist
    const isItemExist = await DB.tbl_item_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isItemExist) {
      return res
        .status(404)
        .send({ success: false, message: "Item Not Found!" });
    } else {
      await isItemExist.update({
        isDeleted: true,
      });

      await DB.tbl_item_specification.update(
        {
          isDeleted: true,
        },
        { where: { item_id: id } }
      );
      return res.status(201).send({
        success: true,
        message: "Item Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

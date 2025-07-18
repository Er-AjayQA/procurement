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
        isDeleted: false,
      },
    });

    if (isAlreadyExist) {
      return res.status(400).send({
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

      const newItem = await DB.tbl_item_master.create(data);

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

      return res.status(200).send({
        success: true,
        status: "Item Created Successfully!",
        data: newItem,
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
        isDeleted: false,
      },
    });

    if (!isItemExist) {
      return res
        .status(400)
        .send({ success: false, message: "Item Not Found!" });
    } else {
      const duplicateItem = await DB.tbl_item_master.findOne({
        where: {
          id: { [DB.Sequelize.Op.ne]: id },
          name: data.name ? data.name : isItemExist.name,
          item_category_id: data.item_category_id
            ? data.item_category_id
            : isItemExist.item_category_id,
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

        return res.status(200).send({
          success: true,
          status: "Item Updated Successfully!",
          data: updateItem,
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
    SELECT IM.*, IC.name AS item_category_name, IC.item_category_code,
    JSON_ARRAYAGG(
          JSON_OBJECT(
              'item_specification_id', ISS.id,
              'specification_type', ISS.spec_type,
              'specification_description', ISS.spec_description
            )
      ) AS item_specifications
    FROM ITEM_MASTER AS IM
    LEFT JOIN ITEM_SPECIFICATION AS ISS ON ISS.item_id=IM.id
    LEFT JOIN ITEM_CATEGORY_MASTER AS IC ON IC.id=IM.item_category_id
    WHERE IM.id=${id} AND IM.isDeleted=false
    GROUP BY IM.id`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Item Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get Item Details Successfully!",
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
    const query = `
    SELECT IM.*, IC.name AS item_category_name, IC.item_category_code,
    JSON_ARRAYAGG(
          JSON_OBJECT(
              'item_specification_id', ISS.id,
              'specification_type', ISS.spec_type,
              'specification_description', ISS.spec_description
            )
      ) AS item_specifications
    FROM ITEM_MASTER AS IM
    LEFT JOIN ITEM_SPECIFICATION AS ISS ON ISS.item_id=IM.id
    LEFT JOIN ITEM_CATEGORY_MASTER AS IC ON IC.id=IM.item_category_id
    WHERE IM.isDeleted=false
    GROUP BY IM.id`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Items Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get All Items List!",
        data: getAllData,
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
        .status(400)
        .send({ success: false, message: "Item Not Found!" });
    } else {
      const updateStatus = await isItemExist.update({
        status: !isItemExist.status,
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
        .status(400)
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
      return res.status(200).send({
        success: true,
        status: "Item Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

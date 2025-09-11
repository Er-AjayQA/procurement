// ========== REQUIRE STATEMENTS ========== //
const DB = require("../../../../config/index");

// ========== CREATE UOM CONTROLLER ========== //
module.exports.createUom = async (req, res) => {
  try {
    const data = req.body;

    // Check if UOM already exist
    const isAlreadyExist = await DB.tbl_uom_master.findOne({
      where: {
        name: data?.name,
        entity_id: req?.selectedEntity,
        isDeleted: false,
      },
    });

    if (isAlreadyExist) {
      return res
        .status(404)
        .send({ success: false, message: "UOM Already Exist!" });
    } else {
      const newUom = await DB.tbl_uom_master.create({
        ...data,
        entity_id: req?.selectedEntity,
      });
      return res.status(201).send({
        success: true,
        message: "UOM Created Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE UOM CONTROLLER ========== //
module.exports.updateUom = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    // Check if UOM already exist
    const isUomExist = await DB.tbl_uom_master.findOne({
      where: {
        id,
        entity_id: req?.selectedEntity,
        isDeleted: false,
      },
    });

    if (!isUomExist) {
      return res
        .status(404)
        .send({ success: false, message: "UOM Not Found!" });
    } else {
      const duplicateUom = await DB.tbl_uom_master.findOne({
        where: {
          id: { [DB.Sequelize.Op.ne]: id },
          name: data.name ? data.name : isUomExist.name,
          entity_id: req?.selectedEntity,
          isDeleted: false,
        },
      });

      if (duplicateUom) {
        return res
          .status(409)
          .send({ success: false, message: "UOM Name Already Exist!" });
      } else {
        const updateUom = await isUomExist.update(data, {
          where: { id: isUomExist.id },
        });
        return res.status(201).send({
          success: true,
          message: "UOM Updated Successfully!",
        });
      }
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET UOM DETAILS CONTROLLER ========== //
module.exports.getUomDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
    SELECT U.*
    FROM UOM_MASTER AS U
    WHERE U.id=${id} AND U.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(404)
        .send({ success: false, message: "UOM Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        message: "Get UOM Details Successfully!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL UOM DETAILS CONTROLLER ========== //
module.exports.getAllUomDetails = async (req, res) => {
  try {
    const limit = parseInt(req.body.limit) || 10;
    const page = parseInt(req.body.page) || 1;
    const offset = (page - 1) * limit;
    const filter = req.body.filter || null;

    const whereClause = { entity_id: req?.selectedEntity, isDeleted: false };

    if (filter.name !== undefined || filter.name !== "") {
      whereClause.name = { [DB.Sequelize.Op.like]: [`%${filter.name}%`] };
    }

    const totalRecords = await DB.tbl_uom_master.count({ whereClause });
    const totalPages = Math.ceil(totalRecords / limit);

    const getAllData = await DB.tbl_uom_master.findAll({
      where: whereClause,
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
    });

    if (!getAllData || getAllData.length === 0) {
      return res
        .status(404)
        .send({ success: false, message: "UOM Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        message: "Get All UOM List!",
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

// ========== UPDATE UOM CONTROLLER ========== //
module.exports.updateUomStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if UOM already exist
    const isUomExist = await DB.tbl_uom_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isUomExist) {
      return res
        .status(404)
        .send({ success: false, message: "UOM Not Found!" });
    } else {
      const updateStatus = await isUomExist.update({
        status: !isUomExist.status,
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

// ========== DELETE UOM CONTROLLER ========== //
module.exports.deleteUom = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if UOM already exist
    const isUomExist = await DB.tbl_uom_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isUomExist) {
      return res
        .status(404)
        .send({ success: false, message: "UOM Not Found!" });
    } else {
      await isUomExist.update({
        isDeleted: true,
      });
      return res.status(201).send({
        success: true,
        message: "UOM Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

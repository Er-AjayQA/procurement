// ========== REQUIRE STATEMENTS ========== //
const DB = require("../../../../config/index");

// ========== CREATE TRANSFER TYPE CONTROLLER ========== //
module.exports.createTransferType = async (req, res) => {
  try {
    const data = req.body;

    // Check if data already exist
    const isAlreadyExist = await DB.tbl_transfer_type_master.findOne({
      where: {
        transfer_type: data.transfer_type,
        entity_id: req?.selectedEntity,
        isDeleted: false,
      },
    });

    if (isAlreadyExist) {
      return res
        .status(404)
        .send({ success: false, message: "Transfer Type Already Exist!" });
    } else {
      const newData = await DB.tbl_transfer_type_master.create({
        ...data,
        entity_id: req?.selectedEntity,
      });
      return res.status(200).send({
        success: true,
        message: "Transfer Type Created Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE TRANSFER TYPE CONTROLLER ========== //
module.exports.updateTransferType = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    // Check if Data already exist
    const isDataExist = await DB.tbl_transfer_type_master.findOne({
      where: {
        id,
        entity_id: req?.selectedEntity,
        isDeleted: false,
      },
    });

    if (!isDataExist) {
      return res
        .status(404)
        .send({ success: false, message: "Transfer Type Not Found!" });
    } else {
      const duplicateData = await DB.tbl_transfer_type_master.findOne({
        where: {
          id: { [DB.Sequelize.Op.ne]: id },
          transfer_type: data.transfer_type,
          entity_id: req?.selectedEntity,
          isDeleted: false,
        },
      });

      if (duplicateData) {
        return res
          .status(409)
          .send({ success: false, message: "Transfer Type Already Exist!" });
      } else {
        const updateData = await isDataExist.update(data);
        return res.status(201).send({
          success: true,
          message: "Transfer Type Updated Successfully!",
        });
      }
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET TRANSFER TYPE DETAILS CONTROLLER ========== //
module.exports.getTransferTypeDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
    SELECT TT.*
    FROM TRANSFER_TYPE_MASTER AS TT
    WHERE TT.id=${id} AND TT.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(404)
        .send({ success: false, message: "Transfer Type Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        message: "Get Transfer Type Details Successfully!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL TRANSFER TYPE DETAILS CONTROLLER ========== //
module.exports.getAllTransferTypeDetails = async (req, res) => {
  try {
    const limit = parseInt(req.body.limit) || 10;
    const page = parseInt(req.body.page) || 1;
    const offset = (page - 1) * limit;
    const filter = req.body.filter || null;

    const whereClause = { entity_id: req?.selectedEntity, isDeleted: false };

    if (filter.transfer_type !== undefined || filter.transfer_type !== "") {
      whereClause.transfer_type = {
        [DB.Sequelize.Op.like]: [`%${filter.transfer_type}%`],
      };
    }

    const totalRecords = await DB.tbl_transfer_type_master.count({
      whereClause,
    });
    const totalPages = Math.ceil(totalRecords / limit);

    const getAllData = await DB.tbl_transfer_type_master.findAll({
      where: whereClause,
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
    });

    if (!getAllData || getAllData.length === 0) {
      return res
        .status(404)
        .send({ success: false, message: "Transfer Type Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        message: "Get All Transfer Type List!",
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

// ========== UPDATE TRANSFER TYPE CONTROLLER ========== //
module.exports.updateTransferTypeStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Data already exist
    const isDataExist = await DB.tbl_transfer_type_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isDataExist) {
      return res
        .status(404)
        .send({ success: false, message: "Transfer Type Not Found!" });
    } else {
      const updateStatus = await isDataExist.update({
        status: !isDataExist.status,
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

// ========== DELETE TRANSFER TYPE CONTROLLER ========== //
module.exports.deleteTransferType = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Data already exist
    const isDataExist = await DB.tbl_transfer_type_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isDataExist) {
      return res
        .status(404)
        .send({ success: false, message: "Transfer Type Not Found!" });
    } else {
      await isDataExist.update({
        isDeleted: true,
      });
      return res.status(201).send({
        success: true,
        message: "Transfer Type Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

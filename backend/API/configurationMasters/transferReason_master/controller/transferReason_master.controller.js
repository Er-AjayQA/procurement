// ========== REQUIRE STATEMENTS ========== //
const DB = require("../../../../config/index");

// ========== CREATE TRANSFER REASON CONTROLLER ========== //
module.exports.createTransferReason = async (req, res) => {
  try {
    const data = req.body;

    // Check if data already exist
    const isAlreadyExist = await DB.tbl_transfer_reason_master.findOne({
      where: {
        reason_type: data?.reason_type,
        entity_id: req?.selectedEntity,
        isDeleted: false,
      },
    });

    if (isAlreadyExist) {
      return res
        .status(404)
        .send({ success: false, message: "Transfer Reason Already Exist!" });
    } else {
      const newData = await DB.tbl_transfer_reason_master.create({
        ...data,
        entity_id: req?.selectedEntity,
      });
      return res.status(201).send({
        success: true,
        message: "Transfer Reason Created Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE TRANSFER REASON CONTROLLER ========== //
module.exports.updateTransferReason = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    // Check if Data already exist
    const isDataExist = await DB.tbl_transfer_reason_master.findOne({
      where: {
        id,
        entity_id: req?.selectedEntity,
        isDeleted: false,
      },
    });

    if (!isDataExist) {
      return res
        .status(404)
        .send({ success: false, message: "Transfer Reason Not Found!" });
    } else {
      const duplicateData = await DB.tbl_transfer_reason_master.findOne({
        where: {
          id: { [DB.Sequelize.Op.ne]: id },
          reason_type: data?.reason_type,
          entity_id: req?.selectedEntity,
          isDeleted: false,
        },
      });

      if (duplicateData) {
        return res
          .status(409)
          .send({ success: false, message: "Transfer Reason Already Exist!" });
      } else {
        const updateData = await isDataExist.update(data);
        return res.status(201).send({
          success: true,
          message: "Transfer Reason Updated Successfully!",
        });
      }
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET TRANSFER REASON DETAILS CONTROLLER ========== //
module.exports.getTransferReasonDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
    SELECT TR.*
    FROM TRANSFER_REASON_MASTER AS TR
    WHERE TR.id=${id} AND TR.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(404)
        .send({ success: false, message: "Transfer Reason Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        message: "Get Transfer Reason Details Successfully!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL TRANSFER REASON DETAILS CONTROLLER ========== //
module.exports.getAllTransferReasonDetails = async (req, res) => {
  try {
    const limit = parseInt(req.body.limit) || 10;
    const page = parseInt(req.body.page) || 1;
    const offset = (page - 1) * limit;
    const filter = req.body.filter || null;

    const whereClause = { entity_id: req?.selectedEntity, isDeleted: false };

    if (filter.reason_type !== undefined || filter.reason_type !== "") {
      whereClause.reason_type = {
        [DB.Sequelize.Op.like]: [`%${filter.reason_type}%`],
      };
    }

    const totalRecords = await DB.tbl_transfer_reason_master.count({
      whereClause,
    });
    const totalPages = Math.ceil(totalRecords / limit);

    const getAllData = await DB.tbl_transfer_reason_master.findAll({
      where: whereClause,
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
    });

    if (!getAllData || getAllData.length === 0) {
      return res
        .status(404)
        .send({ success: false, message: "Transfer Reason Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        message: "Get All Transfer Reason List!",
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

// ========== UPDATE TRANSFER REASON CONTROLLER ========== //
module.exports.updateTransferReasonStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Data already exist
    const isDataExist = await DB.tbl_transfer_reason_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isDataExist) {
      return res
        .status(404)
        .send({ success: false, message: "Transfer Reason Not Found!" });
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

// ========== DELETE TRANSFER REASON CONTROLLER ========== //
module.exports.deleteTransferReason = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Data already exist
    const isDataExist = await DB.tbl_transfer_reason_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isDataExist) {
      return res
        .status(404)
        .send({ success: false, message: "Transfer Reason Not Found!" });
    } else {
      await isDataExist.update({
        isDeleted: true,
      });
      return res.status(201).send({
        success: true,
        message: "Transfer Reason Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== REQUIRE STATEMENTS ========== //
const DB = require("../../../../config/index");
const { generateUniqueCode } = require("../../../../helper/generateUniqueCode");

// ========== CREATE TICKET CATEGORY CONTROLLER ========== //
module.exports.createTicketCategory = async (req, res) => {
  try {
    const data = req.body;

    // Check if Data already exist
    const isAlreadyExist = await DB.tbl_ticket_category_master.findOne({
      where: {
        ticket_category_name: data?.ticket_category_name,
        entity_id: req?.selectedEntity,
        isDeleted: false,
      },
    });

    if (isAlreadyExist) {
      return res
        .status(409)
        .send({ success: false, message: "Ticket-Category Already Exist!" });
    } else {
      let code = await generateUniqueCode(
        "TC",
        2,
        "ticket_category_code",
        "TICKET_CATEGORY_MASTER"
      );
      data.ticket_category_code = code;

      const newData = await DB.tbl_ticket_category_master.create({
        ...data,
        entity_id: req?.selectedEntity,
      });
      return res.status(201).send({
        success: true,
        message: "Ticket-Category Created Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE TICKET CATEGORY CONTROLLER ========== //
module.exports.updateTicketCategory = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    // Check if Data already exist
    const isDataExist = await DB.tbl_ticket_category_master.findOne({
      where: {
        id,
        entity_id: req?.selectedEntity,
        isDeleted: false,
      },
    });

    if (!isDataExist) {
      return res
        .status(404)
        .send({ success: false, message: "Ticket-Category Not Found!" });
    } else {
      const duplicateDataName = await DB.tbl_ticket_category_master.findOne({
        where: {
          id: { [DB.Sequelize.Op.ne]: id },
          ticket_category_name: data.ticket_category_name
            ? data.ticket_category_name
            : isDataExist.ticket_category_name,
          entity_id: req?.selectedEntity,
          isDeleted: false,
        },
      });

      if (duplicateDataName) {
        return res.status(409).send({
          success: false,
          message: "Ticket-Category Name Already Exist!",
        });
      } else {
        const updateData = await isDataExist.update(data);
        return res.status(201).send({
          success: true,
          message: "Ticket-Category Updated Successfully!",
        });
      }
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET TICKET CATEGORY DETAILS CONTROLLER ========== //
module.exports.getTicketCategoryDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
    SELECT TC.*
    FROM TICKET_CATEGORY_MASTER AS TC
    WHERE TC.id=${id} AND TC.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(404)
        .send({ success: false, message: "Ticket-Category Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        message: "Get Ticket-Category Details Successfully!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL TICKET CATEGORY DETAILS CONTROLLER ========== //
module.exports.getAllTicketCategoryDetails = async (req, res) => {
  try {
    const limit = parseInt(req.body.limit) || 10;
    const page = parseInt(req.body.page) || 1;
    const offset = (page - 1) * limit;
    const filter = req.body.filter || null;

    const whereClause = { entity_id: req?.selectedEntity, isDeleted: false };

    if (filter.name !== undefined || filter.name !== "") {
      whereClause.ticket_category_name = {
        [DB.Sequelize.Op.like]: [`%${filter.name}%`],
      };
    }

    if (filter.priority !== undefined || filter.priority !== "") {
      whereClause.ticket_category_priority = {
        [DB.Sequelize.Op.like]: [`%${filter.priority}%`],
      };
    }

    const totalRecords = await DB.tbl_ticket_category_master.count({
      whereClause,
    });
    const totalPages = Math.ceil(totalRecords / limit);

    const getAllData = await DB.tbl_ticket_category_master.findAll({
      where: whereClause,
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
    });

    if (!getAllData || getAllData.length === 0) {
      return res
        .status(404)
        .send({ success: false, message: "Ticket-Categories Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        message: "Get All Ticket-Categories List!",
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

// ========== UPDATE TICKET CATEGORY CONTROLLER ========== //
module.exports.updateTicketCategoryStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Data already exist
    const isDataExist = await DB.tbl_ticket_category_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isDataExist) {
      return res
        .status(404)
        .send({ success: false, message: "Ticket-Category Not Found!" });
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

// ========== DELETE TICKET CATEGORY CONTROLLER ========== //
module.exports.deleteTicketCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Data already exist
    const isDataExist = await DB.tbl_ticket_category_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isDataExist) {
      return res
        .status(400)
        .send({ success: false, message: "Ticket-Category Not Found!" });
    } else {
      await isDataExist.update({
        isDeleted: true,
      });
      return res.status(201).send({
        success: true,
        message: "Ticket-Category Removed Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

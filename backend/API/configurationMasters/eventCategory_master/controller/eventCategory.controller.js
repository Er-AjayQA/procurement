// ========== REQUIRE STATEMENTS ========== //
const DB = require("../../../../config/index");

// ========== CREATE EVENT CATEGORY CONTROLLER ========== //
module.exports.createEventCategory = async (req, res) => {
  try {
    const data = req.body;

    // Check if Data already exist
    const isAlreadyExist = await DB.tbl_event_category.findOne({
      where: {
        event_category_name: data?.event_category_name,
        isDeleted: false,
      },
    });

    if (isAlreadyExist) {
      return res.status(409).send({
        success: false,
        message: "Category Name Already Exist!",
      });
    } else {
      const newData = await DB.tbl_event_category.create(data);
      return res.status(201).send({
        success: true,
        message: "Category Created Successfully!",
        data: newData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE EVENT CATEGORY CONTROLLER ========== //
module.exports.updateEventCategory = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    // Check if Data exist
    const isDataExist = await DB.tbl_event_category.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isDataExist) {
      return res
        .status(404)
        .send({ success: false, message: "Category Not Found!" });
    } else {
      const duplicateData = await DB.tbl_event_category.findOne({
        where: {
          id: { [DB.Sequelize.Op.ne]: id },
          event_category_name: data.event_category_name,
          isDeleted: false,
        },
      });

      if (duplicateData) {
        return res.status(409).send({
          success: false,
          message: "Category Name Already Exist!",
        });
      } else {
        const updateData = await isDataExist.update(data);
        return res.status(201).send({
          success: true,
          message: "Category Updated Successfully!",
          data: updateData,
        });
      }
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET EVENT CATEGORY DETAILS CONTROLLER ========== //
module.exports.getEventCategoryDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
    SELECT EC.*
    FROM EVENT_CATEGORY AS EC
    WHERE EC.id=${id} AND EC.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(404)
        .send({ success: false, message: "Category Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        message: "Get Category Details Successfully!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL EVENT CATEGORY DETAILS CONTROLLER ========== //
module.exports.getAllEventCategoryDetails = async (req, res) => {
  try {
    const limit = parseInt(req.body.limit) || 10;
    const page = parseInt(req.body.page) || 1;
    const offset = (page - 1) * limit;
    const filter = req.body.filter || null;

    const whereClause = { isDeleted: false };

    if (filter.name !== undefined || filter.name !== "") {
      whereClause.event_category_name = {
        [DB.Sequelize.Op.like]: [`%${filter.name}%`],
      };
    }

    const totalRecords = await DB.tbl_event_category.count({ whereClause });
    const totalPages = Math.ceil(totalRecords / limit);

    const getAllData = await DB.tbl_event_category.findAll({
      where: whereClause,
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
    });

    if (!getAllData || getAllData.length === 0) {
      return res
        .status(400)
        .send({ success: false, message: "Categories Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        records: getAllData.length,
        message: "Get All Categories List!",
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

// ========== UPDATE EVENT CATEGORY CONTROLLER ========== //
module.exports.updateEventCategoryStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Category exist
    const isDataExist = await DB.tbl_event_category.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isDataExist) {
      return res
        .status(404)
        .send({ success: false, message: "Category Not Found!" });
    } else {
      const updateStatus = await isDataExist.update({
        status: !isDataExist.status,
      });
      return res.status(201).send({
        success: true,
        message: "Status Changed Successfully!",
        data: updateStatus,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== DELETE EVENT CATEGORY CONTROLLER ========== //
module.exports.deleteEventCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Category exist
    const isDataExist = await DB.tbl_event_category.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isDataExist) {
      return res
        .status(404)
        .send({ success: false, message: "Category Not Found!" });
    } else {
      await isDataExist.update({
        isDeleted: true,
      });
      return res.status(201).send({
        success: true,
        message: "Category Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

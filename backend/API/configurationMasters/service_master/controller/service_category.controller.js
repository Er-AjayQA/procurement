// ========== REQUIRE STATEMENTS ========== //
const DB = require("../../../../config/index");
const { generateUniqueCode } = require("../../../../helper/generateUniqueCode");

// ========== CREATE SERVICE CATEGORY CONTROLLER ========== //
module.exports.createServiceCategory = async (req, res) => {
  try {
    const data = req.body;

    // Check if Service-Category already exist
    const isAlreadyExist = await DB.tbl_service_category_master.findOne({
      where: {
        name: data?.name,
        entity_id: req?.selectedEntity,
        isDeleted: false,
      },
    });

    if (isAlreadyExist) {
      return res
        .status(409)
        .send({ success: false, message: "Service-Category Already Exist!" });
    } else {
      let code = await generateUniqueCode(
        "SRVCAT",
        6,
        "service_category_code",
        "SERVICE_CATEGORY_MASTER"
      );
      data.service_category_code = code;

      const newServiceCategory = await DB.tbl_service_category_master.create({
        ...data,
        entity_id: req?.selectedEntity,
      });
      return res.status(201).send({
        success: true,
        message: "Service-Category Created Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE SERVICE CATEGORY CONTROLLER ========== //
module.exports.updateServiceCategory = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    // Check if Service-Category already exist
    const isServiceCategoryExist = await DB.tbl_service_category_master.findOne(
      {
        where: {
          id,
          entity_id: req?.selectedEntity,
          isDeleted: false,
        },
      }
    );

    if (!isServiceCategoryExist) {
      return res
        .status(404)
        .send({ success: false, message: "Service-Category Not Found!" });
    } else {
      const duplicateDataName = await DB.tbl_service_category_master.findOne({
        where: {
          id: { [DB.Sequelize.Op.ne]: id },
          name: data.name ? data.name : isServiceCategoryExist.name,
          entity_id: req?.selectedEntity,
          isDeleted: false,
        },
      });

      if (duplicateDataName) {
        return res.status(409).send({
          success: false,
          message: "Service-Category Name Already Exist!",
        });
      } else {
        const updateServiceCategory = await isServiceCategoryExist.update(data);
        return res.status(201).send({
          success: true,
          message: "Service-Category Updated Successfully!",
        });
      }
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET SERVICE CATEGORY DETAILS CONTROLLER ========== //
module.exports.getServiceCategoryDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
    SELECT SC.*
    FROM SERVICE_CATEGORY_MASTER AS SC
    WHERE SC.id=${id} AND SC.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(404)
        .send({ success: false, message: "Service-Category Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        message: "Get Service-Category Details Successfully!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL SERVICE CATEGORY DETAILS CONTROLLER ========== //
module.exports.getAllServiceCategoryDetails = async (req, res) => {
  try {
    const limit = parseInt(req.body.limit) || 10;
    const page = parseInt(req.body.page) || 1;
    const offset = (page - 1) * limit;
    const filter = req.body.filter || null;

    const whereClause = { entity_id: req?.selectedEntity, isDeleted: false };

    if (filter.name !== undefined || filter.name !== "") {
      whereClause.name = { [DB.Sequelize.Op.like]: [`%${filter.name}%`] };
    }

    const totalRecords = await DB.tbl_service_category_master.count({
      whereClause,
    });
    const totalPages = Math.ceil(totalRecords / limit);

    const getAllData = await DB.tbl_service_category_master.findAll({
      where: whereClause,
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
    });

    if (!getAllData || getAllData.length === 0) {
      return res
        .status(404)
        .send({ success: false, message: "Service-Categories Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        message: "Get All Service-Categories List!",
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

// ========== UPDATE SERVICE CATEGORY CONTROLLER ========== //
module.exports.updateServiceCategoryStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Service-Category already exist
    const isServiceCategoryExist = await DB.tbl_service_category_master.findOne(
      {
        where: {
          id,
          isDeleted: false,
        },
      }
    );

    if (!isServiceCategoryExist) {
      return res
        .status(404)
        .send({ success: false, message: "Service-Category Not Found!" });
    } else {
      const updateStatus = await isServiceCategoryExist.update({
        status: !isServiceCategoryExist.status,
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

// ========== DELETE SERVICE CATEGORY CONTROLLER ========== //
module.exports.deleteServiceCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Service-Category already exist
    const isServiceCategoryExist = await DB.tbl_service_category_master.findOne(
      {
        where: {
          id,
          isDeleted: false,
        },
      }
    );

    if (!isServiceCategoryExist) {
      return res
        .status(404)
        .send({ success: false, message: "Service-Category Not Found!" });
    } else {
      await isServiceCategoryExist.update({
        isDeleted: true,
      });
      return res.status(201).send({
        success: true,
        message: "Service-Category Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

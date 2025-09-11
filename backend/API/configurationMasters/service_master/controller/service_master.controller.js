// ========== REQUIRE STATEMENTS ========== //
const DB = require("../../../../config/index");
const { generateUniqueCode } = require("../../../../helper/generateUniqueCode");

// ========== CREATE SERVICE CONTROLLER ========== //
module.exports.createService = async (req, res) => {
  try {
    const data = req.body;

    // Check if Service already exist
    const isAlreadyExist = await DB.tbl_service_master.findOne({
      where: {
        name: data?.name,
        service_category_id: data?.service_category_id,
        entity_id: req?.selectedEntity,
        isDeleted: false,
      },
    });

    if (isAlreadyExist) {
      return res.status(409).send({
        success: false,
        message: "Service Already Exist in Selected Category!",
      });
    } else {
      let code = await generateUniqueCode(
        "SRV",
        3,
        "service_code",
        "SERVICE_MASTER"
      );
      data.service_code = code;

      const newService = await DB.tbl_service_master.create({
        ...data,
        entity_id: req?.selectedEntity,
      });

      return res.status(201).send({
        success: true,
        message: "Item Created Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE SERVICE CONTROLLER ========== //
module.exports.updateService = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    // Check if Service already exist
    const isCategoryExist = await DB.tbl_service_master.findOne({
      where: {
        id,
        entity_id: req?.selectedEntity,
        isDeleted: false,
      },
    });

    if (!isCategoryExist) {
      return res
        .status(404)
        .send({ success: false, message: "Service Not Found!" });
    } else {
      const duplicateService = await DB.tbl_service_master.findOne({
        where: {
          id: { [DB.Sequelize.Op.ne]: id },
          name: data.name ? data.name : isCategoryExist.name,
          service_category_id: data.service_category_id
            ? data.service_category_id
            : isCategoryExist.service_category_id,
          entity_id: req?.selectedEntity,
          isDeleted: false,
        },
      });

      if (duplicateService) {
        return res
          .status(409)
          .send({ success: false, message: "Service Name Already Exist!" });
      } else {
        const updateService = await isCategoryExist.update(data);

        return res.status(201).send({
          success: true,
          message: "Service Updated Successfully!",
        });
      }
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET SERVICE DETAILS CONTROLLER ========== //
module.exports.getServiceDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
    SELECT S.*, SC.name AS service_category_name, SC.service_category_description, SC.service_category_code
    FROM SERVICE_MASTER AS S
    LEFT JOIN SERVICE_CATEGORY_MASTER AS SC ON SC.id=S.service_category_id
    WHERE S.id=${id} AND S.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(404)
        .send({ success: false, message: "Service Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        message: "Get Service Details Successfully!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL SERVICE DETAILS CONTROLLER ========== //
module.exports.getAllServiceDetails = async (req, res) => {
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
      filter.service_category_id !== undefined ||
      filter.service_category_id !== ""
    ) {
      whereClause.service_category_id = {
        [DB.Sequelize.Op.like]: [`%${filter.service_category_id}%`],
      };
    }

    const totalRecords = await DB.tbl_service_master.count({
      whereClause,
    });
    const totalPages = Math.ceil(totalRecords / limit);

    const getAllData = await DB.tbl_service_master.findAll({
      include: [
        {
          model: DB.tbl_service_category_master,
        },
      ],
      where: whereClause,
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
    });

    if (getAllData.length < 1) {
      return res
        .status(404)
        .send({ success: false, message: "Services Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        message: "Get All Services List!",
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

// ========== UPDATE SERVICE CONTROLLER ========== //
module.exports.updateServiceStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Service already exist
    const isServiceExist = await DB.tbl_service_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isServiceExist) {
      return res
        .status(404)
        .send({ success: false, message: "Item Not Found!" });
    } else {
      const updateStatus = await isServiceExist.update({
        status: !isServiceExist.status,
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

// ========== DELETE SERVICE CONTROLLER ========== //
module.exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Service already exist
    const isServiceExist = await DB.tbl_service_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isServiceExist) {
      return res
        .status(404)
        .send({ success: false, message: "Service Not Found!" });
    } else {
      await isServiceExist.update({
        isDeleted: true,
      });

      return res.status(201).send({
        success: true,
        message: "Service Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

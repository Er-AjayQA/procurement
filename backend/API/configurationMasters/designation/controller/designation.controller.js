// ========== REQUIRE STATEMENTS ========== //
const DB = require("../../../../config/index");

// ========== CREATE DESIGNATION CONTROLLER ========== //
module.exports.createDesignation = async (req, res) => {
  try {
    const data = req.body;

    // Check if Designation already exist
    const isAlreadyExist = await DB.tbl_designation_master.findOne({
      where: {
        name: data?.name,
        entity_id: req?.selectedEntity,
        isDeleted: false,
      },
    });

    if (isAlreadyExist) {
      return res
        .status(404)
        .send({ success: false, message: "Designation Already Exist!" });
    } else {
      const newDesignation = await DB.tbl_designation_master.create({
        ...data,
        entity_id: req?.selectedEntity,
      });
      return res.status(201).send({
        success: true,
        message: "Designation Created Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE DESIGNATION CONTROLLER ========== //
module.exports.updateDesignation = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    // Check if Designation already exist
    const isDesignationExist = await DB.tbl_designation_master.findOne({
      where: {
        id,
        entity_id: req?.selectedEntity,
        isDeleted: false,
      },
    });

    if (!isDesignationExist) {
      return res
        .status(404)
        .send({ success: false, message: "Designation Not Found!" });
    } else {
      const duplicateDesignation = await DB.tbl_designation_master.findOne({
        where: {
          id: { [DB.Sequelize.Op.ne]: id },
          name: data?.name,
          entity_id: req?.selectedEntity,
          isDeleted: false,
        },
      });

      if (duplicateDesignation) {
        return res.status(409).send({
          success: false,
          message: "Designation Name Already Exist!",
        });
      } else {
        const updateDesignation = await isDesignationExist.update(data);
        return res.status(201).send({
          success: true,
          message: "Designation Updated Successfully!",
        });
      }
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET DESIGNATION DETAILS CONTROLLER ========== //
module.exports.getDesignationDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
    SELECT D.*
    FROM DESIGNATION_MASTER AS D
    WHERE D.id=${id} AND D.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(404)
        .send({ success: false, message: "Designation Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        message: "Get Designation Details Successfully!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL DESIGNATION DETAILS CONTROLLER ========== //
module.exports.getAllDesignationDetails = async (req, res) => {
  try {
    const limit = parseInt(req.body.limit) || 10;
    const page = parseInt(req.body.page) || 1;
    const offset = (page - 1) * limit;
    const filter = req.body.filter || null;

    // Get total count of records
    let countQuery = `
      SELECT COUNT(*) as total 
      FROM DESIGNATION_MASTER AS D 
      WHERE entity_id= ${req?.selectedEntity} AND D.isDeleted = false`;

    let query = `
            SELECT D.*
            FROM DESIGNATION_MASTER AS D
            WHERE entity_id= ${req?.selectedEntity} AND D.isDeleted=false`;

    if (filter?.name) {
      countQuery += ` AND D.name LIKE :name`;
      query += ` AND D.name LIKE :name`;
    }

    query += ` ORDER BY D.createdAt DESC`;
    query += ` LIMIT :limit OFFSET :offset`;

    // Get total count
    const totalResult = await DB.sequelize.query(countQuery, {
      replacements: { name: `%${filter?.name}%` },
      type: DB.sequelize.QueryTypes.SELECT,
    });
    const totalRecords = totalResult[0].total;
    const totalPages = Math.ceil(totalRecords / limit);

    const getAllData = await DB.sequelize.query(query, {
      replacements: {
        name: `%${filter?.name}%`,
        limit,
        offset,
      },
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(404)
        .send({ success: false, message: "Designations Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get All Designations List!",
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

// ========== UPDATE DESIGNATION CONTROLLER ========== //
module.exports.updateDesignationStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Designation already exist
    const isDesignationExist = await DB.tbl_designation_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isDesignationExist) {
      return res
        .status(404)
        .send({ success: false, message: "Designation Not Found!" });
    } else {
      const updateStatus = await isDesignationExist.update({
        status: !isDesignationExist.status,
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

// ========== DELETE DESIGNATION CONTROLLER ========== //
module.exports.deleteDesignation = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Designation already exist
    const isDesignationExist = await DB.tbl_designation_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isDesignationExist) {
      return res
        .status(404)
        .send({ success: false, message: "Designation Not Found!" });
    } else {
      await isDesignationExist.update({
        isDeleted: true,
      });
      return res.status(201).send({
        success: true,
        message: "Designation Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== REQUIRE STATEMENTS ========== //
const DB = require("../../../../config/index");
const { generateUniqueCode } = require("../../../../helper/generateUniqueCode");

// ********************* EVENT MANAGEMENT CONTROLLERS ********************* //
// ========== CREATE ENTITY CONTROLLER ========== //
module.exports.createEntity = async (req, res) => {
  const transaction = await DB.sequelize.transaction();
  try {
    const data = req.body;

    // Check if Entity Exist with same name
    const checkAlreadyExist = await DB.tbl_entity_configuration.findOne({
      where: {
        entity_name: data?.entity_name,
        display_name: data?.display_name,
        isDeleted: false,
      },
      transaction,
    });

    if (checkAlreadyExist) {
      await transaction.rollback();
      return res.status(409).send({
        success: false,
        message: "Entity with same name already exist!",
      });
    } else {
      let code = await generateUniqueCode(
        data?.entity_code_prefix,
        data?.entity_code_prefix.length,
        "entity_code",
        "ENTITY_CONFIGURATION"
      );

      const createData = await DB.tbl_entity_configuration.create(
        { ...data, entity_code: code },
        {
          transaction,
        }
      );

      await transaction.commit();

      return res.status(201).send({
        success: true,
        message: "Entity created successfully!",
      });
    }
  } catch (error) {
    await transaction.rollback();
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE ENTITY CONTROLLER ========== //
module.exports.updateEntity = async (req, res) => {
  const transaction = await DB.sequelize.transaction();
  try {
    const { id } = req.params;
    const data = req.body;

    // Check if Entity Exist
    const checkAlreadyExist = await DB.tbl_entity_configuration.findOne({
      where: {
        id,
        isDeleted: false,
      },
      transaction,
    });

    if (!checkAlreadyExist) {
      await transaction.rollback();
      return res.status(404).send({
        success: false,
        message: "Entity not found!",
      });
    } else {
      const checkIfEntityWithSameName =
        await DB.tbl_entity_configuration.findAll({
          where: {
            id: { [DB.Sequelize.Op.ne]: id },
            entity_name: data?.entity_name,
            display_name: data?.display_name,
            isDeleted: false,
          },
          transaction,
        });

      if (checkIfEntityWithSameName) {
        await transaction.rollback();
        return res.status(409).send({
          success: false,
          message: "Entity with same name already exist!",
        });
      }

      const updateData = await checkAlreadyExist.update(data, {
        where: {
          id: checkAlreadyExist?.id,
        },
        transaction,
      });

      await transaction.commit();

      return res.status(201).send({
        success: true,
        message: "Entity updated successfully!",
      });
    }
  } catch (error) {
    await transaction.rollback();
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ENTITY DETAILS CONTROLLER ========== //
module.exports.getEntityDetails = async (req, res) => {
  try {
    const { id } = req.params;

    let query = `
      SELECT 
        EC.*
      FROM ENTITY_CONFIGURATION AS EC
      WHERE EC.id= ${id} AND EC.isDeleted = false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(404)
        .send({ success: false, message: "Entity not found!" });
    } else {
      // Getting Allowance Details
      // const allowances = await DB.tbl_userAllowance_master.findAll({
      //   attributes: ["id", "amount", "allowance_id", "uniqueCode"],
      //   where: { user_id: getAllData[0].id, isDeleted: false },
      //   include: [
      //     {
      //       model: DB.tbl_allowance_master,
      //       attributes: ["id", "name", "is_taxable"],
      //       where: { isDeleted: false },
      //     },
      //   ],
      // });

      // getAllData[0] = {
      //   ...getAllData[0],
      //   allowance_details: allowances,
      //   family_details: family_details,
      //   previous_employer_details: prev_emp_details,
      //   salary_history: salary_revision_details,
      // };
      return res.status(200).send({
        success: true,
        status: "Get entity details successfully!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL ENTITY DETAILS CONTROLLER ========== //
module.exports.getAllEntityDetails = async (req, res) => {
  try {
    const limit = parseInt(req.body.limit) || 10;
    const page = parseInt(req.body.page) || 1;
    const offset = (page - 1) * limit;
    const filter = req.body.filter || {};

    // Base queries
    let countQuery = `
      SELECT COUNT(*) as total 
      FROM ENTITY_CONFIGURATION AS EC
      WHERE EC.isDeleted = false`;

    let query = `
      SELECT 
        EC.*
      FROM ENTITY_CONFIGURATION AS EC
      WHERE EC.isDeleted = false`;

    // Prepare replacements object
    const replacements = {
      limit: limit,
      offset: offset,
    };

    // // Add Event Category filter if provided
    // if (filter?.event_category_id) {
    //   countQuery += ` AND EC.event_category_id = :event_category_id`;
    //   query += ` AND EC.event_category_id = :event_category_id`;
    //   replacements.event_category_id = filter.event_category_id;
    // }

    // // Add Event Type filter if provided
    // if (filter?.event_type) {
    //   countQuery += ` AND EC.event_type LIKE :event_type`;
    //   query += ` AND EC.event_type LIKE :event_type`;
    //   replacements.event_type = `%${filter.event_type}%`;
    // }

    // Complete the queries
    query += ` GROUP BY EC.id`;
    query += ` ORDER BY EC.createdAt DESC`;
    query += ` LIMIT :limit OFFSET :offset`;

    // Get total count
    const totalResult = await DB.sequelize.query(countQuery, {
      replacements: replacements,
      type: DB.sequelize.QueryTypes.SELECT,
    });
    const totalRecords = totalResult[0].total;
    const totalPages = Math.ceil(totalRecords / limit);

    // Get paginated data
    const getAllData = await DB.sequelize.query(query, {
      replacements: replacements,
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(200)
        .send({ success: true, message: "No entity found!", data: [] });
    } else {
      return res.status(200).send({
        success: true,
        message: "Get all entities list successfully!",
        records: getAllData.length,
        data: getAllData,
        pagination: {
          currentPage: page,
          itemsPerPage: limit,
          totalItems: totalRecords,
          totalPages: totalPages,
        },
      });
    }
  } catch (error) {
    console.error("Error in getAllEntitiesList:", error);
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== CHANGE ENTITY STATUS CONTROLLER ========== //
module.exports.updateEntityStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // Check if Entity Exist
    const isEntityExist = await DB.tbl_entity_configuration.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isEntityExist) {
      return res
        .status(404)
        .send({ success: false, message: "Entity not found!" });
    } else {
      const updateStatus = await isEntityExist.update({
        status: data?.status,
      });
      return res.status(201).send({
        success: true,
        message: `Status changed successfully!`,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== DELETE ENTITY CONTROLLER ========== //
module.exports.deleteEntity = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Entity Exist
    const isEntityExist = await DB.tbl_entity_configuration.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isEntityExist) {
      return res
        .status(404)
        .send({ success: false, message: "Entity not found!" });
    } else {
      await isEntityExist.update({
        isDeleted: true,
      });
      return res.status(201).send({
        success: true,
        message: "Entity Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

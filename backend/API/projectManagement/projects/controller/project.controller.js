// ========== REQUIRE STATEMENTS ========== //
const DB = require("../../../../config/index");
const { generateUniqueCode } = require("../../../../helper/generateUniqueCode");

// ********************* EVENT MANAGEMENT CONTROLLERS ********************* //
// ========== CREATE PROJECT CONTROLLER ========== //
module.exports.createProject = async (req, res) => {
  const transaction = await DB.sequelize.transaction();
  try {
    const data = req.body;

    // Check if Project Already Exist with same name
    const checkAlreadyExist = await DB.tbl_project_management.findOne({
      where: {
        project_title: data?.project_title,
        entity_id: req?.selectedEntity,
        isDeleted: false,
      },
      transaction,
    });

    if (checkAlreadyExist) {
      await transaction.rollback();
      return res.status(409).send({
        success: false,
        message: "Project with same name already exist!",
      });
    } else {
      let code = await generateUniqueCode(
        "PRJ",
        3,
        "project_code",
        "PROJECT_MANAGEMENT"
      );

      const createData = await DB.tbl_project_management.create(
        {
          project_code: code,
          project_title: data?.project_title,
          project_description: data?.project_description,
          project_start_date: data?.project_start_date,
          target_end_date: data?.target_end_date,
          project_manager_id: data?.project_manager_id,
          client_name: data?.client_name,
          client_contact_person: data?.client_contact_person,
          client_email: data?.client_email,
          client_contact_country_code: data?.client_contact_country_code,
          client_contact_no: data?.client_contact_no,
          entity_id: req?.selectedEntity,
          status: "DRAFT",
        },
        { transaction }
      );

      await transaction.commit();

      return res.status(201).send({
        success: true,
        message: "Project created successfully!",
      });
    }
  } catch (error) {
    await transaction.rollback();
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE PROJECT CONTROLLER ========== //
module.exports.updateProject = async (req, res) => {
  const transaction = await DB.sequelize.transaction();
  try {
    const { id } = req.params;
    const data = req.body;

    // Check if Project Exist
    const checkAlreadyExist = await DB.tbl_project_management.findOne({
      where: {
        id,
        entity_id: req?.selectedEntity,
        isDeleted: false,
      },
      transaction,
    });

    if (!checkAlreadyExist) {
      await transaction.rollback();
      return res.status(409).send({
        success: false,
        message: "Project not found!",
      });
    } else {
      const duplicateName = await DB.tbl_project_management.findOne({
        where: {
          id: { [DB.Sequelize.Op.ne]: id },
          project_title: data?.project_title,
          isDeleted: false,
        },
        transaction,
      });

      if (duplicateName) {
        await transaction.rollback();
        return res.status(409).send({
          success: false,
          message: "Project name already exist!",
        });
      }

      const updateData = await checkAlreadyExist.update(data, {
        where: { id },
        transaction,
      });

      await transaction.commit();
      return res.status(201).send({
        success: true,
        message: "Project updated successfully!",
      });
    }
  } catch (error) {
    await transaction.rollback();
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET PROJECT DETAILS CONTROLLER ========== //
module.exports.getProjectDetails = async (req, res) => {
  try {
    const { id } = req.params;

    let query = `
      SELECT 
        PM.*, UM.emp_code as manager_emp_code, UM.title as manager_name_title, UM.name as manager_name, UM.contact_code as manager_contact_code, UM.contact_no as manager_contact_no
      FROM PROJECT_MANAGEMENT AS PM
      LEFT JOIN USER_MASTER AS UM ON UM.id = PM.project_manager_id
      WHERE PM.id= ${id} AND PM.isDeleted = false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(404)
        .send({ success: false, message: "Project not found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get project Data successfully!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL PROJECT DETAILS CONTROLLER ========== //
module.exports.getAllProjectsDetails = async (req, res) => {
  try {
    const limit = parseInt(req.body.limit) || 10;
    const page = parseInt(req.body.page) || 1;
    const offset = (page - 1) * limit;
    const filter = req.body.filter || {};

    // Base queries
    let countQuery = `
      SELECT COUNT(*) as total 
      FROM EVENT_MANAGEMENT AS EM
      WHERE EM.entity_id=${req?.selectedEntity} AND EM.isDeleted = false`;

    let query = `
      SELECT 
        EM.*, ECM.event_category_name, ECM.event_category_description, CM.name as country_name, SM.name as state_name, CIM.name as city_name,
        UM.emp_code as organizer_emp_code, UM.title as organizer_name_title, UM.name as organizer_name, UM.contact_code as organizer_contact_code, UM.contact_no as organizer_contact_no
      FROM EVENT_MANAGEMENT AS EM
      LEFT JOIN EVENT_CATEGORY_MASTER AS ECM ON ECM.id = EM.event_category_id
      LEFT JOIN COUNTRY_MASTER AS CM ON CM.id = EM.event_country_id
      LEFT JOIN STATE_MASTER AS SM ON SM.id = EM.event_state_id
      LEFT JOIN CITY_MASTER AS CIM ON CIM.id = EM.event_city_id
      LEFT JOIN USER_MASTER AS UM ON UM.id = EM.event_organizer_id
      WHERE EM.entity_id=${req?.selectedEntity} AND EM.isDeleted = false`;

    // Prepare replacements object
    const replacements = {
      limit: limit,
      offset: offset,
    };

    // Add Event Category filter if provided
    if (filter?.event_category_id) {
      countQuery += ` AND EM.event_category_id = :event_category_id`;
      query += ` AND EM.event_category_id = :event_category_id`;
      replacements.event_category_id = filter.event_category_id;
    }

    // Add Event Type filter if provided
    if (filter?.event_type) {
      countQuery += ` AND EM.event_type LIKE :event_type`;
      query += ` AND EM.event_type LIKE :event_type`;
      replacements.event_type = `%${filter.event_type}%`;
    }

    // Complete the queries
    query += ` GROUP BY EM.id`; // Only group by the primary key
    query += ` ORDER BY EM.createdAt DESC`;
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
        .status(404)
        .send({ success: true, message: "No Events found!", data: [] });
    } else {
      return res.status(200).send({
        success: true,
        message: "Get all events list successfully!",
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
    console.error("Error in getAllEventsList:", error);
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== CHANGE PROJECT STATUS CONTROLLER ========== //
module.exports.updateProjectStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // Check if Event Exist
    const isEventExist = await DB.tbl_event_management.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isEventExist) {
      return res
        .status(404)
        .send({ success: false, message: "Event not found!" });
    } else {
      const updateStatus = await isEventExist.update({
        status: data?.status,
      });
      return res.status(201).send({
        success: true,
        message: `Event ${data?.status} Successfully!`,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== DELETE PROJECT CONTROLLER ========== //
module.exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Event Exist
    const isEventExist = await DB.tbl_event_management.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isEventExist) {
      return res
        .status(404)
        .send({ success: false, message: "Event not found!" });
    } else {
      await isEventExist.update({
        isDeleted: true,
      });
      return res.status(201).send({
        success: true,
        message: "Event Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

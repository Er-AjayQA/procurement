// ========== REQUIRE STATEMENTS ========== //
const DB = require("../../../../config/index");
const { generateUniqueCode } = require("../../../../helper/generateUniqueCode");

// ********************* PROJECT MANAGEMENT CONTROLLERS ********************* //
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
          development_mode: data?.development_mode,
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
          status: "Draft",
        },
        { transaction }
      );

      // Add user to project
      if (data?.assignedUsersList.length > 0) {
        await DB.tbl_project_employee_mapping.bulkCreate(
          data?.assignedUsersList.map((data) => ({
            project_id: createData?.id,
            dep_id: data?.dep_id,
            user_id: data?.user_id,
            unique_code: data?.id,
            assigned_date: new Date(),
            removed_date: "",
          })),
          { transaction }
        );
      }

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

      // Add user to project
      if (data?.assignedUsersList.length > 0) {
        // Remove existing data before adding new
        await DB.tbl_project_employee_mapping.destroy({
          where: { project_id: checkAlreadyExist?.id, isDeleted: false },
          transaction,
        });

        await DB.tbl_project_employee_mapping.bulkCreate(
          data?.assignedUsersList.map((data) => ({
            project_id: checkAlreadyExist?.id,
            dep_id: data?.dep_id,
            user_id: data?.user_id,
            unique_code: data?.id,
            assigned_date: new Date(),
            removed_date: "",
          })),
          { transaction }
        );
      }

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
      // Get List of All Assigned Users
      const getAssignedUsersList =
        await DB.tbl_project_employee_mapping.findAll({
          attributes: [
            "id",
            "user_id",
            "dep_id",
            "project_id",
            "assigned_date",
            "removed_date",
          ],
          include: [
            {
              model: DB.tbl_user_master,
              attributes: [
                "id",
                "emp_code",
                "title",
                "name",
                "contact_code",
                "contact_no",
                "official_email",
              ],
            },
          ],
          where: { project_id: getAllData[0]?.id, isDeleted: false },
        });

      return res.status(200).send({
        success: true,
        status: "Get project Data successfully!",
        data: {
          ...getAllData[0],
          assignedUsersList: getAssignedUsersList.flatMap((user) => ({
            id: user?.id,
            user_id: user?.user_id,
            dep_id: user?.dep_id,
            project_id: user?.project_id,
            assigned_date: user?.assigned_date,
            removed_date: user?.removed_date,
            user_emp_code: user?.USER_MASTER?.emp_code,
            user_title: user?.USER_MASTER?.title,
            user_name: user?.USER_MASTER?.name,
            contact_code: user?.USER_MASTER?.contact_code,
            contact_no: user?.USER_MASTER?.contact_no,
            official_email: user?.USER_MASTER?.official_email,
          })),
        },
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
      SELECT 
        COUNT(*) AS total
      FROM PROJECT_MANAGEMENT AS PM
      WHERE PM.entity_id= ${req?.selectedEntity} AND PM.isDeleted = false`;

    let query = `
      SELECT 
        PM.*, UM.emp_code as manager_emp_code, UM.title as manager_name_title, UM.name as manager_name, UM.contact_code as manager_contact_code, UM.contact_no as manager_contact_no
      FROM PROJECT_MANAGEMENT AS PM
      LEFT JOIN USER_MASTER AS UM ON UM.id = PM.project_manager_id
      WHERE PM.entity_id= ${req?.selectedEntity} AND PM.isDeleted = false`;

    // Prepare replacements object
    const replacements = {
      limit: limit,
      offset: offset,
    };

    // Add Event Type filter if provided
    if (filter?.status) {
      countQuery += ` AND PM.status LIKE :status`;
      query += ` AND PM.status LIKE :status`;
      replacements.status = `%${filter.status}%`;
    }

    // Complete the queries
    query += ` GROUP BY PM.id`; // Only group by the primary key
    query += ` ORDER BY PM.createdAt DESC`;
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
        .send({ success: true, message: "No projects found!", data: [] });
    } else {
      return res.status(200).send({
        success: true,
        message: "Get all projects list successfully!",
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
    console.error("Error in getAllProjectsList:", error);
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== CHANGE PROJECT STATUS CONTROLLER ========== //
module.exports.updateProjectStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // Check if Record Exist
    const isDataExist = await DB.tbl_project_management.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isDataExist) {
      return res
        .status(404)
        .send({ success: false, message: "Project not found!" });
    } else {
      const updateStatus = await isDataExist.update({
        status: data?.status,
      });
      return res.status(201).send({
        success: true,
        message: `Status changed to ${data?.status} Successfully!`,
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

    // Check if Record Exist
    const isDataExist = await DB.tbl_project_management.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isDataExist) {
      return res
        .status(404)
        .send({ success: false, message: "Project not found!" });
    } else {
      await isDataExist.update({
        isDeleted: true,
      });
      return res.status(201).send({
        success: true,
        message: "Project Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ********************* PROJECT USER MAPPING CONTROLLERS ********************* //
// ========== ADD USER TO PROJECT CONTROLLER ========== //
module.exports.addUserToProject = async (req, res) => {
  const transaction = await DB.sequelize.transaction();
  try {
    const { project_id } = req.params;
    const data = req.body;

    // Check if Project Exist
    const checkDataExist = await DB.tbl_project_management.findOne({
      where: {
        id: project_id,
        entity_id: req?.selectedEntity,
        isDeleted: false,
      },
      transaction,
    });

    if (!checkDataExist) {
      await transaction.rollback();
      return res.status(404).send({
        success: false,
        message: "Project not found!",
      });
    } else {
      // Check if user already assigned
      const checkUserAlreadyAssigned =
        await DB.tbl_project_employee_mapping.findOne({
          where: { project_id, user_id: data?.user_id },
          transaction,
        });

      if (!checkUserAlreadyAssigned) {
        const createData = await DB.tbl_project_employee_mapping.create(
          { ...data, project_id, assigned_date: new Date(), removed_date: "" },
          {
            transaction,
          }
        );
      } else if (checkUserAlreadyAssigned?.isDeleted) {
        await DB.tbl_project_employee_mapping.update(
          { isDeleted: false },
          {
            where: {
              project_id,
              user_id: data?.user_id,
            },
            transaction,
          }
        );
      } else if (!checkUserAlreadyAssigned?.isDeleted) {
        await transaction.rollback();
        return res.status(409).send({
          success: false,
          message: "User already assigned!",
        });
      }

      await transaction.commit();

      return res.status(201).send({
        success: true,
        message: "User added successfully!",
      });
    }
  } catch (error) {
    await transaction.rollback();
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== REMOVE USER FROM PROJECT CONTROLLER ========== //
module.exports.removeUserFromProject = async (req, res) => {
  const transaction = await DB.sequelize.transaction();
  try {
    const { project_id } = req.params;
    const data = req.body;

    // Check if Project Exist
    const checkDataExist = await DB.tbl_project_management.findOne({
      where: {
        id: project_id,
        entity_id: req?.selectedEntity,
        isDeleted: false,
      },
      transaction,
    });

    if (!checkDataExist) {
      await transaction.rollback();
      return res.status(404).send({
        success: false,
        message: "Project not found!",
      });
    } else {
      const checkIfUserAssigned = await DB.tbl_project_employee_mapping.findOne(
        { where: { project_id, user_id: data?.user_id, isDeleted: false } }
      );

      if (!checkIfUserAssigned) {
        await transaction.rollback();
        return res.status(404).send({
          success: false,
          message: "No such user assigned!",
        });
      }

      const removeUser = await DB.tbl_project_employee_mapping.update(
        { removed_date: new Date(), isDeleted: true },
        { where: { project_id, user_id: data?.user_id }, transaction }
      );

      await transaction.commit();

      return res.status(201).send({
        success: true,
        message: "User removed successfully!",
      });
    }
  } catch (error) {
    await transaction.rollback();
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL ASSIGNED USERS CONTROLLER ========== //
module.exports.getAllAssignedUsersDetails = async (req, res) => {
  try {
    const { project_id } = req.params;
    const limit = parseInt(req.body.limit) || 10;
    const page = parseInt(req.body.page) || 1;
    const offset = (page - 1) * limit;
    const filter = req.body.filter || {};

    // Base queries
    let countQuery = `
      SELECT 
        COUNT(*) AS total
      FROM PROJECT_EMPLOYEE_MAPPING AS PEM
      WHERE PEM.project_id= ${project_id} AND PEM.isDeleted = false`;

    let query = `
      SELECT 
        PEM.*, UM.emp_code, UM.title as name_title, UM.name as user_name, UM.contact_code as contact_country_code, UM.contact_no as user_contact_no, UM.official_email as user_email_id
      FROM PROJECT_EMPLOYEE_MAPPING AS PEM
      LEFT JOIN USER_MASTER AS UM ON UM.id = PEM.user_id
      WHERE PEM.project_id= ${project_id} AND PEM.isDeleted = false`;

    // Prepare replacements object
    const replacements = {
      limit: limit,
      offset: offset,
    };

    // Add Event Type filter if provided
    if (filter?.user_id) {
      countQuery += ` AND PEM.user_id LIKE :user_id`;
      query += ` AND PEM.user_id LIKE :user_id`;
      replacements.user_id = `%${filter.user_id}%`;
    }

    // Complete the queries
    query += ` GROUP BY PEM.id`; // Only group by the primary key
    query += ` ORDER BY PEM.createdAt DESC`;
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
        .send({ success: true, message: "No users assigned!", data: [] });
    } else {
      return res.status(200).send({
        success: true,
        message: "Get all assigned users list successfully!",
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
    console.error("Error in getAllProjectsList:", error);
    res.status(500).send({ success: false, message: error.message });
  }
};

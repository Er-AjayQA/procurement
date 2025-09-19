// ========== REQUIRE STATEMENTS ========== //
const DB = require("../../../../config/index");

// ********************* TASK MANAGEMENT CONTROLLERS ********************* //
// ========== CREATE TASK CONTROLLER ========== //
module.exports.createTask = async (req, res) => {
  const transaction = await DB.sequelize.transaction();
  try {
    const data = req.body;
    const { project_id } = req.params;

    // Check if the project exist
    const checkIfProjectExist = await DB.tbl_project_management.findOne({
      where: { id: project_id, isDeleted: false },
    });

    if (!checkIfProjectExist) {
      await transaction.rollback();
      return res.status(404).send({
        success: false,
        message: "No such project found!",
      });
    } else {
      const createData = await DB.tbl_task_management.create(
        {
          project_id,
          entity_id: req?.entity_id,
          task_title: data?.task_title,
          task_description: data?.task_description,
          start_date: data?.start_date,
          end_date: data?.end_date,
          priority: data?.priority,
          severity: data?.severity,
          status: "Backlog",
        },
        { transaction }
      );

      await transaction.commit();

      return res.status(201).send({
        success: true,
        message: "Task added successfully!",
      });
    }
  } catch (error) {
    await transaction.rollback();
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE TASK CONTROLLER ========== //
module.exports.updateTask = async (req, res) => {
  const transaction = await DB.sequelize.transaction();
  try {
    const { project_id, id } = req.params;
    const data = req.body;

    // Check if the project exist
    const checkIfProjectExist = await DB.tbl_project_management.findOne({
      where: { id: project_id, isDeleted: false },
    });

    if (!checkIfProjectExist) {
      await transaction.rollback();
      return res.status(404).send({
        success: false,
        message: "No such project found!",
      });
    } else {
      // Check if Task Exist
      const checkTaskExist = await DB.tbl_task_management.findOne({
        where: {
          id,
          project_id,
          isDeleted: false,
        },
        transaction,
      });

      if (!checkTaskExist) {
        await transaction.rollback();
        return res.status(404).send({
          success: false,
          message: "Task not found!",
        });
      } else {
        const updateData = await checkTaskExist.update(data, {
          where: { id, project_id },
          transaction,
        });

        await transaction.commit();

        return res.status(201).send({
          success: true,
          message: "Task updated successfully!",
        });
      }
    }
  } catch (error) {
    await transaction.rollback();
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET TASK DETAILS CONTROLLER ========== //
module.exports.getTaskDetails = async (req, res) => {
  try {
    const { id } = req.params;

    let query = `
      SELECT 
        TM.*
      FROM TASK_MANAGEMENT AS TM
      WHERE TM.id= ${id} AND TM.isDeleted = false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(404)
        .send({ success: false, message: "Task not found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get task Data successfully!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL TASK DETAILS CONTROLLER ========== //
module.exports.getAllTasksDetails = async (req, res) => {
  try {
    const limit = parseInt(req.body.limit) || 10;
    const page = parseInt(req.body.page) || 1;
    const offset = (page - 1) * limit;
    const filter = req.body.filter || {};

    // Base queries
    let countQuery = `
      SELECT COUNT(*) as total 
      FROM TASK_MANAGEMENT AS TM
      WHERE TM.entity_id=${req?.selectedEntity} AND TM.isDeleted = false`;

    let query = `
      SELECT 
        TM.*
      FROM TASK_MANAGEMENT AS TM
      WHERE TM.entity_id=${req?.selectedEntity} AND TM.isDeleted = false`;

    // Prepare replacements object
    const replacements = {
      limit: limit,
      offset: offset,
    };

    // Add Project filter if provided
    if (filter?.project_id) {
      countQuery += ` AND TM.project_id = :project_id`;
      query += ` AND TM.project_id = :project_id`;
      replacements.project_id = filter.project_id;
    }

    // Add Priority filter if provided
    if (filter?.priority) {
      countQuery += ` AND TM.priority = :priority`;
      query += ` AND TM.priority = :priority`;
      replacements.priority = filter.priority;
    }

    // Add Severity filter if provided
    if (filter?.severity) {
      countQuery += ` AND TM.severity LIKE :severity`;
      query += ` AND TM.severity LIKE :severity`;
      replacements.severity = `%${filter.severity}%`;
    }

    // Add Status filter if provided
    if (filter?.status) {
      countQuery += ` AND TM.status LIKE :status`;
      query += ` AND TM.status LIKE :status`;
      replacements.status = `%${filter.status}%`;
    }

    // Complete the queries
    query += ` GROUP BY TM.id`; // Only group by the primary key
    query += ` ORDER BY TM.createdAt DESC`;
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
        .send({ success: true, message: "No tasks found!", data: [] });
    } else {
      return res.status(200).send({
        success: true,
        message: "Get all tasks list successfully!",
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
    console.error("Error in getAllTasksList:", error);
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== CHANGE TASK STATUS CONTROLLER ========== //
module.exports.updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // Check if Task Exist
    const isTaskExist = await DB.tbl_task_management.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isTaskExist) {
      return res
        .status(404)
        .send({ success: false, message: "Task not found!" });
    } else {
      const updateStatus = await isTaskExist.update({
        status: data?.status,
      });
      return res.status(201).send({
        success: true,
        message: `Status changed to ${data?.status} successfully!`,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== DELETE TASK CONTROLLER ========== //
module.exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Task Exist
    const isTaskExist = await DB.tbl_task_management.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isTaskExist) {
      return res
        .status(404)
        .send({ success: false, message: "Task not found!" });
    } else {
      await isTaskExist.update({
        isDeleted: true,
      });
      return res.status(201).send({
        success: true,
        message: "Task Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ********************* SUBTASK MANAGEMENT CONTROLLERS ********************* //
// ========== CREATE SUBTASK CONTROLLER ========== //
module.exports.createSubTask = async (req, res) => {
  const transaction = await DB.sequelize.transaction();
  try {
    const data = req.body;
    const { task_id } = req.params;

    // Check if the task exist
    const checkIfTaskExist = await DB.tbl_task_management.findOne({
      where: { id: task_id, isDeleted: false },
    });

    if (!checkIfTaskExist) {
      await transaction.rollback();
      return res.status(404).send({
        success: false,
        message: "No such task found!",
      });
    } else {
      const createData = await DB.tbl_subtask_management.create(
        {
          task_id,
          entity_id: req?.entity_id,
          subtask_title: data?.subtask_title,
          subtask_description: data?.subtask_description,
          start_date: data?.start_date,
          end_date: data?.end_date,
          priority: data?.priority,
          severity: data?.severity,
          status: "ToDo",
        },
        { transaction }
      );

      await transaction.commit();

      return res.status(201).send({
        success: true,
        message: "Subtask added successfully!",
      });
    }
  } catch (error) {
    await transaction.rollback();
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE SUBTASK CONTROLLER ========== //
module.exports.updateSubTask = async (req, res) => {
  const transaction = await DB.sequelize.transaction();
  try {
    const { task_id, id } = req.params;
    const data = req.body;

    // Check if the task exist
    const checkIfTaskExist = await DB.tbl_task_management.findOne({
      where: { id: task_id, isDeleted: false },
    });

    if (!checkIfTaskExist) {
      await transaction.rollback();
      return res.status(404).send({
        success: false,
        message: "No such task found!",
      });
    } else {
      // Check if SubTask Exist
      const checkSubtaskExist = await DB.tbl_subtask_management.findOne({
        where: {
          id,
          task_id,
          isDeleted: false,
        },
        transaction,
      });

      if (!checkSubtaskExist) {
        await transaction.rollback();
        return res.status(404).send({
          success: false,
          message: "Subtask not found!",
        });
      } else {
        const updateData = await checkSubtaskExist.update(data, {
          where: { id, task_id },
          transaction,
        });

        await transaction.commit();

        return res.status(201).send({
          success: true,
          message: "Subtask updated successfully!",
        });
      }
    }
  } catch (error) {
    await transaction.rollback();
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET SUBTASK DETAILS CONTROLLER ========== //
module.exports.getSubTaskDetails = async (req, res) => {
  try {
    const { id } = req.params;

    let query = `
      SELECT 
        STM.*
      FROM SUBTASK_MANAGEMENT AS STM
      WHERE STM.id= ${id} AND STM.isDeleted = false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(404)
        .send({ success: false, message: "Subtask not found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get subtask data successfully!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL SUBTASK DETAILS CONTROLLER ========== //
module.exports.getAllSubTasksDetails = async (req, res) => {
  try {
    const limit = parseInt(req.body.limit) || 10;
    const page = parseInt(req.body.page) || 1;
    const offset = (page - 1) * limit;
    const filter = req.body.filter || {};

    // Base queries
    let countQuery = `
      SELECT COUNT(*) as total 
      FROM SUBTASK_MANAGEMENT AS STM
      WHERE STM.entity_id=${req?.selectedEntity} AND STM.isDeleted = false`;

    let query = `
      SELECT 
        STM.*
      FROM SUBTASK_MANAGEMENT AS STM
      WHERE STM.entity_id=${req?.selectedEntity} AND STM.isDeleted = false`;

    // Prepare replacements object
    const replacements = {
      limit: limit,
      offset: offset,
    };

    // Add Task filter if provided
    if (filter?.task_id) {
      countQuery += ` AND STM.task_id = :task_id`;
      query += ` AND STM.task_id = :task_id`;
      replacements.task_id = filter.task_id;
    }

    // Add Priority filter if provided
    if (filter?.priority) {
      countQuery += ` AND STM.priority = :priority`;
      query += ` AND STM.priority = :priority`;
      replacements.priority = filter.priority;
    }

    // Add Severity filter if provided
    if (filter?.severity) {
      countQuery += ` AND STM.severity LIKE :severity`;
      query += ` AND STM.severity LIKE :severity`;
      replacements.severity = `%${filter.severity}%`;
    }

    // Add Status filter if provided
    if (filter?.status) {
      countQuery += ` AND STM.status LIKE :status`;
      query += ` AND STM.status LIKE :status`;
      replacements.status = `%${filter.status}%`;
    }

    // Complete the queries
    query += ` ORDER BY STM.createdAt DESC`;
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
        .send({ success: false, message: "No subtasks found!", data: [] });
    } else {
      return res.status(200).send({
        success: true,
        message: "Get all subtasks list successfully!",
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
    console.error("Error in getAllSubtasksList:", error);
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== CHANGE SUBTASK STATUS CONTROLLER ========== //
module.exports.updateSubTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // Check if Subtask Exist
    const isSubtaskExist = await DB.tbl_subtask_management.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isSubtaskExist) {
      return res
        .status(404)
        .send({ success: false, message: "Subtask not found!" });
    } else {
      const updateStatus = await isSubtaskExist.update({
        status: data?.status,
      });
      return res.status(201).send({
        success: true,
        message: `Status changed to ${data?.status} successfully!`,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== DELETE SUBTASK CONTROLLER ========== //
module.exports.deleteSubTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Subtask Exist
    const isSubtaskExist = await DB.tbl_subtask_management.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isSubtaskExist) {
      return res
        .status(404)
        .send({ success: false, message: "Subtask not found!" });
    } else {
      await isSubtaskExist.update({
        isDeleted: true,
      });
      return res.status(201).send({
        success: true,
        message: "Subtask Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

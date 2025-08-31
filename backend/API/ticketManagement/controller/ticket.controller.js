// ========== REQUIRE STATEMENTS ========== //
const DB = require("../../../config/index");

// ========== CREATE TICKET CONTROLLER ========== //
module.exports.createTicket = async (req, res) => {
  try {
    const data = req.body;

    // Check if Ticket already exist for user
    const isAlreadyExist = await DB.tbl_ticket_management.findOne({
      where: {
        created_by_user_id: data?.created_by_user_id,
        ticket_category_id: data?.ticket_category_id,
        created_for_dept_id: data?.created_for_dept_id,
        ticket_status: `OPEN`,
        isDeleted: false,
      },
    });

    if (isAlreadyExist) {
      return res.status(400).send({
        success: false,
        message:
          "Ticket for selected department with this category already exist!",
      });
    } else {
      const newData = await DB.tbl_ticket_management.create(data);

      await DB.tbl_ticket_history.create({
        current_status: "OPEN",
        action_taken:
          "Your ticket is received by concern department. Soon the issue will be resolved.",
        action_date: data?.acted_on || new Date(),
        ticket_id: newData?.id,
      });

      return res.status(200).send({
        success: true,
        message: "Ticket generated successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE TICKET CONTROLLER ========== //
module.exports.updateTicket = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    // Check if Data already exist
    const isDataExist = await DB.tbl_ticket_management.findOne({
      where: {
        id,
        ticket_status: "OPEN",
        isDeleted: false,
      },
    });

    if (!isDataExist) {
      return res
        .status(404)
        .send({ success: false, message: "Ticket not found!" });
    } else {
      const updateData = await isDataExist.update(data);

      const userData = await DB.tbl_user_master.findOne({
        where: { id: data?.created_by_user_id },
      });

      await DB.tbl_ticket_history.create({
        current_status: "OPEN",
        action_taken: `Ticket get updated by ${userData?.title} ${userData?.name}`,
        action_date: data?.acted_on || new Date(),
        ticket_id: isDataExist?.id,
      });

      return res.status(201).send({
        success: true,
        message: "Ticket updated successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== ALLOCATE TICKET CONTROLLER ========== //
module.exports.escalateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // Check if Data exist
    const isAlreadyExist = await DB.tbl_ticket_management.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isAlreadyExist) {
      return res.status(404).send({
        success: false,
        message: "Ticket not found!",
      });
    } else {
      const newData = await DB.tbl_ticket_allocation.create({
        approver_status: "PENDING",
        allocated_to_user_id: data?.allocated_to_user_id,
        ticket_id: id,
      });

      await DB.tbl_ticket_management.update(
        { ticket_status: "ESCALATED" },
        { where: { id } }
      );

      // Get User Assigned To User Details
      const userData = await DB.tbl_user_master.findOne({
        where: { id: data?.allocated_to_user_id },
      });

      await DB.tbl_ticket_history.create({
        current_status: "ESCALATED",
        action_taken: `Your ticket is assigned to ${userData?.title} ${userData?.name} successfully. Your issue will get resolved soon.`,
        action_date: data?.acted_on || new Date(),
        ticket_id: id,
        executive_name: `${userData?.title} ${userData?.name}`,
        executive_code: `${userData?.emp_code}`,
      });

      return res.status(201).send({
        success: true,
        message: "Ticket escalated successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET TICKET DETAILS CONTROLLER ========== //
module.exports.getTicketDetails = async (req, res) => {
  try {
    const { id } = req.params;

    let query = `
      SELECT 
        TM.*, TCM.ticket_category_name, TCM.ticket_category_code, TCM.ticket_category_priority, UM.emp_code as created_by_user_code, UM.title as created_by_userTitle, UM.name as created_by_userName, UUM.emp_code as created_for_user_code, UUM.title as created_for_userTitle, UUM.name as created_for_userName,
        DM.name as created_for_deptName, DM.dep_code as created_for_deptCode
    FROM TICKET_MANAGEMENT AS TM
    LEFT JOIN USER_MASTER AS UM ON UM.id=TM.created_by_user_id
    LEFT JOIN USER_MASTER AS UUM ON UUM.id=TM.user_id
    LEFT JOIN DEPARTMENT_MASTER AS DM ON DM.id=TM.created_for_dept_id
    LEFT JOIN TICKET_CATEGORY_MASTER AS TCM ON TCM.id=TM.ticket_category_id
    WHERE TM.id=${id} AND TM.isDeleted = false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(404)
        .send({ success: false, message: "Ticket Not Found!" });
    } else {
      const getDataWithHistory = await Promise.all(
        getAllData?.map(async (data) => {
          const ticketDetail = { ...data };

          try {
            const getHistoryData = await DB.tbl_ticket_history.findAll({
              where: { ticket_id: id },
            });

            ticketDetail.history_detail = getHistoryData;
          } catch (error) {
            console.error(
              `Error fetching history for ticket ${data.id}:`,
              error
            );
            ticketDetail.history_detail = [];
            ticketDetail.history_error = error.message;
          }

          return ticketDetail;
        })
      );

      return res.status(200).send({
        success: true,
        message: "Get ticket details successfully!",
        data: getDataWithHistory,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL TICKET DETAILS CONTROLLER ========== //
module.exports.getAllTicketDetails = async (req, res) => {
  try {
    const limit = parseInt(req.body.limit) || 10;
    const page = parseInt(req.body.page) || 1;
    const offset = (page - 1) * limit;
    const filter = req.body.filter || null;

    let countQuery = `
        SELECT COUNT(*) as total 
        FROM TICKET_MANAGEMENT AS TM
        WHERE TM.isDeleted = false`;

    let query = `
      SELECT 
        TM.*, TCM.ticket_category_name, TCM.ticket_category_code, TCM.ticket_category_priority, UM.emp_code as created_by_user_code, UM.title as created_by_userTitle, UM.name as created_by_userName, UUM.emp_code as created_for_user_code, UUM.title as created_for_userTitle, UUM.name as created_for_userName,
        DM.name as created_for_deptName, DM.dep_code as created_for_deptCode
    FROM TICKET_MANAGEMENT AS TM
    LEFT JOIN USER_MASTER AS UM ON UM.id=TM.created_by_user_id
    LEFT JOIN USER_MASTER AS UUM ON UUM.id=TM.user_id
    LEFT JOIN DEPARTMENT_MASTER AS DM ON DM.id=TM.created_for_dept_id
    LEFT JOIN TICKET_CATEGORY_MASTER AS TCM ON TCM.id=TM.ticket_category_id
    WHERE TM.isDeleted = false`;

    if (filter.created_by_user_id) {
      countQuery += ` AND TM.created_by_user_id LIKE :created_by_user_id`;
      query += ` AND TM.created_by_user_id LIKE :created_by_user_id`;
    }

    if (filter.created_for_dept_id) {
      countQuery += ` AND TM.created_for_dept_id LIKE :created_for_dept_id`;
      query += ` AND TM.created_for_dept_id LIKE :created_for_dept_id`;
    }

    if (filter.ticket_category_id) {
      countQuery += ` AND TM.ticket_category_id LIKE :ticket_category_id`;
      query += ` AND TM.ticket_category_id LIKE :ticket_category_id`;
    }

    query += ` ORDER BY TM.createdAt DESC`;
    query += ` LIMIT :limit OFFSET :offset`;

    // Get total count
    const totalResult = await DB.sequelize.query(countQuery, {
      replacements: {
        created_by_user_id: `${filter.created_by_user_id}`,
        created_for_dept_id: `${filter.created_for_dept_id}`,
        ticket_category_id: `${filter.ticket_category_id}`,
      },
      type: DB.sequelize.QueryTypes.SELECT,
    });
    const totalRecords = totalResult[0].total;
    const totalPages = Math.ceil(totalRecords / limit);

    let getAllData = await DB.sequelize.query(query, {
      replacements: {
        created_by_user_id: `${filter.created_by_user_id}`,
        created_for_dept_id: `${filter.created_for_dept_id}`,
        ticket_category_id: `${filter.ticket_category_id}`,
        limit,
        offset,
      },
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Tickets not found!" });
    } else {
      return res.status(200).send({
        success: true,
        message: "Get all tickets list!",
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

// ========== GET ALL TICKETS GENERATED BY USER DETAILS CONTROLLER ========== //
module.exports.getAllTicketsGeneratedByUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const limit = parseInt(req.body.limit) || 10;
    const page = parseInt(req.body.page) || 1;
    const offset = (page - 1) * limit;
    const filter = req.body.filter || null;

    let countQuery = `
        SELECT COUNT(*) as total 
        FROM TICKET_MANAGEMENT AS TM
        WHERE TM.created_by_user_id =${id} AND TM.isDeleted = false`;

    let query = `
      SELECT
        TM.*, TCM.ticket_category_name, TCM.ticket_category_code, TCM.ticket_category_priority, UM.emp_code as created_by_user_code, UM.title as created_by_userTitle, UM.name as created_by_userName, UUM.emp_code as created_for_user_code, UUM.title as created_for_userTitle, UUM.name as created_for_userName,
        DM.name as created_for_deptName, DM.dep_code as created_for_deptCode
    FROM TICKET_MANAGEMENT AS TM
    LEFT JOIN USER_MASTER AS UUM ON UUM.id=TM.user_id
    LEFT JOIN USER_MASTER AS UM ON UM.id=TM.created_by_user_id
    LEFT JOIN DEPARTMENT_MASTER AS DM ON DM.id=TM.created_for_dept_id
    LEFT JOIN TICKET_CATEGORY_MASTER AS TCM ON TCM.id=TM.ticket_category_id
    WHERE TM.created_by_user_id=${id} AND TM.isDeleted = false`;

    if (filter.created_for_dept_id) {
      countQuery += ` AND TM.created_for_dept_id LIKE :created_for_dept_id`;
      query += ` AND TM.created_for_dept_id LIKE :created_for_dept_id`;
    }

    if (filter.ticket_category_id) {
      countQuery += ` AND TM.ticket_category_id LIKE :ticket_category_id`;
      query += ` AND TM.ticket_category_id LIKE :ticket_category_id`;
    }

    query += ` ORDER BY TM.createdAt DESC`;
    query += ` LIMIT :limit OFFSET :offset`;

    // Get total count
    const totalResult = await DB.sequelize.query(countQuery, {
      replacements: {
        created_for_dept_id: `${filter.created_for_dept_id}`,
        ticket_category_id: `${filter.ticket_category_id}`,
      },
      type: DB.sequelize.QueryTypes.SELECT,
    });
    const totalRecords = totalResult[0].total;
    const totalPages = Math.ceil(totalRecords / limit);

    let getAllData = await DB.sequelize.query(query, {
      replacements: {
        created_for_dept_id: `${filter.created_for_dept_id}`,
        ticket_category_id: `${filter.ticket_category_id}`,
        limit,
        offset,
      },
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Tickets not found!" });
    } else {
      return res.status(200).send({
        success: true,
        message: "Get all tickets list!",
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

// ========== DELETE TICKET CONTROLLER ========== //
module.exports.deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Data already exist
    const isDataExist = await DB.tbl_employee_transfer.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isDataExist) {
      return res
        .status(400)
        .send({ success: false, message: "Transfer details not found!" });
    } else {
      await isDataExist.update({
        approval_status: "REJECTED",
        isDeleted: true,
      });

      await DB.tbl_employee_transfer_approval.destroy({
        where: { transfer_id: isDataExist?.id },
      });
      return res.status(200).send({
        success: true,
        message: "Transfer details deleted successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL TICKETS ALLOCATED TO USER CONTROLLER ========== //
module.exports.getAllTicketAllocatedToUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const limit = parseInt(req.body.limit) || 10;
    const page = parseInt(req.body.page) || 1;
    const offset = (page - 1) * limit;
    const filter = req.body.filter || null;

    let countQuery = `
        SELECT COUNT(*) as total 
        FROM TICKET_ALLOCATION AS TA
        WHERE TA.allocated_to_user_id= :id AND TA.isDeleted = false`;

    let query = `
      SELECT 
        TA.*, TM.*, TCM.*, AUM.emp_code as allocated_to_user_code, AUM.title as allocated_to_userTitle, AUM.name as allocated_to_userName,
        UM.emp_code as created_by_user_code, UM.title as created_by_userTitle, UM.name as created_by_userName, UUM.emp_code as created_for_user_code, UUM.title as created_for_userTitle, UUM.name as created_for_userName, DM.name as created_for_deptName, DM.dep_code as created_for_deptCode
    FROM TICKET_ALLOCATION AS TA
    LEFT JOIN TICKET_MANAGEMENT AS TM ON TM.id= TA.ticket_id
    LEFT JOIN USER_MASTER AS AUM ON AUM.id= TA.allocated_to_user_id
    LEFT JOIN USER_MASTER AS UM ON UM.id=TM.created_by_user_id
    LEFT JOIN USER_MASTER AS UUM ON UUM.id=TM.user_id
    LEFT JOIN DEPARTMENT_MASTER AS DM ON DM.id=TM.created_for_dept_id
    LEFT JOIN TICKET_CATEGORY_MASTER AS TCM ON TCM.id=TM.ticket_category_id
    WHERE TA.allocated_to_user_id= :id AND TA.isDeleted = false`;

    // Prepare replacements object
    const replacements = {
      id: `${id}`,
      limit,
      offset,
    };

    if (filter && filter.ticket_category_id) {
      countQuery += ` AND TM.ticket_category_id LIKE :ticket_category_id`;
      query += ` AND TM.ticket_category_id LIKE :ticket_category_id`;
      replacements.ticket_category_id = filter.ticket_category_id;
    }

    if (filter && filter.approver_status) {
      countQuery += ` AND TA.approver_status LIKE :approver_status`;
      query += ` AND TA.approver_status LIKE :approver_status`;
      replacements.approver_status = filter.approver_status;
    }

    query += ` ORDER BY TA.createdAt DESC`;
    query += ` LIMIT :limit OFFSET :offset`;

    // Get total count
    const totalResult = await DB.sequelize.query(countQuery, {
      replacements,
      type: DB.sequelize.QueryTypes.SELECT,
    });
    const totalRecords = totalResult[0].total;
    const totalPages = Math.ceil(totalRecords / limit);

    const getAllData = await DB.sequelize.query(query, {
      replacements,
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Tickets not found!" });
    } else {
      return res.status(200).send({
        success: true,
        message: "Get all tickets list!",
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
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== APPROVAL FOR TICKET CONTROLLER ========== //
module.exports.approvalForTicket = async (req, res) => {
  try {
    const data = req.body;
    const { id, user_id } = req.params;

    // Check if Data already exist
    const isDataExist = await DB.tbl_ticket_allocation.findOne({
      where: {
        id,
        approver_status: "OPEN",
        allocated_to_user_id: user_id,
        isDeleted: false,
      },
    });

    if (!isDataExist) {
      return res
        .status(404)
        .send({ success: false, message: "Tickets not found!" });
    } else {
      if (data?.approver_status === "CLOSE") {
        await DB.tbl_ticket_allocation.update(
          {
            approver_status: data?.approver_status,
            remark: data?.remark,
            acted_on: data?.acted_on || new Date(),
          },
          {
            where: { id: isDataExist?.id },
          }
        );

        await DB.tbl_ticket_management.update(
          {
            ticket_status: "CLOSE",
          },
          {
            where: {
              id: isDataExist?.ticket_id,
            },
          }
        );
      }

      if (data?.approver_status === "ESCALATED") {
        await DB.tbl_ticket_allocation.update(
          {
            approver_status: "ESCALATED",
            remark: data?.remark,
            acted_on: data?.acted_on || new Date(),
          },
          { where: { id, allocated_to_user_id: user_id } }
        );

        await DB.tbl_ticket_allocation.create({
          approver_status: "OPEN",
          allocated_to_user_id: data?.approver_id,
          ticket_id: isDataExist?.ticket_id,
        });
      }

      return res.status(200).send({
        success: true,
        message: "Status changed successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

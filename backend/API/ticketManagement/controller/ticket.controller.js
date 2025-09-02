// ========== REQUIRE STATEMENTS ========== //
const DB = require("../../../config/index");

// ========== CREATE TICKET CONTROLLER ========== //
module.exports.createTicket = async (req, res) => {
  const transaction = await DB.sequelize.transaction();
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
      transaction,
    });

    if (isAlreadyExist) {
      return res.status(400).send({
        success: false,
        message:
          "Ticket for selected department with this category already exist!",
      });
    } else {
      const newData = await DB.tbl_ticket_management.create(data, {
        transaction,
      });

      // Get Creator Details
      const getUserDetails = await DB.tbl_user_master.findOne({
        where: { id: data?.created_by_user_id },
        transaction,
      });

      if (!getUserDetails) {
        await transaction.rollback();
        return res.status(404).send({
          success: false,
          message: "User not found!",
        });
      }

      await DB.tbl_ticket_history.create(
        {
          current_status: "OPEN",
          action_taken:
            "A new ticket has been generated and is now in our queue.",
          action_date: data?.acted_on || new Date(),
          action_by: `${getUserDetails?.title} ${getUserDetails?.name}`,
          ticket_id: newData?.id,
        },
        { transaction }
      );

      await transaction.commit();

      return res.status(200).send({
        success: true,
        message: "Ticket generated successfully!",
      });
    }
  } catch (error) {
    await transaction.rollback();
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE TICKET CONTROLLER ========== //
module.exports.updateTicket = async (req, res) => {
  const transaction = await DB.sequelize.transaction();
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
      transaction,
    });

    if (!isDataExist) {
      await transaction.rollback();
      return res
        .status(404)
        .send({ success: false, message: "Ticket not found!" });
    } else {
      const updateData = await isDataExist.update(data, { transaction });

      const userData = await DB.tbl_user_master.findOne({
        where: { id: data?.created_by_user_id },
        transaction,
      });

      if (!userData) {
        await transaction.rollback();
        return res.status(404).send({
          success: false,
          message: "User not found!",
        });
      }

      await DB.tbl_ticket_history.create(
        {
          current_status: "OPEN",
          action_taken: `Ticket content is updated.`,
          action_date: data?.acted_on || new Date(),
          action_by: `${userData?.title} ${userData?.name}`,
          ticket_id: isDataExist?.id,
        },
        { transaction }
      );

      await transaction.commit();

      return res.status(201).send({
        success: true,
        message: "Ticket updated successfully!",
      });
    }
  } catch (error) {
    await transaction.rollback();
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== ALLOCATE TICKET CONTROLLER ========== //
module.exports.escalateTicket = async (req, res) => {
  const transaction = await DB.sequelize.transaction();
  try {
    const { id } = req.params;
    const data = req.body;

    // Check if Data exist
    const isAlreadyExist = await DB.tbl_ticket_management.findOne({
      where: {
        id,
        isDeleted: false,
      },
      transaction,
    });

    if (!isAlreadyExist) {
      await transaction.rollback();
      return res.status(404).send({
        success: false,
        message: "Ticket not found!",
      });
    } else {
      const getUserDetails = await DB.tbl_user_master.findOne({
        where: { id: data?.action_by_user_id },
        transaction,
      });

      if (!getUserDetails) {
        await transaction.rollback();
        return res.status(404).send({
          success: false,
          message: "User not found!",
        });
      }

      const newData = await DB.tbl_ticket_allocation.create(
        {
          approver_status: "PENDING",
          allocated_to_user_id: data?.allocated_to_user_id,
          ticket_id: id,
        },
        { transaction }
      );

      await DB.tbl_ticket_management.update(
        { ticket_status: data?.status },
        { where: { id }, transaction }
      );

      const getAllocatedUserDetails = await DB.tbl_user_master.findOne({
        where: { id: data?.allocated_to_user_id },
        transaction,
      });

      const messages = {
        ASSIGNED: `This ticket is assigned to ${getAllocatedUserDetails?.title} ${getAllocatedUserDetails?.name} successfully. Issue will get resolved soon.`,
        PICK: `Good news!, Ticket has been picked up by one of our support agents and is now being worked on.`,
        ESCALATED: `This is an update regarding the ticket. To ensure that issue receives the specialized attention it requires, we have escalated the issue to a senior specialist on our team. This is a standard process to provide you with the most effective solution.`,
        CLOSE: `This is an update regarding the ticket. The issue is been successfully resolved.`,
      };

      await DB.tbl_ticket_history.create(
        {
          current_status: data?.status,
          action_taken: messages[data?.status],
          action_date: data?.acted_on || new Date(),
          action_by: `${getUserDetails?.title} ${getUserDetails?.name}`,
          ticket_id: id,
          executive_code: `${getUserDetails?.emp_code}`,
        },
        { transaction }
      );

      await transaction.commit();

      const responseMessages = {
        ASSIGNED: "Ticket Assigned successfully!",
        PICK: "Ticket Picked successfully!",
        ESCALATED: "Ticket escalated successfully!",
      };

      return res.status(201).send({
        success: true,
        message: responseMessages[data?.status],
      });
    }
  } catch (error) {
    await transaction.rollback();
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
              order: [["createdAt", "DESC"]],
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

    if (filter.ticket_status) {
      countQuery += ` AND TM.ticket_status LIKE :ticket_status`;
      query += ` AND TM.ticket_status LIKE :ticket_status`;
    }

    query += ` ORDER BY TM.createdAt DESC`;
    query += ` LIMIT :limit OFFSET :offset`;

    // Get total count
    const totalResult = await DB.sequelize.query(countQuery, {
      replacements: {
        created_by_user_id: `${filter.created_by_user_id}`,
        created_for_dept_id: `${filter.created_for_dept_id}`,
        ticket_category_id: `${filter.ticket_category_id}`,
        ticket_status: `${filter.ticket_status}`,
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
        ticket_status: `${filter.ticket_status}`,
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
        TA.id as approval_id, TA.approver_status,  TA.ticket_id, TA.allocated_to_user_id as current_allocated_user_id, TM.ticket_subject, TM.ticket_description, TM.ticket_status, TM.ticket_type, TM.ticket_priority, TCM.id as ticket_category_id, TCM.ticket_category_name, TCM.ticket_category_code, TCM.ticket_category_priority, AUM.emp_code as allocated_to_user_code, AUM.title as allocated_to_userTitle, AUM.name as allocated_to_userName,UM.emp_code as created_by_user_code, UM.title as created_by_userTitle, UM.name as created_by_userName, UUM.emp_code as created_for_user_code, UUM.title as created_for_userTitle, UUM.name as created_for_userName, DM.name as created_for_deptName, DM.dep_code as created_for_deptCode
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

    // if (filter && filter.approver_status) {
    //   countQuery += ` AND TA.approver_status LIKE :approver_status`;
    //   query += ` AND TA.approver_status LIKE :approver_status`;
    //   replacements.approver_status = filter.approver_status;
    // }

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
  const transaction = await DB.sequelize.transaction();
  try {
    const data = req.body;
    const { id, user_id } = req.params;

    // Validate required fields
    if (!data.approver_status) {
      await transaction.rollback();
      return res.status(400).send({
        success: false,
        message: "approver_status is required!",
      });
    }

    // Check if Data already exist
    const isDataExist = await DB.tbl_ticket_allocation.findOne({
      where: {
        id,
        approver_status: "PENDING",
        allocated_to_user_id: user_id,
        isDeleted: false,
      },
      transaction,
    });

    if (!isDataExist) {
      await transaction.rollback();
      return res
        .status(404)
        .send({ success: false, message: "Tickets not found!" });
    }

    const getAllocatedUserDetail = await DB.tbl_user_master.findOne({
      where: { id: user_id },
      transaction,
    });

    if (!getAllocatedUserDetail) {
      await transaction.rollback();
      return res
        .status(404)
        .send({ success: false, message: "User not found!" });
    }

    if (data.approver_status === "CLOSE") {
      await DB.tbl_ticket_allocation.update(
        {
          approver_status: data.approver_status,
          remark: data.remark,
          acted_on: data.acted_on || new Date(),
          action_by: `${getAllocatedUserDetail.title} ${getAllocatedUserDetail.name}`,
        },
        {
          where: { id: isDataExist.id },
          transaction,
        }
      );

      await DB.tbl_ticket_management.update(
        {
          ticket_status: "CLOSE",
        },
        {
          where: {
            id: isDataExist.ticket_id,
          },
          transaction,
        }
      );

      await DB.tbl_ticket_history.create(
        {
          action_by: `${getAllocatedUserDetail.title} ${getAllocatedUserDetail.name}`,
          executive_code: `${getAllocatedUserDetail.emp_code}`,
          current_status: "CLOSE",
          action_taken:
            "The issue is resolved by the executive, that's why ticket is been closed. If you have any other issue then you can raise tickets. Nice to assist you!",
          executive_remark: data.remark,
          action_date: data.acted_on || new Date(),
          ticket_id: isDataExist.ticket_id,
        },
        { transaction }
      );
    } else if (data.approver_status === "ESCALATED") {
      // Validate required field for escalation
      if (!data.allocated_to_user_id) {
        await transaction.rollback();
        return res.status(400).send({
          success: false,
          message: "allocated_to_user_id is required for escalation!",
        });
      }

      await DB.tbl_ticket_allocation.update(
        {
          approver_status: "ESCALATED",
          remark: data.remark,
          acted_on: data.acted_on || new Date(),
        },
        {
          where: { id: isDataExist.id },
          transaction,
        }
      );

      await DB.tbl_ticket_allocation.create(
        {
          approver_status: "PENDING",
          allocated_to_user_id: data.allocated_to_user_id,
          ticket_id: isDataExist.ticket_id,
        },
        { transaction }
      );

      await DB.tbl_ticket_management.update(
        {
          ticket_status: "ESCALATED",
        },
        {
          where: {
            id: isDataExist.ticket_id,
          },
          transaction,
        }
      );

      await DB.tbl_ticket_history.create(
        {
          action_by: `${getAllocatedUserDetail.title} ${getAllocatedUserDetail.name}`,
          executive_code: `${getAllocatedUserDetail.emp_code}`,
          current_status: "ESCALATED",
          action_taken: `This is an update regarding the ticket. To ensure that issue receives the specialized attention it requires, we have escalated the issue to a senior specialist on our team. This is a standard process to provide you with the most effective solution.`,
          executive_remark: data.remark,
          action_date: data.acted_on || new Date(),
          ticket_id: isDataExist.ticket_id,
        },
        { transaction }
      );
    } else {
      await transaction.rollback();
      return res.status(400).send({
        success: false,
        message: "Invalid approver_status value!",
      });
    }

    await transaction.commit();
    return res.status(200).send({
      success: true,
      message: "Status changed successfully!",
    });
  } catch (error) {
    await transaction.rollback();
    console.error("Approval error:", error);
    res.status(500).send({ success: false, message: error.message });
  }
};

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
    const isDataExist = await DB.tbl_employee_transfer.findOne({
      where: {
        id,
        approval_status: "PENDING" || "DRAFT",
        isDeleted: false,
      },
    });

    if (!isDataExist) {
      return res
        .status(400)
        .send({ success: false, message: "Transfer details not found!" });
    } else {
      const duplicateData = await DB.tbl_employee_transfer.findOne({
        where: {
          id: { [DB.Sequelize.Op.ne]: id },
          requested_for_user_id: data.requested_for_user_id,
          approval_status: "PENDING" | "DRAFT",
          isDeleted: false,
        },
      });

      if (duplicateData) {
        return res.status(409).send({
          success: false,
          message: "Transfer request for selected employee already generated!",
        });
      } else {
        const updateData = await isDataExist.update(data);
        return res.status(200).send({
          success: true,
          message: "Transfer request updated successfully!",
          data: updateData,
        });
      }
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
        allocated_to_user_id: data?.approver_id,
        ticket_id: id,
      });

      await DB.tbl_ticket_management.update(
        { ticket_status: "ESCALATED" },
        { where: { id } }
      );

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

    const query = `
    SELECT 
        ET.*, 
        FRM.name as from_role, 
        TRM.name as to_role, 
        FDM.name as from_department, 
        TDM.name as to_department,
        FDEM.name as from_designation, 
        TDEM.name as to_designation, 
        FBM.name as from_branch, 
        TBM.name as to_branch,
        TT.transfer_type, 
        TR.reason_type, 
        UM.id as request_by_user_id, 
        UM.name as requested_by_user, 
        RUM.id as report_to_manager_id,
        RUM.name as report_to_manager, 
        RQUM.id as requested_for_user_id, 
        RQUM.name as requested_for_user_name,
        CRUM.id as current_reporting_manager_id,
        CRUM.title as current_reporting_manager_title,
        CRUM.name as current_reporting_manager
    FROM EMPLOYEE_TRANSFER AS ET
    LEFT JOIN ROLE_MASTER AS FRM ON FRM.id = ET.from_role_id
    LEFT JOIN ROLE_MASTER AS TRM ON TRM.id = ET.to_role_id
    LEFT JOIN DEPARTMENT_MASTER AS FDM ON FDM.id = ET.from_dept_id
    LEFT JOIN DEPARTMENT_MASTER AS TDM ON TDM.id = ET.to_dept_id
    LEFT JOIN DESIGNATION_MASTER AS FDEM ON FDEM.id = ET.from_desig_id
    LEFT JOIN DESIGNATION_MASTER AS TDEM ON TDEM.id = ET.to_desig_id
    LEFT JOIN BRANCH_MASTER AS FBM ON FBM.id = ET.from_branch_id
    LEFT JOIN BRANCH_MASTER AS TBM ON TBM.id = ET.to_branch_id
    LEFT JOIN TRANSFER_TYPE_MASTER AS TT ON TT.id = ET.transfer_type_id
    LEFT JOIN TRANSFER_REASON_MASTER AS TR ON TR.id = ET.transfer_reason_id
    LEFT JOIN USER_MASTER AS RQUM ON RQUM.id = ET.requested_for_user_id
    LEFT JOIN USER_MASTER AS UM ON UM.id = ET.requested_by_user_id
    LEFT JOIN USER_MASTER AS RUM ON RUM.id = ET.report_to_user_id
    LEFT JOIN USER_MASTER AS CRUM ON CRUM.id = ET.current_report_to_user_id
    WHERE ET.id = ${id} AND ET.isDeleted = false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Transfer Request Not Found!" });
    } else {
      const getDataWithWorkflow = await Promise.all(
        getAllData?.map(async (data) => {
          const transferDetail = { ...data };

          try {
            const getWorkflowData =
              await DB.tbl_employee_transfer_approval.findAll({
                where: { transfer_id: data?.id },
                include: [
                  {
                    model: DB.tbl_user_master,
                    attributes: ["id", "title", "name", "emp_code"],
                  },
                ],
              });

            transferDetail.workflow_detail = getWorkflowData;
          } catch (error) {
            console.error(
              `Error fetching workflow for transfer ${data.id}:`,
              error
            );
            transferDetail.workflow_Details = [];
            transferDetail.workflow_error = error.message;
          }

          return transferDetail;
        })
      );

      return res.status(200).send({
        success: true,
        message: "Get transfer details successfully!",
        data: getDataWithWorkflow,
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
        TM.*, TCM.*, UM.emp_code as created_by_user_code, UM.title as created_by_userTitle, UM.name as created_by_userName,
        DM.name as created_for_deptName, DM.dep_code as created_for_deptCode
    FROM TICKET_MANAGEMENT AS TM
    LEFT JOIN USER_MASTER AS UM ON UM.id=TM.created_by_user_id
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
        TM.*, TCM.*, UM.emp_code as created_by_user_code, UM.title as created_by_userTitle, UM.name as created_by_userName,
        DM.name as created_for_deptName, DM.dep_code as created_for_deptCode
    FROM TICKET_MANAGEMENT AS TM
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
        UM.emp_code as created_by_user_code, UM.title as created_by_userTitle, UM.name as created_by_userName, DM.name as created_for_deptName, DM.dep_code as created_for_deptCode
    FROM TICKET_ALLOCATION AS TA
    LEFT JOIN TICKET_MANAGEMENT AS TM ON TM.id= TA.ticket_id
    LEFT JOIN USER_MASTER AS AUM ON AUM.id= TA.allocated_to_user_id
    LEFT JOIN USER_MASTER AS UM ON UM.id=TM.created_by_user_id
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

// ========== REQUIRE STATEMENTS ========== //
const DB = require("../../../../config/index");

// ========== CREATE TRANSFER CONTROLLER ========== //
module.exports.createTransfer = async (req, res) => {
  try {
    const data = req.body;

    // Check if transfer already exist for user
    const isAlreadyExist = await DB.tbl_employee_transfer.findOne({
      where: {
        requested_for_user_id: data.requested_for_user_id,
        approval_status: `PENDING`,
        isDeleted: false,
      },
    });

    if (isAlreadyExist) {
      return res.status(400).send({
        success: false,
        message: "Transfer for this employee already generated!",
      });
    } else {
      const newData = await DB.tbl_employee_transfer.create(data);

      // Creating Approval Details
      if (data.approvers_list && data.approvers_list.length > 0) {
        await DB.tbl_employee_transfer_approval.bulkCreate(
          data.approvers_list.map((approver, index) => ({
            transfer_id: newData?.id,
            approval_level: `${index + 1}`,
            approver_id: approver?.value,
            approver_status: "PENDING",
          }))
        );
      }

      return res.status(200).send({
        success: true,
        message: "Transfer request generated successfully!",
        data: newData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE TRANSFER CONTROLLER ========== //
module.exports.updateTransfer = async (req, res) => {
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

// ========== GET TRANSFER DETAILS CONTROLLER ========== //
module.exports.getTransferDetails = async (req, res) => {
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

// ========== GET ALL TRANSFER DETAILS CONTROLLER ========== //
module.exports.getAllTransferDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const limit = parseInt(req.body.limit) || 10;
    const page = parseInt(req.body.page) || 1;
    const offset = (page - 1) * limit;
    const filter = req.body.filter || null;

    let countQuery = `
        SELECT COUNT(*) as total 
        FROM EMPLOYEE_TRANSFER AS ET 
        WHERE ET.requested_by_user_id =${id} AND ET.isDeleted = false`;

    let query = `
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
        UM.title as request_by_user_title, 
        UM.name as requested_by_user, 
        RUM.id as report_to_manager_id,
        RUM.title as report_to_manager_title,
        RUM.name as report_to_manager, 
        RQUM.id as requested_for_user_id,
        RQUM.title as requested_for_user_title, 
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
    WHERE ET.requested_by_user_id=${id} AND ET.isDeleted = false`;

    if (filter.requested_for_user_id) {
      countQuery += ` AND ET.requested_for_user_id LIKE :requested_for_user_id`;
      query += ` AND ET.requested_for_user_id LIKE :requested_for_user_id`;
    }

    if (filter.from_branch_id) {
      countQuery += ` AND ET.from_branch_id LIKE :from_branch_id`;
      query += ` AND ET.from_branch_id LIKE :from_branch_id`;
    }

    query += ` ORDER BY ET.createdAt DESC`;
    query += ` LIMIT :limit OFFSET :offset`;

    // Get total count
    const totalResult = await DB.sequelize.query(countQuery, {
      replacements: {
        requested_for_user_id: `${filter.requested_for_user_id}`,
        from_branch_id: `${filter.from_branch_id}`,
      },
      type: DB.sequelize.QueryTypes.SELECT,
    });
    const totalRecords = totalResult[0].total;
    const totalPages = Math.ceil(totalRecords / limit);

    let getAllData = await DB.sequelize.query(query, {
      replacements: {
        requested_for_user_id: `${filter.requested_for_user_id}`,
        from_branch_id: `${filter.from_branch_id}`,
        limit,
        offset,
      },
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Transfer requests not found!" });
    } else {
      const dataWithWorkflow = await Promise.all(
        getAllData.map(async (data) => {
          const transferDetails = { ...data };

          try {
            const getWorkflowData =
              await DB.tbl_employee_transfer_approval.findAll({
                where: { transfer_id: data.id, isDeleted: false },
                include: [
                  {
                    model: DB.tbl_user_master,
                    attributes: ["id", "title", "name", "emp_code"],
                  },
                ],
              });

            transferDetails.workflow_Details = getWorkflowData;
          } catch (error) {
            console.error(
              `Error fetching workflow for transfer ${data.id}:`,
              error
            );
            transferDetails.workflow_Details = [];
            transferDetails.workflow_error = error.message;
          }

          return transferDetails;
        })
      );
      return res.status(200).send({
        success: true,
        message: "Get all transfers list!",
        data: dataWithWorkflow,
        pagination: {
          currentPage: page,
          itemsPerPage: limit,
          totalItems: dataWithWorkflow.length,
          totalPages: totalPages,
        },
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== DELETE TRANSFER CONTROLLER ========== //
module.exports.deleteTransfer = async (req, res) => {
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

// ========== GET ALL TRANSFER PENDING BY USER DETAILS CONTROLLER ========== //
module.exports.getAllTransferPendingByUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const limit = parseInt(req.body.limit) || 10;
    const page = parseInt(req.body.page) || 1;
    const offset = (page - 1) * limit;
    const filter = req.body.filter || null;

    let countQuery = `
        SELECT COUNT(*) as total 
        FROM EMPLOYEE_TRANSFER_APPROVAL AS ETA 
        INNER JOIN EMPLOYEE_TRANSFER AS ET ON ET.id = ETA.transfer_id
        WHERE ETA.isDeleted = false 
        AND ETA.approver_id = :id
        AND ET.approval_status != 'REJECTED'`;

    let query = `
      SELECT 
        ETA.*, 
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
        UM.title as request_by_user_title, 
        UM.name as requested_by_user, 
        RUM.id as report_to_manager_id,
        RUM.title as report_to_manager_title,
        RUM.name as report_to_manager, 
        RQUM.id as requested_for_user_id,
        RQUM.title as requested_for_user_title, 
        RQUM.name as requested_for_user_name,
        CRUM.id as current_reporting_manager_id,
        CRUM.title as current_reporting_manager_title,
        CRUM.name as current_reporting_manager
    FROM EMPLOYEE_TRANSFER_APPROVAL AS ETA
    LEFT JOIN EMPLOYEE_TRANSFER AS ET ON ET.id = ETA.transfer_id
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
    WHERE ETA.approver_id = :id 
    AND ETA.isDeleted = false
    AND ET.approval_status != 'REJECTED'`;

    // Additional check to exclude transfers with any previous rejection
    query += ` AND NOT EXISTS (
      SELECT 1 FROM EMPLOYEE_TRANSFER_APPROVAL AS ETA_REJECTED
      WHERE ETA_REJECTED.transfer_id = ET.id
      AND ETA_REJECTED.approver_status = 'REJECTED'
      AND ETA_REJECTED.isDeleted = false
      AND ETA_REJECTED.approval_level < ETA.approval_level
    )`;

    countQuery += ` AND NOT EXISTS (
      SELECT 1 FROM EMPLOYEE_TRANSFER_APPROVAL AS ETA_REJECTED
      WHERE ETA_REJECTED.transfer_id = ET.id
      AND ETA_REJECTED.approver_status = 'REJECTED'
      AND ETA_REJECTED.isDeleted = false
      AND ETA_REJECTED.approval_level < ETA.approval_level
    )`;

    query += ` AND ETA.approval_level = (
      SELECT MIN(ETA2.approval_level) 
      FROM EMPLOYEE_TRANSFER_APPROVAL AS ETA2 
      WHERE ETA2.transfer_id = ET.id 
      AND ETA2.approver_status = 'PENDING'
      AND ETA2.isDeleted = false
    )`;

    countQuery += ` AND ETA.approval_level = (
      SELECT MIN(ETA2.approval_level) 
      FROM EMPLOYEE_TRANSFER_APPROVAL AS ETA2 
      WHERE ETA2.transfer_id = ET.id 
      AND ETA2.approver_status = 'PENDING'
      AND ETA2.isDeleted = false
    )`;

    // Prepare replacements object
    const replacements = {
      id: `${id}`,
      limit,
      offset,
    };

    if (filter && filter.requested_for_user_id) {
      countQuery += ` AND ET.requested_for_user_id LIKE :requested_for_user_id`;
      query += ` AND ET.requested_for_user_id LIKE :requested_for_user_id`;
      replacements.requested_for_user_id = filter.requested_for_user_id;
    }

    if (filter && filter.from_branch_id) {
      countQuery += ` AND ET.from_branch_id LIKE :from_branch_id`;
      query += ` AND ET.from_branch_id LIKE :from_branch_id`;
      replacements.from_branch_id = filter.from_branch_id;
    }

    if (filter && filter.approver_status) {
      countQuery += ` AND ETA.approver_status LIKE :approver_status`;
      query += ` AND ETA.approver_status LIKE :approver_status`;
      replacements.approver_status = filter.approver_status;
    }

    query += ` ORDER BY ETA.createdAt DESC`;
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
        .send({ success: false, message: "Transfer requests not found!" });
    } else {
      const dataWithWorkflow = await Promise.all(
        getAllData.map(async (data) => {
          const transferDetails = { ...data };

          try {
            const getWorkflowData =
              await DB.tbl_employee_transfer_approval.findAll({
                where: { transfer_id: data.id, isDeleted: false },
                include: [
                  {
                    model: DB.tbl_user_master,
                    attributes: ["id", "title", "name", "emp_code"],
                  },
                ],
                order: [["approval_level", "ASC"]], // Order by approval level
              });

            transferDetails.workflow_Details = getWorkflowData;
          } catch (error) {
            console.error(
              `Error fetching workflow for transfer ${data.id}:`,
              error
            );
            transferDetails.workflow_Details = [];
            transferDetails.workflow_error = error.message;
          }

          return transferDetails;
        })
      );

      return res.status(200).send({
        success: true,
        message: "Get all transfers list!",
        data: dataWithWorkflow,
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

// ========== GET ALL TRANSFER APPROVED BY USER DETAILS CONTROLLER ========== //
module.exports.getAllTransferApprovedByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const limit = parseInt(req.body.limit) || 10;
    const page = parseInt(req.body.page) || 1;
    const offset = (page - 1) * limit;
    const filter = req.body.filter || null;

    let countQuery = `
        SELECT COUNT(*) as total 
        FROM EMPLOYEE_TRANSFER_APPROVAL AS ETA 
        INNER JOIN EMPLOYEE_TRANSFER AS ET ON ET.id = ETA.transfer_id
        WHERE ETA.isDeleted = false AND ETA.approver_id = :id`;

    let query = `
      SELECT 
        ETA.*, 
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
        UM.title as request_by_user_title, 
        UM.name as requested_by_user, 
        RUM.id as report_to_manager_id,
        RUM.title as report_to_manager_title,
        RUM.name as report_to_manager, 
        RQUM.id as requested_for_user_id,
        RQUM.title as requested_for_user_title, 
        RQUM.name as requested_for_user_name,
        CRUM.id as current_reporting_manager_id,
        CRUM.title as current_reporting_manager_title,
        CRUM.name as current_reporting_manager
    FROM EMPLOYEE_TRANSFER_APPROVAL AS ETA
    LEFT JOIN EMPLOYEE_TRANSFER AS ET ON ET.id = ETA.transfer_id
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
    WHERE ETA.approver_id = :id AND ETA.isDeleted = false`;

    // Prepare replacements object
    const replacements = {
      id: `${id}`,
      limit,
      offset,
    };

    if (filter && filter.requested_for_user_id) {
      countQuery += ` AND ET.requested_for_user_id LIKE :requested_for_user_id`;
      query += ` AND ET.requested_for_user_id LIKE :requested_for_user_id`;
      replacements.requested_for_user_id = filter.requested_for_user_id;
    }

    if (filter && filter.from_branch_id) {
      countQuery += ` AND ET.from_branch_id LIKE :from_branch_id`;
      query += ` AND ET.from_branch_id LIKE :from_branch_id`;
      replacements.from_branch_id = filter.from_branch_id;
    }

    if (filter && filter.approver_status) {
      countQuery += ` AND ETA.approver_status LIKE :approver_status`;
      query += ` AND ETA.approver_status LIKE :approver_status`;
      replacements.approver_status = filter.approver_status;
    }

    query += ` ORDER BY ETA.createdAt DESC`;
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
        .send({ success: false, message: "Transfer requests not found!" });
    } else {
      const dataWithWorkflow = await Promise.all(
        getAllData.map(async (data) => {
          const transferDetails = { ...data };

          try {
            const getWorkflowData =
              await DB.tbl_employee_transfer_approval.findAll({
                where: { transfer_id: data.id, isDeleted: false },
                include: [
                  {
                    model: DB.tbl_user_master,
                    attributes: ["id", "title", "name", "emp_code"],
                  },
                ],
                order: [["approval_level", "ASC"]], // Order by approval level
              });

            transferDetails.workflow_Details = getWorkflowData;
          } catch (error) {
            console.error(
              `Error fetching workflow for transfer ${data.id}:`,
              error
            );
            transferDetails.workflow_Details = [];
            transferDetails.workflow_error = error.message;
          }

          return transferDetails;
        })
      );

      return res.status(200).send({
        success: true,
        message: "Get all transfers list!",
        data: dataWithWorkflow,
        pagination: {
          currentPage: page,
          itemsPerPage: limit,
          totalItems: totalRecords, // Use totalRecords instead of dataWithWorkflow.length
          totalPages: totalPages,
        },
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL TRANSFER REJECTED BY USER DETAILS CONTROLLER ========== //
module.exports.getAllTransferRejectedByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const limit = parseInt(req.body.limit) || 10;
    const page = parseInt(req.body.page) || 1;
    const offset = (page - 1) * limit;
    const filter = req.body.filter || null;

    let countQuery = `
        SELECT COUNT(*) as total 
        FROM EMPLOYEE_TRANSFER_APPROVAL AS ETA 
        INNER JOIN EMPLOYEE_TRANSFER AS ET ON ET.id = ETA.transfer_id
        WHERE ETA.isDeleted = false AND ETA.approver_id = :id`;

    let query = `
      SELECT 
        ETA.*, 
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
        UM.title as request_by_user_title, 
        UM.name as requested_by_user, 
        RUM.id as report_to_manager_id,
        RUM.title as report_to_manager_title,
        RUM.name as report_to_manager, 
        RQUM.id as requested_for_user_id,
        RQUM.title as requested_for_user_title, 
        RQUM.name as requested_for_user_name,
        CRUM.id as current_reporting_manager_id,
        CRUM.title as current_reporting_manager_title,
        CRUM.name as current_reporting_manager
    FROM EMPLOYEE_TRANSFER_APPROVAL AS ETA
    LEFT JOIN EMPLOYEE_TRANSFER AS ET ON ET.id = ETA.transfer_id
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
    WHERE ETA.approver_id = :id AND ETA.isDeleted = false`;

    // Prepare replacements object
    const replacements = {
      id: `${id}`,
      limit,
      offset,
    };

    if (filter && filter.requested_for_user_id) {
      countQuery += ` AND ET.requested_for_user_id LIKE :requested_for_user_id`;
      query += ` AND ET.requested_for_user_id LIKE :requested_for_user_id`;
      replacements.requested_for_user_id = filter.requested_for_user_id;
    }

    if (filter && filter.from_branch_id) {
      countQuery += ` AND ET.from_branch_id LIKE :from_branch_id`;
      query += ` AND ET.from_branch_id LIKE :from_branch_id`;
      replacements.from_branch_id = filter.from_branch_id;
    }

    if (filter && filter.approver_status) {
      countQuery += ` AND ETA.approver_status LIKE :approver_status`;
      query += ` AND ETA.approver_status LIKE :approver_status`;
      replacements.approver_status = filter.approver_status;
    }

    query += ` ORDER BY ETA.createdAt DESC`;
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
        .send({ success: false, message: "Transfer requests not found!" });
    } else {
      const dataWithWorkflow = await Promise.all(
        getAllData.map(async (data) => {
          const transferDetails = { ...data };

          try {
            const getWorkflowData =
              await DB.tbl_employee_transfer_approval.findAll({
                where: { transfer_id: data.id, isDeleted: false },
                include: [
                  {
                    model: DB.tbl_user_master,
                    attributes: ["id", "title", "name", "emp_code"],
                  },
                ],
                order: [["approval_level", "ASC"]], // Order by approval level
              });

            transferDetails.workflow_Details = getWorkflowData;
          } catch (error) {
            console.error(
              `Error fetching workflow for transfer ${data.id}:`,
              error
            );
            transferDetails.workflow_Details = [];
            transferDetails.workflow_error = error.message;
          }

          return transferDetails;
        })
      );

      return res.status(200).send({
        success: true,
        message: "Get all transfers list!",
        data: dataWithWorkflow,
        pagination: {
          currentPage: page,
          itemsPerPage: limit,
          totalItems: totalRecords, // Use totalRecords instead of dataWithWorkflow.length
          totalPages: totalPages,
        },
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== APPROVAL FOR TRANSFER CONTROLLER ========== //
module.exports.approvalForTransfer = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    // Check if Data already exist
    const isDataExist = await DB.tbl_employee_transfer_approval.findOne({
      where: {
        transfer_id: id,
        approver_status: "PENDING",
        approver_id: data?.user_id,
        isDeleted: false,
      },
    });

    if (!isDataExist) {
      return res
        .status(400)
        .send({ success: false, message: "Transfer details not found!" });
    } else {
      // Get Total Number of Workflow Levels
      const totalWorkflowLevels = await DB.tbl_employee_transfer_approval.count(
        {
          where: { transfer_id: isDataExist?.transfer_id },
        }
      );

      if (data?.approver_status === "REJECTED") {
        await DB.tbl_employee_transfer_approval.update(
          {
            approver_status: data?.approver_status,
            comments: data?.comments,
            acted_on: data?.acted_on || new Date(),
          },
          {
            where: { id: isDataExist?.id },
          }
        );

        await DB.tbl_employee_transfer.update(
          {
            approval_status: "REJECTED",
          },
          {
            where: {
              id: isDataExist.transfer_id,
            },
          }
        );
      }

      if (data?.approver_status === "APPROVED") {
        if (isDataExist.approval_level === totalWorkflowLevels) {
          await DB.tbl_employee_transfer_approval.update(
            {
              approver_status: data?.approver_status,
              comments: data?.comments,
              acted_on: data?.acted_on || new Date(),
            },
            { where: { id: isDataExist?.id } }
          );

          await DB.tbl_employee_transfer.update(
            { approval_status: data?.approver_status },
            { where: { id: isDataExist?.transfer_id } }
          );
        } else {
          await DB.tbl_employee_transfer_approval.update(
            {
              approver_status: data?.approver_status,
              comments: data?.comments,
              acted_on: data?.acted_on || new Date(),
            },
            { where: { id: isDataExist?.id } }
          );
        }
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

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
        approval_status: `PENDING` || `DRAFT`,
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
        RQUM.name as requested_for_user_name
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
    WHERE ET.id = ${id} AND ET.isDeleted = false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Allowance Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        message: "Get transfer details successfully!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL TRANSFER DETAILS CONTROLLER ========== //
module.exports.getAllTransferDetails = async (req, res) => {
  try {
    const limit = parseInt(req.body.limit) || 10;
    const page = parseInt(req.body.page) || 1;
    const offset = (page - 1) * limit;
    const filter = req.body.filter || null;

    let countQuery = `
        SELECT COUNT(*) as total 
        FROM EMPLOYEE_TRANSFER AS ET 
        WHERE ET.isDeleted = false`;

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
        RQUM.emp_code as requested_for_user_code,
        RQUM.name as requested_for_user_name
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
    WHERE ET.isDeleted = false`;

    if (filter.requested_for_user_id) {
      countQuery += ` AND ET.requested_for_user_id LIKE :requested_for_user_id`;
      query += ` AND ET.requested_for_user_id LIKE :requested_for_user_id`;
    }

    if (filter.from_dept_id) {
      countQuery += ` AND ET.from_dept_id LIKE :from_dept_id`;
      query += ` AND ET.from_dept_id LIKE :from_dept_id`;
    }

    if (filter.from_branch_id) {
      countQuery += ` AND ET.from_branch_id LIKE :from_branch_id`;
      query += ` AND ET.from_branch_id LIKE :from_branch_id`;
    }

    if (filter.approval_status) {
      countQuery += ` AND ET.approval_status LIKE :approval_status`;
      query += ` AND ET.approval_status LIKE :approval_status`;
    }

    query += ` ORDER BY ET.createdAt DESC`;
    query += ` LIMIT :limit OFFSET :offset`;

    // Get total count
    const totalResult = await DB.sequelize.query(countQuery, {
      replacements: {
        requested_for_user_id: `${filter.requested_for_user_id}`,
        from_dept_id: `${filter.from_dept_id}`,
        from_branch_id: `${filter.from_branch_id}`,
        approval_status: `${filter.approval_status}`,
      },
      type: DB.sequelize.QueryTypes.SELECT,
    });
    const totalRecords = totalResult[0].total;
    const totalPages = Math.ceil(totalRecords / limit);

    const getAllData = await DB.sequelize.query(query, {
      replacements: {
        requested_for_user_id: `${filter.requested_for_user_id}`,
        from_dept_id: `${filter.from_dept_id}`,
        from_branch_id: `${filter.from_branch_id}`,
        approval_status: `${filter.approval_status}`,
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
      return res.status(200).send({
        success: true,
        message: "Get all transfers list!",
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
        isDeleted: true,
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

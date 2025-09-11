// ========== REQUIRE STATEMENTS ========== //
const DB = require("../../../../config/index");
const { generateUniqueCode } = require("../../../../helper/generateUniqueCode");

// ========== CREATE DEPARTMENT CONTROLLER ========== //
module.exports.createDepartment = async (req, res) => {
  try {
    const data = req.body;

    // Check if Department already exist
    const isAlreadyExist = await DB.tbl_department_master.findOne({
      where: {
        name: data?.name,
        entity_id: req?.selectedEntity,
        isDeleted: false,
      },
    });

    if (isAlreadyExist) {
      return res
        .status(409)
        .send({ success: false, message: "Department Already Exist!" });
    } else {
      let code = await generateUniqueCode(
        "DEP",
        3,
        "dep_code",
        "DEPARTMENT_MASTER"
      );
      data.dep_code = code;

      const newDepartment = await DB.tbl_department_master.create({
        ...data,
        entity_id: req?.selectedEntity,
      });
      return res.status(201).send({
        success: true,
        message: "Department Created Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE DEPARTMENT CONTROLLER ========== //
module.exports.updateDepartment = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    // Check if Department already exist
    const isDepartmentExist = await DB.tbl_department_master.findOne({
      where: {
        id,
        entity_id: req?.selectedEntity,
        isDeleted: false,
      },
    });

    if (!isDepartmentExist) {
      return res
        .status(404)
        .send({ success: false, message: "Department Not Found!" });
    } else {
      const duplicateDepartment = await DB.tbl_department_master.findOne({
        where: {
          id: { [DB.Sequelize.Op.ne]: id },
          name: data?.name,
          entity_id: req?.selectedEntity,
          isDeleted: false,
        },
      });

      if (duplicateDepartment) {
        return res
          .status(409)
          .send({ success: false, message: "Department Name Already Exist!" });
      } else {
        const updateDepartment = await isDepartmentExist.update(data);
        return res.status(201).send({
          success: true,
          message: "Department Updated Successfully!",
        });
      }
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET DEPARTMENT DETAILS CONTROLLER ========== //
module.exports.getDepartmentDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
    SELECT D.*, U.name AS department_head_name, U.emp_code
    FROM DEPARTMENT_MASTER AS D
    LEFT JOIN USER_MASTER AS U ON U.id= D.department_head_id
    WHERE D.id=${id} AND D.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(404)
        .send({ success: false, message: "Department Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        message: "Get Department Details Successfully!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL DEPARTMENT DETAILS CONTROLLER ========== //
module.exports.getAllDepartmentDetails = async (req, res) => {
  try {
    const limit = parseInt(req.body.limit) || 10;
    const page = parseInt(req.body.page) || 1;
    const offset = (page - 1) * limit;
    const filter = req.body.filter || null;

    let countQuery = `
      SELECT COUNT(*) as total 
      FROM DEPARTMENT_MASTER AS D 
      WHERE D.entity_id=${req?.selectedEntity} AND D.isDeleted = false`;

    let query = `
            SELECT D.*, U.emp_code, U.name As department_head_name
            FROM DEPARTMENT_MASTER AS D
            LEFT JOIN USER_MASTER AS U on U.id=D.department_head_id
            WHERE D.entity_id=${req?.selectedEntity} AND D.isDeleted=false`;

    if (filter?.name) {
      countQuery += ` AND D.name LIKE :filter`;
      query += ` AND D.name LIKE :filter`;
    }

    query += ` ORDER BY D.createdAt DESC`;
    query += ` LIMIT :limit OFFSET :offset`;

    // Get total count
    const totalResult = await DB.sequelize.query(countQuery, {
      replacements: { filter: `%${filter}%` },
      type: DB.sequelize.QueryTypes.SELECT,
    });
    const totalRecords = totalResult[0].total;
    const totalPages = Math.ceil(totalRecords / limit);

    const getAllData = await DB.sequelize.query(query, {
      replacements: {
        filter: filter ? `%${filter}%` : null,
        limit,
        offset,
      },
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(404)
        .send({ success: false, message: "Departments Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        message: "Get All Departments List!",
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

// ========== UPDATE DEPARTMENT CONTROLLER ========== //
module.exports.updateDepartmentStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user already exist
    const isDepartmentExist = await DB.tbl_department_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isDepartmentExist) {
      return res
        .status(404)
        .send({ success: false, message: "Department Not Found!" });
    } else {
      const updateStatus = await isDepartmentExist.update({
        status: !isDepartmentExist.status,
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

// ========== DELETE DEPARTMENT CONTROLLER ========== //
module.exports.deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Department already exist
    const isDepartmentExist = await DB.tbl_department_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isDepartmentExist) {
      return res
        .status(404)
        .send({ success: false, message: "Department Not Found!" });
    } else {
      await isDepartmentExist.update({
        isDeleted: true,
      });
      return res.status(201).send({
        success: true,
        message: "Department Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

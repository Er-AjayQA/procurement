// ========== IMPORT STATEMENTS ========== //
const DB = require("../../../../config/index");
const { generateUniqueCode } = require("../../../../helper/generateUniqueCode");

// ========== CREATE DEPARTMENT CONTROLLER ========== //
module.exports.createDepartment = async (req, res) => {
  try {
    const data = req.body;

    // Check if Department already exist
    const isAlreadyExist = await DB.tbl_department.findOne({
      where: {
        name: data.name,
        isDeleted: false,
      },
    });

    if (isAlreadyExist) {
      return res
        .status(400)
        .send({ success: false, message: "Department Already Exist!" });
    } else {
      let code = await generateUniqueCode("DEP", 3, "dep_code", "DEPARTMENT");
      data.dep_code = code;

      const newDepartment = await DB.tbl_department.create(data);
      return res.status(200).send({
        success: true,
        status: "Department Created Successfully!",
        data: newDepartment,
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
    const isDepartmentExist = await DB.tbl_department.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isDepartmentExist) {
      return res
        .status(400)
        .send({ success: false, message: "Department Not Found!" });
    } else {
      const updateDepartment = await isDepartmentExist.update(data);
      return res.status(200).send({
        success: true,
        status: "Department Updated Successfully!",
        data: updateDepartment,
      });
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
    FROM DEPARTMENT AS D
    LEFT JOIN USER AS U ON U.id= D.department_head_id
    WHERE D.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Department Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get Department Details Successfully!",
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
    const query = `
            SELECT D.*, U.emp_code, U.name As department_head_name
            FROM DEPARTMENT AS D
            LEFT JOIN USER AS U on U.id=D.department_head_id
            WHERE D.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Departments Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get Departments Details Successfully!",
        data: getAllData,
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
    const isDepartmentExist = await DB.tbl_department.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isDepartmentExist) {
      return res
        .status(400)
        .send({ success: false, message: "Department Not Found!" });
    } else {
      const updateStatus = await isDepartmentExist.update({
        status: !isDepartmentExist.status,
      });
      return res.status(200).send({
        success: true,
        status: "Status Changed Successfully!",
        data: updateStatus,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE DEPARTMENT CONTROLLER ========== //
module.exports.deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Department already exist
    const isDepartmentExist = await DB.tbl_department.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isDepartmentExist) {
      return res
        .status(400)
        .send({ success: false, message: "Department Not Found!" });
    } else {
      await isDepartmentExist.update({
        isDeleted: true,
      });
      return res.status(200).send({
        success: true,
        status: "Department Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

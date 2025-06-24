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

    if (req.file) {
      data.userImage = req.file.path || null;
    }

    // Check if user already exist
    // const getUserQuery=
    const isUserExist = await DB.tbl_user.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isUserExist) {
      return res
        .status(400)
        .send({ success: false, message: "User Not Found!" });
    } else {
      const updateUser = await isUserExist.update(data);
      return res.status(200).send({
        success: true,
        status: "User Updated Successfully!",
        data: updateUser,
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

    // Check if user already exist
    const isUserExist = await DB.tbl_user.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isUserExist) {
      return res
        .status(400)
        .send({ success: false, message: "User Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get User Details Successfully!",
        data: isUserExist,
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
            SELECT U.id, U.emp_code, U.name, U.email, U.userImage, U.isDeleted, U.status
            FROM USER AS U
            WHERE U.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Users Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get User Details Successfully!",
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
    const isUserExist = await DB.tbl_user.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isUserExist) {
      return res
        .status(400)
        .send({ success: false, message: "User Not Found!" });
    } else {
      const updateStatus = await isUserExist.update({
        status: !isUserExist.status,
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

    // Check if user already exist
    const isUserExist = await DB.tbl_user.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isUserExist) {
      return res
        .status(400)
        .send({ success: false, message: "User Not Found!" });
    } else {
      await isUserExist.update({
        isDeleted: true,
      });
      return res.status(200).send({
        success: true,
        status: "User Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== IMPORT STATEMENTS ========== //
const DB = require("../../../config/index");
const { employeeUniqueCode } = require("../../../helper/createEmployeeCode");
const bcrypt = require("bcrypt");
const salt = 12;

// ========== CREATE USER CONTROLLER ========== //
module.exports.createUser = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      data.userImage = req.file.path || null;
    }

    // Check if user already exist
    const isAlreadyExist = await DB.tbl_user.findOne({
      where: {
        email: data.email,
        isDeleted: false,
        status: true,
      },
    });

    if (isAlreadyExist) {
      return res
        .status(400)
        .send({ success: false, message: "Email Already Exist!" });
    } else {
      data.emp_code = await employeeUniqueCode();

      let newPwd = "123456789";
      let hashedPwd = await bcrypt.hash(newPwd, salt);

      const newUser = await DB.tbl_user.create(data);
      await DB.tbl_login.create({
        user_id: newUser.id,
        email: data.email,
        password: hashedPwd,
      });
      return res.status(200).send({
        success: true,
        status: "User Created Successfully!",
        data: newUser,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE USER CONTROLLER ========== //
module.exports.updateUser = async (req, res) => {
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

// ========== GET USER DETAILS CONTROLLER ========== //
module.exports.getUserDetails = async (req, res) => {
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

// ========== GET ALL USER DETAILS CONTROLLER ========== //
module.exports.getAllUserDetails = async (req, res) => {
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

// ========== UPDATE USER CONTROLLER ========== //
module.exports.updateUserStatus = async (req, res) => {
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

// ========== UPDATE USER CONTROLLER ========== //
module.exports.deleteUser = async (req, res) => {
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

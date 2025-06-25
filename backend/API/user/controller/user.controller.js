// ========== IMPORT STATEMENTS ========== //
// const { where } = require("sequelize");
const DB = require("../../../config/index");
const { generateUniqueCode } = require("../../../helper/generateUniqueCode");
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
    const isAlreadyExist = await DB.tbl_user_master.findOne({
      where: {
        official_email: data.official_email,
        isDeleted: false,
      },
    });

    if (isAlreadyExist) {
      return res
        .status(400)
        .send({ success: false, message: "Email Already Exist!" });
    } else {
      const isLoginExist = await DB.tbl_login_master.findOne({
        where: {
          official_email: data.official_email,
          isDeleted: false,
        },
      });

      if (isLoginExist) {
        return res
          .status(400)
          .send({ success: false, message: "Login Details Already Exist!" });
      } else {
        let code = await generateUniqueCode(
          "EMP",
          3,
          "emp_code",
          "USER_MASTER"
        );
        data.emp_code = code;
        let newPwd = "123456789";
        let hashedPwd = await bcrypt.hash(newPwd, salt);

        const newUser = await DB.tbl_user_master.create(data);
        await DB.tbl_login_master.create({
          user_id: newUser.id,
          official_email: data.official_email,
          password: hashedPwd,
        });
        return res.status(200).send({
          success: true,
          status: "User Created Successfully!",
          data: newUser,
        });
      }
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

    // Check if user exist
    const isUserExist = await DB.tbl_user_master.findOne({
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
      const emailExist = await DB.tbl_user_master.findOne({
        where: {
          official_email: data.official_email
            ? data.official_email
            : isUserExist.official_email,
          id: { [DB.Sequelize.Op.ne]: id },
        },
      });

      if (emailExist) {
        return res
          .status(409)
          .send({ success: false, message: "Official Email Already Exist!" });
      } else {
        const updateUser = await isUserExist.update(data);
        return res.status(200).send({
          success: true,
          status: "User Updated Successfully!",
          data: updateUser,
        });
      }
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET USER DETAILS CONTROLLER ========== //
module.exports.getUserDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
            SELECT U.id, U.emp_code, U.name, U.official_email, U.personal_email, U.userImage,U.contact_no, U.alt_contact_no, U.dob, U.gender, U.reporting_manager_id, M.name AS reporting_manager_name, U.isDeleted, U.status, D.name AS department_name, D.dep_code AS department_code, DES.name AS designation_name, E.name AS employment_type
            FROM USER_MASTER AS U
            LEFT JOIN DEPARTMENT_MASTER AS D ON D.id=U.dep_id
            LEFT JOIN DESIGNATION_MASTER AS DES ON DES.id=U.designation_id
            LEFT JOIN EMPLOYMENT_TYPE_MASTER AS E ON E.id=U.emp_type_id
            LEFT JOIN USER_MASTER AS M ON M.id=U.reporting_manager_id
            WHERE U.id=${id} AND U.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "User Not Found!" });
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

// ========== GET ALL USER DETAILS CONTROLLER ========== //
module.exports.getAllUserDetails = async (req, res) => {
  try {
    const query = `
            SELECT U.id, U.emp_code, U.name, U.official_email, U.personal_email, U.userImage,U.contact_no, U.alt_contact_no, U.dob, U.gender, U.reporting_manager_id, M.name AS reporting_manager_name, U.isDeleted, U.status, D.name AS department_name, D.dep_code AS department_code, DES.name AS designation_name, E.name AS employment_type
            FROM USER_MASTER AS U
            LEFT JOIN DEPARTMENT_MASTER AS D ON D.id=U.dep_id
            LEFT JOIN DESIGNATION_MASTER AS DES ON DES.id=U.designation_id
            LEFT JOIN EMPLOYMENT_TYPE_MASTER AS E ON E.id=U.emp_type_id
            LEFT JOIN USER_MASTER AS M ON M.id=U.reporting_manager_id
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
    const isUserExist = await DB.tbl_user_master.findOne({
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

// ========== DELETE USER CONTROLLER ========== //
module.exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user already exist
    const isUserExist = await DB.tbl_user_master.findOne({
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
      await DB.tbl_login_master.update(
        { isDeleted: true },
        { where: { user_id: id } }
      );
      return res.status(200).send({
        success: true,
        status: "User Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

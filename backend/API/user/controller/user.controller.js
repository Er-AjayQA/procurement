// ========== IMPORT STATEMENTS ========== //
const DB = require("../../../config/index");

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
      const newUser = await DB.tbl_user.create(data);
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
        status: true,
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

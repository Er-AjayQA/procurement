// ========== IMPORT STATEMENTS ========== //
const USER = require("../model/user.model");

// ========== CREATE USER CONTROLLER ========== //
module.exports.createUser = async (req, res) => {
  try {
    const data = req.body;

    // Check if user already exist
    const isAlreadyExist = await USER.findOne({
      email: data.email,
      isDeleted: false,
      status: true,
    });

    if (isAlreadyExist) {
      return res
        .status(400)
        .send({ success: true, message: "Email Already Exist!" });
    } else {
      const newUser = await USER.create(data);
      return res.status(200).send({
        code: 200,
        status: "User Created Successfully!",
        data: newUser,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

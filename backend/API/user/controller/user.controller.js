// ========== IMPORT STATEMENTS ========== //
const DB = require("../../../config/index");
const upload = require("../../../config/multer.config");

// ========== CREATE USER CONTROLLER ========== //
module.exports.createUser = async (req, res) => {
  try {
    // First handle the file upload
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).send({ success: false, message: err });
      }

      const data = req.body;

      // If file was uploaded, add the path to the data
      if (req.file) {
        data.profileImage = `/uploads/${req.file.filename}`;
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
          .send({ success: true, message: "Email Already Exist!" });
      } else {
        const newUser = await DB.tbl_user.create(data);
        return res.status(200).send({
          code: 200,
          status: "User Created Successfully!",
          data: newUser,
        });
      }
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

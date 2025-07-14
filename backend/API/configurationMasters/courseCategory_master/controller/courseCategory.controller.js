// ========== REQUIRE STATEMENTS ========== //
const DB = require("../../../../config/index");

// ========== CREATE COURSE CATEGORY CONTROLLER ========== //
module.exports.createCourseCategory = async (req, res) => {
  try {
    const data = req.body;

    // Check if Course Category already exist
    const isAlreadyExist = await DB.tbl_course_category.findOne({
      where: {
        name: data.name,
        isDeleted: false,
      },
    });

    if (isAlreadyExist) {
      return res.status(400).send({
        success: false,
        message: "Course Category Name Already Exist!",
      });
    } else {
      const newCategory = await DB.tbl_course_category.create(data);
      return res.status(200).send({
        success: true,
        status: "Course Category Created Successfully!",
        data: newCategory,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE COURSE CATEGORY CONTROLLER ========== //
module.exports.updateCourseCategory = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    // Check if Course Category already exist
    const isCategoryExist = await DB.tbl_course_category.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isCategoryExist) {
      return res
        .status(400)
        .send({ success: false, message: "Course Category Not Found!" });
    } else {
      const duplicateCategory = await DB.tbl_course_category.findOne({
        where: {
          id: { [DB.Sequelize.Op.ne]: id },
          name: data.name,
          isDeleted: false,
        },
      });

      if (duplicateCategory) {
        return res.status(409).send({
          success: false,
          message: "Course Category Name Already Exist!",
        });
      } else {
        const updateCategory = await isCategoryExist.update(data);
        return res.status(200).send({
          success: true,
          status: "Course Category Updated Successfully!",
          data: updateCategory,
        });
      }
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET COURSE CATEGORY DETAILS CONTROLLER ========== //
module.exports.getCourseCategoryDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
    SELECT CC.*
    FROM COURSE_CATEGORY AS CC
    WHERE CC.id=${id} AND CC.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Course Category Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get Course Category Details Successfully!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL COURSE CATEGORY DETAILS CONTROLLER ========== //
module.exports.getAllCourseCategoryDetails = async (req, res) => {
  try {
    const query = `
            SELECT CC.*
            FROM COURSE_CATEGORY AS CC
            WHERE CC.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Course Categories Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        records: getAllData.length,
        status: "Get All Course Categories List!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE COURSE CATEGORY CONTROLLER ========== //
module.exports.updateCourseCategoryStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Course Category exist
    const isCategoryExist = await DB.tbl_course_category.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isCategoryExist) {
      return res
        .status(400)
        .send({ success: false, message: "Course Category Not Found!" });
    } else {
      const updateStatus = await isCategoryExist.update({
        status: !isCategoryExist.status,
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

// ========== DELETE COURSE CATEGORY CONTROLLER ========== //
module.exports.deleteCourseCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Course Category already exist
    const isCategoryExist = await DB.tbl_course_category.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isCategoryExist) {
      return res
        .status(400)
        .send({ success: false, message: "Course Category Not Found!" });
    } else {
      await isCategoryExist.update({
        isDeleted: true,
      });
      return res.status(200).send({
        success: true,
        status: "Course Category Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

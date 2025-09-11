// ========== REQUIRE STATEMENTS ========== //
const DB = require("../../../../config/index");

// ========== CREATE COURSE CATEGORY CONTROLLER ========== //
module.exports.createCourseCategory = async (req, res) => {
  try {
    const data = req.body;

    // Check if Course Category already exist
    const isAlreadyExist = await DB.tbl_course_category.findOne({
      where: {
        name: data?.name,
        entity_id: req?.selectedEntity,
        isDeleted: false,
      },
    });

    if (isAlreadyExist) {
      return res.status(404).send({
        success: false,
        message: "Course Category Name Already Exist!",
      });
    } else {
      const newCategory = await DB.tbl_course_category.create({
        ...data,
        entity_id: req?.selectedEntity,
      });
      return res.status(201).send({
        success: true,
        message: "Course Category Created Successfully!",
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
        entity_id: req?.selectedEntity,
        isDeleted: false,
      },
    });

    if (!isCategoryExist) {
      return res
        .status(404)
        .send({ success: false, message: "Course Category Not Found!" });
    } else {
      const duplicateCategory = await DB.tbl_course_category.findOne({
        where: {
          id: { [DB.Sequelize.Op.ne]: id },
          name: data?.name,
          entity_id: req?.selectedEntity,
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
        return res.status(201).send({
          success: true,
          message: "Course Category Updated Successfully!",
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
        .status(404)
        .send({ success: false, message: "Course Category Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        message: "Get Course Category Details Successfully!",
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
    const limit = parseInt(req.body.limit) || 10;
    const page = parseInt(req.body.page) || 1;
    const offset = (page - 1) * limit;
    const filter = req.body.filter || null;

    const whereClause = { entity_id: req?.selectedEntity, isDeleted: false };

    if (filter.name !== undefined || filter.name !== "") {
      whereClause.name = { [DB.Sequelize.Op.like]: [`%${filter.name}%`] };
    }

    const totalRecords = await DB.tbl_course_category.count({ whereClause });
    const totalPages = Math.ceil(totalRecords / limit);

    const getAllData = await DB.tbl_course_category.findAll({
      where: whereClause,
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
    });

    if (!getAllData || getAllData.length === 0) {
      return res
        .status(404)
        .send({ success: false, message: "Course Categories Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        message: "Get All Course Categories List!",
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
        .status(404)
        .send({ success: false, message: "Course Category Not Found!" });
    } else {
      const updateStatus = await isCategoryExist.update({
        status: !isCategoryExist.status,
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
        .status(404)
        .send({ success: false, message: "Course Category Not Found!" });
    } else {
      await isCategoryExist.update({
        isDeleted: true,
      });
      return res.status(200).send({
        success: true,
        message: "Course Category Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

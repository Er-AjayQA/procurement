// ========== IMPORT STATEMENTS ========== //
const DB = require("../../../../config/index");
const { generateUniqueCode } = require("../../../../helper/generateUniqueCode");

// ========== CREATE SERVICE CATEGORY CONTROLLER ========== //
module.exports.createServiceCategory = async (req, res) => {
  try {
    const data = req.body;

    // Check if Service-Category already exist
    const isAlreadyExist = await DB.tbl_service_category_master.findOne({
      where: {
        name: data.name,
        isDeleted: false,
      },
    });

    if (isAlreadyExist) {
      return res
        .status(400)
        .send({ success: false, message: "Service-Category Already Exist!" });
    } else {
      let code = await generateUniqueCode(
        "SRVCAT",
        6,
        "service_category_code",
        "SERVICE_CATEGORY_MASTER"
      );
      data.service_category_code = code;

      const newServiceCategory = await DB.tbl_service_category_master.create(
        data
      );
      return res.status(200).send({
        success: true,
        status: "Service-Category Created Successfully!",
        data: newServiceCategory,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE SERVICE CATEGORY CONTROLLER ========== //
module.exports.updateServiceCategory = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    // Check if Service-Category already exist
    const isServiceCategoryExist = await DB.tbl_service_category_master.findOne(
      {
        where: {
          id,
          isDeleted: false,
        },
      }
    );

    if (!isServiceCategoryExist) {
      return res
        .status(400)
        .send({ success: false, message: "Service-Category Not Found!" });
    } else {
      const duplicateDataName = await DB.tbl_service_category_master.findOne({
        where: {
          id: { [DB.Sequelize.Op.ne]: id },
          name: data.name ? data.name : isServiceCategoryExist.name,
          isDeleted: false,
        },
      });

      if (duplicateDataName) {
        return res.status(409).send({
          success: false,
          message: "Service-Category Name Already Exist!",
        });
      } else {
        const updateServiceCategory = await isServiceCategoryExist.update(data);
        return res.status(200).send({
          success: true,
          status: "Service-Category Updated Successfully!",
          data: updateServiceCategory,
        });
      }
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET SERVICE CATEGORY DETAILS CONTROLLER ========== //
module.exports.getServiceCategoryDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
    SELECT SC.*
    FROM SERVICE_CATEGORY_MASTER AS SC
    WHERE SC.id=${id} AND SC.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Service-Category Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get Service-Category Details Successfully!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL SERVICE CATEGORY DETAILS CONTROLLER ========== //
module.exports.getAllServiceCategoryDetails = async (req, res) => {
  try {
    const query = `
            SELECT SC.*
            FROM SERVICE_CATEGORY_MASTER AS SC
            WHERE SC.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Service-Categories Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get All Service-Categories List!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE SERVICE CATEGORY CONTROLLER ========== //
module.exports.updateServiceCategoryStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Service-Category already exist
    const isServiceCategoryExist = await DB.tbl_service_category_master.findOne(
      {
        where: {
          id,
          isDeleted: false,
        },
      }
    );

    if (!isServiceCategoryExist) {
      return res
        .status(400)
        .send({ success: false, message: "Service-Category Not Found!" });
    } else {
      const updateStatus = await isServiceCategoryExist.update({
        status: !isServiceCategoryExist.status,
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

// ========== DELETE SERVICE CATEGORY CONTROLLER ========== //
module.exports.deleteServiceCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Service-Category already exist
    const isServiceCategoryExist = await DB.tbl_service_category_master.findOne(
      {
        where: {
          id,
          isDeleted: false,
        },
      }
    );

    if (!isServiceCategoryExist) {
      return res
        .status(400)
        .send({ success: false, message: "Service-Category Not Found!" });
    } else {
      await isServiceCategoryExist.update({
        isDeleted: true,
      });
      return res.status(200).send({
        success: true,
        status: "Service-Category Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

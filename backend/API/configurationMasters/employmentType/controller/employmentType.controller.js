// ========== IMPORT STATEMENTS ========== //
const DB = require("../../../../config/index");

// ========== CREATE EMPLOYMENT TYPE CONTROLLER ========== //
module.exports.createEmploymentType = async (req, res) => {
  try {
    const data = req.body;

    // Check if Employment Type already exist
    const isAlreadyExist = await DB.tbl_employmentType_master.findOne({
      where: {
        name: data.name,
        isDeleted: false,
      },
    });

    if (isAlreadyExist) {
      return res
        .status(400)
        .send({ success: false, message: "Employment-Type Already Exist!" });
    } else {
      const newEmploymentType = await DB.tbl_employmentType_master.create(data);
      return res.status(200).send({
        success: true,
        status: "Employment-Type Created Successfully!",
        data: newEmploymentType,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE EMPLOYMENT TYPE CONTROLLER ========== //
module.exports.updateEmploymentType = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    // Check if Employment Type already exist
    const isEmploymentTypeExist = await DB.tbl_employmentType_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isEmploymentTypeExist) {
      return res
        .status(400)
        .send({ success: false, message: "Employment-Type Not Found!" });
    } else {
      const duplicateData = await DB.tbl_employmentType_master.findOne({
        where: {
          id: { [DB.Sequelize.Op.ne]: id },
          name: data.name,
          isDeleted: false,
        },
      });

      if (duplicateData) {
        return res.status(409).send({
          success: false,
          message: "Employment-Type Name Already Exist!",
        });
      } else {
        const updateEmploymentType = await isEmploymentTypeExist.update(data);
        return res.status(200).send({
          success: true,
          status: "Employment-Type Updated Successfully!",
          data: updateEmploymentType,
        });
      }
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET EMPLOYMENT TYPE DETAILS CONTROLLER ========== //
module.exports.getEmploymentTypeDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
    SELECT E.*
    FROM EMPLOYMENT_TYPE_MASTER AS E
    WHERE E.id=${id} AND E.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Employment-Type Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get Employment-Type Details Successfully!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL EMPLOYMENT TYPE DETAILS CONTROLLER ========== //
module.exports.getAllEmploymentTypesDetails = async (req, res) => {
  try {
    const query = `
            SELECT E.*
            FROM EMPLOYMENT_TYPE_MASTER AS E
            WHERE E.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Employment-Type Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get All Employment-Types List!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE EMPLOYMENT TYPE CONTROLLER ========== //
module.exports.updateEmploymentTypeStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Employment Type already exist
    const isEmploymentTypeExist = await DB.tbl_employmentType_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isEmploymentTypeExist) {
      return res
        .status(400)
        .send({ success: false, message: "Employment-Type Not Found!" });
    } else {
      const updateStatus = await isEmploymentTypeExist.update({
        status: !isEmploymentTypeExist.status,
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

// ========== DELETE EMPLOYMENT TYPE CONTROLLER ========== //
module.exports.deleteEmploymentType = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Employment Type already exist
    const isEmploymentTypeExist = await DB.tbl_employmentType_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isEmploymentTypeExist) {
      return res
        .status(400)
        .send({ success: false, message: "Employment-Type Not Found!" });
    } else {
      await isEmploymentTypeExist.update({
        isDeleted: true,
      });
      return res.status(200).send({
        success: true,
        status: "Employment-Type Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== REQUIRE STATEMENTS ========== //
const DB = require("../../../../config/index");
const { generateUniqueCode } = require("../../../../helper/generateUniqueCode");

// ========== CREATE ROLE CONTROLLER ========== //
module.exports.createRole = async (req, res) => {
  try {
    const data = req.body;

    // Check if Role already exist
    const isAlreadyExist = await DB.tbl_role_master.findOne({
      where: {
        name: data.name,
        isDeleted: false,
      },
    });

    if (isAlreadyExist) {
      return res
        .status(400)
        .send({ success: false, message: "Role Already Exist!" });
    } else {
      const newRole = await DB.tbl_role_master.create(data);
      return res.status(200).send({
        success: true,
        status: "Role Created Successfully!",
        data: newRole,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE ROLE CONTROLLER ========== //
module.exports.updateRole = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    // Check if Role already exist
    const isRoleExist = await DB.tbl_role_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isRoleExist) {
      return res
        .status(400)
        .send({ success: false, message: "Role Not Found!" });
    } else {
      const duplicateRole = await DB.tbl_role_master.findOne({
        where: {
          id: { [DB.Sequelize.Op.ne]: id },
          name: data.name,
          isDeleted: false,
        },
      });

      if (duplicateRole) {
        return res
          .status(409)
          .send({ success: false, message: "Role Name Already Exist!" });
      } else {
        const updateRole = await isRoleExist.update(data);
        return res.status(200).send({
          success: true,
          status: "Role Updated Successfully!",
          data: updateRole,
        });
      }
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ROLE DETAILS CONTROLLER ========== //
module.exports.getRoleDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
    SELECT R.*
    FROM ROLE_MASTER AS R
    WHERE R.id=${id} AND R.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Role Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get Role Details Successfully!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL ROLE DETAILS CONTROLLER ========== //
module.exports.getAllRoleDetails = async (req, res) => {
  try {
    const query = `
            SELECT R.*
            FROM ROLE_MASTER AS R
            WHERE R.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Roles Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        records: getAllData.length,
        status: "Get All Roles List!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE ROLE CONTROLLER ========== //
module.exports.updateRoleStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Role already exist
    const isRoleExist = await DB.tbl_role_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isRoleExist) {
      return res
        .status(400)
        .send({ success: false, message: "Role Not Found!" });
    } else {
      const updateStatus = await isRoleExist.update({
        status: !isRoleExist.status,
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

// ========== DELETE ROLE CONTROLLER ========== //
module.exports.deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Role already exist
    const isRoleExist = await DB.tbl_role_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isRoleExist) {
      return res
        .status(400)
        .send({ success: false, message: "Role Not Found!" });
    } else {
      await isRoleExist.update({
        isDeleted: true,
      });
      return res.status(200).send({
        success: true,
        status: "Role Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== REQUIRE STATEMENTS ========== //
const DB = require("../../../../config/index");

// ========== CREATE ROLE CONTROLLER ========== //
module.exports.createRole = async (req, res) => {
  try {
    const data = req.body;

    // Check if Role already exist
    const isAlreadyExist = await DB.tbl_role_master.findOne({
      where: {
        name: data?.name,
        entity_id: req?.selectedEntity,
        isDeleted: false,
      },
    });

    if (isAlreadyExist) {
      return res
        .status(409)
        .send({ success: false, message: "Role Already Exist!" });
    } else {
      const newRole = await DB.tbl_role_master.create({
        ...data,
        entity_id: req?.selectedEntity,
      });
      return res.status(201).send({
        success: true,
        message: "Role Created Successfully!",
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
        entity_id: req?.selectedEntity,
        isDeleted: false,
      },
    });

    if (!isRoleExist) {
      return res
        .status(404)
        .send({ success: false, message: "Role Not Found!" });
    } else {
      const duplicateRole = await DB.tbl_role_master.findOne({
        where: {
          id: { [DB.Sequelize.Op.ne]: id },
          name: data?.name,
          entity_id: req?.selectedEntity,
          isDeleted: false,
        },
      });

      if (duplicateRole) {
        return res
          .status(409)
          .send({ success: false, message: "Role Name Already Exist!" });
      } else {
        const updateRole = await isRoleExist.update(data);
        return res.status(201).send({
          success: true,
          message: "Role Updated Successfully!",
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
        .status(404)
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
    const limit = parseInt(req.body.limit) || 10;
    const page = parseInt(req.body.page) || 1;
    const offset = (page - 1) * limit;
    const filter = req.body.filter || null;

    // Get total count of records
    let countQuery = `
      SELECT COUNT(*) as total 
      FROM ROLE_MASTER AS R 
      WHERE R.entity_id=${req?.selectedEntity} AND R.isDeleted = false`;

    let query = `
      SELECT R.*
      FROM ROLE_MASTER AS R
      WHERE R.entity_id=${req?.selectedEntity} AND R.isDeleted = false`;

    if (filter?.name) {
      countQuery += ` AND R.name LIKE :filter`;
      query += ` AND R.name LIKE :filter`;
    }

    query += ` ORDER BY R.createdAt DESC`;
    query += ` LIMIT :limit OFFSET :offset`;

    // Get total count
    const totalResult = await DB.sequelize.query(countQuery, {
      replacements: { filter: `%${filter}%` },
      type: DB.sequelize.QueryTypes.SELECT,
    });
    const totalRecords = totalResult[0].total;
    const totalPages = Math.ceil(totalRecords / limit);

    // Get paginated data
    const getAllData = await DB.sequelize.query(query, {
      replacements: {
        filter: filter ? `%${filter}%` : null,
        limit,
        offset,
      },
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(404)
        .send({ success: false, message: "Roles Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get All Roles List!",
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

// ========== UPDATE ROLE STATUS CONTROLLER ========== //
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
        .status(404)
        .send({ success: false, message: "Role Not Found!" });
    } else {
      const updateStatus = await isRoleExist.update({
        status: !isRoleExist.status,
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
        .status(404)
        .send({ success: false, message: "Role Not Found!" });
    } else {
      await isRoleExist.update({
        isDeleted: true,
      });
      return res.status(201).send({
        success: true,
        message: "Role Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

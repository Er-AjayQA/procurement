// ========== REQUIRE STATEMENTS ========== //
const DB = require("../../../../config/index");

// ========== CREATE ALLOWANCE CONTROLLER ========== //
module.exports.createAllowance = async (req, res) => {
  try {
    const data = req.body;

    // Check if Allowance already exist
    const isAlreadyExist = await DB.tbl_allowance_master.findOne({
      where: {
        name: data?.name,
        entity_id: req?.selectedEntity,
        isDeleted: false,
      },
    });

    if (isAlreadyExist) {
      return res
        .status(404)
        .send({ success: false, message: "Allowance Name Already Exist!" });
    } else {
      const newAllowance = await DB.tbl_allowance_master.create({
        ...data,
        entity_id: req?.selectedEntity,
      });
      return res.status(201).send({
        success: true,
        message: "Allowance Created Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE ALLOWANCE CONTROLLER ========== //
module.exports.updateAllowance = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    // Check if Allowance already exist
    const isAllowanceExist = await DB.tbl_allowance_master.findOne({
      where: {
        id,
        entity_id: req?.selectedEntity,
        isDeleted: false,
      },
    });

    if (!isAllowanceExist) {
      return res
        .status(404)
        .send({ success: false, message: "Allowance Not Found!" });
    } else {
      const duplicateAllowance = await DB.tbl_allowance_master.findOne({
        where: {
          id: { [DB.Sequelize.Op.ne]: id },
          name: data?.name,
          entity_id: req?.selectedEntity,
          isDeleted: false,
        },
      });

      if (duplicateAllowance) {
        return res
          .status(409)
          .send({ success: false, message: "Allowance Name Already Exist!" });
      } else {
        const updateAllowance = await isAllowanceExist.update(data);
        return res.status(201).send({
          success: true,
          message: "Allowance Updated Successfully!",
        });
      }
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALLOWANCE DETAILS CONTROLLER ========== //
module.exports.getAllowanceDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
    SELECT A.*
    FROM ALLOWANCE_MASTER AS A
    WHERE A.id=${id} AND A.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(404)
        .send({ success: false, message: "Allowance Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        message: "Get Allowance Details Successfully!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL ALLOWANCE DETAILS CONTROLLER ========== //
module.exports.getAllAllowanceDetails = async (req, res) => {
  try {
    const limit = parseInt(req.body.limit) || 10;
    const page = parseInt(req.body.page) || 1;
    const offset = (page - 1) * limit;
    const filter = req.body.filter || null;

    const whereClause = { entity_id: req?.selectedEntity, isDeleted: false };

    if (filter.name !== undefined || filter.name !== "") {
      whereClause.name = { [DB.Sequelize.Op.like]: [`%${filter.name}%`] };
    }

    if (filter.is_taxable !== undefined || filter.is_taxable !== "") {
      whereClause.is_taxable = {
        [DB.Sequelize.Op.like]: [`%${filter.is_taxable}%`],
      };
    }

    const totalRecords = await DB.tbl_allowance_master.count({ whereClause });
    const totalPages = Math.ceil(totalRecords / limit);

    const getAllData = await DB.tbl_allowance_master.findAll({
      where: whereClause,
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
    });

    if (!getAllData || getAllData.length === 0) {
      return res
        .status(404)
        .send({ success: false, message: "Allowance Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        message: "Get All Allowance List!",
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

// ========== UPDATE ALLOWANCE CONTROLLER ========== //
module.exports.updateAllowanceStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Allowance already exist
    const isAllowanceExist = await DB.tbl_allowance_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isAllowanceExist) {
      return res
        .status(404)
        .send({ success: false, message: "Allowance Not Found!" });
    } else {
      const updateStatus = await isAllowanceExist.update({
        status: !isAllowanceExist.status,
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

// ========== DELETE ALLOWANCE CONTROLLER ========== //
module.exports.deleteAllowance = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Allowance already exist
    const isAllowanceExist = await DB.tbl_allowance_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isAllowanceExist) {
      return res
        .status(404)
        .send({ success: false, message: "Allowance Not Found!" });
    } else {
      await isAllowanceExist.update({
        isDeleted: true,
      });
      return res.status(201).send({
        success: true,
        message: "Allowance Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

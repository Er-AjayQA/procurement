// ========== REQUIRE STATEMENTS ========== //
const DB = require("../../../../config/index");
const { generateUniqueCode } = require("../../../../helper/generateUniqueCode");

// ========== CREATE BRANCH CONTROLLER ========== //
module.exports.createBranch = async (req, res) => {
  try {
    const data = req.body;

    // Check if Branch already exist
    const isAlreadyExist = await DB.tbl_branch_master.findOne({
      where: {
        name: data.name,
        entity_id: req?.selectedEntity,
        isDeleted: false,
      },
    });

    if (isAlreadyExist) {
      return res
        .status(409)
        .send({ success: false, message: "Branch Already Exist!" });
    } else {
      let code = await generateUniqueCode(
        "BR",
        2,
        "branch_code",
        "BRANCH_MASTER"
      );

      const newBranch = await DB.tbl_branch_master.create({
        name: data.name,
        branch_code: code,
        branch_contact_person: data.branch_contact_person,
        country_code: data.country_code,
        branch_contact_number: data.branch_contact_number,
        alt_country_code: data.alt_country_code,
        branch_alt_contact_number: data.branch_alt_contact_number,
        branch_emailId: data.branch_emailId,
        branch_alt_emailId: data.branch_alt_emailId,
        branch_address: data.branch_address,
        billing_status: data.billing_status,
        country_id: data.country_id,
        state_id: data.state_id,
        city_id: data.city_id,
        entity_id: req?.selectedEntity,
      });
      return res.status(201).send({
        success: true,
        message: "Branch Created Successfully!",
        data: newBranch,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE BRANCH CONTROLLER ========== //
module.exports.updateBranch = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    // Check if Branch exist
    const isBranchExist = await DB.tbl_branch_master.findOne({
      where: {
        id,
        entity_id: req?.selectedEntity,
        isDeleted: false,
      },
    });

    if (!isBranchExist) {
      return res
        .status(404)
        .send({ success: false, message: "Branch Not Found!" });
    } else {
      const duplicateBranch = await DB.tbl_branch_master.findOne({
        where: {
          id: { [DB.Sequelize.Op.ne]: id },
          name: data.name,
          entity_id: req?.selectedEntity,
          isDeleted: false,
        },
      });

      if (duplicateBranch) {
        return res.status(409).send({
          success: false,
          message: "Branch Name Already Exist!",
        });
      } else {
        const updateBranch = await isBranchExist.update(data);
        return res.status(201).send({
          success: true,
          message: "Branch Updated Successfully!",
        });
      }
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET BRANCH DETAILS CONTROLLER ========== //
module.exports.getBranchDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
    SELECT B.*, C.name AS country_name, S.name AS state_name, CN.name AS city_name
    FROM BRANCH_MASTER AS B
    LEFT JOIN COUNTRY_MASTER AS C ON C.id=B.country_id
    LEFT JOIN STATE_MASTER AS S ON S.id=B.state_id
    LEFT JOIN CITY_MASTER AS CN ON CN.id=B.city_id
    WHERE B.id=${id} AND B.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(404)
        .send({ success: false, message: "Branch Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        message: "Get Branch Details Successfully!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL BRANCH DETAILS CONTROLLER ========== //
module.exports.getAllBranchDetails = async (req, res) => {
  try {
    const limit = parseInt(req.body.limit) || 10;
    const page = parseInt(req.body.page) || 1;
    const offset = (page - 1) * limit;
    const filter = req.body.filter || null;

    let whereClause = { entity_id: req?.selectedEntity, isDeleted: false };

    if (filter.billing_status !== undefined || filter.billing_status !== "") {
      whereClause.billing_status = {
        [DB.Sequelize.Op.like]: `%${filter.billing_status}%`,
      };
    }

    if (filter.status !== undefined || filter.status !== "") {
      whereClause.status = { [DB.Sequelize.Op.like]: `%${filter.status}%` };
    }

    if (filter.name !== undefined || filter.name !== "") {
      whereClause.name = { [DB.Sequelize.Op.like]: `%${filter.name}%` };
    }

    // Get total count using Sequelize for consistency
    const totalRecords = await DB.tbl_branch_master.count({
      where: whereClause,
    });

    const totalPages = Math.ceil(totalRecords / limit);

    const getAllData = await DB.tbl_branch_master.findAll({
      include: [
        {
          model: DB.tbl_country_master,
          attributes: ["id", "name"],
          as: "country_details",
        },
        {
          model: DB.tbl_state_master,
          attributes: ["id", "name"],
          as: "state_details",
        },
        {
          model: DB.tbl_city_master,
          attributes: ["id", "name"],
          as: "city_details",
        },
      ],
      where: whereClause,
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
    });

    if (!getAllData || getAllData.length === 0) {
      return res
        .status(404)
        .send({ success: false, message: "Branch Not Found!" });
    }
    return res.status(200).send({
      success: true,
      records: getAllData.length,
      message: "Get All Branch List!",
      data: getAllData,
      pagination: {
        currentPage: page,
        itemsPerPage: limit,
        totalItems: getAllData.length,
        totalPages: totalPages,
      },
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE BRANCH CONTROLLER ========== //
module.exports.updateBranchStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Branch exist
    const isBranchExist = await DB.tbl_branch_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isBranchExist) {
      return res
        .status(404)
        .send({ success: false, message: "Branch Not Found!" });
    } else {
      const updateStatus = await isBranchExist.update({
        status: !isBranchExist.status,
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

// ========== DELETE BRANCH CONTROLLER ========== //
module.exports.deleteBranch = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Branch already exist
    const isBranchExist = await DB.tbl_branch_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isBranchExist) {
      return res
        .status(404)
        .send({ success: false, message: "Branch Not Found!" });
    } else {
      await isBranchExist.update({
        isDeleted: true,
      });
      return res.status(201).send({
        success: true,
        message: "Branch Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

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
        isDeleted: false,
      },
    });

    if (isAlreadyExist) {
      return res
        .status(400)
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
      });
      return res.status(200).send({
        success: true,
        status: "Branch Created Successfully!",
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
        isDeleted: false,
      },
    });

    if (!isBranchExist) {
      return res
        .status(400)
        .send({ success: false, message: "Branch Not Found!" });
    } else {
      const duplicateBranch = await DB.tbl_branch_master.findOne({
        where: {
          id: { [DB.Sequelize.Op.ne]: id },
          name: data.name,
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
        return res.status(200).send({
          success: true,
          status: "Branch Updated Successfully!",
          data: updateBranch,
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
    WHERE B.id=${id}
    AND B.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Branch Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get Branch Details Successfully!",
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
    const { billing_status, status } = req.body;
    let filter = { isDeleted: false };

    if (billing_status !== undefined) {
      filter.billing_status = billing_status;
    }

    if (status !== undefined) {
      filter.status = status;
    }

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
      where: filter,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Branch Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        records: getAllData.length,
        status: "Get All Branch List!",
        data: getAllData,
      });
    }
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
        .status(400)
        .send({ success: false, message: "Branch Not Found!" });
    } else {
      const updateStatus = await isBranchExist.update({
        status: !isBranchExist.status,
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
        .status(400)
        .send({ success: false, message: "Branch Not Found!" });
    } else {
      await isBranchExist.update({
        isDeleted: true,
      });
      return res.status(200).send({
        success: true,
        status: "Branch Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

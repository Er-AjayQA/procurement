// ========== REQUIRE STATEMENTS ========== //
const DB = require("../../../config/index");
const { generateUniqueCode } = require("../../../helper/generateUniqueCode");

// ========== CREATE VENDOR CONTROLLER ========== //
module.exports.createVendor = async (req, res) => {
  const transaction = await DB.sequelize.transaction();
  try {
    const data = req.body;

    // Check if Vendor already exist
    const isAlreadyExist = await DB.tbl_vendor_master.findOne({
      where: {
        name: data.name,
        isDeleted: false,
      },
      transaction,
    });

    if (isAlreadyExist) {
      await transaction.rollback();
      return res
        .status(400)
        .send({ success: false, message: "Vendor Name Already Exist!" });
    } else {
      // Add Vendor Basic Details
      if (data.tab_type === "basic_details") {
        const {
          name,
          vendor_address,
          vendor_country_code,
          vendor_contact_number,
          vendor_alt_country_code,
          vendor_alt_contact_number,
          vendor_emailId,
          vendor_web_url,
          vendor_category,
          vendor_currency_type,
          vendor_country_id,
          vendor_state_id,
          vendor_city_id,
          vendor_user_details = [],
        } = req.body;

        let code = await generateUniqueCode(
          "VN",
          2,
          "vendor_code",
          "VENDOR_MASTER"
        );

        const newVendor = await DB.tbl_vendor_master.create(
          {
            name,
            vendor_code: code,
            vendor_address,
            vendor_country_code,
            vendor_contact_number,
            vendor_alt_country_code,
            vendor_alt_contact_number,
            vendor_emailId,
            vendor_web_url,
            vendor_category,
            vendor_currency_type,
            vendor_country_id,
            vendor_state_id,
            vendor_city_id,
          },
          { transaction }
        );

        if (
          vendor_user_details !== undefined &&
          vendor_user_details.length > 0
        ) {
          await DB.tbl_vendor_user_mapped.bulkCreate(
            vendor_user_details.map((user) => ({
              vendor_id: newVendor.id,
              name: user.name,
              associated_person_country_code:
                user.associated_person_country_code,
              associated_person_contact_number:
                user.associated_person_contact_number,
              associated_person_emailId: user.associated_person_emailId,
              associated_person_designation: user.associated_person_designation,
              associated_person_department: user.associated_person_department,
            })),
            { transaction }
          );
        }

        // Commit the transaction
        await transaction.commit();
        return res.status(200).send({
          success: true,
          status: "Vendor Created Successfully!",
          data: newVendor,
        });
      } else {
        res.status(500).send({ success: false, message: "Invalid Tab Type!" });
      }
    }
  } catch (error) {
    await transaction.rollback();
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE VENDOR CONTROLLER ========== //
module.exports.updateVendor = async (req, res) => {
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

// ========== GET VENDOR DETAILS CONTROLLER ========== //
module.exports.getVendorDetails = async (req, res) => {
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

// ========== GET ALL VENDOR DETAILS CONTROLLER ========== //
module.exports.getAllVendorDetails = async (req, res) => {
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

// ========== UPDATE VENDOR CONTROLLER ========== //
module.exports.updateVendorStatus = async (req, res) => {
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

// ========== DELETE VENDOR CONTROLLER ========== //
module.exports.deleteVendor = async (req, res) => {
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

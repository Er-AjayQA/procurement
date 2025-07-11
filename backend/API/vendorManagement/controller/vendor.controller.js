// ========== REQUIRE STATEMENTS ========== //
const { where } = require("sequelize");
const DB = require("../../../config/index");
const { generateUniqueCode } = require("../../../helper/generateUniqueCode");

// ========== CREATE VENDOR CONTROLLER ========== //
module.exports.createVendor = async (req, res) => {
  const transaction = await DB.sequelize.transaction();
  try {
    const data = req.body;

    // Add Vendor Basic Details
    if (data.tab_type === "basic_details") {
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
        id = newVendor.id;

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
      }
    }

    // Adding the Vendor Bank Details
    if (data.tab_type === "bank_details") {
      const { vendor_id, bank_details = [] } = req.body;

      if (bank_details.length > 0) {
        // Destroy previous record before adding new records.
        await DB.tbl_vendor_bank_mapped.destroy({
          where: { vendor_id },
          transaction,
        });

        await DB.tbl_vendor_bank_mapped.bulkCreate(
          bank_details.map((bank) => ({
            vendor_id,
            bank_id: bank.bank_id,
            bank_branch: bank.bank_branch,
            account_holder_name: bank.account_holder_name,
            bank_address: bank.bank_address,
            bank_account_number: bank.bank_account_number,
            bank_unique_number: bank.bank_unique_number,
            bank_swift_code: bank.bank_swift_code,
            bank_iban_code: bank.bank_iban_code,
            bank_nuit_code: bank.bank_nuit_code,
            vendor_bank_country_id: bank.vendor_bank_country_id,
            vendor_bank_state_id: bank.vendor_bank_state_id,
            vendor_bank_city_id: bank.vendor_bank_city_id,
          })),
          { transaction }
        );
      }

      // Commit the transaction
      await transaction.commit();
      return res.status(200).send({
        success: true,
        status: "Vendor Bank Details Added Successfully!",
      });
    }

    // Adding the Vendor Documents Details
    if (data.tab_type === "document_details") {
      const { vendor_id, document_details = [] } = req.body;

      if (document_details.length > 0) {
        // Destroy previous record before adding new records.
        await DB.tbl_vendor_document_mapped.destroy({
          where: { vendor_id },
          transaction,
        });

        await DB.tbl_vendor_document_mapped.bulkCreate(
          document_details.map((document) => ({
            vendor_id,
            document_type: document.document_type,
            document_name: document.document_name,
            document_expiry_date: document.document_expiry_date,
            document_notification_required:
              document.document_notification_required,
          })),
          { transaction }
        );
      }

      // Commit the transaction
      await transaction.commit();
      return res.status(200).send({
        success: true,
        status: "Vendor Document Details Added Successfully!",
      });
    }

    // If tab_type doesn't match any condition
    await transaction.rollback();
    res.status(400).send({ success: false, message: "Invalid Tab Type!" });
  } catch (error) {
    await transaction.rollback();
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE VENDOR CONTROLLER ========== //
module.exports.updateVendor = async (req, res) => {
  const transaction = await DB.sequelize.transaction();
  try {
    const data = req.body;
    const { id } = req.params;

    // Check if Vendor exist
    const isVendorExist = await DB.tbl_vendor_master.findOne(
      {
        where: {
          id,
          isDeleted: false,
        },
      },
      { transaction }
    );

    if (!isVendorExist) {
      await transaction.rollback();
      return res
        .status(400)
        .send({ success: false, message: "Vendor Not Found!" });
    } else {
      // Updating the Vendor Basic Details
      if (data.tab_type === "basic_details") {
        await DB.tbl_vendor_master.update(data, { where: { id }, transaction });

        if (data.vendor_user_details) {
          await DB.tbl_vendor_user_mapped.destroy({
            where: { vendor_id: id },
            transaction,
          });

          await DB.tbl_vendor_user_mapped.bulkCreate(
            data.vendor_user_details.map((user) => ({
              vendor_id: id,
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

        await transaction.commit();

        return res.status(200).send({
          success: true,
          status: "Vendor Basic Details Updated Successfully!",
          // data: updateBranch,
        });
      }

      // Updating the Vendor Bank Details
      if (data.tab_type === "bank_details") {
        if (data.bank_details) {
          await DB.tbl_vendor_bank_mapped.destroy({
            where: { vendor_id: id },
            transaction,
          });

          await DB.tbl_vendor_bank_mapped.bulkCreate(
            data.bank_details.map((bank) => ({
              vendor_id: id,
              name: bank.name,
              bank_branch: bank.bank_branch,
              account_holder_name: bank.account_holder_name,
              bank_address: bank.bank_address,
              bank_account_number: bank.bank_account_number,
              bank_unique_number: bank.bank_unique_number,
              bank_swift_code: bank.bank_swift_code,
              bank_iban_code: bank.bank_iban_code,
              bank_nuit_code: bank.bank_nuit_code,
              vendor_bank_country_id: bank.vendor_bank_country_id,
              vendor_bank_state_id: bank.vendor_bank_state_id,
              vendor_bank_city_id: bank.vendor_bank_city_id,
            })),
            { transaction }
          );
        }

        await transaction.commit();

        return res.status(200).send({
          success: true,
          status: "Vendor Bank Details Updated Successfully!",
        });
      }

      // Updating the Vendor Document Details
      if (data.tab_type === "document_details") {
        if (data.document_details) {
          await DB.tbl_vendor_document_mapped.destroy({
            where: { vendor_id: id },
            transaction,
          });

          await DB.tbl_vendor_document_mapped.bulkCreate(
            data.document_details.map((document) => ({
              vendor_id: id,
              document_type: document.document_type,
              document_name: document.document_name,
              document_expiry_date: document.document_expiry_date,
              document_notification_required:
                document.document_notification_required,
            })),
            { transaction }
          );
        }

        await transaction.commit();

        return res.status(200).send({
          success: true,
          status: "Vendor Document Details Updated Successfully!",
        });
      } else {
        return res
          .status(500)
          .send({ success: false, message: "Invalid Tab Type!" });
      }
    }
  } catch (error) {
    await transaction.rollback();
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET VENDOR DETAILS CONTROLLER ========== //
module.exports.getVendorDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
    SELECT V.*, CM.name AS country_name, SM.name AS state_name, CIM.name AS city_name
    FROM VENDOR_MASTER AS V
    LEFT JOIN COUNTRY_MASTER AS CM ON CM.id=V.vendor_country_id
    LEFT JOIN STATE_MASTER AS SM ON SM.id=V.vendor_state_id
    LEFT JOIN CITY_MASTER AS CIM ON CIM.id=V.vendor_city_id
    WHERE V.id=${id}
    AND V.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Vendor Not Found!" });
    } else {
      // Get Vendor Users Details
      const getAssociatedUsers = await DB.tbl_vendor_user_mapped.findAll({
        where: { vendor_id: id, isDeleted: false },
      });
      // Get Vendor Banks Details
      const getAssociatedBanks = await DB.tbl_vendor_bank_mapped.findAll({
        include: [
          {
            model: DB.tbl_country_master,
            as: "vendor_bank_country_details",
            attributes: ["id", "name"],
          },
          {
            model: DB.tbl_state_master,
            as: "vendor_bank_state_details",
            attributes: ["id", "name"],
          },
          {
            model: DB.tbl_city_master,
            as: "vendor_bank_city_details",
            attributes: ["id", "name"],
          },
        ],
        where: { vendor_id: id, isDeleted: false },
      });
      // Get Vendor Documents Details
      const getAssociatedDocuments =
        await DB.tbl_vendor_document_mapped.findAll({
          where: { vendor_id: id, isDeleted: false },
        });

      return res.status(200).send({
        success: true,
        status: "Get Vendor Details Successfully!",
        data: {
          ...getAllData,
          getAssociatedUsers,
          getAssociatedBanks,
          getAssociatedDocuments,
        },
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL VENDOR DETAILS CONTROLLER ========== //
module.exports.getAllVendorDetails = async (req, res) => {
  try {
    const data = req.body;
    let filter = { isDeleted: false };

    if (data?.status !== undefined) {
      filter.status = data.status;
    }

    const getAllData = await DB.tbl_vendor_master.findAll({
      include: [
        {
          model: DB.tbl_country_master,
          attributes: ["id", "name"],
          as: "vendor_country_details",
        },
        {
          model: DB.tbl_state_master,
          attributes: ["id", "name"],
          as: "vendor_state_details",
        },
        {
          model: DB.tbl_city_master,
          attributes: ["id", "name"],
          as: "vendor_city_details",
        },
      ],
      where: filter,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Vendors Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        records: getAllData.length,
        status: "Get All Vendors List!",
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

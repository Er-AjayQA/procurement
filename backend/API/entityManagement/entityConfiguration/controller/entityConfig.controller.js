// ========== REQUIRE STATEMENTS ========== //
const DB = require("../../../../config/index");
const { generateUniqueCode } = require("../../../../helper/generateUniqueCode");

// ********************* EVENT MANAGEMENT CONTROLLERS ********************* //
// ========== CREATE ENTITY CONTROLLER ========== //
module.exports.createEntity = async (req, res) => {
  try {
    const data = req.body;
    const entity_id = req.body?.entity_id || null;

    // ADD BASIC DETAILS TAB DATA
    if (data.tab_type === "basic_details") {
      let { entity_name, display_name, entity_code_prefix, entity_type } =
        req.body;

      // Check if Entity already exist
      const isAlreadyExist = await DB.tbl_entity_configuration.findOne({
        where: {
          [DB.Sequelize.Op.or]: [
            { entity_name: data?.entity_name },
            { display_name: data?.display_name },
          ],
          isDeleted: false,
        },
      });

      if (isAlreadyExist) {
        return res
          .status(409)
          .send({ success: false, message: "Entity Already Exist!" });
      } else {
        if (req.file) {
          data.logo = req.file.path || null;
        }

        let code = await generateUniqueCode(
          "ENT",
          3,
          "entity_code",
          "ENTITY_CONFIGURATION"
        );

        const transaction = await DB.sequelize.transaction();

        try {
          const newEntity = await DB.tbl_entity_configuration.create(
            {
              entity_code: code,
              entity_name: entity_name,
              display_name: display_name,
              entity_code_prefix: entity_code_prefix,
              entity_type: entity_type,
              logo: data.logo, // Added missing logo field
            },
            { transaction }
          );

          await transaction.commit();

          return res.status(201).send({
            success: true,
            message: "Basic Details Saved Successfully!",
            data: newEntity?.id,
          });
        } catch (error) {
          await transaction.rollback();
          throw error;
        }
      }
    }

    // ADD SMTP DETAILS TAB DATA
    if (data.tab_type === "smtp_details") {
      let { smtp_server_address, smtp_port_no, username, password } = req.body;

      let findEntity = await DB.tbl_entity_configuration.findOne({
        where: { id: entity_id },
      });

      if (!findEntity) {
        return res.status(404).send({
          success: false,
          message: "Entity Not Found!",
        });
      }

      const transaction = await DB.sequelize.transaction();
      try {
        // Adding the SMTP Details
        await DB.tbl_entity_configuration.update(
          {
            smtp_server_address: smtp_server_address,
            smtp_port_no: smtp_port_no,
            username: username,
            password: password,
          },
          { where: { id: findEntity?.id }, transaction }
        );

        await transaction.commit();
        return res.status(201).send({
          success: true,
          message: "Smtp details saved successfully",
        });
      } catch (error) {
        console.log("Error in Adding Smtp Details", error);
        await transaction.rollback();
        throw error;
      }
    }

    // ADD COMMUNICATION DETAILS TAB DATA
    if (data.tab_type === "communication_details") {
      let {
        email_domain,
        email_signature,
        contact_country_code,
        contact_no,
        default_time_zone,
        business_hours,
        local_currency,
        tax_info,
        language_preference,
      } = req.body;

      // Find Entity details need to update
      let findEntity = await DB.tbl_entity_configuration.findOne({
        where: { id: entity_id },
      });

      if (!findEntity) {
        return res.status(404).send({
          success: false,
          message: "Entity Not Found!",
        });
      } else {
        const transaction = await DB.sequelize.transaction();

        try {
          await DB.tbl_entity_configuration.update(
            {
              email_domain: email_domain,
              email_signature: email_signature,
              contact_country_code: contact_country_code,
              contact_no: contact_no,
              default_time_zone: default_time_zone,
              business_hours: business_hours,
              local_currency: local_currency,
              tax_info: tax_info,
              language_preference: language_preference,
            },
            { where: { id: findEntity.id }, transaction }
          );

          await transaction.commit();
          return res.status(201).send({
            success: true,
            message: "Communication details Saved successfully",
          });
        } catch (error) {
          console.log("Error in Adding Communication Details", error);
          await transaction.rollback();
          throw error;
        }
      }
    }

    // ADD REGIONAL DETAILS TAB DATA
    if (data.tab_type === "regional_details") {
      let {
        date_format,
        time_format,
        date_time_format,
        thousand_separator,
        decimal_separator,
        currency_symbol,
        currency_symbol_position,
        number_of_decimal,
      } = req.body;

      // Check Entity
      let findEntity = await DB.tbl_entity_configuration.findOne({
        where: { id: entity_id },
      });

      if (!findEntity) {
        return res.status(404).send({
          success: false,
          message: "Entity Not Found!",
        });
      } else {
        try {
          const transaction = await DB.sequelize.transaction();

          await DB.tbl_entity_configuration.update(
            {
              date_format: date_format,
              time_format: time_format,
              date_time_format: date_time_format,
              thousand_separator: thousand_separator,
              decimal_separator: decimal_separator,
              currency_symbol: currency_symbol,
              currency_symbol_position: currency_symbol_position,
              number_of_decimal: number_of_decimal,
            },
            { where: { id: findEntity.id }, transaction }
          );
          await transaction.commit();
          return res.status(201).send({
            success: true,
            message: "Regional details saved successfully",
          });
        } catch (error) {
          console.log("Error in Adding Regional Details", error);
          await transaction.rollback();
          throw error;
        }
      }
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE ENTITY CONTROLLER ========== //
module.exports.updateEntity = async (req, res) => {
  try {
    const data = req.body;

    const isEntityExist = await DB.tbl_entity_configuration.findOne({
      where: { id: req.params.id, isDeleted: false },
    });

    if (!isEntityExist) {
      return res
        .status(404)
        .send({ success: false, message: "Entity Not Exist!" });
    } else {
      // ADD BASIC DETAILS TAB DATA
      if (data.tab_type === "basic_details") {
        const transaction = await DB.sequelize.transaction();

        try {
          let { entity_name, display_name, entity_code_prefix, entity_type } =
            req.body;

          if (req.file) {
            data.logo = req.file.path || null;
          }

          const updateEntity = await DB.tbl_entity_configuration.update(
            {
              entity_name,
              display_name,
              entity_code_prefix,
              entity_type,
            },
            { where: { id: isEntityExist.id } },
            { transaction }
          );

          await transaction.commit();

          return res.status(201).send({
            success: true,
            message: "Basic details updated successfully!",
            data: updateEntity,
          });
        } catch (error) {
          await transaction.rollback();
          throw error;
        }
      }

      // ADD SMTP DETAILS TAB DATA
      if (data.tab_type === "smtp_details") {
        let { smtp_server_address, smtp_port_no, username, password } =
          req.body;

        const transaction = await DB.sequelize.transaction();
        try {
          // Adding the Personal Details
          await DB.tbl_entity_configuration.update(
            {
              smtp_server_address,
              smtp_port_no,
              username,
              password,
            },
            {
              where: { id: isEntityExist.id },
              transaction,
            }
          );

          await transaction.commit();
          return res.status(201).send({
            success: true,
            message: "SMTP details updated successfully",
          });
        } catch (error) {
          console.log("Error in Updating SMTP Details", error);
          await transaction.rollback();
          throw error;
        }
      }

      // ADD COMMUNICATION DETAILS TAB DATA
      if (data.tab_type === "communication_details") {
        let data = req.body;

        const transaction = await DB.sequelize.transaction();

        try {
          await DB.tbl_entity_configuration.update(
            {
              email_domain: data?.email_domain,
              email_signature: data?.email_signature,
              contact_country_code: data?.contact_country_code,
              contact_no: data?.contact_no,
              default_time_zone: data?.default_time_zone,
              business_hours: data?.business_hours,
              local_currency: data?.local_currency,
              tax_info: data?.tax_info,
              language_preference: data?.language_preference,
            },
            { where: { id: isEntityExist.id }, transaction }
          );

          await transaction.commit();
          return res.status(201).send({
            success: true,
            message: "Communication details Updated successfully",
          });
        } catch (error) {
          console.log("Error in Updating Communication Details", error);
          await transaction.rollback();
          throw error;
        }
      }

      // ADD REGIONAL DETAILS TAB DATA
      if (data.tab_type === "regional_details") {
        let {
          date_format,
          time_format,
          date_time_format,
          thousand_separator,
          decimal_separator,
          currency_symbol,
          currency_symbol_position,
          number_of_decimal,
        } = req.body;
        try {
          const transaction = await DB.sequelize.transaction();

          await DB.tbl_entity_configuration.update(
            {
              date_format,
              time_format,
              date_time_format,
              thousand_separator,
              decimal_separator,
              currency_symbol,
              currency_symbol_position,
              number_of_decimal,
            },
            {
              where: { id: isEntityExist.id },
              transaction,
            }
          );
          await transaction.commit();
          return res.status(201).send({
            success: true,
            message: "Regional details Updated successfully",
          });
        } catch (error) {
          console.log("Error in Updating Regional Details", error);
          await transaction.rollback();
          throw error;
        }
      }
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ENTITY DETAILS CONTROLLER ========== //
module.exports.getEntityDetails = async (req, res) => {
  try {
    const { id } = req.params;

    let query = `
      SELECT 
        EC.*
      FROM ENTITY_CONFIGURATION AS EC
      WHERE EC.id= ${id} AND EC.isDeleted = false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(404)
        .send({ success: false, message: "Entity not found!" });
    } else {
      // Getting Allowance Details
      // const allowances = await DB.tbl_userAllowance_master.findAll({
      //   attributes: ["id", "amount", "allowance_id", "uniqueCode"],
      //   where: { user_id: getAllData[0].id, isDeleted: false },
      //   include: [
      //     {
      //       model: DB.tbl_allowance_master,
      //       attributes: ["id", "name", "is_taxable"],
      //       where: { isDeleted: false },
      //     },
      //   ],
      // });

      // getAllData[0] = {
      //   ...getAllData[0],
      //   allowance_details: allowances,
      //   family_details: family_details,
      //   previous_employer_details: prev_emp_details,
      //   salary_history: salary_revision_details,
      // };
      return res.status(200).send({
        success: true,
        status: "Get entity details successfully!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL ENTITY DETAILS CONTROLLER ========== //
module.exports.getAllEntityDetails = async (req, res) => {
  try {
    const limit = parseInt(req.body.limit) || 10;
    const page = parseInt(req.body.page) || 1;
    const offset = (page - 1) * limit;
    const filter = req.body.filter || {};

    // Base queries
    let countQuery = `
      SELECT COUNT(*) as total 
      FROM ENTITY_CONFIGURATION AS EC
      WHERE EC.isDeleted = false`;

    let query = `
      SELECT 
        EC.*
      FROM ENTITY_CONFIGURATION AS EC
      WHERE EC.isDeleted = false`;

    // Prepare replacements object
    const replacements = {
      limit: limit,
      offset: offset,
    };

    // Add Name filter if provided
    if (filter?.name) {
      countQuery += ` AND EC.entity_name = :name`;
      query += ` AND EC.entity_name = :name`;
      replacements.entity_name = filter.name;
    }

    // Complete the queries
    query += ` GROUP BY EC.id`;
    query += ` ORDER BY EC.createdAt DESC`;
    query += ` LIMIT :limit OFFSET :offset`;

    // Get total count
    const totalResult = await DB.sequelize.query(countQuery, {
      replacements: replacements,
      type: DB.sequelize.QueryTypes.SELECT,
    });
    const totalRecords = totalResult[0].total;
    const totalPages = Math.ceil(totalRecords / limit);

    // Get paginated data
    const getAllData = await DB.sequelize.query(query, {
      replacements: replacements,
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(200)
        .send({ success: true, message: "No entity found!", data: [] });
    } else {
      return res.status(200).send({
        success: true,
        message: "Get all entities list successfully!",
        records: getAllData.length,
        data: getAllData,
        pagination: {
          currentPage: page,
          itemsPerPage: limit,
          totalItems: totalRecords,
          totalPages: totalPages,
        },
      });
    }
  } catch (error) {
    console.error("Error in getAllEntitiesList:", error);
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== CHANGE ENTITY STATUS CONTROLLER ========== //
module.exports.updateEntityStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // Check if Entity Exist
    const isEntityExist = await DB.tbl_entity_configuration.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isEntityExist) {
      return res
        .status(404)
        .send({ success: false, message: "Entity not found!" });
    } else {
      const updateStatus = await isEntityExist.update({
        status: !isEntityExist?.status,
      });
      return res.status(201).send({
        success: true,
        message: `Status changed successfully!`,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== DELETE ENTITY CONTROLLER ========== //
module.exports.deleteEntity = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Entity Exist
    const isEntityExist = await DB.tbl_entity_configuration.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isEntityExist) {
      return res
        .status(404)
        .send({ success: false, message: "Entity not found!" });
    } else {
      await isEntityExist.update({
        isDeleted: true,
      });
      return res.status(201).send({
        success: true,
        message: "Entity Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

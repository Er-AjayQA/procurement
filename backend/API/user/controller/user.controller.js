// ========== REQUIRE STATEMENTS ========== //
const DB = require("../../../config/index");
const { generateUniqueCode } = require("../../../helper/generateUniqueCode");
const bcrypt = require("bcrypt");
const sodium = require("libsodium-wrappers");
const jwt = require("jsonwebtoken");
const { generateOTP } = require("../../../helper/generateOTP");
const {
  sendOtpMail,
  sendResetPasswordConfirmationMail,
} = require("../../../helper/mails.config");
const { where } = require("sequelize");

// ========== CREATE USER CONTROLLER ========== //
module.exports.createUser = async (req, res) => {
  try {
    const data = req.body;
    const user_id = req.body?.user_id || null;

    // ADD BASIC DETAILS TAB DATA
    if (data.tab_type === "basic_details") {
      let {
        title,
        name,
        contact_no,
        alt_contact_no,
        dob,
        gender,
        personal_email,
        official_email,
        reporting_manager_id,
        dep_id,
        area_id,
        designation_id,
        emp_type_id,
        branch_id,
        role_id,
      } = req.body;

      // Check if user already exist
      const isAlreadyExist = await DB.tbl_user_master.findOne({
        where: {
          [DB.Sequelize.Op.or]: [
            { official_email: data.official_email },
            { contact_no: data.contact_no },
          ],

          isDeleted: false,
        },
      });

      if (isAlreadyExist) {
        return res
          .status(400)
          .send({ success: false, message: "User Already Exist!" });
      } else {
        const isLoginExist = await DB.tbl_login_master.findOne({
          where: {
            official_email,
            isDeleted: false,
          },
        });

        if (isLoginExist) {
          return res.status(400).send({
            success: false,
            message: "Login Details Already Exist!",
          });
        } else {
          if (req.file) {
            data.userImage = req.file.path || null;
          }

          let code = await generateUniqueCode(
            "EMP",
            3,
            "emp_code",
            "USER_MASTER"
          );
          // data.emp_code = code;
          let newPwd = "123456789";
          const salt = await bcrypt.genSalt(12);
          let hashedPwd = await bcrypt.hash(newPwd, salt);

          const transaction = await DB.sequelize.transaction();

          try {
            const newUser = await DB.tbl_user_master.create(
              {
                emp_code: code,
                title,
                name,
                userImage: data.userImage,
                contact_no,
                alt_contact_no,
                dob,
                gender,
                personal_email,
                official_email,
                reporting_manager_id,
                dep_id,
                area_id,
                designation_id,
                emp_type_id,
                role_id,
                branch_id,
              },
              { transaction }
            );

            await DB.tbl_login_master.create(
              {
                user_id: newUser.id,
                official_email: data.official_email,
                password: hashedPwd,
              },
              { transaction }
            );

            await transaction.commit();

            return res.status(200).send({
              success: true,
              message: "User Basic Details Created Successfully!",
              data: newUser?.id,
            });
          } catch (error) {
            await transaction.rollback();
            throw error;
          }
        }
      }
    }

    // ADD PERSONAL DETAILS TAB DATA
    if (data.tab_type === "personal_details") {
      let {
        present_country_id,
        present_state_id,
        present_city_id,
        present_address,
        permanent_country_id,
        permanent_state_id,
        permanent_city_id,
        permanent_address,
        nationality,
        personal_state_id,
        personal_city_id,
        dire_number,
        driving_license,
        blood_group,
        id_number,
        id_issue_date,
        id_exp_date,
        passport_number,
        passport_issue_date,
        passport_exp_date,
        tax_number,
        marital_status,
        spouse_name,
        family_details,
        previous_employer_details,
      } = req.body;

      let findUser = await DB.tbl_user_master.findOne({
        where: { id: user_id },
      });

      if (!findUser) {
        return res.status(400).send({
          success: false,
          message: "User Not Found For Adding Personal Details!",
        });
      }

      const transaction = await DB.sequelize.transaction();
      try {
        // Adding the Personal Details
        await DB.tbl_user_master.update(
          {
            present_country_id,
            present_state_id,
            present_city_id,
            present_address,
            permanent_country_id,
            permanent_state_id,
            permanent_city_id,
            permanent_address,
            nationality,
            personal_state_id,
            personal_city_id,
            dire_number,
            driving_license,
            blood_group,
            id_number,
            id_issue_date,
            id_exp_date,
            passport_number,
            passport_issue_date,
            passport_exp_date,
            tax_number,
            marital_status,
            spouse_name,
          },
          { where: { id: findUser.id }, transaction }
        );

        // Deleting Existing Family Details Before Adding New One
        await DB.tbl_user_family_detail.destroy({
          where: { user_id: findUser.id },
          transaction,
        });

        // Adding the User Family Details
        if (family_details && family_details.length > 0) {
          await DB.tbl_user_family_detail.bulkCreate(
            family_details.map((family) => ({
              user_id: findUser.id,
              member_name: family.member_name,
              dob: family.dob,
              relation_type: family.relation_type,
              contact_number: family.contact_number,
              remark: family.remark,
              selected_as_emergency: family.selected_as_emergency,
            })),
            { transaction }
          );
        }

        // Deleting Existing Previous Employer Details Before Adding New One
        await DB.tbl_user_previous_employer_detail.destroy({
          where: { user_id: findUser.id },
          transaction,
        });

        // Adding the User Previous Employer Details
        if (previous_employer_details && previous_employer_details.length > 0) {
          await DB.tbl_user_previous_employer_detail.bulkCreate(
            previous_employer_details.map((previous_employer) => ({
              user_id: findUser.id,
              company_name: previous_employer.company_name,
              from_date: previous_employer.from_date,
              to_date: previous_employer.to_date,
              last_drawn_salary: previous_employer.last_drawn_salary,
              reason_of_leaving: previous_employer.reason_of_leaving,
              location: previous_employer.location,
            })),
            { transaction }
          );
        }

        await transaction.commit();
        return res.status(200).send({
          success: true,
          message: "Personal details updated successfully",
        });
      } catch (error) {
        console.log("Error in Adding Personal Details", error);
        await transaction.rollback();
        throw error;
      }
    }

    // ADD SALARY DETAILS TAB DATA
    if (data.tab_type === "salary_details") {
      let {
        shift_id,
        base_salary,
        daily_working_hours,
        salary_per_day,
        salary_per_hour,
        total_monthly_hours,
        weekly_hours,
        allowances,
      } = req.body;

      // Find user details need to update
      let findUser = await DB.tbl_user_master.findOne({
        where: { id: user_id },
      });

      if (!findUser) {
        return res.status(400).send({
          success: false,
          message: "User Not Found For Adding Salary Details!",
        });
      } else {
        const transaction = await DB.sequelize.transaction();

        try {
          // Adding Salary Basic Details
          await DB.tbl_user_master.update(
            {
              shift_id,
              base_salary,
              daily_working_hours,
              salary_per_day,
              salary_per_hour,
              total_monthly_hours,
              weekly_hours,
            },
            { where: { id: findUser.id }, transaction }
          );

          // Deleting User Allowance if any exist
          await DB.tbl_userAllowance_master.destroy({
            where: { user_id: findUser.id },
            transaction,
          });

          // Adding the User Allowance
          if (allowances && allowances.length > 0) {
            await DB.tbl_userAllowance_master.bulkCreate(
              allowances.map((allowance) => ({
                user_id: findUser.id,
                allowance_id: allowance.allowance_id,
                uniqueCode: allowance.id,
                amount: allowance.amount,
              })),
              { transaction }
            );
          }

          await transaction.commit();
          return res.status(200).send({
            success: true,
            message: "Salary details Added successfully",
          });
        } catch (error) {
          console.log("Error in Adding Allowance Details", error);
          await transaction.rollback();
          throw error;
        }
      }
    }

    // ADD PAYMENT DETAILS TAB DATA
    if (data.tab_type === "payment_details") {
      let {
        bank_id,
        account_holder_name,
        bank_address,
        account_number,
        re_account_number,
        nuit_number,
        inss_number,
        nib_number,
      } = req.body;

      // Check User
      let findUser = await DB.tbl_user_master.findOne({
        where: { id: user_id },
      });

      if (!findUser) {
        return res.status(400).send({
          success: false,
          message: "User Not Found For Adding Payment Details!",
        });
      } else {
        try {
          if (parseInt(account_number) !== parseInt(re_account_number)) {
            return res.status(400).send({
              success: false,
              message: "Account_No. & Re_Account_no. Should be Same!",
            });
          } else {
            const transaction = await DB.sequelize.transaction();

            // Adding the Payment Details
            await DB.tbl_user_master.update(
              {
                bank_id,
                account_holder_name,
                bank_address,
                account_number,
                re_account_number,
                nuit_number,
                inss_number,
                nib_number,
              },
              { where: { id: findUser.id }, transaction }
            );
            await transaction.commit();
            return res.status(200).send({
              success: true,
              message: "Payment details Added successfully",
            });
          }
        } catch (error) {
          console.log("Error in Adding Payment Details", error);
          await transaction.rollback();
          throw error;
        }
      }
    }

    // ADD DOCUMENT DETAILS TAB DATA
    if (data.tab_type === "document_details") {
    }

    // ADD CONTRACT DETAILS TAB DATA
    if (data.tab_type === "contract_details") {
      const {
        contract_type_id,
        start_working_date,
        probation_end_date,
        notice_period_days,
      } = req.body;

      //  Check if user exist
      const findUser = await DB.tbl_user_master.findOne({
        where: { id: user_id },
      });

      if (!findUser) {
        return res.status(400).send({
          success: false,
          message: "User Not Found For Adding Contract Details!",
        });
      } else {
        const transaction = await DB.sequelize.transaction();

        try {
          // Update the user contract details
          await DB.tbl_user_master.update(
            {
              contract_type_id,
              start_working_date,
              probation_end_date,
              notice_period_days,
            },
            { where: { id: findUser.id }, transaction }
          );

          await transaction.commit();
          return res.status(200).send({
            success: true,
            message: "Contract details Added successfully",
          });
        } catch (error) {
          console.log("Error in Adding Contract Details", error);
          await transaction.rollback();
          throw error;
        }
      }
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE USER CONTROLLER ========== //
module.exports.updateUser = async (req, res) => {
  try {
    const data = req.body;

    console.log("Payload Data Backend===>", data);

    const isUserExist = await DB.tbl_user_master.findOne({
      where: { id: req.params.id, isDeleted: false },
    });

    if (!isUserExist) {
      return res
        .status(404)
        .send({ success: false, message: "User Not Exist!" });
    } else {
      // ADD BASIC DETAILS TAB DATA
      if (data.tab_type === "basic_details") {
        const transaction = await DB.sequelize.transaction();

        try {
          let {
            title,
            name,
            contact_no,
            alt_contact_no,
            dob,
            gender,
            personal_email,
            official_email,
            reporting_manager_id,
            dep_id,
            area_id,
            designation_id,
            emp_type_id,
            branch_id,
            role_id,
            userImage,
          } = req.body;

          if (req.file) {
            userImage = req.file.path || isUserExist.userImage;
          }

          const updateUser = await DB.tbl_user_master.update(
            {
              title,
              name,
              userImage,
              contact_no,
              alt_contact_no,
              dob,
              gender,
              personal_email,
              official_email,
              reporting_manager_id,
              dep_id,
              area_id,
              designation_id,
              emp_type_id,
              role_id,
              branch_id,
            },
            { where: { id: isUserExist.id } },
            { transaction }
          );

          if (data.official_email !== isUserExist.official_email) {
            await DB.tbl_login_master.update(
              { official_email: data.official_email },
              { where: { user_id: isUserExist.id } },
              { transaction }
            );
          }

          await transaction.commit();

          return res.status(200).send({
            success: true,
            message: "Basic Details Updated Successfully!",
            data: updateUser,
          });
        } catch (error) {
          await transaction.rollback();
          throw error;
        }
      }

      // ADD PERSONAL DETAILS TAB DATA
      if (data.tab_type === "personal_details") {
        let {
          present_country_id,
          present_state_id,
          present_city_id,
          present_address,
          permanent_country_id,
          permanent_state_id,
          permanent_city_id,
          permanent_address,
          nationality,
          personal_state_id,
          personal_city_id,
          dire_number,
          driving_license,
          blood_group,
          id_number,
          id_issue_date,
          id_exp_date,
          passport_number,
          passport_issue_date,
          passport_exp_date,
          tax_number,
          marital_status,
          spouse_name,
          family_details,
          previous_employer_details,
        } = req.body;

        const transaction = await DB.sequelize.transaction();
        try {
          // Adding the Personal Details
          await DB.tbl_user_master.update(
            {
              present_country_id,
              present_state_id,
              present_city_id,
              present_address,
              permanent_country_id,
              permanent_state_id,
              permanent_city_id,
              permanent_address,
              nationality,
              personal_state_id,
              personal_city_id,
              dire_number,
              driving_license,
              blood_group,
              id_number,
              id_issue_date,
              id_exp_date,
              passport_number,
              passport_issue_date,
              passport_exp_date,
              tax_number,
              marital_status,
              spouse_name,
            },
            {
              where: { id: isUserExist.id },
              transaction,
            }
          );

          // Deleting Existing Family Details Before Adding New One
          await DB.tbl_user_family_detail.destroy({
            where: { user_id: isUserExist.id },
            transaction,
          });

          // Adding the User Family Details
          if (family_details && family_details.length > 0) {
            await DB.tbl_user_family_detail.bulkCreate(
              family_details.map((family) => ({
                user_id: isUserExist.id,
                member_name: family.member_name,
                dob: family.dob,
                relation_type: family.relation_type,
                contact_number: family.contact_number,
                remark: family.remark,
                selected_as_emergency: family.selected_as_emergency,
              })),
              { transaction }
            );
          }

          // Deleting Existing Previous Employer Details Before Adding New One
          await DB.tbl_user_previous_employer_detail.destroy({
            where: { user_id: isUserExist.id },
            transaction,
          });

          // Adding the User Previous Employer Details
          if (
            previous_employer_details &&
            previous_employer_details.length > 0
          ) {
            await DB.tbl_user_previous_employer_detail.bulkCreate(
              previous_employer_details.map((previous_employer) => ({
                user_id: isUserExist.id,
                company_name: previous_employer.company_name,
                from_date: previous_employer.from_date,
                to_date: previous_employer.to_date,
                last_drawn_salary: previous_employer.last_drawn_salary,
                reason_of_leaving: previous_employer.reason_of_leaving,
                location: previous_employer.location,
              })),
              { transaction }
            );
          }

          await transaction.commit();
          return res.status(200).send({
            success: true,
            message: "Personal details updated successfully",
          });
        } catch (error) {
          console.log("Error in Updating Personal Details", error);
          await transaction.rollback();
          throw error;
        }
      }

      // ADD SALARY DETAILS TAB DATA
      if (data.tab_type === "salary_details") {
        let data = req.body;

        const transaction = await DB.sequelize.transaction();

        try {
          // Adding Salary Basic Details
          await DB.tbl_user_master.update(
            {
              shift_id: data?.shift_id,
              base_salary: data?.base_salary,
              daily_working_hours: data?.daily_working_hours,
              salary_per_day: data?.salary_per_day,
              salary_per_hour: data?.salary_per_hour,
              total_monthly_hours: data?.total_monthly_hours,
              weekly_hours: data?.weekly_hours,
            },
            { where: { id: isUserExist.id }, transaction }
          );

          // Deleting User Allowance if any exist
          await DB.tbl_userAllowance_master.destroy({
            where: { user_id: isUserExist.id },
            transaction,
          });

          // Adding the User Allowance
          if (data?.allowances && data.allowances.length > 0) {
            await DB.tbl_userAllowance_master.bulkCreate(
              data?.allowances.map((allowance) => ({
                user_id: isUserExist.id,
                uniqueCode: allowance.id,
                allowance_id: allowance.allowance_id,
                amount: allowance.amount,
              })),
              { transaction }
            );
          }

          await transaction.commit();
          return res.status(200).send({
            success: true,
            message: "Salary details Updated successfully",
          });
        } catch (error) {
          console.log("Error in Updating Salary Details", error);
          await transaction.rollback();
          throw error;
        }
      }

      // ADD PAYMENT DETAILS TAB DATA
      if (data.tab_type === "payment_details") {
        let {
          bank_id,
          account_holder_name,
          bank_address,
          account_number,
          re_account_number,
          nuit_number,
          inss_number,
          nib_number,
        } = req.body;
        try {
          if (data.account_number !== data.re_account_number) {
            return res.status(200).send({
              success: true,
              message: "Account_No. & Re_Account_no. Should be Same!",
            });
          } else {
            const transaction = await DB.sequelize.transaction();

            // Adding the Payment Details
            await DB.tbl_user_master.update(
              {
                bank_id,
                account_holder_name,
                bank_address,
                account_number,
                re_account_number,
                nuit_number,
                inss_number,
                nib_number,
              },
              {
                where: { id: isUserExist.id },
                transaction,
              }
            );
            await transaction.commit();
            return res.status(200).send({
              success: true,
              message: "Payment details Updated successfully",
            });
          }
        } catch (error) {
          console.log("Error in Updating Payment Details", error);
          await transaction.rollback();
          throw error;
        }
      }

      // ADD DOCUMENT DETAILS TAB DATA
      if (data.tab_type === "document_details") {
      }

      // ADD CONTRACT DETAILS TAB DATA
      if (data.tab_type === "contract_details") {
        const {
          contract_type_id,
          start_working_date,
          probation_end_date,
          notice_period_days,
        } = req.body;

        const transaction = await DB.sequelize.transaction();

        try {
          // Update the user contract details
          await DB.tbl_user_master.update(
            {
              contract_type_id,
              start_working_date,
              probation_end_date,
              notice_period_days,
            },
            {
              where: { id: isUserExist.id },
              transaction,
            }
          );

          await transaction.commit();
          return res.status(200).send({
            success: true,
            message: "Contract details Updated successfully",
          });
        } catch (error) {
          console.log("Error in Updated Contract Details", error);
          await transaction.rollback();
          throw error;
        }
      }
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET USER DETAILS CONTROLLER ========== //
module.exports.getUserDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
    SELECT U.*, D.dep_code AS department_code, D.name AS department_name, DES.name AS designation_name, role.name AS role_name,
       area.name AS area_name, E.name AS employment_type, CT.name AS contract_type_name, B.name AS bank_name, 
       M.name AS reporting_manager, SM.name AS shift_name, BR.name AS branch_name,
       perm_country.name AS permanent_country_name, perm_state.name AS permanent_state_name, 
       perm_city.name AS permanent_city_name, 
       pres_country.name AS present_country_name, pres_state.name AS present_state_name, 
       pres_city.name AS present_city_name, 
       personal_state.name AS personal_state_name, personal_city.name AS personal_city_name
       FROM USER_MASTER AS U
       LEFT JOIN DEPARTMENT_MASTER AS D ON D.id=U.dep_id
       LEFT JOIN ROLE_MASTER AS role ON role.id=U.role_id
       LEFT JOIN AREA_MASTER AS area ON area.id=U.area_id
       LEFT JOIN DESIGNATION_MASTER AS DES ON DES.id=U.designation_id
       LEFT JOIN EMPLOYMENT_TYPE_MASTER AS E ON E.id=U.emp_type_id
       LEFT JOIN USER_MASTER AS M ON M.id=U.reporting_manager_id
       LEFT JOIN BANK_MASTER AS B ON B.id=U.bank_id
       LEFT JOIN BRANCH_MASTER AS BR ON BR.id=U.branch_id
       LEFT JOIN CONTRACT_TYPE_MASTER AS CT ON CT.id=U.contract_type_id
       LEFT JOIN SHIFT_MASTER AS SM ON SM.id=U.shift_id
       LEFT JOIN USER_ALLOWANCE_MASTER AS UA ON UA.user_id=U.id
       LEFT JOIN USER_FAMILY_DETAIL AS UF ON UF.user_id=U.id
       LEFT JOIN USER_PREVIOUS_EMPLOYER_DETAIL AS UPE ON UPE.user_id=U.id
       LEFT JOIN USER_SALARY_REVISION AS USR ON USR.user_id=U.id
       LEFT JOIN COUNTRY_MASTER AS perm_country ON perm_country.id=U.permanent_country_id
       LEFT JOIN STATE_MASTER AS perm_state ON perm_state.id=U.permanent_state_id
       LEFT JOIN CITY_MASTER AS perm_city ON perm_city.id=U.permanent_city_id
       LEFT JOIN COUNTRY_MASTER AS pres_country ON pres_country.id=U.present_country_id
       LEFT JOIN STATE_MASTER AS pres_state ON pres_state.id=U.present_state_id
       LEFT JOIN CITY_MASTER AS pres_city ON pres_city.id=U.present_city_id
       LEFT JOIN STATE_MASTER AS personal_state ON personal_state.id=U.personal_state_id
       LEFT JOIN CITY_MASTER AS personal_city ON personal_city.id=U.personal_city_id
       WHERE U.id=${id} AND U.isDeleted=false
       GROUP BY U.id`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "User Not Found!" });
    } else {
      // Getting Allowance Details
      const allowances = await DB.tbl_userAllowance_master.findAll({
        attributes: ["id", "amount", "allowance_id", "uniqueCode"],
        where: { user_id: getAllData[0].id, isDeleted: false },
        include: [
          {
            model: DB.tbl_allowance_master,
            attributes: ["id", "name", "is_taxable"],
            where: { isDeleted: false },
          },
        ],
      });

      // Getting Allowance Details
      const family_details = await DB.tbl_user_family_detail.findAll({
        attributes: [
          "id",
          "member_name",
          "dob",
          "relation_type",
          "contact_number",
          "remark",
          "selected_as_emergency",
        ],
        where: { user_id: getAllData[0].id, isDeleted: false },
      });

      // Getting Registered Entities Details
      const registered_entities_details =
        await DB.tbl_user_registered_entities.findAll({
          include: [
            {
              model: DB.tbl_entity_configuration,
              attributes: ["id", "entity_name"],
            },
          ],
          where: { user_id: getAllData[0].id, isDeleted: false },
        });

      // Getting Previous Employer Details
      const prev_emp_details =
        await DB.tbl_user_previous_employer_detail.findAll({
          attributes: [
            "id",
            "company_name",
            "from_date",
            "to_date",
            "last_drawn_salary",
            "reason_of_leaving",
            "location",
          ],
          where: { user_id: getAllData[0].id, isDeleted: false },
        });

      // Getting Salary Revision Details
      const salary_revision_details = await DB.tbl_user_salary_revision.findAll(
        {
          attributes: [
            "id",
            "year",
            "month",
            "new_salary",
            "old_salary",
            "revision_percent",
            "remark",
          ],
          where: { user_id: getAllData[0].id, isDeleted: false },
        }
      );

      getAllData[0] = {
        ...getAllData[0],
        allowance_details: allowances,
        family_details: family_details,
        previous_employer_details: prev_emp_details,
        salary_history: salary_revision_details,
        registered_entities_details: registered_entities_details?.map(
          (data) => data?.ENTITY_CONFIGURATION
        ),
      };
      return res.status(200).send({
        success: true,
        status: "Get User Details Successfully!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL USER DETAILS CONTROLLER ========== //
module.exports.getAllUserDetails = async (req, res) => {
  try {
    const limit = parseInt(req.body.limit) || 10;
    const page = parseInt(req.body.page) || 1;
    const offset = (page - 1) * limit;
    const filter = req.body.filter || {};

    // Base queries
    let countQuery = `
      SELECT COUNT(*) as total 
      FROM USER_MASTER AS U
      WHERE U.isDeleted = false`;

    let query = `
      SELECT 
        U.*, D.dep_code AS department_code, D.name AS department_name, DES.name AS designation_name, R.name AS role_name,
       E.name AS employment_type, M.name AS reporting_manager, BR.name AS branch_name
      FROM USER_MASTER AS U
      LEFT JOIN DEPARTMENT_MASTER AS D ON D.id = U.dep_id
      LEFT JOIN ROLE_MASTER AS R ON R.id = U.role_id
      LEFT JOIN DESIGNATION_MASTER AS DES ON DES.id = U.designation_id
      LEFT JOIN EMPLOYMENT_TYPE_MASTER AS E ON E.id = U.emp_type_id
      LEFT JOIN USER_MASTER AS M ON M.id = U.reporting_manager_id
      LEFT JOIN BRANCH_MASTER AS BR ON BR.id = U.branch_id
      WHERE U.isDeleted = false`;

    // Prepare replacements object
    const replacements = {
      limit: limit,
      offset: offset,
    };

    // Add role_id filter if provided
    if (filter.role_id) {
      countQuery += ` AND U.role_id = :role_id`;
      query += ` AND U.role_id = :role_id`;
      replacements.role_id = filter.role_id;
    }

    // Add user_id filter if provided
    if (filter.name) {
      countQuery += ` AND U.name LIKE :name`;
      query += ` AND U.name LIKE :name`;
      replacements.name = `%${filter.name}%`;
    }

    // Complete the queries
    query += ` GROUP BY U.id`; // Only group by the primary key
    query += ` ORDER BY U.createdAt DESC`;
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
        .send({ success: true, message: "No users found!", data: [] });
    } else {
      return res.status(200).send({
        success: true,
        message: "Get User Details Successfully!",
        records: getAllData.length,
        data: getAllData,
        pagination: {
          currentPage: page,
          itemsPerPage: limit,
          totalItems: totalRecords, // Use totalRecords instead of getAllData.length
          totalPages: totalPages,
        },
      });
    }
  } catch (error) {
    console.error("Error in getAllUserDetails:", error);
    res.status(500).send({ success: false, message: error.message });
  }
};
// ========== UPDATE USER CONTROLLER ========== //
module.exports.updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user already exist
    const isUserExist = await DB.tbl_user_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isUserExist) {
      return res
        .status(404)
        .send({ success: false, message: "User Not Found!" });
    } else {
      const updateStatus = await isUserExist.update({
        status: !isUserExist.status,
      });
      return res.status(200).send({
        success: true,
        message: "Status Changed Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== DELETE USER CONTROLLER ========== //
module.exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user already exist
    const isUserExist = await DB.tbl_user_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isUserExist) {
      return res
        .status(400)
        .send({ success: false, message: "User Not Found!" });
    } else {
      await isUserExist.update({
        isDeleted: true,
      });
      await DB.tbl_login_master.update(
        { isDeleted: true },
        { where: { user_id: id } }
      );
      return res.status(200).send({
        success: true,
        message: "User Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== USER LOGIN CONTROLLER ========== //
module.exports.userLogin = async (req, res) => {
  try {
    const { official_email, password, remember } = req.body;

    // Validate Content
    const validateContent = (official_email, password) => {
      // Validate Official EmailId
      if (!official_email || official_email.trim() === "") {
        return "Official EmailId is Required!";
      }
      // Validate Password
      if (!password || password.trim() === "") {
        return "Password is Required!";
      } else {
        return true;
      }
    };

    const validation = validateContent(official_email, password);

    if (validation !== true) {
      return res.status(500).send({
        success: false,
        message: validation,
      });
    }

    // Get User Details
    const getUserDetails = await DB.tbl_login_master.findOne({
      where: { official_email, isDeleted: false, status: true },
      include: [
        {
          model: DB.tbl_user_master,
          where: { isDeleted: false, status: true },
        },
      ],
    });

    if (!getUserDetails) {
      return res.status(404).send({
        success: false,
        message: "User Not Found!",
      });
    }

    // Verify Password
    const isPasswordValid = await bcrypt.compare(
      password,
      getUserDetails.password
    );
    if (!isPasswordValid) {
      return res.status(401).send({
        success: false,
        message: "Invalid Credentials!",
      });
    }

    // Get User Details
    const userDetails = await DB.sequelize.query(
      `SELECT U.id, U.emp_code, U.name, U.userImage, U.gender, U.official_email, U.primary_entity_id
        FROM USER_MASTER AS U
        WHERE U.official_email=:official_email`,
      {
        replacements: { official_email },
        type: DB.sequelize.QueryTypes.SELECT,
      }
    );

    console.log("User Details...........", userDetails);

    // Create Token
    await sodium.ready; // Initializing
    const jwtSecrete = sodium.to_hex(sodium.randombytes_buf(64));
    const token = jwt.sign(
      {
        id: userDetails[0].id,
        emp_code: userDetails[0]?.emp_code,
        userName: userDetails[0]?.name,
        userImage: userDetails[0]?.userImage,
        official_email: userDetails[0]?.official_email,
        primary_entity_id: userDetails[0]?.primary_entity_id,
      },
      jwtSecrete
    );

    return res.status(200).send({
      success: true,
      message: "Login successfully!",
      token,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== SEND OTP CONTROLLER ========== //
module.exports.sendOTP = async (req, res) => {
  try {
    const { official_email } = req.body;

    const userDetails = await DB.tbl_login_master.findOne({
      where: { official_email, isDeleted: false, status: true },
    });

    if (!userDetails) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email Id",
      });
    }

    let otp = generateOTP();

    const result = await sendOtpMail(official_email, otp);

    if (result.status) {
      await DB.tbl_login_master.update(
        { otp },
        { where: { official_email, isDeleted: false, status: true } }
      );

      return res.status(200).send({
        success: result.status,
        message: result.message,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== VERIFY OTP CONTROLLER ========== //
module.exports.verifyOTP = async (req, res) => {
  try {
    const { official_email, otp } = req.body;

    // Get data
    const data = await DB.tbl_login_master.findOne({
      where: { official_email, isDeleted: false, status: true },
    });

    if (!data) {
      return res.status(404).send({
        success: false,
        message: "No Such User Found",
      });
    }

    if (data.otp === otp) {
      return res.status(200).send({
        success: true,
        message: "OTP Verified Successfully!",
      });
    }

    if (data.otp !== otp) {
      return res.status(500).send({
        success: false,
        message: "Invalid OTP!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== RESET PASSWORD CONTROLLER ========== //
module.exports.resetPassword = async (req, res) => {
  try {
    const { official_email, new_password } = req.body;

    const salt = await bcrypt.genSalt(12);
    let hashedPwd = await bcrypt.hash(new_password, salt);

    await DB.tbl_login_master.update(
      { password: hashedPwd },
      { where: { official_email, isDeleted: false, status: true } }
    );

    await sendResetPasswordConfirmationMail(official_email, new_password);
    return res.status(201).send({
      success: true,
      message: "Password Reset Successfully!",
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

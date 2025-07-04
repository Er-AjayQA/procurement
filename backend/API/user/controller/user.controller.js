// ========== REQUIRE STATEMENTS ========== //
const { where } = require("sequelize");
const DB = require("../../../config/index");
const { generateUniqueCode } = require("../../../helper/generateUniqueCode");
const bcrypt = require("bcrypt");

// ========== CREATE USER CONTROLLER ========== //
module.exports.createUser = async (req, res) => {
  try {
    const data = req.body;

    // ADD BASIC DETAILS TAB DATA
    if (data.tab_type === "basic_details") {
      let {
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
              status: "User Created Successfully!",
              data: newUser,
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
        present_country_address,
        present_state_address,
        present_city_address,
        present_address,
        permanent_country_address,
        permanent_state_address,
        permanent_city_address,
        permanent_address,
        nationality,
        personal_state,
        personal_city,
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
        where: { official_email: data.official_email },
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
            present_country_address,
            present_state_address,
            present_city_address,
            present_address,
            permanent_country_address,
            permanent_state_address,
            permanent_city_address,
            permanent_address,
            nationality,
            personal_state,
            personal_city,
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
        salary_revision_details,
      } = req.body;

      // Find user details need to update
      let findUser = await DB.tbl_user_master.findOne({
        where: { official_email: data.official_email, isDeleted: false },
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
                amount: allowance.amount,
              })),
              { transaction }
            );
          }

          // Adding the Salary Revision
          if (salary_revision_details && salary_revision_details.length > 0) {
            await DB.tbl_user_salary_revision.bulkCreate(
              salary_revision_details.map((revision) => ({
                user_id: findUser.id,
                year: revision.year,
                month: revision.month,
                new_salary: revision.new_salary,
                old_salary: revision.old_salary,
                revision_percent: revision.revision_percent,
                remark: revision.remark,
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
        where: { official_email: data.official_email, isDeleted: false },
      });

      if (!findUser) {
        return res.status(400).send({
          success: false,
          message: "User Not Found For Adding Payment Details!",
        });
      } else {
        try {
          if (account_number !== re_account_number) {
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
      const { contract_type_id, start_working_date, probation_end_date } =
        req.body;

      //  Check if user exist
      const findUser = await DB.tbl_user_master.findOne({
        where: { official_email: data.official_email, isDeleted: false },
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
    const { id } = req.params;

    if (req.file) {
      data.userImage = req.file.path || null;
    }

    // Check if user exist
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
      const emailExist = await DB.tbl_user_master.findOne({
        where: {
          official_email: data.official_email
            ? data.official_email
            : isUserExist.official_email,
          id: { [DB.Sequelize.Op.ne]: id },
        },
      });

      if (emailExist) {
        return res
          .status(409)
          .send({ success: false, message: "Official Email Already Exist!" });
      } else {
        const updateUser = await isUserExist.update(data);
        return res.status(200).send({
          success: true,
          status: "User Updated Successfully!",
          data: updateUser,
        });
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
    SELECT U.*, D.name AS department_name, D.dep_code AS department_code, DES.name AS designation_name, E.name AS employment_type, CT.name AS contract_type_name, B.name AS bank_name, PER.name AS permanent_country_name, PRE.name AS present_country_name,PER_S.name AS permanent_state_name, PRE_S.name AS present_state_name
    FROM USER_MASTER AS U
    INNER JOIN DEPARTMENT_MASTER AS D ON D.id=U.dep_id
    INNER JOIN DESIGNATION_MASTER AS DES ON DES.id=U.designation_id
    INNER JOIN EMPLOYMENT_TYPE_MASTER AS E ON E.id=U.emp_type_id
    INNER JOIN USER_MASTER AS M ON M.id=U.reporting_manager_id
    INNER JOIN BANK_MASTER AS B ON B.id=U.bank_id
    INNER JOIN COUNTRY_MASTER AS PER ON PER.id=U.permanent_country_address
    INNER JOIN COUNTRY_MASTER AS PRE ON PRE.id=U.present_country_address
    INNER JOIN STATE_MASTER AS PER_S ON PER_S.id=U.permanent_state_address
    INNER JOIN STATE_MASTER AS PRE_S ON PRE_S.id=U.present_state_address
    INNER JOIN CONTRACT_TYPE_MASTER AS CT ON CT.id=U.contract_type_id
    INNER JOIN USER_ALLOWANCE_MASTER AS UA ON UA.user_id=U.id
    INNER JOIN ALLOWANCE_MASTER AS A ON A.id=UA.allowance_id
    INNER JOIN USER_FAMILY_DETAIL AS UF ON UF.user_id=U.id
    INNER JOIN USER_PREVIOUS_EMPLOYER_DETAIL AS UPE ON UPE.user_id=U.id
    LEFT JOIN USER_SALARY_REVISION AS USR ON USR.user_id=U.id
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
    const query = `
    SELECT U.id, U.emp_code, U.name, U.official_email, U.personal_email, U.userImage,U.contact_no, U.alt_contact_no, U.dob, U.gender, U.reporting_manager_id, M.name AS reporting_manager_name, U.isDeleted, U.status, D.name AS department_name, D.dep_code AS department_code, DES.name AS designation_name, E.name AS employment_type,
    JSON_ARRAYAGG(
      JSON_OBJECT(
          'allowance_id', UA.allowance_id,
          'amount', UA.amount,
          'allowance_name', A.name,
          'isTaxable', A.is_taxable
        )
    ) AS allowances
    FROM USER_MASTER AS U
    LEFT JOIN DEPARTMENT_MASTER AS D ON D.id=U.dep_id
    LEFT JOIN DESIGNATION_MASTER AS DES ON DES.id=U.designation_id
    LEFT JOIN EMPLOYMENT_TYPE_MASTER AS E ON E.id=U.emp_type_id
    LEFT JOIN USER_MASTER AS M ON M.id=U.reporting_manager_id
    LEFT JOIN USER_ALLOWANCE_MASTER AS UA ON UA.user_id=U.id
    LEFT JOIN ALLOWANCE_MASTER AS A ON A.id=UA.allowance_id
    WHERE U.isDeleted=false
    GROUP BY U.id;`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Users Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get User Details Successfully!",
        data: { count: getAllData.length, ...getAllData },
      });
    }
  } catch (error) {
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
        .status(400)
        .send({ success: false, message: "User Not Found!" });
    } else {
      const updateStatus = await isUserExist.update({
        status: !isUserExist.status,
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
        status: "User Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== REQUIRE STATEMENTS ========== //
const DB = require("../../../../config/index");

// ========== CREATE ID CARD CONTROLLER ========== //
module.exports.createIdCard = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Data already exist
    const isUserExist = await DB.tbl_user_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isUserExist) {
      return res
        .status(404)
        .send({ success: false, message: "User Not Exist!" });
    } else {
      const checkIfIdGenerated = await DB.tbl_generate_id_card.findOne({
        where: { user_id: id },
      });

      if (checkIfIdGenerated) {
        return res.status(409).send({
          success: false,
          message: "ID Card Already Exist!",
        });
      }

      const query = `
          SELECT U.*, B.name as branch_name, D.name as designation_name
          FROM USER_MASTER AS U
          LEFT JOIN BRANCH_MASTER AS B ON B.id=U.branch_id
          LEFT JOIN DESIGNATION_MASTER AS D ON D.id=U.designation_id
          WHERE U.id=${id} AND U.isDeleted=false`;

      const getAllData = await DB.sequelize.query(query, {
        type: DB.sequelize.QueryTypes.SELECT,
      });

      const newData = await DB.tbl_generate_id_card.create({
        user_id: id,
        image: getAllData[0]?.userImage,
        emp_id: getAllData[0]?.emp_code,
        name: `${getAllData[0]?.title} ${getAllData[0]?.name}`,
        designation: getAllData[0]?.designation_name,
        branch: getAllData[0]?.branch_name,
        contact_no: `${getAllData[0]?.contact_code}-${getAllData[0]?.contact_no}`,
        dob: getAllData[0]?.dob,
        email: getAllData[0]?.official_email,
        join_date: getAllData[0]?.start_working_date,
        address: getAllData[0]?.permanent_address,
      });

      await DB.tbl_user_master.update(
        { isIDgenerated: true, card_id: newData?.id },
        { where: { id } }
      );

      return res.status(201).send({
        success: true,
        message: "ID Card Generated Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE ID CARD CONTROLLER ========== //
module.exports.updateIdCard = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Data already exist
    const isUserExist = await DB.tbl_user_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isUserExist) {
      return res
        .status(404)
        .send({ success: false, message: "User Not Exist!" });
    } else {
      const checkIfIdExist = await DB.tbl_generate_id_card.findOne({
        where: { user_id: id },
      });

      if (!checkIfIdExist) {
        return res.status(404).send({
          success: false,
          message: "ID Card Not Exist!",
        });
      }

      const query = `
          SELECT U.*, B.name as branch_name, D.name as designation_name
          FROM USER_MASTER AS U
          LEFT JOIN BRANCH_MASTER AS B ON B.id=U.branch_id
          LEFT JOIN DESIGNATION_MASTER AS D ON D.id=U.designation_id
          WHERE U.id=${id} AND U.isDeleted=false`;

      const getAllData = await DB.sequelize.query(query, {
        type: DB.sequelize.QueryTypes.SELECT,
      });

      await DB.tbl_generate_id_card.update(
        {
          user_id: id,
          image: getAllData[0]?.userImage,
          emp_id: getAllData[0]?.emp_code,
          name: `${getAllData[0]?.title} ${getAllData[0]?.name}`,
          designation: getAllData[0]?.designation_name,
          branch: getAllData[0]?.branch_name,
          contact_no: `${getAllData[0]?.contact_code}-${getAllData[0]?.contact_no}`,
          dob: getAllData[0]?.dob,
          email: getAllData[0]?.official_email,
          join_date: getAllData[0]?.start_working_date,
          address: getAllData[0]?.permanent_address,
        },
        { where: { id: checkIfIdExist?.id, user_id: id } }
      );

      return res.status(201).send({
        success: true,
        message: "ID Card Updated Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ID CARD DETAILS CONTROLLER ========== //
module.exports.getIdCardDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
    SELECT
        G.*
       FROM GENERATE_ID_CARD AS G
       WHERE G.id=${id} AND G.isDeleted = false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(404)
        .send({ success: false, message: "No Such ID Card Found!" });
    } else {
      return res.status(200).send({
        success: true,
        message: "Get ID Card Details Successfully!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE ID CARD CONTROLLER ========== //
module.exports.updateIdCardStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Data already exist
    const isDataExist = await DB.tbl_generate_id_card.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isDataExist) {
      return res
        .status(400)
        .send({ success: false, message: "No Such Id Card Found!" });
    } else {
      const updateStatus = await isDataExist.update({
        status: !isDataExist.status,
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

// ========== DELETE ID CARD CONTROLLER ========== //
module.exports.deleteIdCard = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Data already exist
    const isDataExist = await DB.tbl_generate_id_card.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isDataExist) {
      return res
        .status(404)
        .send({ success: false, message: "ID Card Not Found!" });
    } else {
      await DB.tbl_generate_id_card.destroy({ where: { id } });

      await DB.tbl_user_master.update(
        { isIDgenerated: false, card_id: null },
        { where: { card_id: id } }
      );
      return res.status(200).send({
        success: true,
        message: "ID Card Removed Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

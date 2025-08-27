// ========== REQUIRE STATEMENTS ========== //
const DB = require("../../../../config/index");

// ========== CREATE ID CARD CONTROLLER ========== //
module.exports.createIdCard = async (req, res) => {
  try {
    const data = req.body;

    // Check if Data already exist
    const isAlreadyExist = await DB.tbl_generate_id_card.findOne({
      where: {
        user_id: data?.user_id,
        isDeleted: false,
      },
    });

    if (isAlreadyExist) {
      return res
        .status(400)
        .send({ success: false, message: "ID Card Already Generated!" });
    } else {
      const query = `
          SELECT U.*
          FROM USER_MASTER AS U
          LEFT JOIN BRANCH_MASTER AS B ON B.id=U.branch_id
          LEFT JOIN DESIGNATION_MASTER AS D ON D.id=U.designation_id
          WHERE U.id=${data?.user_id} AND U.isDeleted=false`;

      const getAllData = await DB.sequelize.query(query, {
        type: DB.sequelize.QueryTypes.SELECT,
      });

      if (getAllData.length < 1) {
        return res.status(404).send({
          success: false,
          message: "No Such User Found!",
        });
      }

      const newData = await DB.tbl_generate_id_card.create({
        name: `${getAllData[0]?.title} ${getAllData[0]?.name}`,
        user_id: getAllData[0]?.id,
      });
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
    const data = req.body;
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
        .send({ success: false, message: "No Such ID Card Found!" });
    } else {
      const query = `
          SELECT U.*
          FROM USER_MASTER AS U
          LEFT JOIN BRANCH_MASTER AS B ON B.id=U.branch_id
          LEFT JOIN DESIGNATION_MASTER AS D ON D.id=U.designation_id
          WHERE U.id=${data?.user_id} AND U.isDeleted=false`;

      const getAllData = await DB.sequelize.query(query, {
        type: DB.sequelize.QueryTypes.SELECT,
      });

      if (getAllData.length < 1) {
        return res.status(404).send({
          success: false,
          message: "No Such User Found!",
        });
      }

      const updateData = await isDataExist.update(
        {
          name: `${getAllData[0]?.title} ${getAllData[0]?.name}`,
          user_id: getAllData[0]?.id,
        },
        { where: { id: isDataExist?.id } }
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
    SELECT G.*, U.*
    FROM GENERATE_ID_CARD AS G
    LEFT JOIN USER_MASTER AS U ON U.id=G.user_id
    WHERE G.id=${id} AND G.isDeleted=false`;

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

// ========== GET ALL ID CARD DETAILS CONTROLLER ========== //
module.exports.getAllIdCardDetails = async (req, res) => {
  try {
    const limit = parseInt(req.body.limit) || 10;
    const page = parseInt(req.body.page) || 1;
    const offset = (page - 1) * limit;
    const filter = req.body.filter || null;

    const whereClause = { isDeleted: false };

    const totalRecords = await DB.tbl_generate_id_card.count({ whereClause });
    const totalPages = Math.ceil(totalRecords / limit);

    const getAllData = await DB.tbl_generate_id_card.findAll({
      include: [
        {
          model: DB.tbl_user_master,
        },
      ],
      where: whereClause,
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
    });

    if (!getAllData || getAllData.length === 0) {
      return res
        .status(400)
        .send({ success: false, message: "No ID Cards Found!" });
    } else {
      return res.status(200).send({
        success: true,
        message: "Get All ID Cards List!",
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
        .status(400)
        .send({ success: false, message: "No Such ID Card Found!" });
    } else {
      await isDataExist.update({
        isDeleted: true,
      });
      return res.status(200).send({
        success: true,
        message: "ID Card Removed Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

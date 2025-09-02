// ========== REQUIRE STATEMENTS ========== //
const DB = require("../../../config/index");

// ========== CREATE NOTIFICATION CONTROLLER ========== //
module.exports.createNotification = async (req, res) => {
  try {
    const data = req.body;

    // Check if User exist
    const isUserExist = await DB.tbl_user_master.findOne({
      where: {
        id: data.user_id,
        isDeleted: false,
      },
    });

    if (!isUserExist) {
      return res
        .status(404)
        .send({ success: false, message: "User Not Exist!" });
    } else {
      const newNotification = await DB.tbl_notification_master.create(data);
      return res.status(200).send({
        success: true,
        message: "Notification Generated Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== MARK NOTIFICATION AS READ CONTROLLER ========== //
module.exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Notification exist
    const isExist = await DB.tbl_notification_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isExist) {
      return res
        .status(404)
        .send({ success: false, message: "No Such Notification Found!" });
    } else {
      await isExist.update({
        isReaded: true,
      });
      return res.status(200).send({
        success: true,
        message: "Marked as Read!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET NOTIFICATION DETAILS CONTROLLER ========== //
module.exports.getNotificationDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const getAllData = await DB.tbl_notification_master.findOne({
      where: { id, isDeleted: false },
    });

    if (!getAllData) {
      return res
        .status(404)
        .send({ success: false, message: "No Such Notification Found!" });
    } else {
      return res.status(200).send({
        success: true,
        message: "Get Notification Details Successfully!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL NOTIFICATION DETAILS CONTROLLER ========== //
module.exports.getAllNotificationDetails = async (req, res) => {
  try {
    const filter = req.body.filter || null;

    const whereClause = { isDeleted: false, archieve_status: "non-archieve" };

    if (filter.title && filter.title.trim() !== "") {
      whereClause.title = {
        [DB.Sequelize.Op.like]: [`%${filter.title.trim()}%`],
      };
    }

    if (filter.archieve !== undefined && filter.archieve !== "") {
      whereClause.archieve_status = filter.archieve;
    }

    if (filter.user_id && filter.user_id !== "") {
      whereClause.user_id = filter.user_id;
    }

    const getAllData = await DB.tbl_notification_master.findAll({
      where: whereClause,
      include: [
        {
          model: DB.tbl_user_master,
          attributes: ["id", "name", "emp_code"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    if (!getAllData || getAllData.length === 0) {
      return res
        .status(404)
        .send({ success: false, message: "No Notifcations Found!" });
    } else {
      return res.status(200).send({
        success: true,
        message: "Get All Notifications List!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== ARCHIEVE NOTIFICATION CONTROLLER ========== //
module.exports.archiveNotification = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if notification exist
    const isExist = await DB.tbl_notification_master.findOne({
      where: {
        id,
        isDeleted: false,
        status: true,
      },
    });

    if (!isExist) {
      return res
        .status(404)
        .send({ success: false, message: "No Such Notification Found!" });
    } else {
      const updateStatus = await isExist.update({
        status: !isExist.status,
      });
      return res.status(200).send({
        success: true,
        message: "Notification Archieved Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== DELETE NOTIFICATION CONTROLLER ========== //
module.exports.deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Notification exist
    const isExist = await DB.tbl_notification_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isExist) {
      return res
        .status(404)
        .send({ success: false, message: "No Such Notification Found!" });
    } else {
      await isExist.update({
        isDeleted: true,
      });
      return res.status(200).send({
        success: true,
        message: "Notification Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== REQUIRE STATEMENTS ========== //
const DB = require("../../../config/index");
const { generateUniqueCode } = require("../../../helper/generateUniqueCode");
// const { where } = require("sequelize");

// ********************* EVENT MANAGEMENT CONTROLLERS ********************* //
// ========== CREATE EVENT CONTROLLER ========== //
module.exports.createEvent = async (req, res) => {
  const transaction = await DB.sequelize.transaction();
  try {
    const data = req.body;

    // Check if Event Exist with same name
    const checkAlreadyExist = await DB.tbl_event_management.findOne({
      where: {
        event_category_id: data?.event_category_id,
        event_title: data?.event_title,
        isDeleted: false,
      },
      transaction,
    });

    if (checkAlreadyExist) {
      await transaction.rollback();
      return res.status(409).send({
        success: false,
        message: "Event with same category already exist!",
      });
    } else {
      let code = await generateUniqueCode(
        "EVT",
        3,
        "event_code",
        "EVENT_MANAGEMENT"
      );

      const createData = await DB.tbl_event_management.create(
        {
          event_code: code,
          event_category_id: data?.event_category_id,
          event_title: data?.event_title,
          event_description: data?.event_description,
          event_start_date: data?.event_start_date,
          event_end_date: data?.event_end_date,
          event_type: data?.event_type,
          event_meet_link: data?.event_meet_link,
          venue_name: data?.venue_name,
          event_country_id: data?.event_country_id,
          event_state_id: data?.event_state_id,
          event_city_id: data?.event_city_id,
          zip_code: data?.zip_code,
          event_address: data?.event_address,
          is_paid: data?.is_paid,
          sitting_type: data?.sitting_type,
          sitting_capacity: data?.sitting_capacity,
          registration_deadline: data?.registration_deadline,
          base_ticket_price: data?.base_ticket_price,
          event_organizer_id: data?.event_organizer_id,
          status: "DRAFT",
        },
        { transaction }
      );

      await transaction.commit();

      return res.status(201).send({
        success: true,
        message: "Event created successfully!",
      });
    }
  } catch (error) {
    await transaction.rollback();
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE EVENT CONTROLLER ========== //
module.exports.updateEvent = async (req, res) => {
  const transaction = await DB.sequelize.transaction();
  try {
    const { id } = req.params;
    const data = req.body;

    // Check if Event Exist with same name
    const checkAlreadyExist = await DB.tbl_event_management.findOne({
      where: {
        id,
        isDeleted: false,
      },
      transaction,
    });

    if (!checkAlreadyExist) {
      await transaction.rollback();
      return res.status(409).send({
        success: false,
        message: "Event not found!",
      });
    } else {
      const updateData = await checkAlreadyExist.update(data, {
        where: { id },
        transaction,
      });

      await transaction.commit();

      return res.status(201).send({
        success: true,
        message: "Event updated successfully!",
      });
    }
  } catch (error) {
    await transaction.rollback();
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET EVENT DETAILS CONTROLLER ========== //
module.exports.getEventDetails = async (req, res) => {
  try {
    const { id } = req.params;

    let query = `
      SELECT 
        EM.*, ECM.event_category_name, ECM.event_category_description, CM.name as country_name, SM.name as state_name, CIM.name as city_name,
        UM.emp_code as organizer_emp_code, UM.title as organizer_name_title, UM.name as organizer_name, UM.contact_code as organizer_contact_code, UM.contact_no as organizer_contact_no
      FROM EVENT_MANAGEMENT AS EM
      LEFT JOIN EVENT_CATEGORY_MASTER AS ECM ON ECM.id = EM.event_category_id
      LEFT JOIN COUNTRY_MASTER AS CM ON CM.id = EM.event_country_id
      LEFT JOIN STATE_MASTER AS SM ON SM.id = EM.event_state_id
      LEFT JOIN CITY_MASTER AS CIM ON CIM.id = EM.event_city_id
      LEFT JOIN USER_MASTER AS UM ON UM.id = EM.event_organizer_id
      WHERE EM.id= ${id} AND EM.isDeleted = false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(404)
        .send({ success: false, message: "Event not found!" });
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
        status: "Get event Data successfully!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL EVENT DETAILS CONTROLLER ========== //
module.exports.getAllEventsDetails = async (req, res) => {
  try {
    const limit = parseInt(req.body.limit) || 10;
    const page = parseInt(req.body.page) || 1;
    const offset = (page - 1) * limit;
    const filter = req.body.filter || {};

    // Base queries
    let countQuery = `
      SELECT COUNT(*) as total 
      FROM EVENT_MANAGEMENT AS EM
      WHERE EM.isDeleted = false`;

    let query = `
      SELECT 
        EM.*, ECM.event_category_name, ECM.event_category_description, CM.name as country_name, SM.name as state_name, CIM.name as city_name,
        UM.emp_code as organizer_emp_code, UM.title as organizer_name_title, UM.name as organizer_name, UM.contact_code as organizer_contact_code, UM.contact_no as organizer_contact_no
      FROM EVENT_MANAGEMENT AS EM
      LEFT JOIN EVENT_CATEGORY_MASTER AS ECM ON ECM.id = EM.event_category_id
      LEFT JOIN COUNTRY_MASTER AS CM ON CM.id = EM.event_country_id
      LEFT JOIN STATE_MASTER AS SM ON SM.id = EM.event_state_id
      LEFT JOIN CITY_MASTER AS CIM ON CIM.id = EM.event_city_id
      LEFT JOIN USER_MASTER AS UM ON UM.id = EM.event_organizer_id
      WHERE EM.isDeleted = false`;

    // Prepare replacements object
    const replacements = {
      limit: limit,
      offset: offset,
    };

    // Add Event Category filter if provided
    if (filter?.event_category_id) {
      countQuery += ` AND EM.event_category_id = :event_category_id`;
      query += ` AND EM.event_category_id = :event_category_id`;
      replacements.event_category_id = filter.event_category_id;
    }

    // Add Event Type filter if provided
    if (filter?.event_type) {
      countQuery += ` AND EM.event_type LIKE :event_type`;
      query += ` AND EM.event_type LIKE :event_type`;
      replacements.event_type = `%${filter.event_type}%`;
    }

    // Complete the queries
    query += ` GROUP BY EM.id`; // Only group by the primary key
    query += ` ORDER BY EM.createdAt DESC`;
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
        .send({ success: true, message: "No Events found!", data: [] });
    } else {
      return res.status(200).send({
        success: true,
        message: "Get all events list successfully!",
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
    console.error("Error in getAllEventsList:", error);
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== CHANGE EVENT STATUS CONTROLLER ========== //
module.exports.updateEventStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // Check if Event Exist
    const isEventExist = await DB.tbl_event_management.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isEventExist) {
      return res
        .status(404)
        .send({ success: false, message: "Event not found!" });
    } else {
      const updateStatus = await isEventExist.update({
        status: data?.status,
      });
      return res.status(201).send({
        success: true,
        message: `Event ${data?.status} Successfully!`,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== DELETE EVENT CONTROLLER ========== //
module.exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Event Exist
    const isEventExist = await DB.tbl_event_management.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isEventExist) {
      return res
        .status(404)
        .send({ success: false, message: "Event not found!" });
    } else {
      await isEventExist.update({
        isDeleted: true,
      });
      return res.status(201).send({
        success: true,
        message: "Event Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ********************* EVENT TICKETS CONTROLLERS ********************* //
// ========== CREATE EVENT TICKET CONTROLLER ========== //
module.exports.createEventTickets = async (req, res) => {
  const transaction = await DB.sequelize.transaction();
  try {
    const { id } = req.params;
    const data = req.body;

    // Check if Event Exist
    const checkEventExist = await DB.tbl_event_management.findOne({
      where: {
        id,
        isDeleted: false,
      },
      transaction,
    });

    if (!checkEventExist) {
      await transaction.rollback();
      return res.status(404).send({
        success: false,
        message: "Event not found!",
      });
    } // If Event is Non Paid
    else if (
      checkEventExist?.is_paid === false ||
      checkEventExist?.is_paid === 0
    ) {
      await transaction.rollback();
      return res.status(400).send({
        success: false,
        message: "This event don't required any payment!",
      });
    } else {
      // Check For if Any Duplicate
      const checkDuplicate = await DB.tbl_event_ticket_type.findAll({
        where: {
          event_ticket_name: data?.event_ticket_name,
          event_id: data?.event_id,
          isDeleted: false,
        },
        transaction,
      });

      if (checkDuplicate) {
        await transaction.rollback();
        return res.status(409).send({
          success: false,
          message: "Ticket name already exist!",
        });
      }

      // Get All Existing Tickets if Any
      const getAllTickets = await DB.tbl_event_ticket_type.findAll({
        where: { event_id: id, isDeleted: false },
      });

      // Get Total Ticket Quantity
      const totalQuantity =
        getAllTickets.length > 0
          ? getAllTickets.reduce((total, ticket) => {
              return total + (ticket?.event_ticket_quantity || 0);
            }, 0)
          : 0;

      // Check If Tickets Quantity Exceeding Event Sitting Capacity
      if (
        parseInt(totalQuantity + data?.event_ticket_quantity) >
        parseInt(checkEventExist?.sitting_capacity)
      ) {
        await transaction.rollback();
        return res.status(400).send({
          success: false,
          message:
            "Ticket quantity can't be greater than Event Sitting Capacity!",
        });
      }

      // If Ticket Price is Smaller than Base Price
      if (
        parseFloat(data?.event_ticket_price) <
        parseFloat(checkEventExist?.base_ticket_price)
      ) {
        await transaction.rollback();
        return res.status(400).send({
          success: false,
          message: "Ticket price can't be smaller than Base Ticket Price!",
        });
      }

      const createData = await DB.tbl_event_ticket_type.create(
        {
          event_id: id,
          event_ticket_name: data?.event_ticket_name,
          event_ticket_price: data?.event_ticket_price,
          event_ticket_quantity: data?.event_ticket_quantity,
          // tickets_sold: data?.tickets_sold,
          sales_start_date: data?.sales_start_date,
          sales_end_date: data?.sales_end_date,
          event_ticket_description: data?.event_ticket_description,
        },
        { transaction }
      );

      await transaction.commit();

      return res.status(201).send({
        success: true,
        message: "New ticket added successfully!",
      });
    }
  } catch (error) {
    await transaction.rollback();
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE EVENT TICKET CONTROLLER ========== //
module.exports.updateEventTickets = async (req, res) => {
  const transaction = await DB.sequelize.transaction();
  try {
    const { event_id, id } = req.params;
    const data = req.body;

    // Check if Event Exist
    const checkTicketExist = await DB.tbl_event_ticket_type.findOne({
      where: {
        id,
        isDeleted: false,
      },
      transaction,
    });

    if (!checkTicketExist) {
      await transaction.rollback();
      return res.status(404).send({
        success: false,
        message: "No such ticket found!",
      });
    } else {
      // Get Event Details
      const getEventDetails = await DB.tbl_event_management.findOne({
        where: { id: event_id, isDeleted: false },
      });

      if (!getEventDetails) {
        await transaction.rollback();
        return res.status(404).send({
          success: false,
          message: "No such event found!",
        });
      }

      // Check For if Any Duplicate
      const checkDuplicate = await DB.tbl_event_ticket_type.findAll({
        where: {
          id: { [DB.Sequelize.Op.ne]: id },
          event_ticket_name: data?.event_ticket_name,
          event_id,
          isDeleted: false,
        },
      });

      if (checkDuplicate.length > 0) {
        await transaction.rollback();
        return res.status(404).send({
          success: false,
          message: "Ticket name already exist!",
        });
      }

      // Get All Tickets if Any
      const getAllTickets = await DB.tbl_event_ticket_type.findAll({
        where: { id: { [DB.Sequelize.Op.ne]: id }, event_id, isDeleted: false },
        transaction,
      });

      // Get Total Ticket Quantity
      const totalQuantity =
        getAllTickets.length > 0
          ? getAllTickets.reduce((total, ticket) => {
              return total + (ticket?.event_ticket_quantity || 0);
            }, 0)
          : 0;

      // Check If Tickets Quantity Exceeding Event Sitting Capacity
      if (
        parseInt(totalQuantity + data?.event_ticket_quantity) >
        parseInt(getEventDetails?.sitting_capacity)
      ) {
        await transaction.rollback();
        return res.status(400).send({
          success: false,
          message:
            "Ticket quantity can't be greater than Event Sitting Capacity!",
        });
      }

      // If Ticket Price is Smaller than Base Price
      if (
        parseFloat(data?.event_ticket_price) <
        parseFloat(getEventDetails?.base_ticket_price)
      ) {
        await transaction.rollback();
        return res.status(400).send({
          success: false,
          message: "Ticket price can't be smaller than Base Ticket Price!",
        });
      }

      const updateData = await checkTicketExist.update(data, {
        where: { id: checkTicketExist?.id },
        transaction,
      });

      await transaction.commit();

      return res.status(201).send({
        success: true,
        message: "Ticket updated successfully!",
      });
    }
  } catch (error) {
    await transaction.rollback();
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET EVENT TICKET DETAILS CONTROLLER ========== //
module.exports.getEventTicketsDetails = async (req, res) => {
  try {
    const { id } = req.params;

    let query = `
      SELECT 
        ETT.*, EM.event_code, EM.event_title
      FROM EVENT_TICKET_TYPES AS ETT
      LEFT JOIN EVENT_MANAGEMENT AS EM ON EM.id = ETT.event_id
      WHERE ETT.id= ${id} AND ETT.isDeleted = false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(404)
        .send({ success: false, message: "No such event ticket found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get event ticket data successfully!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL EVENT TICKET DETAILS CONTROLLER ========== //
module.exports.getAllEventTicketsDetails = async (req, res) => {
  try {
    const limit = parseInt(req.body.limit) || 10;
    const page = parseInt(req.body.page) || 1;
    const offset = (page - 1) * limit;
    const filter = req.body.filter || {};

    // Base queries
    let countQuery = `
      SELECT 
        ETT.*, EM.event_code, EM.event_title
      FROM EVENT_TICKET_TYPES AS ETT
      LEFT JOIN EVENT_MANAGEMENT AS EM ON EM.id = ETT.event_id
      WHERE ETT.isDeleted = false`;

    let query = `
      SELECT 
        ETT.*, EM.event_code, EM.event_title
      FROM EVENT_TICKET_TYPES AS ETT
      LEFT JOIN EVENT_MANAGEMENT AS EM ON EM.id = ETT.event_id
      WHERE ETT.isDeleted = false`;

    // Prepare replacements object
    const replacements = {
      limit: limit,
      offset: offset,
    };

    // Add Event Id if provided
    if (filter?.event_id) {
      countQuery += ` AND ETT.event_id = :event_id`;
      query += ` AND ETT.event_id = :event_id`;
      replacements.event_id = filter.event_id;
    }

    // Complete the queries
    query += ` GROUP BY ETT.id`; // Only group by the primary key
    query += ` ORDER BY ETT.createdAt DESC`;
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
        .send({ success: true, message: "No events tickets found!", data: [] });
    } else {
      return res.status(200).send({
        success: true,
        message: "Get all event tickets list successfully!",
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
    console.error("Error in getAllEventsList:", error);
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== DELETE EVENT TICKET CONTROLLER ========== //
module.exports.deleteEventTickets = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Event Ticket Exist
    const isTicketExist = await DB.tbl_event_ticket_type.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isTicketExist) {
      return res
        .status(404)
        .send({ success: false, message: "Event ticket not found!" });
    } else {
      await isTicketExist.update({
        isDeleted: true,
      });
      return res.status(201).send({
        success: true,
        message: "Event ticket deleted successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

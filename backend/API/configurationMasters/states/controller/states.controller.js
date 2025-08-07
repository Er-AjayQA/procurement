// ========== REQUIRE STATEMENTS ========== //
const DB = require("../../../../config/index");
const xlsx = require("xlsx");

// ========== CREATE STATE CONTROLLER ========== //
module.exports.uploadState = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    // Read the Excel file
    const workbook = xlsx.readFile(req.file.path);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(worksheet);

    // Process and insert data
    for (const row of data) {
      // Assuming your Excel has columns: country, code
      const { id, name, state_code, country_id } = row;

      // Validate required fields
      if (!id || !name || !country_id) {
        console.warn("Skipping row - missing name", row);
        continue;
      }

      // Get country
      const countryData = await DB.tbl_country_master.findOne({
        where: { id: country_id },
      });

      if (!countryData) {
        continue;
      }

      const whereCondition = {
        [DB.Sequelize.Op.and]: [{ id: id }, { name: name }],
      };

      if (
        state_code !== undefined &&
        state_code !== null &&
        state_code !== ""
      ) {
        whereCondition[DB.Sequelize.Op.and].push({
          state_code: state_code,
        });
      } else {
        whereCondition[DB.Sequelize.Op.and].push({
          [DB.Sequelize.Op.or]: [{ state_code: null }, { state_code: "" }],
        });
      }

      // Insert States if not exists and get ID
      const [state, created] = await DB.tbl_state_master.findOrCreate({
        where: whereCondition,
        defaults: {
          id: id,
          name: name,
          state_code: state_code || null,
          country_id: country_id,
        },
      });
    }

    return res
      .status(201)
      .send({ success: true, message: "Data Uploaded Successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing file");
  }
};

// ========== GET STATE DETAILS CONTROLLER ========== //
module.exports.getStateDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
    SELECT S.*, CM.name AS country_name
    FROM STATE_MASTER AS S
    LEFT JOIN COUNTRY_MASTER AS CM ON CM.id=S.country_id
    WHERE S.id=${id}`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "State Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get State Details Successfully!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL STATE DETAILS CONTROLLER ========== //
module.exports.getAllStateDetails = async (req, res) => {
  try {
    const limit = parseInt(req.body.limit) || 10;
    const page = parseInt(req.body.page) || 1;
    const offset = (page - 1) * limit;
    const filter = req.body.filter || {};

    let countQuery = `
    Select Count(*) AS total
    FROM STATE_MASTER AS S`;

    let query = `
      SELECT S.*, CM.name AS country_name
      FROM STATE_MASTER AS S
      LEFT JOIN COUNTRY_MASTER AS CM ON CM.id=s.country_id`;

    const whereConditions = [];
    const replacements = {
      limit: limit,
      offset: offset,
    };

    if (filter.name && filter.country_id) {
      whereConditions.push(` S.name LIKE :name`);
      replacements.name = `%${filter.name}%`;
      whereConditions.push(` S.country_id = :country_id`);
      replacements.country_id = filter.country_id;
    } else if (filter.name) {
      whereConditions.push(` S.name LIKE :name`);
      replacements.name = `%${filter.name}%`;
    } else if (filter.country_id) {
      whereConditions.push(` S.country_id = :country_id`);
      replacements.country_id = filter.country_id;
    }

    if (whereConditions.length > 0) {
      const whereClause = ` WHERE ` + whereConditions.join(" AND ");
      countQuery += whereClause;
      query += whereClause;
    }

    query += ` ORDER BY S.country_id ASC LIMIT :limit OFFSET :offset`;

    // Get total count
    const totalResult = await DB.sequelize.query(countQuery, {
      replacements: replacements,
      type: DB.sequelize.QueryTypes.SELECT,
    });
    const totalRecords = totalResult[0].total;
    const totalPages = Math.ceil(totalRecords / limit);

    const getAllData = await DB.sequelize.query(query, {
      replacements: replacements,
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "States Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get All States List!",
        records: getAllData.length,
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

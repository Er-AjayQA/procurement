// ========== REQUIRE STATEMENTS ========== //
const DB = require("../../../../config/index");
const xlsx = require("xlsx");

// ========== CREATE CITY CONTROLLER ========== //
module.exports.uploadCity = async (req, res) => {
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
      const query = `
                  SELECT * 
                  FROM STATE_MASTER
                  WHERE id=${row.state_id}`;

      const getAllData = await DB.sequelize.query(query, {
        type: DB.sequelize.QueryTypes.SELECT,
      });

      if (getAllData.length < 1) {
        continue;
      }

      // Validate required fields
      if (!row.id || !row.name || !row.state_id || !row.country_id) {
        console.warn("Skipping row - missing name, state_id, country_id", row);
        continue;
      }

      // Get country
      const countryData = await DB.tbl_country_master.findOne({
        where: { id: row.country_id },
      });

      if (!countryData) {
        continue;
      } else {
        let stateData = await DB.tbl_state_master.findOne({
          where: { id: row.state_id, country_id: row.country_id },
        });

        if (!stateData) {
          continue;
        } else {
          // Insert City if not exists and get ID
          const [City, created] = await DB.tbl_city_master.findOrCreate({
            where: {
              [DB.Sequelize.Op.and]: [{ id: row.id }, { name: row.name }],
            },
            defaults: {
              id: row.id,
              name: row.name,
              state_id: row.state_id,
              country_id: row.country_id,
            },
          });
        }
      }
    }
    return res
      .status(201)
      .send({ success: true, message: "Data Uploaded Successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing file");
  }
};

// ========== GET CITY DETAILS CONTROLLER ========== //
module.exports.getCityDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
    SELECT C.*, CM.name AS country_name, S.name AS state_name
    FROM CITY_MASTER AS C
    LEFT JOIN COUNTRY_MASTER AS CM ON CM.id=C.country_id
    LEFT JOIN STATE_MASTER AS S ON S.id=C.state_id
    WHERE C.id=${id}`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "City Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get City Details Successfully!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL CITY DETAILS CONTROLLER ========== //
module.exports.getAllCityDetails = async (req, res) => {
  try {
    const limit = parseInt(req.body.limit) || 10;
    const page = parseInt(req.body.page) || 1;
    const offset = (page - 1) * limit;
    const filter = req.body.filter || {};

    let countQuery = `
            SELECT COUNT(*) AS total
            FROM CITY_MASTER AS C
            `;

    let query = `
            SELECT C.*, CM.name AS country_name, S.name AS state_name
            FROM CITY_MASTER AS C
            LEFT JOIN COUNTRY_MASTER AS CM ON CM.id=C.country_id
            LEFT JOIN STATE_MASTER AS S ON S.id=C.state_id`;

    const whereConditions = [];
    const replacements = {
      limit: limit,
      offset: offset,
    };

    if (filter.name) {
      whereConditions.push(`C.name LIKE :name`);
      replacements.name = `%${filter.name}%`;
    }

    if (filter.country_id) {
      whereConditions.push(`C.country_id = :country_id`);
      replacements.country_id = filter.country_id;
    }

    if (filter.state_id) {
      whereConditions.push(`C.state_id = :state_id`);
      replacements.state_id = filter.state_id;
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
        .send({ success: false, message: "Cities Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        message: "Get All Cities List!",
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

// ========== REQUIRE STATEMENTS ========== //
const DB = require("../../../../config/index");
const xlsx = require("xlsx");

// ========== UPLOAD COUNTRY CONTROLLER ========== //
module.exports.uploadCountry = async (req, res) => {
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
      const {
        id,
        name,
        iso2,
        phonecode,
        currency_name,
        currency_symbol,
        nationality,
      } = row;

      // Validate required fields
      if (
        !id ||
        !name ||
        !iso2 ||
        !phonecode ||
        !currency_name ||
        !currency_symbol ||
        !nationality
      ) {
        console.warn(
          "Skipping row - missing name, iso2, phonecode, currency_name,currency_symbol,nationality:",
          row
        );
        continue;
      }

      // Insert country if not exists and get ID
      const [country, created] = await DB.tbl_country_master.findOrCreate({
        where: {
          [DB.Sequelize.Op.or]: [
            { id: id },
            { name: name },
            { country_code: iso2 },
          ],
        },
        defaults: {
          id: id,
          name: name,
          country_code: iso2,
          nationality: nationality,
          phone_code: phonecode,
          currency_code: currency_name,
          currency_symbol: currency_symbol,
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

// ========== GET COUNTRY DETAILS CONTROLLER ========== //
module.exports.getCountryDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
    SELECT C.*
    FROM COUNTRY_MASTER AS C
    WHERE C.id=${id}`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Country Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get Country Details Successfully!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL COUNTRY DETAILS CONTROLLER ========== //
module.exports.getAllCountryDetails = async (req, res) => {
  try {
    const limit = parseInt(req.body.limit) || 10;
    const page = parseInt(req.body.page) || 1;
    const offset = (page - 1) * limit;
    const filter = req.body.filter || null;

    let countQuery = `
    Select Count(*) AS total
    FROM COUNTRY_MASTER AS C`;

    let query = `
    SELECT C.*
    FROM COUNTRY_MASTER AS C`;

    if (filter) {
      countQuery += ` WHERE C.name LIKE :filter`;
      query += ` WHERE C.name LIKE :filter`;
    }

    query += ` ORDER BY C.createdAt DESC`;
    query += ` LIMIT :limit OFFSET :offset`;

    // Get total count
    const totalResult = await DB.sequelize.query(countQuery, {
      replacements: { filter: `%${filter}%` },
      type: DB.sequelize.QueryTypes.SELECT,
    });
    const totalRecords = totalResult[0].total;
    const totalPages = Math.ceil(totalRecords / limit);

    const getAllData = await DB.sequelize.query(query, {
      replacements: {
        filter: filter ? `%${filter}%` : null,
        limit,
        offset,
      },
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Countries Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        message: "Get All Countries List!",
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

// ========== GET ALL NATIONALITY DETAILS CONTROLLER ========== //
module.exports.getAllNationalityDetails = async (req, res) => {
  try {
    const query = `
    SELECT C.nationality
    FROM COUNTRY_MASTER AS C`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Nationalities Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get All Nationalities List!",
        records: getAllData.length,
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL COUNTRY CURRENCY DETAILS CONTROLLER ========== //
module.exports.getAllCountryCurrencyDetails = async (req, res) => {
  try {
    const query = `
    SELECT C.currency_code, C.currency_symbol
    FROM COUNTRY_MASTER AS C`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Currency Details Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get All Currency Details List!",
        records: getAllData.length,
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

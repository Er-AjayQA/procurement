// ========== IMPORT STATEMENTS ========== //
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
    const data = req.body;
    let query = "";

    if (data.country_id === "" && data.state_id === "") {
      query = `
            SELECT C.*, CM.name AS country_name, S.name AS state_name
            FROM CITY_MASTER AS C
            LEFT JOIN COUNTRY_MASTER AS CM ON CM.id=C.country_id
            LEFT JOIN STATE_MASTER AS S ON S.id=C.state_id`;
    } else {
      query = `
      SELECT C.*, CM.name AS country_name, S.name AS state_name
      FROM CITY_MASTER AS C
      LEFT JOIN COUNTRY_MASTER AS CM ON CM.id=C.country_id
      LEFT JOIN STATE_MASTER AS S ON S.id=C.state_id
      WHERE C.country_id=${data.country_id} AND C.state_id=${data.state_id}`;
    }

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Cities Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get All Cities List!",
        records: getAllData.length,
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

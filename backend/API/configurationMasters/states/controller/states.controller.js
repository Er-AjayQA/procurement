// ========== IMPORT STATEMENTS ========== //
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
      const { name, country_name } = row;

      // Validate required fields
      if (!name || !country_name) {
        console.warn("Skipping row - missing name or alpha_2:", row);
        continue;
      }

      // Insert country if not exists and get ID
      const [country, created] = await DB.tbl_state_master.findOrCreate({
        where: {
          [DB.Sequelize.Op.and]: [{ name: name }, { country: country_name }],
        },
        defaults: {
          name: name,
          country: country_name,
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
    SELECT S.*
    FROM STATE_MASTER AS S
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
    const query = `
    SELECT S.*
    FROM STATE_MASTER AS S`;

    const getAllData = await DB.sequelize.query(query, {
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
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

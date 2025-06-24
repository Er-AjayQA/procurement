const DB = require("../config/index");

const generateUniqueCode = async (suffix, sliceCount, code_field, table) => {
  const query = `
                    SELECT U.*
                    FROM ${table} AS U`;

  const getAllData = await DB.sequelize.query(query, {
    type: DB.sequelize.QueryTypes.SELECT,
  });

  if (getAllData.length < 1) {
    return suffix + "001";
  } else {
    let getLastCode = parseInt(
      getAllData[getAllData.length - 1][code_field].slice(sliceCount)
    );
    const newCode = suffix + String(getLastCode + 1).padStart(3, "0");

    return newCode;
  }
};

module.exports = { generateUniqueCode };

const DB = require("../config/index");

const employeeUniqueCode = async () => {
  const query = `
            SELECT U.*
            FROM User AS U`;

  const getAllData = await DB.sequelize.query(query, {
    type: DB.sequelize.QueryTypes.SELECT,
  });
  let suffix = "EMP";

  let empCode = "EMP001";

  if (getAllData.length < 1) {
    return empCode;
  } else {
    const getCodeNumeric =
      parseInt(getAllData[getAllData.length - 1].emp_code.slice(3)) + 1;
    const newCode = `${suffix}${String(getCodeNumeric).padStart(3, "0")}`;

    return newCode;
  }
};

module.exports = { employeeUniqueCode };

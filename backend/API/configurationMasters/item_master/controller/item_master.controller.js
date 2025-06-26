// ========== IMPORT STATEMENTS ========== //
const DB = require("../../../../config/index");
const { generateUniqueCode } = require("../../../../helper/generateUniqueCode");

// ========== CREATE ITEM CONTROLLER ========== //
module.exports.createItem = async (req, res) => {
  try {
    const data = req.body;

    // Check if Item already exist
    const isAlreadyExist = await DB.tbl_item_master.findOne({
      where: {
        name: data.name,
        item_category_id: data.item_category_id,
        isDeleted: false,
      },
    });

    if (isAlreadyExist) {
      return res.status(400).send({
        success: false,
        message: "Item Already Exist in Selected Category!",
      });
    } else {
      let code = await generateUniqueCode(
        "ITEM",
        4,
        "item_code",
        "ITEM_MASTER"
      );
      data.item_code = code;

      const newItem = await DB.tbl_item_master.create(data);

      // Adding the specifications if any
      if (data.specifications.length > 0) {
        data.specifications.map(async (spec) => {
          await DB.tbl_item_specification.create({
            spec_type: spec.type,
            spec_description: spec.description,
            item_id: newItem.id,
          });
        });
      }

      return res.status(200).send({
        success: true,
        status: "Item Created Successfully!",
        data: newItem,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// // ========== UPDATE ITEM CONTROLLER ========== //
// module.exports.updateItem = async (req, res) => {
//   try {
//     const data = req.body;
//     const { id } = req.params;

//     // Check if Department already exist
//     const isDepartmentExist = await DB.tbl_department_master.findOne({
//       where: {
//         id,
//         isDeleted: false,
//       },
//     });

//     if (!isDepartmentExist) {
//       return res
//         .status(400)
//         .send({ success: false, message: "Department Not Found!" });
//     } else {
//       const duplicateDepartment = await DB.tbl_department_master.findOne({
//         where: {
//           id: { [DB.Sequelize.Op.ne]: id },
//           name: data.name,
//           isDeleted: false,
//         },
//       });

//       if (duplicateDepartment) {
//         return res
//           .status(409)
//           .send({ success: false, message: "Department Name Already Exist!" });
//       } else {
//         const updateDepartment = await isDepartmentExist.update(data);
//         return res.status(200).send({
//           success: true,
//           status: "Department Updated Successfully!",
//           data: updateDepartment,
//         });
//       }
//     }
//   } catch (error) {
//     res.status(500).send({ success: false, message: error.message });
//   }
// };

// // ========== GET ITEM DETAILS CONTROLLER ========== //
// module.exports.getItemDetails = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const query = `
//     SELECT D.*, U.name AS department_head_name, U.emp_code
//     FROM DEPARTMENT_MASTER AS D
//     LEFT JOIN USER_MASTER AS U ON U.id= D.department_head_id
//     WHERE D.id=${id} AND D.isDeleted=false`;

//     const getAllData = await DB.sequelize.query(query, {
//       type: DB.sequelize.QueryTypes.SELECT,
//     });

//     if (getAllData.length < 1) {
//       return res
//         .status(400)
//         .send({ success: false, message: "Department Not Found!" });
//     } else {
//       return res.status(200).send({
//         success: true,
//         status: "Get Department Details Successfully!",
//         data: getAllData,
//       });
//     }
//   } catch (error) {
//     res.status(500).send({ success: false, message: error.message });
//   }
// };

// // ========== GET ALL ITEM DETAILS CONTROLLER ========== //
// module.exports.getAllItemDetails = async (req, res) => {
//   try {
//     const query = `
//             SELECT D.*, U.emp_code, U.name As department_head_name
//             FROM DEPARTMENT_MASTER AS D
//             LEFT JOIN USER_MASTER AS U on U.id=D.department_head_id
//             WHERE D.isDeleted=false`;

//     const getAllData = await DB.sequelize.query(query, {
//       type: DB.sequelize.QueryTypes.SELECT,
//     });

//     if (getAllData.length < 1) {
//       return res
//         .status(400)
//         .send({ success: false, message: "Departments Not Found!" });
//     } else {
//       return res.status(200).send({
//         success: true,
//         status: "Get All Departments List!",
//         data: getAllData,
//       });
//     }
//   } catch (error) {
//     res.status(500).send({ success: false, message: error.message });
//   }
// };

// // ========== UPDATE ITEM CONTROLLER ========== //
// module.exports.updateItemStatus = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Check if user already exist
//     const isDepartmentExist = await DB.tbl_department_master.findOne({
//       where: {
//         id,
//         isDeleted: false,
//       },
//     });

//     if (!isDepartmentExist) {
//       return res
//         .status(400)
//         .send({ success: false, message: "Department Not Found!" });
//     } else {
//       const updateStatus = await isDepartmentExist.update({
//         status: !isDepartmentExist.status,
//       });
//       return res.status(200).send({
//         success: true,
//         status: "Status Changed Successfully!",
//         data: updateStatus,
//       });
//     }
//   } catch (error) {
//     res.status(500).send({ success: false, message: error.message });
//   }
// };

// // ========== DELETE ITEM CONTROLLER ========== //
// module.exports.deleteItem = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Check if Department already exist
//     const isDepartmentExist = await DB.tbl_department_master.findOne({
//       where: {
//         id,
//         isDeleted: false,
//       },
//     });

//     if (!isDepartmentExist) {
//       return res
//         .status(400)
//         .send({ success: false, message: "Department Not Found!" });
//     } else {
//       await isDepartmentExist.update({
//         isDeleted: true,
//       });
//       return res.status(200).send({
//         success: true,
//         status: "Department Deleted Successfully!",
//       });
//     }
//   } catch (error) {
//     res.status(500).send({ success: false, message: error.message });
//   }
// };

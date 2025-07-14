// ========== REQUIRE STATEMENTS ========== //
const DB = require("../../../config/index");

// ========== CREATE COURSE CONTROLLER ========== //
module.exports.createCourse = async (req, res) => {
  const transaction = await DB.sequelize.transaction();
  try {
    const data = req.body;

    // Check if Course already exist
    const isAlreadyExist = await DB.tbl_lms_course.findOne({
      where: {
        [DB.Sequelize.Op.and]: [
          { course_name: data.course_name },
          { course_category_id: data.course_category_id },
          { isDeleted: false },
        ],
      },
      transaction,
    });

    if (isAlreadyExist) {
      await transaction.rollback();
      return res
        .status(400)
        .send({ success: false, message: "Course Already Exist!" });
    } else {
      const newCourse = await DB.tbl_lms_course.create(
        {
          course_type: data.course_type,
          course_name: data.course_name,
          course_category_id: data.course_category_id,
          course_trainer: data.course_trainer,
          course_format: data.course_format,
          course_objective: data.course_objective,
          course_expected_results: data.course_expected_results,
          is_certified: data.is_certified,
        },
        { transaction }
      );

      if (data.courseContent && data.courseContent.length > 0) {
        await DB.tbl_lms_course_content.bulkCreate(
          data.courseContent.map((content) => ({
            course_id: newCourse.id,
            content_type: content.content_type,
            content_name: content.content_name,
            content_link: content.content_link,
          })),
          { transaction }
        );
      }

      if (data.course_type === "contentWithAssessment") {
        const assessment = await DB.tbl_lms_course_assessment.create(
          {
            course_id: newCourse.id,
            assessment_name: data.assessment_name,
            assessment_marks: data.assessment_marks,
            assessment_passing_percent: data.assessment_passing_percent,
            assessment_time: data.assessment_time,
            assessment_max_attempts: data.assessment_max_attempts,
          },
          { transaction }
        );

        if (data.assessmentQuestions && data.assessmentQuestions.length > 0) {
          await DB.tbl_lms_course_assessment_questions.bulkCreate(
            data.assessmentQuestions.map((question) => ({
              course_id: newCourse.id,
              assessment_id: assessment.id,
              assessment_question_type: question.assessment_question_type,
              assessment_question_title: question.assessment_question_title,
              assessment_question_options: question.assessment_question_options,
              assessment_correct_answer: question.assessment_correct_answer,
            })),
            { transaction }
          );
        }
      }

      await transaction.commit();
      return res.status(200).send({
        success: true,
        status: "Course Created Successfully!",
        data: newCourse,
      });
    }
  } catch (error) {
    await transaction.rollback();
    res.status(500).send({ success: false, message: error.message });
  }
};

// // ========== UPDATE COURSE CONTROLLER ========== //
// module.exports.updateWorkflow = async (req, res) => {
//   try {
//     const data = req.body;
//     const { id } = req.params;

//     // Check if Workflow exist
//     const isWorkflowExist = await DB.tbl_workflow_master.findOne({
//       where: {
//         id,
//         isDeleted: false,
//       },
//     });

//     if (!isWorkflowExist) {
//       return res
//         .status(400)
//         .send({ success: false, message: "Workflow Not Found!" });
//     } else {
//       const duplicateWorkflow = await DB.tbl_workflow_master.findOne({
//         where: {
//           id: { [DB.Sequelize.Op.ne]: id },
//           [DB.Sequelize.Op.and]: [
//             { workflow_type_id: data.workflow_type_id },
//             { dept_id: data.dept_id },
//             { isDeleted: false },
//           ],
//         },
//       });

//       if (duplicateWorkflow) {
//         return res.status(409).send({
//           success: false,
//           message: "Workflow For Selected Department Already Exist!",
//         });
//       } else {
//         const updateWorkflow = await DB.tbl_workflow_master.update(data, {
//           where: { id },
//         });

//         // Destroy the previous employee mapping before creating new
//         await DB.tbl_workflowEmployeeMapping_master.destroy({
//           where: { workflow_id: id },
//         });

//         // Adding new Employee mapping
//         await DB.tbl_workflowEmployeeMapping_master.bulkCreate(
//           data.employees.map((employee) => ({
//             workflow_id: id,
//             level: employee.level,
//             role_id: employee.role_id,
//             user_id: employee.user_id,
//           }))
//         );

//         return res.status(200).send({
//           success: true,
//           status: "Workflow Updated Successfully!",
//           data: updateWorkflow,
//         });
//       }
//     }
//   } catch (error) {
//     if (transaction) await transaction.rollback();
//     console.log("Error in Creating Workflow", error);
//     return res.status(500).send({ success: false, message: error.message });
//   }
// };

// // ========== GET COURSE DETAILS CONTROLLER ========== //
// module.exports.getWorkflowDetails = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const query = `
//     SELECT W.*, WT.name, D.name AS department
//     FROM WORKFLOW_MASTER AS W
//     LEFT JOIN WORKFLOW_TYPE_MASTER AS WT ON WT.id=W.workflow_type_id
//     LEFT JOIN DEPARTMENT_MASTER AS D ON D.id=W.dept_id
//     WHERE W.id=${id} AND W.isDeleted=false`;

//     const getAllData = await DB.sequelize.query(query, {
//       type: DB.sequelize.QueryTypes.SELECT,
//     });

//     // Get Employee Mapping Details
//     const employeeMappingDetails =
//       await DB.tbl_workflowEmployeeMapping_master.findAll({
//         where: { workflow_id: id },
//       });

//     const workflowEmployeeDetails = await Promise.all(
//       employeeMappingDetails.map(async (employee) => {
//         const details = await DB.tbl_user_master.findOne({
//           attributes: ["id", "name"],
//           where: { id: employee.user_id },
//           include: {
//             model: DB.tbl_role_master,
//             attributes: ["id", "name"],
//             where: { isDeleted: false },
//           },
//         });

//         return details;
//       })
//     );

//     if (getAllData.length < 1) {
//       return res
//         .status(400)
//         .send({ success: false, message: "Workflow Not Found!" });
//     } else {
//       return res.status(200).send({
//         success: true,
//         status: "Get Workflow Details Successfully!",
//         data: { ...getAllData, workflowEmployeeDetails },
//       });
//     }
//   } catch (error) {
//     res.status(500).send({ success: false, message: error.message });
//   }
// };

// // ========== GET ALL COURSE DETAILS CONTROLLER ========== //
// module.exports.getAllWorkflowDetails = async (req, res) => {
//   try {
//     const query = `
//             SELECT W.*, WT.name, D.name AS department
//             FROM WORKFLOW_MASTER AS W
//             LEFT JOIN WORKFLOW_TYPE_MASTER AS WT ON WT.id=W.workflow_type_id
//             LEFT JOIN DEPARTMENT_MASTER AS D ON D.id=W.dept_id
//             WHERE W.isDeleted=false`;

//     const getAllData = await DB.sequelize.query(query, {
//       type: DB.sequelize.QueryTypes.SELECT,
//     });

//     if (getAllData.length < 1) {
//       return res
//         .status(400)
//         .send({ success: false, message: "Workflows Not Found!" });
//     } else {
//       return res.status(200).send({
//         success: true,
//         status: "Get All Workflows List!",
//         data: getAllData,
//       });
//     }
//   } catch (error) {
//     res.status(500).send({ success: false, message: error.message });
//   }
// };

// // ========== UPDATE COURSE CONTROLLER ========== //
// module.exports.updateWorkflowStatus = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Check if Workflow already exist
//     const isWorkflowExist = await DB.tbl_workflow_master.findOne({
//       where: {
//         id,
//         isDeleted: false,
//       },
//     });

//     if (!isWorkflowExist) {
//       return res
//         .status(400)
//         .send({ success: false, message: "Workflow Not Found!" });
//     } else {
//       const updateStatus = await isWorkflowExist.update({
//         status: !isWorkflowExist.status,
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

// // ========== DELETE COURSE CONTROLLER ========== //
// module.exports.deleteWorkflow = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Check if Workflow already exist
//     const isWorkflowExist = await DB.tbl_workflow_master.findOne({
//       where: {
//         id,
//         isDeleted: false,
//       },
//     });

//     if (!isWorkflowExist) {
//       return res
//         .status(400)
//         .send({ success: false, message: "Workflow Not Found!" });
//     } else {
//       await isWorkflowExist.update({
//         isDeleted: true,
//       });
//       return res.status(200).send({
//         success: true,
//         status: "Workflow Deleted Successfully!",
//       });
//     }
//   } catch (error) {
//     res.status(500).send({ success: false, message: error.message });
//   }
// };

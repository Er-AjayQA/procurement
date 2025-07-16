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
            marks_per_question: data.marks_per_question,
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

// ========== GET COURSE DETAILS CONTROLLER ========== //
module.exports.getCourseDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
    SELECT C.*, CC.name AS course_category_name
    FROM LMS_COURSE AS C
    LEFT JOIN COURSE_CATEGORY AS CC ON CC.id=C.course_category_id
    WHERE C.id=${id} AND C.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "Workflow Not Found!" });
    } else {
      // Get Assessment Details
      let getAllAssessment;
      if (getAllData[0].course_type === "contentWithAssessment") {
        getAllAssessment = await DB.tbl_lms_course_assessment.findAll({
          where: { course_id: id, isDeleted: false },
          include: [
            {
              model: DB.tbl_lms_course_assessment_questions,
              where: { isDeleted: false },
            },
          ],
        });
      }

      // Get Content Details
      const getAllContent = await DB.tbl_lms_course_content.findAll({
        where: { course_id: id, isDeleted: false },
      });

      return res.status(200).send({
        success: true,
        status: "Get Course Details Successfully!",
        data: { ...getAllData, getAllAssessment, getAllContent },
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

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

// ========== ASSIGN COURSE CONTROLLER ========== //
module.exports.assignCourse = async (req, res) => {
  const transaction = await DB.sequelize.transaction();
  try {
    const data = req.body;

    let employees = [];

    const checkIfAssign = await DB.tbl_lms_assign_course.findOne({
      where: {
        course_id: data.course_id,
        assign_type: data.assign_type,
        isDeleted: false,
      },
      transaction,
    });

    if (checkIfAssign) {
      await transaction.rollback();
      return res.status(409).send({
        success: false,
        status: "Course Already Assigned!",
      });
    }

    // Find all Users of Selected Departments
    if (data.assign_type === "department") {
      for (const id of data.allocate_id) {
        const empData = await DB.tbl_user_master.findAll({
          where: { dep_id: id, isDeleted: false },
          transaction,
        });

        if (empData.length > 0) {
          for (const employee of empData) {
            employees.push(employee.id);
          }
        }
      }
    }

    // Find all Users of Selected Designations
    if (data.assign_type === "designation") {
      for (const id of data.allocate_id) {
        const empData = await DB.tbl_user_master.findAll({
          where: { designation_id: id, isDeleted: false },
          transaction,
        });

        if (empData.length > 0) {
          for (const employee of empData) {
            employees.push(employee.id);
          }
        }
      }
    }

    // Find all Users
    if (data.assign_type === "allEmployees") {
      const allEmployees = await DB.tbl_user_master.findAll({
        where: { isDeleted: false },
        transaction,
      });
      for (const employee of allEmployees) {
        employees.push(employee.id);
      }
    }

    // Find Selected Users
    if (data.assign_type === "employees") {
      for (const employeeId of data.allocate_id) {
        const empData = await DB.tbl_user_master.findOne({
          where: { id: employeeId, isDeleted: false },
          transaction,
        });

        employees.push(empData.id);
      }
    }

    // Find Course Contents
    let contents = [];
    const courseContents = await DB.tbl_lms_course_content.findAll({
      where: { course_id: data.course_id },
    });

    if (courseContents.length > 0) {
      for (const content of courseContents) {
        contents.push({ content_id: content.id, complete_status: false });
      }
    }

    let attempts;

    const getAssessmentAttempts = await DB.tbl_lms_course_assessment.findOne({
      where: { course_id: data.course_id, isDeleted: false },
    });

    attempts = getAssessmentAttempts.assessment_max_attempts;

    // console.log(typeof attempts);
    // return;

    const assignCourse = await DB.tbl_lms_assign_course.create(
      {
        course_id: data.course_id,
        assign_type: data.assign_type,
        start_date: data.start_date,
        end_date: data.end_date,
      },
      { transaction }
    );

    if (employees.length > 0) {
      await DB.tbl_lms_assign_employee_course.bulkCreate(
        employees.map((employee) => ({
          user_id: employee,
          course_assign_id: assignCourse.id,
          allContentStatus: contents,
          attempt_left: attempts ? attempts : 0,
        })),
        {
          transaction,
        }
      );
    }

    await transaction.commit();
    return res.status(200).send({
      success: true,
      status: "Course Assigned Successfully!",
    });
  } catch (error) {
    await transaction.rollback();
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== SUBMIT ASSESSMENT CONTROLLER ========== //
module.exports.assessmentSubmit = async (req, res) => {
  const transaction = await DB.sequelize.transaction();
  try {
    const data = req.body;
    const { user_id, assign_id } = req.params;

    // Get Assessment Details
    const details = await DB.tbl_lms_assign_employee_course.findOne({
      where: { user_id, course_assign_id: assign_id, isDeleted: false },
      transaction,
    });

    if (!details.attempt_left > 0) {
      await transaction.rollback();
      return res.status(400).send({
        success: false,
        status: "No Attempts Left!",
      });
    }

    // Get All questions
    const allQuestions = await DB.tbl_lms_course_assessment_questions.findAll({
      where: { assessment_id: data.assessment_id, isDeleted: false },
      attributes: ["id", "assessment_correct_answer"],
    });

    // Create mapping for question and it's answers
    const correctAnswerMap = {};
    allQuestions.forEach((question) => {
      correctAnswerMap[question.id] = question.assessment_correct_answer;
    });

    if (data.employee_answer && data.employee_answer.length > 0) {
      await DB.tbl_lms_employee_assessment_question_submission.bulkCreate(
        data.employee_answer.map((answer) => {
          // Check if answer is Correct
          const status =
            correctAnswerMap[answer.question_id] === answer.employee_answer;
          return {
            assessment_id: data.assessment_id,
            question_id: answer.question_id,
            employee_answer: answer.employee_answer,
            answer_status: status,
          };
        }),
        { transaction }
      );
    }

    // Updating the Attempts Left
    await DB.tbl_lms_assign_employee_course.update(
      { attempt_left: details.attempt_left - 1 },
      {
        where: { user_id, course_assign_id: assign_id, isDeleted: false },
      },
      { transaction }
    );

    // Get Assessment Details
    const assessmentDetails = await DB.tbl_lms_course_assessment.findOne({
      where: { id: data.course_id, isDeleted: false },
      transaction,
    });

    // Get Total Marks
    const totalMarks =
      assessmentDetails.marks_per_question * allQuestions.length;

    console.log(totalMarks);

    await transaction.commit();
    return res.status(200).send({
      success: true,
      status: "Assessment Submitted Successfully!",
    });
  } catch (error) {
    await transaction.rollback();
    res.status(500).send({ success: false, message: error.message });
  }
};

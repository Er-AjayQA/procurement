// ========== REQUIRE STATEMENTS ========== //
const { where } = require("sequelize");
const DB = require("../../../config/index");

// ******************** COURSE BASIC LOGIC CONTROLLERS ******************** //
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
            total_marks:
              data.marks_per_question * data.assessmentQuestions.length,
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
        message: "Course Created Successfully!",
        data: newCourse,
      });
    }
  } catch (error) {
    await transaction.rollback();
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE COURSE CONTROLLER ========== //
// module.exports.updateCourse = async (req, res) => {
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
          attributes: [
            "id",
            "assessment_name",
            "assessment_passing_percent",
            "assessment_time",
            "assessment_max_attempts",
            "marks_per_question",
          ],
          where: { course_id: id, isDeleted: false },
          include: [
            {
              model: DB.tbl_lms_course_assessment_questions,
              attributes: [
                "id",
                "assessment_question_type",
                "assessment_question_title",
                "assessment_correct_answer",
                "assessment_question_options",
              ],
              where: { isDeleted: false },
            },
          ],
        });
      }

      // Get Content Details
      const getAllContent = await DB.tbl_lms_course_content.findAll({
        where: { course_id: id, isDeleted: false },
      });

      const responseData = {
        basicDetails: getAllData,
        contentDetails: getAllContent,
        assessmentDetails: getAllAssessment,
      };

      return res.status(200).send({
        success: true,
        message: "Get Course Details Successfully!",
        data: responseData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL COURSE DETAILS CONTROLLER ========== //
module.exports.getAllCourseDetails = async (req, res) => {
  try {
    const limit = parseInt(req.body.limit) || 10;
    const page = parseInt(req.body.page) || 1;
    const offset = (page - 1) * limit;
    const filter = req.body.filter || null;

    const whereClause = { isDeleted: false };

    if (filter.name !== undefined || filter.name !== "") {
      whereClause.course_name = {
        [DB.Sequelize.Op.like]: [`%${filter.name}%`],
      };
    }

    const totalRecords = await DB.tbl_lms_course.count({ whereClause });
    const totalPages = Math.ceil(totalRecords / limit);

    const getAllData = await DB.tbl_lms_course.findAll({
      include: [
        {
          model: DB.tbl_course_category,
        },
      ],
      where: whereClause,
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
    });

    if (!getAllData || getAllData.length === 0) {
      return res
        .status(400)
        .send({ success: false, message: "Courses Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        message: "Get All Courses List!",
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

// ========== UPDATE COURSE STATUS CONTROLLER ========== //
module.exports.updateCourseStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Course exist
    const isCourseExist = await DB.tbl_lms_course.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isCourseExist) {
      return res
        .status(400)
        .send({ success: false, message: "Course Not Found!" });
    } else {
      const updateStatus = await isCourseExist.update({
        status: !isCourseExist.status,
      });
      return res.status(200).send({
        success: true,
        message: "Status Changed Successfully!",
        data: updateStatus,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ******************** COURSE ALLOCATION LOGIC CONTROLLERS ******************** //
// ========== ASSIGN COURSE CONTROLLER ========== //
module.exports.assignCourse = async (req, res) => {
  const transaction = await DB.sequelize.transaction();
  try {
    const data = req.body;

    // Check if there's any existing assignment with different assign_type
    const checkIfAssign = await DB.tbl_lms_assign_course.findOne({
      where: {
        course_id: data.course_id,
        isDeleted: false,
      },
      transaction,
    });

    if (checkIfAssign && checkIfAssign.assign_type !== data.assign_type) {
      await transaction.rollback();
      return res.status(409).send({
        success: false,
        status: "Course Already Assigned!",
      });
    }

    let employees = [];
    if (data.assign_type === "department") {
      // Find all Users of Selected Departments
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

    if (employees.length > 0) {
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

      // Get the Course Assessment Max Attempts
      let attempts;
      const getAssessmentAttempts = await DB.tbl_lms_course_assessment.findOne({
        where: { course_id: data.course_id, isDeleted: false },
      });

      attempts = getAssessmentAttempts?.assessment_max_attempts || 0;

      // Assign the Courses to all employees as per employees array value
      const assignCourse = await DB.tbl_lms_assign_course.create(
        {
          course_id: data.course_id,
          assign_type: data.assign_type,
          start_date: data.start_date,
          end_date: data.end_date,
        },
        { transaction }
      );

      await DB.tbl_lms_assign_employee_course.bulkCreate(
        employees.map((employee) => ({
          user_id: employee,
          course_assign_id: assignCourse.id,
          course_id: assignCourse.course_id,
          allContentStatus: contents,
          attempt_left: attempts,
        })),
        {
          transaction,
        }
      );

      await transaction.commit();
      return res.status(200).send({
        success: true,
        status: "Course Assigned Successfully!",
      });
    }

    await transaction.rollback();
    return res.status(404).send({
      success: false,
      status: "No Employees Found For Selected Assigned Type!",
    });
  } catch (error) {
    await transaction.rollback();
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE ASSIGN COURSE CONTROLLER ========== //
module.exports.updateAssignCourse = async (req, res) => {
  const transaction = await DB.sequelize.transaction();
  try {
    const data = req.body;
    const { assign_id } = req.params;

    const checkIfDataFound = await DB.tbl_lms_assign_course.findOne({
      where: { id: assign_id, isDeleted: false },
      transaction,
    });

    if (!checkIfDataFound) {
      await transaction.rollback();
      return res.status(404).send({
        success: false,
        status: "No Such Assigned Course Found!",
      });
    }

    if (checkIfDataFound && checkIfDataFound.assign_type !== data.assign_type) {
      await transaction.rollback();
      return res.status(409).send({
        success: false,
        status: "Can't Change the Assigned Type!",
      });
    }

    let employees = [];
    if (data.assign_type === "department") {
      // Find all Users of Selected Departments
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

    if (employees.length > 0) {
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

      // Get the Course Assessment Max Attempts
      let attempts;
      const getAssessmentAttempts = await DB.tbl_lms_course_assessment.findOne({
        where: { course_id: data.course_id, isDeleted: false },
      });

      attempts = getAssessmentAttempts?.assessment_max_attempts || 0;

      // Filtered out Employees who Already Have Course
      let employeesToAssign = await Promise.all(
        employees.map(async (employee) => {
          const getEmployeeAssignDetail =
            await DB.tbl_lms_assign_employee_course.findOne({
              where: {
                user_id: employee,
                course_assign_id: checkIfDataFound.id,
                isDeleted: false,
              },
            });

          return getEmployeeAssignDetail ? null : employee;
        })
      );
      const filteredEmployees = employeesToAssign.filter(
        (employee) => employee !== null
      );

      // Assign the Courses to all employees as per employees array value
      await DB.tbl_lms_assign_employee_course.bulkCreate(
        filteredEmployees.map((employee) => ({
          user_id: employee,
          course_assign_id: assign_id,
          course_id: checkIfDataFound.course_id,
          allContentStatus: contents,
          attempt_left: attempts,
        })),
        {
          transaction,
        }
      );

      await transaction.commit();
      return res.status(200).send({
        success: true,
        status: "Course Assigned Successfully!",
      });
    }

    await transaction.rollback();
    return res.status(404).send({
      success: false,
      status: "Nothing Is Selected For Course Assigned!",
    });
  } catch (error) {
    await transaction.rollback();
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== RENEW COURSE ALLOCATION VALIDITY CONTROLLER ========== //
module.exports.renewAssignedCourseValidity = async (req, res) => {
  const transaction = await DB.sequelize.transaction();
  try {
    const data = req.body;
    const { assign_id } = req.params;
    // Get current date for comparison
    const currentDate = new Date();

    const existedAssignCourse = await DB.tbl_lms_assign_course.findOne({
      where: { id: assign_id, isDeleted: false },
      transaction,
    });

    if (!existedAssignCourse) {
      await transaction.rollback();
      return res.status(404).send({
        success: false,
        status: "No Such Assigned Course Found!",
      });
    }

    // Check if course is already expired
    if (new Date(existedAssignCourse.end_date) > currentDate) {
      await transaction.rollback();
      return res.status(500).send({
        success: false,
        status: "Cannot Renew Course Validity Before It Expires!",
      });
    }

    // Validate New Dates
    const newStartDate = new Date(data.start_date);
    const newEndDate = new Date(data.end_date);

    if (newEndDate <= newStartDate) {
      await transaction.rollback();
      return res.status(500).send({
        success: false,
        status: "End Date Can't Be Smaller Than Or Same As Start Date!",
      });
    }

    await DB.tbl_lms_assign_course.update(
      {
        start_date: data.start_date,
        end_date: data.end_date,
      },
      { where: { id: existedAssignCourse.id, isDeleted: false }, transaction }
    );

    await transaction.commit();
    return res.status(200).send({
      success: true,
      status: "Course Renewed Successfully!",
    });
  } catch (error) {
    await transaction.rollback();
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET USER'S ASSIGNED COURSE DETAILS BY ID CONTROLLER ========== //
module.exports.getUserAssignedCourseDetailsById = async (req, res) => {
  try {
    const { user_id, course_id } = req.params;

    const courseDetails = await DB.tbl_lms_course.findOne({
      where: { id: course_id, isDeleted: false, status: true },
    });

    if (!courseDetails) {
      return res
        .status(400)
        .send({ success: false, message: "No Courses Details Found!" });
    } else {
      // Get Course Assign ID
      const assignCourseDetails =
        await DB.tbl_lms_assign_employee_course.findOne({
          attributes: ["course_assign_id"],
          where: { course_id, user_id, isDeleted: false },
        });

      // Get All Content Details with Progress Status
      const contentDetails = await DB.tbl_lms_assign_employee_course.findOne({
        attributes: [
          "allContentStatus",
          "isContentComplete",
          "isAssessmentComplete",
          "isCourseComplete",
          "attempt_left",
        ],
        where: { user_id, course_id, isDeleted: false },
        raw: true,
      });

      // Check if Content Exist
      const validContent = await Promise.all(
        contentDetails.allContentStatus.map(async (contentStatus) => {
          const contentExist = await DB.tbl_lms_course_content.findOne({
            where: { id: contentStatus.content_id, isDeleted: false },
          });
          return contentExist ? contentStatus : null;
        })
      );

      // Remove Deleted Content
      const filteredContentStatus = validContent.filter(
        (status) => status !== null
      );

      const getContent = await Promise.all(
        filteredContentStatus.map(async (data) => {
          const fetchContent = await DB.tbl_lms_course_content.findOne({
            attributes: ["id", "content_type", "content_name", "content_link"],
            where: { id: data.content_id, isDeleted: false },
            raw: true,
          });
          fetchContent.status = data.complete_status;

          return fetchContent;
        })
      );

      // Get All Assessment Details
      let assessmentDetails = null;
      if (courseDetails.course_type === "contentWithAssessment") {
        const assessmentBasicDetails =
          await DB.tbl_lms_course_assessment.findOne({
            attributes: [
              "id",
              "assessment_name",
              "assessment_passing_percent",
              "assessment_time",
              "assessment_max_attempts",
              "marks_per_question",
              "total_marks",
            ],
            where: { course_id, isDeleted: false },
            raw: true,
          });

        const assessmentQuestions =
          await DB.tbl_lms_course_assessment_questions.findAll({
            attributes: [
              "assessment_question_type",
              "assessment_question_title",
              "assessment_correct_answer",
              "assessment_question_options",
            ],
            where: {
              course_id,
              assessment_id: assessmentBasicDetails.id,
              isDeleted: false,
            },
            raw: true,
          });
        assessmentDetails = {
          ...assessmentBasicDetails,
          questions: assessmentQuestions,
        };
      }

      const responseData = {
        basicDetails: courseDetails,
        course_assign_id: assignCourseDetails.course_assign_id,
        isContentComplete: contentDetails.isContentComplete,
        isAssessmentComplete: contentDetails.isAssessmentComplete,
        isCourseComplete: contentDetails.isCourseComplete,
        attempt_left: contentDetails.attempt_left,
        contentDetails: getContent,
        ...(assessmentDetails && { assessmentDetails }),
      };

      return res.status(200).send({
        success: true,
        status: "Get Assigned Course Details!",
        data: responseData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET USER'S ALL ASSIGNED COURSES LIST CONTROLLER ========== //
module.exports.getUserAllAssignedCourseList = async (req, res) => {
  try {
    const data = req.body;
    const { user_id } = req?.params;
    const filter = { isDeleted: false };

    if (data?.course_type === "commonContent") {
      filter.course_type = "commonContent";
    }

    if (data?.course_type === "contentWithAssessment") {
      filter.course_type = "contentWithAssessment";
    }

    // Basic query to get actual courses assigned to user
    const query = `
            SELECT AEC.course_id AS id, C.course_type
            FROM LMS_ASSIGN_EMPLOYEE_COURSE AS AEC
            LEFT JOIN LMS_COURSE AS C ON C.id=AEC.course_id
            WHERE AEC.user_id=:user_id AND AEC.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      replacements: { user_id },
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "No Courses Assigned Yet!" });
    } else {
      // Filter Desired courses id's
      let allCoursesId;
      if (data?.course_type) {
        allCoursesId = getAllData.filter((data) => {
          if (data.course_type === filter.course_type) {
            return data.id;
          }
        });
      } else {
        allCoursesId = getAllData.filter((data) => data.id);
      }

      // Getting Course Details
      let courseDetails = await Promise.all(
        allCoursesId.map(async (data) => {
          const courseData = await DB.tbl_lms_course.findOne({
            where: { id: data.id, isDeleted: false, status: true },
            include: [
              {
                model: DB.tbl_course_category,
                attributes: ["name"],
                raw: true,
                nest: true,
              },
            ],
            raw: true,
            nest: true,
          });
          if (!courseData) return null;

          // Get All Content Details with Progress Status
          const contentDetails =
            await DB.tbl_lms_assign_employee_course.findOne({
              attributes: [
                "isContentComplete",
                "isAssessmentComplete",
                "isCourseComplete",
              ],
              where: { user_id, course_id: data.id, isDeleted: false },
              raw: true,
            });

          return {
            basicDetails: {
              ...courseData,
              isContentComplete: contentDetails.isContentComplete,
              isAssessmentComplete: contentDetails.isAssessmentComplete,
              isCourseComplete: contentDetails.isCourseComplete,
            },
          };
        })
      );

      courseDetails = courseDetails.filter((data) => data !== null);

      return res.status(200).send({
        success: true,
        status: "Get All Assigned Courses List!",
        totalRecords: courseDetails.length,
        assign_id: getAllData[0].course_assign_id,
        data: courseDetails,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL ASSIGNED COURSES LIST CONTROLLER ========== //
module.exports.getAllAssignedCourseList = async (req, res) => {
  try {
    // Basic query to get actual courses assigned to user
    const query = `
            SELECT AC.id AS assign_id, AC.start_date, AC.end_date, AC.assign_type, C.*
            FROM LMS_ASSIGN_COURSE AS AC
            LEFT JOIN LMS_COURSE AS C ON C.id=AC.course_id
            WHERE AC.isDeleted=false`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(400)
        .send({ success: false, message: "No Allocation List Found!" });
    } else {
      return res.status(200).send({
        success: true,
        status: "Get All Assigned Courses List!",
        totalRecords: getAllData.length,
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ASSIGNED COURSES DETAILS BY ID CONTROLLER ========== //
module.exports.getAssignedCourseDetailById = async (req, res) => {
  try {
    const { assign_id } = req.params;

    // Get Course Basic Details Logic
    const basicDetail = await DB.sequelize.query(
      `SELECT AC.*, C.*, CC.name as category_name
       FROM LMS_ASSIGN_COURSE AS AC
       LEFT JOIN LMS_COURSE AS C ON C.id=AC.course_id
       LEFT JOIN COURSE_CATEGORY AS CC ON CC.id=C.course_category_id       
       WHERE AC.id=:assign_id`,
      {
        replacements: { assign_id },
        type: DB.sequelize.QueryTypes.SELECT,
      }
    );

    // Get All Associated Users Details Logic
    const getAssociatedUsers = await DB.tbl_lms_assign_employee_course.findAll({
      attributes: ["user_id"],
      where: { course_assign_id: assign_id },
    });
    const userIds = getAssociatedUsers.map((user) => user.user_id);
    let users = await DB.sequelize.query(
      `SELECT U.id, U.name, U.emp_code, DS.name as designation_name, DE.name as department_name
       FROM USER_MASTER AS U
       LEFT JOIN DESIGNATION_MASTER AS DS ON DS.id=U.designation_id
       LEFT JOIN DEPARTMENT_MASTER AS DE ON DE.id=U.dep_id
       WHERE U.id IN (:userIds)`,
      {
        replacements: { userIds },
        type: DB.sequelize.QueryTypes.SELECT,
      }
    );

    // Get Each User Assessment Submission Details Logic
    const assessmentResult = (
      await Promise.all(
        userIds.map(async (userId) => {
          const data = await DB.tbl_lms_course_assessment_results.findOne({
            attributes: [
              "id",
              "total_marks",
              "obtained_marks",
              "isPass",
              "user_id",
            ],
            where: { course_assign_id: assign_id, user_id: userId },
            order: [["createdAt", "DESC"]],
            limit: 1,
          });

          return data;
        })
      )
    ).filter((data) => data !== null);

    const responseData = {
      basicDetail,
      allAssociatedUsers: users,
      userAssessmentSubmit: assessmentResult,
    };

    return res.status(200).send({
      success: true,
      status: "Get Assigned Course Detail!",
      totalRecords: responseData.length,
      data: responseData,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET USER ATTEMPTS DETAILS CONTROLLER ========== //
module.exports.getUserAttemptsDetail = async (req, res) => {
  try {
    const { user_id, assign_id } = req.params;

    // Get Course Basic Details
    const courseDetails = await DB.sequelize.query(
      `SELECT AC.start_date, AC.end_date, C.course_name, CA.assessment_passing_percent, 
       CA.assessment_time, CA.assessment_max_attempts, CA.total_marks
       FROM LMS_ASSIGN_COURSE AS AC
       LEFT JOIN LMS_COURSE AS C ON C.id=AC.course_id
       LEFT JOIN LMS_COURSE_ASSESSMENT AS CA ON CA.course_id=C.id
       WHERE AC.id=:assign_id`,
      {
        replacements: { assign_id },
        type: DB.sequelize.QueryTypes.SELECT,
      }
    );

    if (!courseDetails.length) {
      return res
        .status(404)
        .send({ success: false, message: "Course not found" });
    }

    // Get User Basic Details
    const userDetails = await DB.sequelize.query(
      `SELECT U.name
       FROM USER_MASTER AS U
       WHERE U.id=:user_id`,
      {
        replacements: { user_id },
        type: DB.sequelize.QueryTypes.SELECT,
      }
    );

    if (!userDetails.length) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    // Get Assessment Results with Questions
    const assessmentResults = await DB.sequelize.query(
      `SELECT CAR.id as attempt_id, CAR.isPass, CAR.createdAt as attempt_date
       FROM LMS_COURSE_ASSESSMENT_RESULTS AS CAR
       WHERE CAR.user_id=:user_id AND CAR.course_assign_id=:assign_id
       ORDER BY CAR.createdAt DESC`,
      {
        replacements: { user_id, assign_id },
        type: DB.sequelize.QueryTypes.SELECT,
      }
    );

    const attemptsWithQuestions = await Promise.all(
      assessmentResults.map(async (attempt) => {
        const questions =
          await DB.tbl_lms_employee_assessment_question_submission.findAll({
            attributes: ["id", "employee_answer", "answer_status"],
            where: { result_id: attempt.attempt_id },
            include: [
              {
                model: DB.tbl_lms_course_assessment_questions,
                attributes: [
                  "id",
                  "assessment_question_title",
                  "assessment_correct_answer",
                ],
                where: { isDeleted: false },
              },
            ],
            raw: true,
            nest: true,
          });

        return {
          ...attempt,
          questions: questions.map((q) => ({
            question_id: q.LMS_COURSE_ASSESSMENT_QUESTION.id,
            question_text:
              q.LMS_COURSE_ASSESSMENT_QUESTION.assessment_question_title,
            correct_answer:
              q.LMS_COURSE_ASSESSMENT_QUESTION.assessment_correct_answer,
            user_answer: q.employee_answer,
            is_correct: q.answer_status,
          })),
        };
      })
    );

    const responseData = {
      course: {
        id: assign_id,
        name: courseDetails[0].course_name,
        start_date: courseDetails[0].start_date,
        end_date: courseDetails[0].end_date,
        passing_percent: courseDetails[0].assessment_passing_percent,
        time_limit: courseDetails[0].assessment_time,
        max_attempts: courseDetails[0].assessment_max_attempts,
        total_marks: courseDetails[0].total_marks,
      },
      user: {
        id: user_id,
        name: userDetails[0].name,
      },
      attempts: attemptsWithQuestions.map((attempt) => ({
        attempt_id: attempt.attempt_id,
        is_passed: Boolean(attempt.isPass),
        attempt_date: attempt.attempt_date,
        questions: attempt.questions,
      })),
    };

    return res.status(200).send({
      success: true,
      message: "User assessment attempts retrieved successfully",
      data: responseData,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ******************** COURSE ASSESSMENT AND CONTENT SUBMISSION LOGIC CONTROLLERS ******************** //
// ========== SUBMIT CONTENT CONTROLLER ========== //
module.exports.contentSubmit = async (req, res) => {
  const transaction = await DB.sequelize.transaction();
  try {
    const data = req.body;
    const { user_id } = req.params;

    let getCourseStatusData = await DB.tbl_lms_assign_employee_course.findOne({
      attributes: ["allContentStatus"],
      where: { course_id: data.course_id, user_id },
      transaction,
    });

    const updatedData = getCourseStatusData.allContentStatus.map((content) => {
      if (content.content_id === data.content_id) {
        content.complete_status = data.status;
        return content;
      } else {
        return content;
      }
    });

    await DB.tbl_lms_assign_employee_course.update(
      { allContentStatus: updatedData },
      {
        where: { user_id, course_id: data.course_id },
        transaction,
      }
    );

    const getAllStatus = await DB.tbl_lms_assign_employee_course.findOne({
      where: { course_id: data.course_id, user_id },
      transaction,
    });

    const checkAllStatus = getAllStatus.allContentStatus.every(
      (data) => data.complete_status === true
    );

    if (checkAllStatus) {
      await DB.tbl_lms_assign_employee_course.update(
        { isContentComplete: true },
        { where: { course_id: data.course_id, user_id }, transaction }
      );
    }

    await transaction.commit();
    return res.status(200).send({
      success: true,
      status: "Content Submitted Successfully!",
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

    // Get Assessment Attempts Details
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

    // Get Assessment Details
    const assessmentDetails = await DB.tbl_lms_course_assessment.findOne({
      where: {
        id: data.assessment_id,
        course_id: data.course_id,
        isDeleted: false,
      },
      transaction,
    });

    // Get Course Assessment Questions
    const allQuestions = await DB.tbl_lms_course_assessment_questions.findAll({
      where: { assessment_id: data.assessment_id, isDeleted: false },
      attributes: ["id", "assessment_correct_answer"],
      raw: true,
      nest: true,
      transaction,
    });

    // Create mapping for question and it's answers
    const correctAnswerMap = {};
    allQuestions.forEach((question) => {
      correctAnswerMap[question.id] = question.assessment_correct_answer;
    });

    if (data.employee_answer && data.employee_answer.length > 0) {
      // Save Final Result Data
      const getObtainedMarks = data.employee_answer.reduce(
        (totalMarks, answer) => {
          if (correctAnswerMap[answer.question_id] === answer.employee_answer) {
            totalMarks += assessmentDetails.marks_per_question;
          }

          return totalMarks;
        },
        0
      );

      const saveResult = await DB.tbl_lms_course_assessment_results.create(
        {
          total_marks: assessmentDetails.total_marks,
          obtained_marks: getObtainedMarks,
          isPass:
            (getObtainedMarks * 100) / assessmentDetails.total_marks >=
            assessmentDetails.assessment_passing_percent
              ? true
              : false,
          user_id,
          course_assign_id: details.course_assign_id,
        },
        { transaction }
      );

      // Save Employees Answers
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
            result_id: saveResult.id,
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

// ========== GET ALL ASSESSMENT ATTEMPTS DETAILS CONTROLLER ========== //
module.exports.getAllAssessmentAttempts = async (req, res) => {
  const transaction = await DB.sequelize.transaction();
  try {
    const data = req.body;
    const { user_id, assessment_id } = req.params;

    // Get Assessment Attempts Details
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

    // Get Assessment Details
    const assessmentDetails = await DB.tbl_lms_course_assessment.findOne({
      where: {
        id: data.assessment_id,
        course_id: data.course_id,
        isDeleted: false,
      },
      transaction,
    });

    // Get Course Assessment Questions
    const allQuestions = await DB.tbl_lms_course_assessment_questions.findAll({
      where: { assessment_id: data.assessment_id, isDeleted: false },
      attributes: ["id", "assessment_correct_answer"],
      raw: true,
      nest: true,
      transaction,
    });

    // Create mapping for question and it's answers
    const correctAnswerMap = {};
    allQuestions.forEach((question) => {
      correctAnswerMap[question.id] = question.assessment_correct_answer;
    });

    if (data.employee_answer && data.employee_answer.length > 0) {
      // Save Final Result Data
      const getObtainedMarks = data.employee_answer.reduce(
        (totalMarks, answer) => {
          if (correctAnswerMap[answer.question_id] === answer.employee_answer) {
            totalMarks += assessmentDetails.marks_per_question;
          }

          return totalMarks;
        },
        0
      );

      const saveResult = await DB.tbl_lms_course_assessment_results.create(
        {
          total_marks: assessmentDetails.total_marks,
          obtained_marks: getObtainedMarks,
          isPass:
            (getObtainedMarks * 100) / assessmentDetails.total_marks >=
            assessmentDetails.assessment_passing_percent
              ? true
              : false,
          user_id,
          course_assign_id: details.course_assign_id,
        },
        { transaction }
      );

      // Save Employees Answers
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
            result_id: saveResult.id,
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

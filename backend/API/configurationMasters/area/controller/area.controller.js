// ========== REQUIRE STATEMENTS ========== //
const { Model } = require("sequelize");
const DB = require("../../../../config/index");

// ========== CREATE AREA CONTROLLER ========== //
module.exports.createArea = async (req, res) => {
  try {
    const data = req.body;

    // Check if Area already exist
    const isAlreadyExist = await DB.tbl_area_master.findOne({
      where: {
        name: data.name,
        dept_id: data.dept_id,
        entity_id: req?.selectedEntity,
        isDeleted: false,
      },
    });

    if (isAlreadyExist) {
      return res
        .status(400)
        .send({ success: false, message: "Area Already Exist!" });
    } else {
      const newArea = await DB.tbl_area_master.create({
        ...data,
        entity_id: req?.selectedEntity,
      });
      return res.status(201).send({
        success: true,
        message: "Area Created Successfully!",
        data: newArea,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== UPDATE AREA CONTROLLER ========== //
module.exports.updateArea = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    // Check if Area already exist
    const isAreaExist = await DB.tbl_area_master.findOne({
      where: {
        id,
        entity_id: req?.selectedEntity,
        isDeleted: false,
      },
    });

    if (!isAreaExist) {
      return res
        .status(404)
        .send({ success: false, message: "Area Not Found!" });
    } else {
      const duplicateArea = await DB.tbl_area_master.findOne({
        where: {
          id: { [DB.Sequelize.Op.ne]: id },
          name: data?.name,
          dept_id: data?.dept_id,
          entity_id: req?.selectedEntity,
          isDeleted: false,
        },
      });

      if (duplicateArea) {
        return res
          .status(409)
          .send({ success: false, message: "Area Name Already Exist!" });
      } else {
        const updateArea = await isAreaExist.update(data);
        return res.status(201).send({
          success: true,
          message: "Area Updated Successfully!",
        });
      }
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET AREA DETAILS CONTROLLER ========== //
module.exports.getAreaDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
    SELECT A.*, D.name AS department_name
    FROM AREA_MASTER AS A
    LEFT JOIN DEPARTMENT_MASTER AS D ON D.id=A.dept_id
    WHERE A.id=${id}`;

    const getAllData = await DB.sequelize.query(query, {
      type: DB.sequelize.QueryTypes.SELECT,
    });

    if (getAllData.length < 1) {
      return res
        .status(404)
        .send({ success: false, message: "Area Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        message: "Get Area Details Successfully!",
        data: getAllData,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== GET ALL AREA DETAILS CONTROLLER ========== //
module.exports.getAllAreaDetails = async (req, res) => {
  try {
    const limit = parseInt(req.body.limit) || 10;
    const page = parseInt(req.body.page) || 1;
    const offset = (page - 1) * limit;
    const filter = req.body.filter || null;

    let whereClause = { entity_id: req?.selectedEntity, isDeleted: false };

    if (filter.name !== undefined || filter.name !== "") {
      whereClause.name = { [DB.Sequelize.Op.like]: `%${filter.name}%` };
    }

    if (filter.dept_id !== undefined || filter.dept_id !== "") {
      whereClause.dept_id = { [DB.Sequelize.Op.like]: `%${filter.dept_id}%` };
    }

    const totalRecords = await DB.tbl_area_master.count({
      where: whereClause,
    });

    const totalPages = Math.ceil(totalRecords / limit);

    const getAllData = await DB.tbl_area_master.findAll({
      include: [
        {
          model: DB.tbl_department_master,
          attributes: ["id", "name"],
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
        .send({ success: false, message: "Area Not Found!" });
    } else {
      return res.status(200).send({
        success: true,
        message: "Get All Areas List!",
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

// ========== UPDATE AREA CONTROLLER ========== //
module.exports.updateAreaStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Area already exist
    const isAreaExist = await DB.tbl_area_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isAreaExist) {
      return res
        .status(404)
        .send({ success: false, message: "Area Not Found!" });
    } else {
      const updateStatus = await isAreaExist.update({
        status: !isAreaExist.status,
      });
      return res.status(201).send({
        success: true,
        message: "Status Changed Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// ========== DELETE AREA CONTROLLER ========== //
module.exports.deleteArea = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Area already exist
    const isAreaExist = await DB.tbl_area_master.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!isAreaExist) {
      return res
        .status(404)
        .send({ success: false, message: "Area Not Found!" });
    } else {
      await isAreaExist.update({
        isDeleted: true,
      });
      return res.status(201).send({
        success: true,
        message: "Area Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

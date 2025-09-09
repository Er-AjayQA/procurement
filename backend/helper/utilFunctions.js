const DB = require("../config/index");

module.exports.checkEntity = async (req, res, next) => {
  try {
    const { selectedEntity } = req.params;
    const checkEntityAvailability = await DB.tbl_entity_configuration.findOne({
      where: { id: selectedEntity, isDeleted: false },
    });

    if (checkEntityAvailability) {
      req.selectedEntity = selectedEntity;
      next();
    } else {
      return res
        .status(404)
        .send({ success: false, message: "Entity not found!" });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

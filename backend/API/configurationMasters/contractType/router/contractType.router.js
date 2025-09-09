// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const ContractTypeController = require("../controller/contractType.controller");
const EntityAuth = require("../../../../helper/utilFunctions");

// ========== ROUTES ========== //
router.post(
  "/create-contract-type/:selectedEntity",
  EntityAuth?.checkEntity,
  ContractTypeController.createContractType
);
router.put(
  "/update-contract-type/:selectedEntity/:id",
  EntityAuth?.checkEntity,
  ContractTypeController.updateContractType
);
router.post(
  "/get-contracts-type-details/:selectedEntity/:id",
  EntityAuth?.checkEntity,
  ContractTypeController.getContractTypeDetails
);
router.post(
  "/get-all-contract-type-details/:selectedEntity",
  EntityAuth?.checkEntity,
  ContractTypeController.getAllContractTypesDetails
);
router.put(
  "/update-contract-type-status/:selectedEntity/:id",
  EntityAuth?.checkEntity,
  ContractTypeController.updateContractTypeStatus
);
router.put(
  "/delete-contract-type/:selectedEntity/:id",
  EntityAuth?.checkEntity,
  ContractTypeController.deleteContractType
);

// ========== EXPORT ========== //
module.exports = router;

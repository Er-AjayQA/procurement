// ========== REQUIRE STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const ContractTypeController = require("../controller/contractType.controller");

// ========== ROUTES ========== //
router.post("/create-contract-type", ContractTypeController.createContractType);
router.put(
  "/update-contract-type/:id",
  ContractTypeController.updateContractType
);
router.post(
  "/get-contracts-type-details/:id",
  ContractTypeController.getContractTypeDetails
);
router.post(
  "/get-all-contract-type-details",
  ContractTypeController.getAllContractTypesDetails
);
router.put(
  "/update-contract-type-status/:id",
  ContractTypeController.updateContractTypeStatus
);
router.put(
  "/delete-contract-type/:id",
  ContractTypeController.deleteContractType
);

// ========== EXPORT ========== //
module.exports = router;

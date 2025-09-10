import axiosInstance from "../axisInstance";

// **************************** ROLE MASTER **************************** //
// Create Role Master
export const createRole = async (selectedEntity, formData) => {
  const response = await axiosInstance.post(
    `create-role/${selectedEntity}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Update Role
export const updateRole = async (selectedEntity, id, formData) => {
  const response = await axiosInstance.put(
    `update-role/${selectedEntity}/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Update Status
export const updateRoleStatus = async (selectedEntity, id) => {
  const response = await axiosInstance.put(
    `update-role-status/${selectedEntity}/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Get Master Roles by ID
export const getRoleById = async (selectedEntity, id) => {
  const response = await axiosInstance.post(
    `get-role-details/${selectedEntity}/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Get All Master Roles List
export const getAllRoles = async (selectedEntity, formData) => {
  const response = await axiosInstance.post(
    `get-all-role-details/${selectedEntity}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Delete Role Master
export const deleteRole = async (selectedEntity, id) => {
  const response = await axiosInstance.put(
    `delete-role/${selectedEntity}/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// **************************** DESIGNATION MASTER **************************** //
// Create Designations Master
export const createDesignation = async (selectedEntity, formData) => {
  const response = await axiosInstance.post(
    `create-designation/${selectedEntity}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Update Designation
export const updateDesignation = async (selectedEntity, id, formData) => {
  const response = await axiosInstance.put(
    `update-designation/${selectedEntity}/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Update Status
export const updateDesignationStatus = async (selectedEntity, id) => {
  const response = await axiosInstance.put(
    `update-designation-status/${selectedEntity}/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Get Master Designations by ID
export const getDesignationById = async (selectedEntity, id) => {
  const response = await axiosInstance.post(
    `get-designation-details/${selectedEntity}/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Get All Master Designations List
export const getAllDesignations = async (selectedEntity, formData) => {
  const response = await axiosInstance.post(
    `get-all-designations/${selectedEntity}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Delete Designation Master
export const deleteDesignation = async (selectedEntity, id) => {
  const response = await axiosInstance.put(
    `delete-designation/${selectedEntity}/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// **************************** DEPARTMENT MASTER **************************** //
// Create Department Master
export const createDepartment = async (selectedEntity, formData) => {
  const response = await axiosInstance.post(
    `create-department/${selectedEntity}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Update Department
export const updateDepartment = async (id, formData) => {
  const response = await axiosInstance.put(
    `update-department/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Update Status
export const updateDepartmentStatus = async (id) => {
  const response = await axiosInstance.put(`update-department-status/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Get Master Departments by ID
export const getDepartmentById = async (id) => {
  const response = await axiosInstance.post(`get-department-details/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Get All Master Departments List
export const getAllDepartments = async (selectedEntity, formData) => {
  const response = await axiosInstance.post(
    `get-all-department-details/${selectedEntity}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Delete Department Master
export const deleteDepartment = async (id) => {
  const response = await axiosInstance.put(`delete-department/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// **************************** COUNTRY MASTER **************************** //
// Upload Country File
export const uploadCountries = async (formData) => {
  const response = await axiosInstance.post("upload-countries", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Get Country Details By Id
export const getCountryById = async (id) => {
  const response = await axiosInstance.post(`get-country-details/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Get All Master Countries List
export const getAllCountries = async (formData) => {
  const response = await axiosInstance.post(
    "get-all-country-details",
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Get All Master Countries Phone Codes List
export const getAllPhoneCodes = async (formData) => {
  const response = await axiosInstance.post(
    "get-all-country-phone-codes-details",
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Get All Nationalities
export const getAllNationalities = async () => {
  const response = await axiosInstance.post(
    "get-all-nationality-details",

    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Get All Currencies
export const getAllCurrencies = async () => {
  const response = await axiosInstance.post(
    "get-all-currency-details",

    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// **************************** STATE MASTER **************************** //
// Upload States File
export const uploadStates = async (formData) => {
  const response = await axiosInstance.post("upload-states", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Get State Details By Id
export const getStateById = async (id) => {
  const response = await axiosInstance.post(`get-states-details/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Get All Master States List
export const getAllStates = async (formData) => {
  const response = await axiosInstance.post(
    "get-all-states-details",
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// **************************** CITY MASTER **************************** //
// Upload States File
export const uploadCities = async (formData) => {
  const response = await axiosInstance.post("upload-cities", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Get State Details By Id
export const getCityById = async (id) => {
  const response = await axiosInstance.post(`get-city-details/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Get All Master States List
export const getAllCities = async (formData) => {
  const response = await axiosInstance.post(
    "get-all-cities-details",
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// **************************** BRANCH MASTER **************************** //
// Create Branch Master
export const createBranch = async (formData) => {
  const response = await axiosInstance.post("create-branch", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Update Branch
export const updateBranch = async (id, formData) => {
  const response = await axiosInstance.put(`update-branch/${id}`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Update Status
export const updateBranchStatus = async (id) => {
  const response = await axiosInstance.put(`update-branch-status/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Get Master Branches by ID
export const getBranchById = async (id) => {
  const response = await axiosInstance.post(`get-branch-details/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Get All Master Branches List
export const getAllBranches = async (formData) => {
  const response = await axiosInstance.post(
    "get-all-branch-details",
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Delete Branches Master
export const deleteBranch = async (id) => {
  const response = await axiosInstance.put(`delete-branch/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// **************************** AREA MASTER **************************** //
// Create Area Master
export const createArea = async (formData) => {
  const response = await axiosInstance.post("create-area", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Update Area
export const updateArea = async (id, formData) => {
  try {
    const response = await axiosInstance.put(`update-area/${id}`, formData);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

// Update Status
export const updateAreaStatus = async (id) => {
  const response = await axiosInstance.put(`update-area-status/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Get Master Areas by ID
export const getAreaById = async (id) => {
  const response = await axiosInstance.post(`get-area-details/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Get All Master Areas List
export const getAllArea = async (formData) => {
  const response = await axiosInstance.post("get-all-area-details", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Delete Areas Master
export const deleteArea = async (id) => {
  const response = await axiosInstance.put(`delete-area/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// **************************** BANK MASTER **************************** //
// Create Bank Master
export const createBank = async (formData) => {
  const response = await axiosInstance.post("create-bank", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Update Bank
export const updateBank = async (id, formData) => {
  try {
    const response = await axiosInstance.put(`update-bank/${id}`, formData);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

// Update Status
export const updateBankStatus = async (id) => {
  const response = await axiosInstance.put(`update-bank-status/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Get Master Banks by ID
export const getBankById = async (id) => {
  const response = await axiosInstance.post(`get-bank-details/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Get All Master Banks List
export const getAllBank = async (formData) => {
  const response = await axiosInstance.post("get-all-bank-details", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Delete Banks Master
export const deleteBank = async (id) => {
  const response = await axiosInstance.put(`delete-bank/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// **************************** EMPLOYEMENT TYPE MASTER **************************** //
// Create EmployementType Master
export const createEmployementType = async (formData) => {
  const response = await axiosInstance.post(
    "create-employment-type",
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Update EmployementType
export const updateEmployementType = async (id, formData) => {
  try {
    const response = await axiosInstance.put(
      `update-employment-type/${id}`,
      formData
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

// Update Status
export const updateEmployementTypeStatus = async (id) => {
  const response = await axiosInstance.put(
    `update-employment-type-status/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Get Master EmployementTypes by ID
export const getEmployementTypeById = async (id) => {
  const response = await axiosInstance.post(
    `get-employments-type-details/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Get All Master EmployementTypes List
export const getAllEmployementType = async (formData) => {
  const response = await axiosInstance.post(
    "get-all-employment-type-details",
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Delete EmployementTypes Master
export const deleteEmployementType = async (id) => {
  const response = await axiosInstance.put(`delete-employment-type/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// **************************** ALLOWANCE MASTER **************************** //
// Create Allowance Master
export const createAllowance = async (formData) => {
  const response = await axiosInstance.post("create-allowance", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Update Allowance
export const updateAllowance = async (id, formData) => {
  try {
    const response = await axiosInstance.put(
      `update-allowance/${id}`,
      formData
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

// Update Status
export const updateAllowanceStatus = async (id) => {
  const response = await axiosInstance.put(`update-allowance-status/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Get Master Allowance by ID
export const getAllowanceById = async (id) => {
  const response = await axiosInstance.post(`get-allowance-details/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Get All Master Allowance List
export const getAllAllowance = async (formData) => {
  const response = await axiosInstance.post(
    "get-all-allowance-details",
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Delete Allowance Master
export const deleteAllowance = async (id) => {
  const response = await axiosInstance.put(`delete-allowance/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// **************************** CONTRACT TYPE MASTER **************************** //
// Create ContractType Master
export const createContractType = async (formData) => {
  const response = await axiosInstance.post("create-contract-type", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Update ContractType
export const updateContractType = async (id, formData) => {
  try {
    const response = await axiosInstance.put(
      `update-contract-type/${id}`,
      formData
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

// Update Status
export const updateContractTypeStatus = async (id) => {
  const response = await axiosInstance.put(
    `update-contract-type-status/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Get Master ContractType by ID
export const getContractTypeById = async (id) => {
  const response = await axiosInstance.post(
    `get-contracts-type-details/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Get All Master ContractType List
export const getAllContractType = async (formData) => {
  const response = await axiosInstance.post(
    "get-all-contract-type-details",
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Delete ContractType Master
export const deleteContractType = async (id) => {
  const response = await axiosInstance.put(`delete-contract-type/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// **************************** SHIFT MASTER **************************** //
// Create Shift Master
export const createShift = async (formData) => {
  const response = await axiosInstance.post("create-shift", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Update Shift
export const updateShift = async (id, formData) => {
  try {
    const response = await axiosInstance.put(`update-shift/${id}`, formData);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

// Update Status
export const updateShiftStatus = async (id) => {
  const response = await axiosInstance.put(`update-shift-status/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Get Master Shift by ID
export const getShiftById = async (id) => {
  const response = await axiosInstance.post(`get-shift-details/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Get All Master Shift List
export const getAllShift = async (formData) => {
  const response = await axiosInstance.post("get-all-shift-details", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Delete Shift Master
export const deleteShift = async (id) => {
  const response = await axiosInstance.put(`delete-shift/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// **************************** UOM MASTER **************************** //
// Create Uom Master
export const createUom = async (formData) => {
  const response = await axiosInstance.post("create-uom", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Update Uom
export const updateUom = async (id, formData) => {
  try {
    const response = await axiosInstance.put(`update-uom/${id}`, formData);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

// Update Status
export const updateUomStatus = async (id) => {
  const response = await axiosInstance.put(`update-uom-status/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Get Master Uom by ID
export const getUomById = async (id) => {
  const response = await axiosInstance.post(`get-uom-details/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Get All Master Uom List
export const getAllUom = async (formData) => {
  const response = await axiosInstance.post("get-all-uom-details", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Delete Uom Master
export const deleteUom = async (id) => {
  const response = await axiosInstance.put(`delete-uom/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// **************************** ITEM CATEGORY MASTER **************************** //
// Create Item Category Master
export const createItemCategory = async (formData) => {
  const response = await axiosInstance.post("create-item-category", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Update Item Category
export const updateItemCategory = async (id, formData) => {
  try {
    const response = await axiosInstance.put(
      `update-item-category/${id}`,
      formData
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

// Update Status
export const updateItemCategoryStatus = async (id) => {
  const response = await axiosInstance.put(
    `update-item-category-status/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Get Master Item Category by ID
export const getItemCategoryById = async (id) => {
  const response = await axiosInstance.post(`get-item-category-details/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Get All Master Item Category List
export const getAllItemCategory = async (formData) => {
  const response = await axiosInstance.post(
    "get-all-item-categories",
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Delete Item Category Master
export const deleteItemCategory = async (id) => {
  const response = await axiosInstance.put(`delete-item-category/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// **************************** ITEM MASTER **************************** //
// Create Item Master
export const createItem = async (formData) => {
  const response = await axiosInstance.post("create-item", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Update Item
export const updateItem = async (id, formData) => {
  try {
    const response = await axiosInstance.put(`update-item/${id}`, formData);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

// Update Status
export const updateItemStatus = async (id) => {
  const response = await axiosInstance.put(`update-item-status/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Get Master Item by ID
export const getItemById = async (id) => {
  const response = await axiosInstance.post(`get-item-details/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Get All Master Item List
export const getAllItem = async (formData) => {
  const response = await axiosInstance.post("get-all-item-details", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Delete Item Master
export const deleteItem = async (id) => {
  const response = await axiosInstance.put(`delete-item/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// **************************** SERVICE CATEGORY MASTER **************************** //
// Create Service Category Master
export const createServiceCategory = async (formData) => {
  const response = await axiosInstance.post(
    "create-service-category",
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Update Service Category
export const updateServiceCategory = async (id, formData) => {
  try {
    const response = await axiosInstance.put(
      `update-service-category/${id}`,
      formData
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

// Update Status
export const updateServiceCategoryStatus = async (id) => {
  const response = await axiosInstance.put(
    `update-service-category-status/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Get Master Service Category by ID
export const getServiceCategoryById = async (id) => {
  const response = await axiosInstance.post(
    `get-service-category-details/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Get All Master Service Category List
export const getAllServiceCategory = async (formData) => {
  const response = await axiosInstance.post(
    "get-all-service-categories",
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Delete Service Category Master
export const deleteServiceCategory = async (id) => {
  const response = await axiosInstance.put(`delete-service-category/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// **************************** SERVICE MASTER **************************** //
// Create Service Master
export const createService = async (formData) => {
  const response = await axiosInstance.post("create-service", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Update Service
export const updateService = async (id, formData) => {
  try {
    const response = await axiosInstance.put(`update-service/${id}`, formData);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

// Update Status
export const updateServiceStatus = async (id) => {
  const response = await axiosInstance.put(`update-service-status/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Get Master Service by ID
export const getServiceById = async (id) => {
  const response = await axiosInstance.post(`get-service-details/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Get All Master Service List
export const getAllService = async (formData) => {
  const response = await axiosInstance.post(
    "get-all-service-details",
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Delete Service Master
export const deleteService = async (id) => {
  const response = await axiosInstance.put(`delete-service/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// **************************** COURSE CATEGORY MASTER **************************** //
// Create Course Category Master
export const createCourseCategory = async (formData) => {
  const response = await axiosInstance.post(
    "create-course_category",
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Update Course Category
export const updateCourseCategory = async (id, formData) => {
  try {
    const response = await axiosInstance.put(
      `update-course_category/${id}`,
      formData
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

// Update Status
export const updateCourseCategoryStatus = async (id) => {
  const response = await axiosInstance.put(
    `update-course_category-status/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Get Master Course Category by ID
export const getCourseCategoryById = async (id) => {
  const response = await axiosInstance.post(
    `get-course_category-details/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Get All Master Course Category List
export const getAllCourseCategory = async (formData) => {
  const response = await axiosInstance.post(
    "get-all-course_category-details",
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Delete Course Category Master
export const deleteCourseCategory = async (id) => {
  const response = await axiosInstance.put(`delete-course_category/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// **************************** TRANSFER TYPE MASTER **************************** //
// Create Transfer Type Master
export const createTransferType = async (formData) => {
  const response = await axiosInstance.post("create-transferType", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Update Transfer Type
export const updateTransferType = async (id, formData) => {
  try {
    const response = await axiosInstance.put(
      `update-transferType/${id}`,
      formData
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

// Update Status
export const updateTransferTypeStatus = async (id) => {
  const response = await axiosInstance.put(`update-transferType-status/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Get Master Transfer Type by ID
export const getTransferTypeById = async (id) => {
  const response = await axiosInstance.post(`get-transferType-details/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Get All Master Transfer Type List
export const getAllTransferType = async (formData) => {
  const response = await axiosInstance.post(
    "get-all-transferType-details",
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Delete Transfer Type Master
export const deleteTransferType = async (id) => {
  const response = await axiosInstance.put(`delete-transferType/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// **************************** TRANSFER REASON MASTER **************************** //
// Create Transfer Reason Master
export const createTransferReason = async (formData) => {
  const response = await axiosInstance.post("create-transferReason", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Update Transfer Reason
export const updateTransferReason = async (id, formData) => {
  try {
    const response = await axiosInstance.put(
      `update-transferReason/${id}`,
      formData
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

// Update Status
export const updateTransferReasonStatus = async (id) => {
  const response = await axiosInstance.put(
    `update-transferReason-status/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Get Master Transfer Reason by ID
export const getTransferReasonById = async (id) => {
  const response = await axiosInstance.post(
    `get-transferReason-details/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Get All Master Transfer Reason List
export const getAllTransferReason = async (formData) => {
  const response = await axiosInstance.post(
    "get-all-transferReason-details",
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Delete Transfer Reason Master
export const deleteTransferReason = async (id) => {
  const response = await axiosInstance.put(`delete-transferReason/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// **************************** TICKET CATEGORY MASTER **************************** //
// Create Ticket Category Master
export const createTicketCategory = async (formData) => {
  const response = await axiosInstance.post(
    "create-ticket-category",
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Update Ticket Category
export const updateTicketCategory = async (id, formData) => {
  try {
    const response = await axiosInstance.put(
      `update-ticket-category/${id}`,
      formData
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

// Update Status
export const updateTicketCategoryStatus = async (id) => {
  const response = await axiosInstance.put(
    `update-ticket-category-status/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Get Master Ticket Category by ID
export const getTicketCategoryById = async (id) => {
  const response = await axiosInstance.post(
    `get-ticket-category-details/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Get All Master Ticket Category List
export const getAllTicketCategory = async (formData) => {
  const response = await axiosInstance.post(
    "get-all-ticket-categories",
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Delete Ticket Category Master
export const deleteTicketCategory = async (id) => {
  const response = await axiosInstance.put(`delete-ticket-category/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// **************************** EVENT CATEGORY MASTER **************************** //
// Create Event Category Master
export const createEventCategory = async (formData) => {
  const response = await axiosInstance.post("create-event-category", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Update Event Category
export const updateEventCategory = async (id, formData) => {
  try {
    const response = await axiosInstance.put(
      `update-event-category/${id}`,
      formData
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
};

// Update Status
export const updateEventCategoryStatus = async (id) => {
  const response = await axiosInstance.put(
    `update-event-category-status/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Get Master Event Category by ID
export const getEventCategoryById = async (id) => {
  const response = await axiosInstance.post(
    `get-event-category-details/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Get All Master Event Category List
export const getAllEventCategory = async (formData) => {
  const response = await axiosInstance.post(
    "get-all-event-categories",
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Delete Event Category Master
export const deleteEventCategory = async (id) => {
  const response = await axiosInstance.put(`delete-event-category/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

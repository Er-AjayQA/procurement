import axiosInstance from "../axisInstance";

// **************************** ROLE MASTER **************************** //
// Create Role Master
export const createRole = async (formData) => {
  const response = await axiosInstance.post("create-role", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Update Role
export const updateRole = async (id, formData) => {
  const response = await axiosInstance.put(`update-role/${id}`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Update Status
export const updateRoleStatus = async (id) => {
  const response = await axiosInstance.put(`update-role-status/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Get Master Roles by ID
export const getRoleById = async (id) => {
  const response = await axiosInstance.post(`get-role-details/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Get All Master Roles List
export const getAllRoles = async (formData) => {
  const response = await axiosInstance.post("get-all-role-details", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Delete Role Master
export const deleteRole = async (id) => {
  const response = await axiosInstance.put(`delete-role/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// **************************** DESIGNATION MASTER **************************** //
// Create Designations Master
export const createDesignation = async (formData) => {
  const response = await axiosInstance.post("create-designation", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Update Designation
export const updateDesignation = async (id, formData) => {
  const response = await axiosInstance.put(
    `update-designation/${id}`,
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
export const updateDesignationStatus = async (id) => {
  const response = await axiosInstance.put(`update-designation-status/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Get Master Designations by ID
export const getDesignationById = async (id) => {
  const response = await axiosInstance.post(`get-designation-details/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Get All Master Designations List
export const getAllDesignations = async (formData) => {
  const response = await axiosInstance.post("get-all-designations", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Delete Designation Master
export const deleteDesignation = async (id) => {
  const response = await axiosInstance.put(`delete-designation/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// **************************** DEPARTMENT MASTER **************************** //
// Create Department Master
export const createDepartment = async (formData) => {
  const response = await axiosInstance.post("create-department", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
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
export const getAllDepartments = async (formData) => {
  const response = await axiosInstance.post(
    "get-all-department-details",
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

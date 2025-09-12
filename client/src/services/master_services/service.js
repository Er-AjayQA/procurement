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
export const updateDepartment = async (selectedEntity, id, formData) => {
  const response = await axiosInstance.put(
    `update-department/${selectedEntity}/${id}`,
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
export const updateDepartmentStatus = async (selectedEntity, id) => {
  const response = await axiosInstance.put(
    `update-department-status/${selectedEntity}/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Get Master Departments by ID
export const getDepartmentById = async (selectedEntity, id) => {
  const response = await axiosInstance.post(
    `get-department-details/${selectedEntity}/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
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
export const deleteDepartment = async (selectedEntity, id) => {
  const response = await axiosInstance.put(
    `delete-department/${selectedEntity}/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
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
export const createBranch = async (selectedEntity, formData) => {
  const response = await axiosInstance.post(
    `create-branch/${selectedEntity}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Update Branch
export const updateBranch = async (selectedEntity, id, formData) => {
  const response = await axiosInstance.put(
    `update-branch/${selectedEntity}/${id}`,
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
export const getAllBranches = async (selectedEntity, formData) => {
  const response = await axiosInstance.post(
    `get-all-branch-details/${selectedEntity}`,
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
export const createArea = async (selectedEntity, formData) => {
  const response = await axiosInstance.post(
    `create-area/${selectedEntity}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Update Area
export const updateArea = async (selectedEntity, id, formData) => {
  try {
    const response = await axiosInstance.put(
      `update-area/${selectedEntity}/${id}`,
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
export const getAllArea = async (selectedEntity, formData) => {
  const response = await axiosInstance.post(
    `get-all-area-details/${selectedEntity}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
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
export const createBank = async (selectedEntity, formData) => {
  const response = await axiosInstance.post(
    `create-bank/${selectedEntity}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Update Bank
export const updateBank = async (selectedEntity, id, formData) => {
  try {
    const response = await axiosInstance.put(
      `update-bank/${selectedEntity}/${id}`,
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
export const getAllBank = async (selectedEntity, formData) => {
  const response = await axiosInstance.post(
    `get-all-bank-details/${selectedEntity}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
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
export const createEmployementType = async (selectedEntity, formData) => {
  const response = await axiosInstance.post(
    `create-employment-type/${selectedEntity}`,
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
export const updateEmployementType = async (selectedEntity, id, formData) => {
  try {
    const response = await axiosInstance.put(
      `update-employment-type/${selectedEntity}/${id}`,
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
export const getAllEmployementType = async (selectedEntity, formData) => {
  const response = await axiosInstance.post(
    `get-all-employment-type-details/${selectedEntity}`,
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
export const createAllowance = async (selectedEntity, formData) => {
  const response = await axiosInstance.post(
    `create-allowance/${selectedEntity}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Update Allowance
export const updateAllowance = async (selectedEntity, id, formData) => {
  try {
    const response = await axiosInstance.put(
      `update-allowance/${selectedEntity}/${id}`,
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
export const getAllAllowance = async (selectedEntity, formData) => {
  const response = await axiosInstance.post(
    `get-all-allowance-details/${selectedEntity}`,
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
export const createContractType = async (selectedEntity, formData) => {
  const response = await axiosInstance.post(
    `create-contract-type/${selectedEntity}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Update ContractType
export const updateContractType = async (selectedEntity, id, formData) => {
  try {
    const response = await axiosInstance.put(
      `update-contract-type/${selectedEntity}/${id}`,
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
export const getAllContractType = async (selectedEntity, formData) => {
  const response = await axiosInstance.post(
    `get-all-contract-type-details/${selectedEntity}`,
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
export const createShift = async (selectedEntity, formData) => {
  const response = await axiosInstance.post(
    `create-shift/${selectedEntity}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Update Shift
export const updateShift = async (selectedEntity, id, formData) => {
  try {
    const response = await axiosInstance.put(
      `update-shift/${selectedEntity}/${id}`,
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
export const getAllShift = async (selectedEntity, formData) => {
  const response = await axiosInstance.post(
    `get-all-shift-details/${selectedEntity}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
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
export const createUom = async (selectedEntity, formData) => {
  const response = await axiosInstance.post(
    `create-uom/${selectedEntity}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Update Uom
export const updateUom = async (selectedEntity, id, formData) => {
  try {
    const response = await axiosInstance.put(
      `update-uom/${selectedEntity}/${id}`,
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
export const getAllUom = async (selectedEntity, formData) => {
  const response = await axiosInstance.post(
    `get-all-uom-details/${selectedEntity}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
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
export const createItemCategory = async (selectedEntity, formData) => {
  const response = await axiosInstance.post(
    `create-item-category/${selectedEntity}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Update Item Category
export const updateItemCategory = async (selectedEntity, id, formData) => {
  try {
    const response = await axiosInstance.put(
      `update-item-category/${selectedEntity}/${id}`,
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
export const getAllItemCategory = async (selectedEntity, formData) => {
  const response = await axiosInstance.post(
    `get-all-item-categories/${selectedEntity}`,
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
export const createItem = async (selectedEntity, formData) => {
  const response = await axiosInstance.post(
    `create-item/${selectedEntity}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Update Item
export const updateItem = async (selectedEntity, id, formData) => {
  try {
    const response = await axiosInstance.put(
      `update-item/${selectedEntity}/${id}`,
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
export const getAllItem = async (selectedEntity, formData) => {
  const response = await axiosInstance.post(
    `get-all-item-details/${selectedEntity}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
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
export const createServiceCategory = async (selectedEntity, formData) => {
  const response = await axiosInstance.post(
    `create-service-category/${selectedEntity}`,
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
export const updateServiceCategory = async (selectedEntity, id, formData) => {
  try {
    const response = await axiosInstance.put(
      `update-service-category/${selectedEntity}/${id}`,
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
export const getAllServiceCategory = async (selectedEntity, formData) => {
  const response = await axiosInstance.post(
    `get-all-service-categories/${selectedEntity}`,
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
export const createService = async (selectedEntity, formData) => {
  const response = await axiosInstance.post(
    `create-service/${selectedEntity}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Update Service
export const updateService = async (selectedEntity, id, formData) => {
  try {
    const response = await axiosInstance.put(
      `update-service/${selectedEntity}/${id}`,
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
export const getAllService = async (selectedEntity, formData) => {
  const response = await axiosInstance.post(
    `get-all-service-details/${selectedEntity}`,
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
export const createCourseCategory = async (selectedEntity, formData) => {
  const response = await axiosInstance.post(
    `create-course_category/${selectedEntity}`,
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
export const updateCourseCategory = async (selectedEntity, id, formData) => {
  try {
    const response = await axiosInstance.put(
      `update-course_category/${selectedEntity}/${id}`,
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
export const getAllCourseCategory = async (selectedEntity, formData) => {
  const response = await axiosInstance.post(
    `get-all-course_category-details/${selectedEntity}`,
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
export const createTransferType = async (selectedEntity, formData) => {
  const response = await axiosInstance.post(
    `create-transferType/${selectedEntity}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Update Transfer Type
export const updateTransferType = async (selectedEntity, id, formData) => {
  try {
    const response = await axiosInstance.put(
      `update-transferType/${selectedEntity}/${id}`,
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
export const getAllTransferType = async (selectedEntity, formData) => {
  const response = await axiosInstance.post(
    `get-all-transferType-details/${selectedEntity}`,
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
export const createTransferReason = async (selectedEntity, formData) => {
  const response = await axiosInstance.post(
    `create-transferReason/${selectedEntity}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Update Transfer Reason
export const updateTransferReason = async (selectedEntity, id, formData) => {
  try {
    const response = await axiosInstance.put(
      `update-transferReason/${selectedEntity}/${id}`,
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
export const getAllTransferReason = async (selectedEntity, formData) => {
  const response = await axiosInstance.post(
    `get-all-transferReason-details/${selectedEntity}`,
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
export const createTicketCategory = async (selectedEntity, formData) => {
  const response = await axiosInstance.post(
    `create-ticket-category/${selectedEntity}`,
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
export const updateTicketCategory = async (selectedEntity, id, formData) => {
  try {
    const response = await axiosInstance.put(
      `update-ticket-category/${selectedEntity}/${id}`,
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
export const getAllTicketCategory = async (selectedEntity, formData) => {
  const response = await axiosInstance.post(
    `get-all-ticket-categories/${selectedEntity}`,
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
export const createEventCategory = async (selectedEntity, formData) => {
  const response = await axiosInstance.post(
    `create-event-category/${selectedEntity}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Update Event Category
export const updateEventCategory = async (selectedEntity, id, formData) => {
  try {
    const response = await axiosInstance.put(
      `update-event-category/${selectedEntity}/${id}`,
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
export const getAllEventCategory = async (selectedEntity, formData) => {
  const response = await axiosInstance.post(
    `get-all-event-categories/${selectedEntity}`,
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

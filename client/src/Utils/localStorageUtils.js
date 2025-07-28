// Getting the Local Storage Data
export const loadStorageData = () => {
  try {
    const serializedState = localStorage.getItem("userDetails");
    if (serializedState === null) {
      return null;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return null;
  }
};

// Saving the User Details in Local Storage
export const saveStorageData = (data) => {
  try {
    const serializedState = JSON.stringify(data);
    localStorage.setItem("userDetails", serializedState);
  } catch {
    // ignore write errors
  }
};

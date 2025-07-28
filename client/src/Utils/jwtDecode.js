import { jwtDecode } from "jwt-decode";

// Decode the Token
export const decodeToken = (token) => {
  try {
    if (!token) {
      return null;
    }

    return jwtDecode(token);
  } catch (error) {
    return null;
  }
};

// Getting User Details From Token
export const getUserDetailsFromToken = (token) => {
  try {
    const decode = decodeToken(token);
    return {
      id: decode.id,
      emp_code: decode.emp_code,
      userName: decode.name,
      userImage: decode.userImage,
      official_email: decode.official_email,
    };
  } catch (error) {
    return null;
  }
};

import { jwtDecode } from "jwt-decode";

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

export const getUserDetailsFromToken = (token) => {
  const decode = decodeToken(token);
  return (
    {
      id: decode.id,
      emp_code: decode.emp_code,
      userName: decode.name,
      userImage: decode.userImage,
      official_email: decode.official_email,
    } || null
  );
};

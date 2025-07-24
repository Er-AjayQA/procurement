const generateRandomDigit = () => {
  let digit = Math.floor(Math.random() * 10).toString();
  return digit;
};

const generateOTP = () => {
  let otp = "";

  for (let i = 1; i <= 6; i++) {
    otp += generateRandomDigit();
  }

  return otp;
};

module.exports = { generateOTP };

const nodemailer = require("nodemailer");
require("dotenv").config();

// Create Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

// Send OTP Mail For Reset Password.
const sendOtpMail = async (to, otp) => {
  const mailOptions = {
    from: process.env.USER,
    to: to,
    subject: "OTP received to reset password",
    text: `Use the OTP ${otp} to reset your password.`,
    html: "",
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return { status: true, message: "OTP Sent Successfully" };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports = { sendOtpMail };

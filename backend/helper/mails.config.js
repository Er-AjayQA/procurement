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
    from: process.env.GMAIL_USER,
    to: to,
    subject: "OTP received to reset password",
    text: `Use the OTP ${otp} to reset your password.`,
    html: "",
  };

  try {
    await transporter.sendMail(mailOptions);
    return { status: true, message: "OTP Sent Successfully" };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

// Send Password Reset Confirmation Mail.
const sendResetPasswordConfirmationMail = async (to, password) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: to,
    subject: "Password Reset Successful",
    text: "",
    html: `
    <p>The password is successfully Changed. Use new password for login</p>
    <b>Login Details:</b>
    <ul>
      <li><span>Email:</span><span>"${to}"</span></li>
      <li><span>Password:</span>"${password}"<span></span></li>
    </ul>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { status: true, message: "OTP Sent Successfully" };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports = { sendOtpMail, sendResetPasswordConfirmationMail };

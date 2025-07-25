import { useDispatch, useSelector } from "react-redux";
import { resetState } from "../../ReduxToolkit/loginSlice";
import { SendOTPForm } from "./SendOTPForm";
import { VerifyOTPForm } from "./VerifyOTPForm";
import { ResetPasswordForm } from "./ResetPasswordForm";
import { BasicForm } from "./BasicForm";

export const LoginForm = () => {
  const dispatch = useDispatch();
  const { forgotPassword, isOtpSent, isVerifyOtp, isResetForm } = useSelector(
    (state) => state.login
  );

  // Handle Back To Login
  const handleBackToLogin = () => {
    dispatch(resetState());
  };

  return (
    <div className="py-5 px-10 bg-white w-3/5 rounded-lg flex flex-col justify-center">
      <div className="text-center text-3xl">
        {!forgotPassword ? "Login" : "Reset Password"}
      </div>
      <div className="mt-16">
        <p>Welcome to</p>
        <p className="text-3xl text-blue-900 font-bold">Procurement Hub</p>
        <p className="text-[.8rem] font-normal opacity-50">
          {!forgotPassword
            ? "Your gateway to efficient purchasing and cost control."
            : "Having trouble accessing your account? Enter your email to receive a password reset link."}
        </p>
      </div>

      {/* Login Form */}
      {!forgotPassword && <BasicForm />}

      {/* Send OTP Form */}
      {forgotPassword && !isOtpSent && <SendOTPForm />}

      {/* Verify OTP Form */}
      {isOtpSent && !isVerifyOtp && <VerifyOTPForm />}

      {/* Password Reset Form */}
      {isVerifyOtp && !isResetForm && <ResetPasswordForm />}
    </div>
  );
};

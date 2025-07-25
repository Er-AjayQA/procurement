import { useDispatch, useSelector } from "react-redux";
import { MdEmail, MdKey, MdPassword } from "react-icons/md";
import { IoMdEye, IoMdEyeOff, IoIosLogIn } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ButtonLoader } from "./UI/buttonLoader";
import {
  loginUser,
  resetPassword,
  sendOTP,
  verifyOTP,
} from "../Thunks/loginThunks";
import {
  resetState,
  setForgotPassword,
  setShowPassword,
} from "../ReduxToolkit/loginSlice";

export const LoginForm = () => {
  const dispatch = useDispatch();
  const {
    isLoading,
    showPassword,
    forgotPassword,
    resetEmail,
    isOtpSent,
    isVerifyOtp,
    isResetForm,
  } = useSelector((state) => state.login);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Handle Submitting Login Form
  const onSubmitLoginForm = async (data) => {
    const formData = {
      official_email: data.email,
      password: data.password,
      remember: data.remember_me,
    };
    try {
      await dispatch(loginUser(formData)).unwrap();
      navigate("/procurement/home");
      reset();
    } catch (error) {
      // Error handing in thunk
    }
  };

  // Handle Submitting Get OTP Form
  const onSubmitGetOTPForm = async (data) => {
    const formData = { official_email: data.email };
    try {
      await dispatch(sendOTP(formData)).unwrap();
      reset();
    } catch (error) {
      // Error handing in thunk
    }
  };

  // Handle Verify OTP Form
  const onSubmitVerifyOTPForm = async (data) => {
    const formData = { official_email: resetEmail, otp: data.otp };
    try {
      await dispatch(verifyOTP(formData)).unwrap();
      reset();
    } catch (error) {
      // Error handing in thunk
    }
  };

  // Handle Reset Password Form
  const onSubmitResetPasswordForm = async (data) => {
    const formData = {
      official_email: resetEmail,
      new_password: data.new_password,
    };
    try {
      await dispatch(resetPassword(formData)).unwrap();
      reset();
    } catch (error) {
      // Error handing in thunk
    }
  };

  // Toggle Password Visibility
  const togglePasswordVisibility = () => {
    dispatch(setShowPassword(!showPassword));
  };

  // Handle Forgot Password Click
  const handleForgotPassword = () => {
    dispatch(setForgotPassword(true));
  };

  // Handle Back To Login
  const handleBackToLogin = () => {
    dispatch(resetState());
  };

  return (
    <div className="py-5 px-10 bg-white w-3/5 rounded-lg flex flex-col justify-center">
      <div className="text-center">Login</div>
      <div className="mt-16">
        <p>Welcome to</p>
        <p className="text-3xl text-blue-900 font-bold">Procurement Hub</p>
        <p className="text-[.8rem] font-thin font-normal">
          Your gateway to efficient purchasing and cost control.
        </p>
      </div>

      {/* Not Forget Password */}
      {!forgotPassword && (
        <form className="mt-10" onSubmit={handleSubmit(onSubmitLoginForm)}>
          <div
            className={`flex items-center gap-2 rounded-md border bg-gray-300 py-1 px-3 ${
              errors.email ? "border-red-500" : "border-transparent"
            }`}
          >
            <div
              className={`basis-[10%] border-e border-e-white ${
                errors.email && "border-e-red-500"
              }`}
            >
              <MdEmail
                className={`w-6 h-6 ${errors.email && "text-red-500"}`}
              />
            </div>
            <div className="basis-[90%]">
              <input
                type="text"
                id="email"
                placeholder="Email"
                autoFocus
                className={`bg-gray-300 py-2 px-1 w-full focus-within:outline-none ${
                  errors.email && "placeholder:text-red-500"
                }`}
                {...register("email", {
                  required: "Email is required",
                })}
              />
            </div>
          </div>
          <div
            className={`flex items-center gap-2 rounded-md border bg-gray-300 py-1 px-3 mt-5 ${
              errors.password ? "border-red-500" : "border-transparent"
            }`}
          >
            <div
              className={`basis-[10%] border-e border-e-white ${
                errors.password && "border-e-red-500"
              }`}
            >
              <MdKey
                className={`w-6 h-6 ${errors.password && "text-red-500"}`}
              />
            </div>
            <div className="basis-[90%] relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                className={`bg-gray-300 py-2 px-1 w-full focus-within:outline-none ${
                  errors.password && "placeholder:text-red-500"
                }`}
                {...register("password", { required: "Password is required" })}
              />

              {showPassword ? (
                <IoMdEye
                  className={`absolute end-0 top-[50%] translate-y-[-50%] cursor-pointer w-5 h-5 ${
                    errors.password && "text-red-500"
                  }`}
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <IoMdEyeOff
                  className={`absolute end-0 top-[50%] translate-y-[-50%] cursor-pointer w-5 h-5 ${
                    errors.password && "text-red-500"
                  }`}
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
          </div>
          <div className="flex justify-between items-center mt-5">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember_me"
                {...register("remember_me")}
              />
              <label className="text-sm" htmlFor="remember_me">
                Remember Me
              </label>
            </div>

            <Link
              className="text-sm text-blue-800"
              onClick={handleForgotPassword}
            >
              Forget Password?
            </Link>
          </div>
          <div className="mt-5">
            {isLoading ? (
              <ButtonLoader text="Loading" />
            ) : (
              <button className="w-full bg-primary px-2 py-3 flex justify-center items-center gap-3 text-white rounded-md">
                <span>Login</span> <IoIosLogIn className="w-5 h-5" />
              </button>
            )}
          </div>
        </form>
      )}

      {/* Send OTP Form */}
      {forgotPassword && !isOtpSent && (
        <div className="mt-10">
          <div>
            <p>Reset Password</p>
          </div>
          <form className="mt-3" onSubmit={handleSubmit(onSubmitGetOTPForm)}>
            <div
              className={`flex items-center gap-2 rounded-md border bg-gray-300 py-1 px-3 ${
                errors.email ? "border-red-500" : "border-transparent"
              }`}
            >
              <div
                className={`basis-[10%] border-e border-e-white ${
                  errors.email && "border-e-red-500"
                }`}
              >
                <MdEmail
                  className={`w-6 h-6 ${errors.email && "text-red-500"}`}
                />
              </div>
              <div className="basis-[90%]">
                <input
                  type="text"
                  id="email"
                  placeholder="Email"
                  autoFocus
                  className={`bg-gray-300 py-2 px-1 w-full focus-within:outline-none ${
                    errors.email && "placeholder:text-red-500"
                  }`}
                  {...register("email", {
                    required: "Email is required",
                  })}
                />
              </div>
            </div>
            <div className="mt-5">
              {isLoading ? (
                <ButtonLoader text="Loading" />
              ) : (
                <button className="w-full bg-primary px-2 py-3 flex justify-center items-center gap-3 text-white rounded-md">
                  <span>Get OTP</span>
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Verify OTP Form */}
      {isOtpSent && !isVerifyOtp && (
        <div className="mt-10">
          <div>
            <p>Reset Password</p>
          </div>
          <form className="mt-3" onSubmit={handleSubmit(onSubmitVerifyOTPForm)}>
            <div
              className={`flex items-center gap-2 rounded-md border bg-gray-300 py-1 px-3 ${
                errors.otp ? "border-red-500" : "border-transparent"
              }`}
            >
              <div
                className={`basis-[10%] border-e border-e-white ${
                  errors.otp && "border-e-red-500"
                }`}
              >
                <MdPassword
                  className={`w-6 h-6 ${errors.otp && "text-red-500"}`}
                />
              </div>
              <div className="basis-[90%]">
                <input
                  type="text"
                  id="otp"
                  placeholder="Enter OTP"
                  autoFocus
                  className={`bg-gray-300 py-2 px-1 w-full focus-within:outline-none ${
                    errors.otp && "placeholder:text-red-500"
                  }`}
                  {...register("otp", {
                    required: "OTP is required",
                  })}
                />
              </div>
            </div>
            <div className="mt-5">
              {isLoading ? (
                <ButtonLoader text="Loading" />
              ) : (
                <button className="w-full bg-primary px-2 py-3 flex justify-center items-center gap-3 text-white rounded-md">
                  <span>Verify OTP</span>
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Password Reset Form */}
      {isVerifyOtp && !isResetForm && (
        <div className="mt-10">
          <div>
            <p>Reset Password</p>
          </div>
          <form
            className="mt-3"
            onSubmit={handleSubmit(onSubmitResetPasswordForm)}
          >
            <div
              className={`flex items-center gap-2 rounded-md border bg-gray-300 py-1 px-3 ${
                errors.new_password ? "border-red-500" : "border-transparent"
              }`}
            >
              <div
                className={`basis-[10%] border-e border-e-white ${
                  errors.new_password && "border-e-red-500"
                }`}
              >
                <MdPassword
                  className={`w-6 h-6 ${errors.new_password && "text-red-500"}`}
                />
              </div>
              <div className="basis-[90%]">
                <input
                  type="text"
                  id="new_password"
                  placeholder="Enter new password"
                  autoFocus
                  className={`bg-gray-300 py-2 px-1 w-full focus-within:outline-none ${
                    errors.new_password && "placeholder:text-red-500"
                  }`}
                  {...register("new_password", {
                    required: "New password is required",
                  })}
                />
              </div>
            </div>
            <div
              className={`flex items-center gap-2 mt-5 rounded-md border bg-gray-300 py-1 px-3 ${
                errors.confirm_password
                  ? "border-red-500"
                  : "border-transparent"
              }`}
            >
              <div
                className={`basis-[10%] border-e border-e-white ${
                  errors.confirm_password && "border-e-red-500"
                }`}
              >
                <MdPassword
                  className={`w-6 h-6 ${errors.otp && "text-red-500"}`}
                />
              </div>
              <div className="basis-[90%]">
                <input
                  type="text"
                  id="confirm_password"
                  placeholder="Confirm password"
                  autoFocus
                  className={`bg-gray-300 py-2 px-1 w-full focus-within:outline-none ${
                    errors.confirm_password && "placeholder:text-red-500"
                  }`}
                  {...register("confirm_password", {
                    required: "Confirm password required",
                  })}
                />
              </div>
            </div>
            <div className="mt-5">
              {isLoading ? (
                <ButtonLoader text="Loading" />
              ) : (
                <button className="w-full bg-primary px-2 py-3 flex justify-center items-center gap-3 text-white rounded-md">
                  <span>Reset Password</span>
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

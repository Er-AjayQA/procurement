import { useState } from "react";
import { MdEmail, MdKey } from "react-icons/md";
import { IoMdEye, IoMdEyeOff, IoIosLogIn } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginService } from "../services/login_services/service";
import { toast } from "react-toastify";
import { ButtonLoader } from "./UI/buttonLoader";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Handle Forgot Password

  // Handle Submitting Login Form
  const onSubmitLoginForm = async (data) => {
    setIsLoading(true);
    try {
      const formData = {
        official_email: data.email,
        password: data.password,
        remember: data.remember_me,
      };
      const response = await loginService(formData);

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/procurement/home");
        setIsLoading(false);
        reset();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      // The request was made and the server responded with a status code
      if (error.response) {
        setIsLoading(false);
        toast.error(error.response.data.message || "Login failed");
      } else if (error.request) {
        // The request was made but no response was received
        setIsLoading(false);
        toast.error("No response from server");
      } else {
        // Something happened in setting up the request that triggered an Error
        setIsLoading(false);
        toast.error("Error: " + error.message);
      }
    }
  };

  // Handle Submitting Forgot Password Form
  const onSubmitForgotForm = async (data) => {
    const formData = { official_email: data.email };
  };

  return (
    <div className="py-5 px-10 bg-white w-3/5 rounded-lg flex flex-col justify-center">
      <div>
        <p>Welcome to</p>
        <p className="text-3xl text-blue-900 font-bold">Procurement Hub</p>
        <p className="text-[.8rem] font-thin font-normal">
          Your gateway to efficient purchasing and cost control.
        </p>
      </div>

      {!forgotPassword ? (
        // Login Form
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
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <IoMdEyeOff
                  className={`absolute end-0 top-[50%] translate-y-[-50%] cursor-pointer w-5 h-5 ${
                    errors.password && "text-red-500"
                  }`}
                  onClick={() => setShowPassword(true)}
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
              onClick={() => {
                setForgotPassword(true);
              }}
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
      ) : (
        // Reset Password Form
        <div className="mt-10">
          <div>
            <p>Reset Password</p>
          </div>
          <form className="mt-3" onSubmit={handleSubmit(onSubmitForgotForm)}>
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
    </div>
  );
};

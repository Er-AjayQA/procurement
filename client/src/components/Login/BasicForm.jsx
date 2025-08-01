import { useDispatch, useSelector } from "react-redux";
import { MdEmail, MdKey } from "react-icons/md";
import { IoMdEye, IoMdEyeOff, IoIosLogIn } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginUser } from "../../Thunks/loginThunks";
import {
  resetState,
  setForgotPassword,
  setPasswordVisibility,
} from "../../ReduxToolkit/userLoginSlice";
import { ButtonLoader } from "../../components/UI/buttonLoader";

export const BasicForm = () => {
  const dispatch = useDispatch();
  const { isLoading, showLoginPassword } = useSelector((state) => state.login);

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
      const response = await dispatch(loginUser(formData)).unwrap();
      navigate("/procurement/dashboard");
      reset();
    } catch (error) {
      // Error handing in thunk
    }
  };

  // Toggle Password Visibility
  const togglePasswordVisibility = (type) => {
    dispatch(setPasswordVisibility({ type }));
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
          <MdEmail className={`w-6 h-6 ${errors.email && "text-red-500"}`} />
        </div>
        <div className="basis-[90%]">
          <input
            type="text"
            id="email"
            placeholder="Email"
            autoFocus
            className={`bg-gray-300 py-2 px-1 w-full border-none focus-within:outline-none ${
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
          <MdKey className={`w-6 h-6 ${errors.password && "text-red-500"}`} />
        </div>
        <div className="basis-[90%] relative">
          <input
            type={showLoginPassword ? "text" : "password"}
            id="password"
            placeholder="Password"
            className={`bg-gray-300 py-2 px-1 w-full border-none focus-within:outline-none ${
              errors.password && "placeholder:text-red-500"
            }`}
            {...register("password", { required: "Password is required" })}
          />

          {showLoginPassword ? (
            <IoMdEye
              className={`absolute end-0 top-[50%] translate-y-[-50%] cursor-pointer w-5 h-5 ${
                errors.password && "text-red-500"
              }`}
              onClick={() => togglePasswordVisibility("login")}
            />
          ) : (
            <IoMdEyeOff
              className={`absolute end-0 top-[50%] translate-y-[-50%] cursor-pointer w-5 h-5 ${
                errors.password && "text-red-500"
              }`}
              onClick={() => togglePasswordVisibility("login")}
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

        <Link className="text-sm text-blue-800" onClick={handleForgotPassword}>
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
  );
};

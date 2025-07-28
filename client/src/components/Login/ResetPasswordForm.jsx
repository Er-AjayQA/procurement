import { useDispatch, useSelector } from "react-redux";
import { MdPassword, MdKey } from "react-icons/md";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useForm } from "react-hook-form";
import { resetPassword } from "../../Thunks/loginThunks";
import {
  resetState,
  setPasswordVisibility,
} from "../../ReduxToolkit/userLoginSlice";
import { ButtonLoader } from "../../components/UI/buttonLoader";

export const ResetPasswordForm = () => {
  const dispatch = useDispatch();
  const { isLoading, showNewPassword, showConfirmPassword, resetEmail } =
    useSelector((state) => state.login);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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
  const togglePasswordVisibility = (type) => {
    dispatch(setPasswordVisibility({ type }));
  };

  // Handle Back To Login
  const handleBackToLogin = () => {
    dispatch(resetState());
  };

  return (
    <div className="mt-10">
      <form className="mt-3" onSubmit={handleSubmit(onSubmitResetPasswordForm)}>
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
            <MdKey
              className={`w-6 h-6 ${errors.new_password && "text-red-500"}`}
            />
          </div>
          <div className="basis-[90%] relative">
            <input
              type={showNewPassword ? "text" : "password"}
              id="new_password"
              placeholder="Enter new password"
              autoFocus
              className={`bg-gray-300 py-2 px-1 w-full border-none focus-within:outline-none ${
                errors.new_password && "placeholder:text-red-500"
              }`}
              {...register("new_password", {
                required: "New password is required",
              })}
            />
            {showNewPassword ? (
              <IoMdEye
                className={`absolute end-0 top-[50%] translate-y-[-50%] cursor-pointer w-5 h-5 ${
                  errors.password && "text-red-500"
                }`}
                onClick={() => togglePasswordVisibility("newPassword")}
              />
            ) : (
              <IoMdEyeOff
                className={`absolute end-0 top-[50%] translate-y-[-50%] cursor-pointer w-5 h-5 ${
                  errors.password && "text-red-500"
                }`}
                onClick={() => togglePasswordVisibility("newPassword")}
              />
            )}
          </div>
        </div>
        <div
          className={`flex items-center gap-2 mt-5 rounded-md border bg-gray-300 py-1 px-3 ${
            errors.confirm_password ? "border-red-500" : "border-transparent"
          }`}
        >
          <div
            className={`basis-[10%] border-e border-e-white ${
              errors.confirm_password && "border-e-red-500"
            }`}
          >
            <MdPassword
              className={`w-6 h-6 ${errors.confirm_password && "text-red-500"}`}
            />
          </div>
          <div className="basis-[90%] relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirm_password"
              placeholder="Confirm password"
              className={`bg-gray-300 py-2 px-1 w-full border-none focus-within:outline-none ${
                errors.confirm_password && "placeholder:text-red-500"
              }`}
              {...register("confirm_password", {
                required: "Confirm password required",
              })}
            />
            {showConfirmPassword ? (
              <IoMdEye
                className={`absolute end-0 top-[50%] translate-y-[-50%] cursor-pointer w-5 h-5 ${
                  errors.password && "text-red-500"
                }`}
                onClick={() => togglePasswordVisibility("confirmPassword")}
              />
            ) : (
              <IoMdEyeOff
                className={`absolute end-0 top-[50%] translate-y-[-50%] cursor-pointer w-5 h-5 ${
                  errors.password && "text-red-500"
                }`}
                onClick={() => togglePasswordVisibility("confirmPassword")}
              />
            )}
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
  );
};

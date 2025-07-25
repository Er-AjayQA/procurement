import { useDispatch, useSelector } from "react-redux";
import { MdPassword } from "react-icons/md";
import { useForm } from "react-hook-form";
import { verifyOTP } from "../../Thunks/loginThunks";
import { resetState } from "../../ReduxToolkit/loginSlice";
import { ButtonLoader } from "../../components/UI/buttonLoader";

export const VerifyOTPForm = () => {
  const dispatch = useDispatch();
  const { isLoading, resetEmail } = useSelector((state) => state.login);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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

  // Handle Back To Login
  const handleBackToLogin = () => {
    dispatch(resetState());
  };

  return (
    <div className="mt-10">
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
            <MdPassword className={`w-6 h-6 ${errors.otp && "text-red-500"}`} />
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
  );
};

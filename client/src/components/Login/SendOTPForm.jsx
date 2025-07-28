import { useDispatch, useSelector } from "react-redux";
import { MdEmail } from "react-icons/md";
import { useForm } from "react-hook-form";
import { sendOTP } from "../../Thunks/loginThunks";
import { resetState } from "../../ReduxToolkit/userLoginSlice";
import { ButtonLoader } from "../../components/UI/buttonLoader";

export const SendOTPForm = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.login);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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

  // Handle Back To Login
  const handleBackToLogin = () => {
    dispatch(resetState());
  };

  return (
    <div className="mt-10">
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
            <MdEmail className={`w-6 h-6 ${errors.email && "text-red-500"}`} />
          </div>
          <div className="basis-[90%]">
            <input
              type="text"
              id="email"
              placeholder="Enter email"
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
  );
};

import { useState } from "react";
import { MdEmail, MdKey } from "react-icons/md";
import { IoMdEye, IoMdEyeOff, IoIosLogIn } from "react-icons/io";
import { Link } from "react-router-dom";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="py-5 px-10 bg-white w-3/5 rounded-lg flex flex-col justify-center">
      <div>
        <p>Welcome to</p>
        <p className="text-3xl text-blue-900 font-bold">Procurement Hub</p>
        <p className="text-[.8rem] font-thin font-normal">
          Your gateway to efficient purchasing and cost control.
        </p>
      </div>

      <form className="mt-10">
        <div className="flex items-center gap-2 rounded-md bg-gray-300 py-1 px-3">
          <div className="basis-[10%] border-e border-e-white">
            <MdEmail className="w-6 h-6" />
          </div>
          <div className="basis-[90%]">
            <input
              type="text"
              placeholder="Email"
              className="bg-gray-300 py-2 px-1 w-full focus-within:outline-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-md bg-gray-300 py-1 px-3 mt-5">
          <div className="basis-[10%] border-e border-e-white">
            <MdKey className="w-6 h-6" />
          </div>
          <div className="basis-[90%] relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="bg-gray-300 py-2 px-1 w-full focus-within:outline-none"
            />
            {showPassword ? (
              <IoMdEye
                className="absolute end-0 top-[50%] translate-y-[-50%] cursor-pointer w-5 h-5"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <IoMdEyeOff
                className="absolute end-0 top-[50%] translate-y-[-50%] cursor-pointer w-5 h-5"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
        </div>
        <div className="flex justify-between items-center mt-5">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="remember_password" />
            <label className="text-sm" htmlFor="remember_password">
              Remember Me
            </label>
          </div>

          <Link className="text-sm text-blue-800">Forget Password?</Link>
        </div>
        <div className="mt-5">
          <button className="w-full bg-primary px-2 py-3 flex justify-center items-center gap-3 text-white rounded-md">
            <span>Login</span> <IoIosLogIn className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

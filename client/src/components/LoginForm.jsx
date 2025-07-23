import { MdEmail, MdKey } from "react-icons/md";
import { Link } from "react-router-dom";

export const LoginForm = () => {
  return (
    <div className="py-5 px-10 bg-white w-3/5 rounded-lg">
      <div>
        <p>Welcome to</p>
        <p className="text-3xl text-blue-900 font-bold">Procurement</p>
      </div>

      <form className="mt-5">
        <div className="flex items-center gap-2 rounded-md bg-gray-300 py-1 px-3">
          <div className="basis-[10%]">
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
        <div className="flex items-center gap-2 rounded-md bg-gray-300 py-1 px-3 mt-4">
          <div className="basis-[10%]">
            <MdKey className="w-6 h-6" />
          </div>
          <div className="basis-[90%]">
            <input
              type="password"
              placeholder="Password"
              className="bg-gray-300 py-2 px-1 w-full focus-within:outline-none"
            />
          </div>
        </div>
        <div className="flex justify-between items-center mt-3">
          <p className="text-sm">Remember Me</p>

          <Link className="text-sm">Forget Password?</Link>
        </div>
      </form>
    </div>
  );
};

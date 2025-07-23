import { LoginForm } from "../components/LoginForm";

export const LoginPage = () => {
  return (
    <div className="flex min-h-screen">
      <div className="p-10 basis-[50%] flex justify-center items-center">
        <img
          src="/Images/login_logo.png"
          alt="login-form-image"
          className="max-w-[80%]"
        />
      </div>
      <div className="p-10 basis-[50%] flex justify-center ">
        <LoginForm />
      </div>
    </div>
  );
};

// Login.jsx
import  { useState } from "react";
import Register from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";

const Login = () => {
  const [form, setForm] = useState("login");
  return (
    <div className="bg-slate-800  h-[100vh]  flex flex-col  items-center justify-center">
      <div className="flex h-[80px] items-center">
        <h2
          className={`uppercase md:block text-3xl md:text-6xl
              font-bold bg-clip-text text-transparent
              bg-gradient-to-r from-blue-500 to-purple-500`}
        >
          POSTGRAMM
        </h2>
      </div>
      <div className="mb-8">
        {form === "login" && <LoginForm setForm={setForm} />}
        {form === "register" && <Register setForm={setForm} />}
      </div>
    </div>
  );
};

export default Login;

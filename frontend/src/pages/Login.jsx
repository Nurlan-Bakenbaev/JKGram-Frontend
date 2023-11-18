// Login.jsx
import React, { useState } from "react";
import Register from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";

const Login = () => {
  const [form, setForm] = useState("login");
  return (
    <div className="bg-slate-800  h-[100vh]  flex flex-col  items-center justify-center">
      <div className="flex h-[80px] items-center">
        <h1
          className={`uppercase m-5 text-3xl
         font-bold`}
        >
          Friendsgram
        </h1>
      </div>
      <div className="mb-8">
        {form === "login" && <LoginForm setForm={setForm} />}
        {form === "register" && <Register setForm={setForm} />}
      </div>
    </div>
  );
};

export default Login;

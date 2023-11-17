// Login.jsx
import React, { useState } from "react";
import Register from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";

const Login = () => {
  const [form, setForm] = useState("login");
  return (
    <div className="bg-slate-800 min-h-screen flex items-center justify-center">
      {form === "login" && <LoginForm setForm={setForm} />}
      {form === "register" && <Register setForm={setForm} />}
    </div>
  );
};

export default Login;

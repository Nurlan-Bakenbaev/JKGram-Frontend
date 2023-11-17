import React, { useState } from "react";

const LoginForm = ({ setForm }) => {
  const [login, setLogin] = useState({
    login: "",
    password: "",
  });
  const handleChange = (e) => {
    const { value, name } = e.target;
    setLogin({ ...login, [name]: value });
  };
  return (
    <div>
      <div className="w-[320px] md:w-[500px] h-[55vh] p-8 bg-slate-300 rounded-md ">
        <h2 className="text-3xl text-center font-extrabold text-gray-800 mb-6">
          Login
        </h2>
        <form className="space-y-4 flex flex-col">
          <input
            placeholder="email"
            type="text"
            name="email"
            required
            className=" outline-none form-input px-3 py-2 mb-3  rounded text-black"
          />

          <input
            placeholder="password"
            type="password"
            name="password"
            required
            className="relative outline-none form-input px-4 py-2 rounded text-black"
          />
          
          <button
            type="submit"
            className=" p-2 bg-blue-700 text-white rounded-md hover:bg-blue-600 outline-none"
          >
            Login
          </button>
        </form>

        <div
          onClick={() => setForm("register")}
          className=" text-blue-500 mt-4 cursor-pointer text-right text-sm"
        >
          Create an Account ?
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

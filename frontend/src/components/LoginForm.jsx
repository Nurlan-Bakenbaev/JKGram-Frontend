import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const LoginForm = ({ setForm }) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { value, name } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState(true);
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/auth/login",
        loginData
      );

      if (response.data && response.data.token) {
        console.log("Login successful");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div>
      <div className="w-[300px] md:w-[500px] h-[55vh] p-6 bg-slate-300 rounded-md ">
        <h2 className="text-2xl md:text-4xl  text-center  text-gray-800 mb-6">
          login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4 flex flex-col">
          <input
            onChange={handleChange}
            placeholder="email"
            type="text"
            name="email"
            required
            className=" outline-none form-input px-3 py-2 mb-3  rounded text-black"
          />
          {errMsg && (
            <p className="text-red-500  text-center">
              
              Email or Password is invalid
            </p>
          )}
          <input
            onChange={handleChange}
            placeholder="password"
            type="password"
            name="password"
            required
            className="relative outline-none form-input px-4 py-2 rounded text-black"
          />

          <button
            type="submit"
            className=" p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 outline-none"
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

// Register.jsx
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const Register = ({ setForm }) => {
  const [register, setRegister] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    occupation: "",
    location: "",
    picture: "",
  });
  console.log(register);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
  });

  return (
    <div className="bg-slate-800 p-8 md:p-4 h-screen w-screen flex items-center justify-center">
      <div className=" md:max-w-md w-full md:min-w-[500px] p-6 md:bg-slate-300 rounded-md ">
        <h2 className="text-3xl text-center font-extrabold  md:text-gray-800 mb-6">
          Register
        </h2>
        <form className="space-y-4 flex flex-col text-black ">
          <input
            type="text"
            name="firstName"
            required
            className="form-input px-5 py-2"
            placeholder="First Name"
            onChange={handleChange}
            value={register.firstName}
          />

          <input
            type="text"
            name="lastName"
            required
            className="form-input px-5 py-2"
            placeholder="Last Name"
            onChange={handleChange}
            value={register.lastName}
          />

          <input
            type="email"
            name="email"
            required
            className="form-input px-5 py-2"
            placeholder="example@mail.com"
            onChange={handleChange}
            value={register.email}
          />
          <input
            type="password"
            name="password"
            required
            className="form-input px-5 py-2"
            placeholder="password"
            onChange={handleChange}
            value={register.password}
          />
          <input
            type="text"
            name="occupation"
            required
            className="form-input px-4 py-2"
            placeholder="Occupation"
            onChange={handleChange}
            value={register.occupation}
          />

          <input
            type="text"
            name="location"
            className="form-input px-5 py-2"
            placeholder="Location"
            onChange={handleChange}
            value={register.location}
          />

          <div {...getRootProps()} className="mt-2">
            <input {...getInputProps()} />
            <div className="text-gray-500 cursor-pointer text-center group  border border-dashed border-blue-400 px-5 py-7 text-sm">
              <div className="transition duration-500 group-hover:scale-110">
                <span className="uppercase text-blue-700 font-bold px-1">
                  Drag an drop
                </span>
                your profile picture or
                <span className="text-blue-700">click here</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-green"
          >
            Register
          </button>
        </form>

        <div
          onClick={() => setForm("login")}
          className="mt-4 text-blue-500 cursor-pointer text-right text-sm"
        >
          Have an account?
        </div>
      </div>
    </div>
  );
};

export default Register;

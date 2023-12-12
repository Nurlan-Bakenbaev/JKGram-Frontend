// Register.jsx
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import Loader from "./Loader";
const Register = ({ setForm }) => {
  const [register, setRegister] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    occupation: "",
    location: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const onDrop = (acceptedFiles) => {
    setRegister({ ...register, picture: acceptedFiles[0] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData();
      for (const key in register) {
        formData.append(key, register[key]);
      }
      formData.append("picturePath", register.picture.name);
      const response = await axios.post(
        "https://postgrammserver.onrender.com/auth/register",
        formData
      );
      if (response) {
        setIsLoading(false);
        setForm("login");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error during registration:", error);
    }
  };
  if (isLoading) {
    return <Loader />;
  } else
    return (
      <div
        className=" flex items-center
       justify-center"
      >
        <div
          className="max-w-[300px] md:min-w-[500px] 
        p-4 bg-slate-300 rounded-md "
        >
          <h2
            className="text-3xl text-center 
           text-slate-700 mb-6"
          >
            register
          </h2>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 flex flex-col text-black "
          >
            <div className="flex gap-4">
              <input
                type="text"
                name="firstName"
                required
                className="form-input px-5 py-2 w-full"
                placeholder="First Name"
                onChange={handleChange}
                value={register.firstName}
              />

              <input
                type="text"
                name="lastName"
                required
                className="form-input px-5 py-2 w-full"
                placeholder="Last Name"
                onChange={handleChange}
                value={register.lastName}
              />
            </div>

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
            <div className="flex gap-4">
              <input
                type="text"
                name="occupation"
                required
                className="form-input px-4 py-2 w-full"
                placeholder="Occupation"
                onChange={handleChange}
                value={register.occupation}
              />

              <input
                type="text"
                name="location"
                className="form-input px-5 py-2 w-full"
                placeholder="Location"
                onChange={handleChange}
                value={register.location}
              />
            </div>

            <div {...getRootProps()} className="mt-2">
              <input name="picture" {...getInputProps()} />
              <div className="text-gray-500 cursor-pointer text-center group  border border-dashed border-blue-400 px-5 py-7 text-sm">
                <div className="transition duration-500 group-hover:scale-110">
                  <span className="uppercase text-blue-700 font-bold px-1">
                    {register.picture ? register.picture.name : "Drag an drop"}
                  </span>
                  {register.picture
                    ? "change the picture"
                    : "your profile picture or"}
                  <span className="text-blue-700 px-1">click here</span>
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

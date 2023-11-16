import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";

const App = () => {
  let mode = useSelector((state) => state.auth.mode);
  return (
    <BrowserRouter>
      {/* Theme Provider*/}
      <div
        className={`${
          mode ? " bg-slate-800 text-white" : "bg-white text-black"
        } transition duration-300 ease-in`}
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;

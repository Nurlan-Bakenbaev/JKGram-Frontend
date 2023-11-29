import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const App = () => {
  let mode = useSelector((state) => state.auth.mode);
  const isAuth = Boolean(useSelector((state) => state.auth.token));
  return (
    <BrowserRouter>
      <div
        className={`${
          mode ? " bg-[#2a2536] text-white" : "bg-[#] text-black"
        } transition duration-300 ease-in`}
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={isAuth ? <Home /> : <Navigate to={"/"} />}
          />
          <Route
            path="/profile"
            element={isAuth ? <Profile /> : <Navigate to={"/"} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;

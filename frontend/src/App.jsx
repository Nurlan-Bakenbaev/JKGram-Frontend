import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Footer from "./components/Footer";
const App = () => {
  let mode = useSelector((state) => state.auth.mode);
  const isAuth = Boolean(useSelector((state) => state.auth.token));
  return (
    <BrowserRouter>
      <div
        className={` ${
          mode ? " bg-[#2a2536] text-white" : "bg-white text-black"
        } transition duration-500 ease-out`}
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={isAuth ? <Home /> : <Navigate to={"/"} />}
          />
          <Route
            path="/profile/:userId"
            element={isAuth ? <Profile /> : <Navigate to={"/"} />}
          />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default App;

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import ChatIcon from "@mui/icons-material/Chat";
import { useSelector, useDispatch } from "react-redux";
import { setLogOut, setMode } from "../redux/index";
import HelpIcon from "@mui/icons-material/Help";
import { Link, useNavigate } from "react-router-dom";

const MenuLinks = ({ setIsMenuOpen }) => {
  const mode = useSelector((state) => state.auth.mode);
  const user = useSelector((state) => state.auth.user);
  const userNames = `${user?.firstName} ${user?.lastName}`;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(setLogOut());
    navigate("/");
  };
  const toggleMode = () => {
    dispatch(setMode());
    setIsMenuOpen(false);
  };

  return (
    <div
      className={`flex flex-col md:flex-row pt-10 
      md:pt-0 md:px-2 pb-10 md:pb-0 md:mt-0 
      items-center gap-4 
      ${
        mode ? "text-blue-400" : "text-blue-900 bg-slate-300  md:bg-transparent"
      } mb-3 md:mb-0 `}
    >
      <div
        className="cursor-pointer 
        transition-transform 
        transform animated"
        onClick={toggleMode}
      >
        {mode ? (
          <LightModeIcon sx={{ color: "orange" }} />
        ) : (
          <DarkModeIcon sx={{ color: "darkblue" }} />
        )}
      </div>
      <div
        className={`flex flex-col md:flex-row 
      items-center gap-5`}
      >
        <button
          className="shake transition 
         duration-300 hover:text-red-500 ease-in"
        >
          <NotificationAddIcon />
        </button>
        <button
          className="hover:text-green-400
         transition duration-300 hover:scale-110"
        >
          <ChatIcon />
        </button>
        <button className="shake ">
          <HelpIcon />
        </button>
        <select
          onChange={(e) => e.target.value === "Log out" && handleLogOut()}
          id="userName"
          className="text-black bg-slate-300 text-sm rounded-lg p-2 outline "
        >
          <option className="text-xs md:text-md">
            {userNames || "Default name"}
          </option>
          <option>Log out</option>
        </select>
      </div>
    </div>
  );
};

export default MenuLinks;

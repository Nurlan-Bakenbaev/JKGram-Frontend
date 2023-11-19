import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import ChatIcon from "@mui/icons-material/Chat";
import { useSelector, useDispatch } from "react-redux";
import { setLogOut, setMode } from "../redux/index";
import HelpIcon from "@mui/icons-material/Help";
import { Link, useNavigate } from "react-router-dom";

const MenuLinks = () => {
  const mode = useSelector((state) => state.auth.mode);
  const user = useSelector((state) => state.auth.user);
  const userNames = `${user?.firstName} ${user?.lastName}`;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(setLogOut());
    navigate("/");
  };

  return (
    <div
      className={`flex flex-col md:flex-row mt-10 md:mt-0 items-center gap-4 ${
        mode ? "text-blue-400" : "text-blue-900"
      } mb-3 md:mb-0`}
    >
      <div onClick={() => dispatch(setMode())}>
        {mode ? (
          <LightModeIcon sx={{ color: "orange" }} />
        ) : (
          <DarkModeIcon sx={{ color: "darkblue" }} />
        )}
      </div>
      <div className={`flex flex-col md:flex-row items-center gap-5`}>
        <button>
          <NotificationAddIcon />
        </button>
        <button>
          <ChatIcon />
        </button>
        <button>
          <HelpIcon />
        </button>
        <select
          onChange={(e) => e.target.value === "Log out" && handleLogOut()}
          id="userName"
          className="text-black rounded-lg p-2 outline "
        >
          <option>{userNames || "Default name"}</option>
          <option>Log out</option>
        </select>
        <Link
          to={"/home"}
          className={`${!mode && "hidden"} absolute bottom-8 md:hidden text-2xl
              font-bold bg-clip-text text-transparent
              bg-gradient-to-r from-blue-500 to-purple-500`}
        >
          POSTGRAMM
        </Link>
      </div>
    </div>
  );
};

export default MenuLinks;

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import ChatIcon from "@mui/icons-material/Chat";
import { useSelector, useDispatch } from "react-redux";
import { setLogOut, setMode } from "../redux/index";
import HelpIcon from "@mui/icons-material/Help";

const MenuLinks = () => {
  const mode = useSelector((state) => state.auth.mode);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
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

        <select id="userName" className="text-black rounded-lg p-2 outline ">
          <option>{`User Name`}</option>
          <option onClick={() => dispatch(setLogOut())}>Log out</option>
        </select>
      </div>
    </div>
  );
};

export default MenuLinks;

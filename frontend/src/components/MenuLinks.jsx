import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import { useSelector, useDispatch } from "react-redux";
import {
  resetNotifications,
  setLogOut,
  setMode,
  setUserPosts,
} from "../redux/index";
import HelpIcon from "@mui/icons-material/Help";
import { useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { Button } from "@mui/material";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useState } from "react";
import { useEffect } from "react";
const MenuLinks = ({ setIsMenuOpen }) => {
  const [isNotification, setIsNotification] = useState(false);
  const mode = useSelector((state) => state.auth.mode);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const userPosts = useSelector((state) => state.auth.userPosts);
  console.log(userPosts);
  const notifications = useSelector((state) => state.auth.notifications);
  const userNames = `${user?.firstName} ${user?.lastName}`;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogOut = () => {
    localStorage.removeItem("loginData");
    dispatch(setLogOut());
    navigate("/");
  };
  const toggleMode = () => {
    dispatch(setMode());
    setIsMenuOpen(false);
  };
  const handleReadNotifications = () => {
    dispatch(resetNotifications());
    setIsNotification(!isNotification);
  };

  useEffect(() => {
    const getUserPosts = async () => {
      const response = await fetch(
        `https://postgrammserver.onrender.com/post/${user._id}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer  ${token}` },
        }
      );
      const data = await response.json();

      dispatch(setUserPosts({ userPosts: data }));
    };
    getUserPosts();
  }, [dispatch, token, user._id]);
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
        className={`flex flex-col md:flex-row  relative
      items-center gap-5`}
      >
        <button
          onClick={() => setIsNotification(!isNotification)}
          className="shake transition 
         duration-300 hover:text-red-500 ease-in"
        >
          <Badge badgeContent={notifications.length} color="secondary">
            <NotificationAddIcon />
          </Badge>
        </button>
        {isNotification && (
          <div className="absolute bg-[#e0e7ff] px-2 py-3 top-[57px] z-[99] left-[-60px]  w-[250px] border border-slate-300 rounded-md">
            {notifications?.map(({ key, value, idx }) => (
              <div className="flex flex-col px-2" key={idx}>
                <p className="text-xs">{key}: </p>
                <p
                  className={`${
                    key === "Posted"
                      ? "text-green-600 text-sm bg-green-50 p-1 rounded-md"
                      : "bg-red-100 text-sm p-1 text-red-700 rounded-md "
                  }`}
                >
                  {key === "Comment" ? (
                    <ReportGmailerrorredIcon sx={{ marginRight: "5px" }} />
                  ) : (
                    <CheckCircleOutlineIcon sx={{ marginRight: "5px" }} />
                  )}
                  {value}
                </p>
              </div>
            ))}
            <div className=" text-right w-full mt-2 ">
              <Button
                onClick={handleReadNotifications}
                sx={{ fontSize: "10px" }}
                variant="contained"
                color="success"
              >
                Set as read
              </Button>
            </div>
          </div>
        )}

        <button
          title="Your Posts"
          className="hover:text-green-400
         transition duration-300 hover:scale-110"
        >
          <Badge badgeContent={userPosts.length} color="primary">
            <LocalPostOfficeIcon sx={{ color: "purple" }} />
          </Badge>
        </button>
        <button className="shake hover:text-[#4f46e5] ">
          <HelpIcon />
        </button>
        <select
          onChange={(e) => e.target.value === "Log out" && handleLogOut()}
          id="userName"
          className="text-black outline-none bg-slate-300 text-sm rounded-lg p-2 outline "
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

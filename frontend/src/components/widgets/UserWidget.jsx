import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import { Avatar, Divider } from "@mui/material";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import FriendsListWidget from "./FriendsListWidget";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
const UserWidget = ({ userId }) => {
  const [iscollapsed, setIsCollapsed] = useState(false);
  const [isfriendsModal, setIsFriendModal] = useState(false);
  const mode = useSelector((state) => state.auth.mode);
  const token = useSelector((state) => state.auth.token);
  const [user, setUser] = useState(null);
  const LoggedUser = useSelector((state) => state.auth.user);
  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, [setUser]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!user) {
    return null;
  }
  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    friends,
    picturePath,
    impressions,
  } = user;

  return (
    <aside
      className={` ${
        mode && "bg-[#3a3349] hover:bg-[#524869]"
      } mx-auto min-w-[280px] w-full md:max-w-[520px]
      drop-shadow-lg border-[0.8px] 
      border-[#4f4f4fb0] p-4 rounded-md`}
    >
      <div className="flex flex-col">
        <div className="flex-gap ">
          <div>
            <Avatar
              alt="User Image"
              src={`http://localhost:3001/assets/${picturePath}`}
            />
          </div>
          <div className="w-full">
            <div className="flex ">
              <p>{`${firstName}  ${lastName}`}</p>
            </div>
            <p
              onClick={() => setIsFriendModal(!isfriendsModal)}
              className={`text-xs shake text-blue-400`}
            >
              {LoggedUser.friends.length} friends
            </p>
          </div>
          <div
            onClick={() => {
              setIsCollapsed(!iscollapsed);
            }}
          >
            {!iscollapsed ? (
              <KeyboardDoubleArrowDownIcon />
            ) : (
              <KeyboardDoubleArrowUpIcon />
            )}
          </div>
        </div>
        {iscollapsed && (
          <div>
            <Divider sx={{ background: "#2a2536", margin: "8px" }} />
            <div className="text-xs md:text-md">
              <span className="flex-gap m-2">
                <LocationOnIcon sx={{ color: "red" }} />
                <p>{location} </p>
              </span>
              <span className="flex-gap m-2">
                <WorkIcon sx={{ color: "lightcoral" }} />
                <p>{occupation} </p>
              </span>
            </div>
            <Divider sx={{ background: "#2a2536", margin: "5px" }} />
            <div className="text-[12px]">
              <span className="flex-gap py-2">
                <p>Your profile is viewed</p>
                <p>{viewedProfile}</p>
              </span>
              <span className="flex-gap">
                <p>Total likes</p>
                <p>{impressions}</p>
              </span>
            </div>
            <div
              onClick={() => setIsFriendModal(!isfriendsModal)}
              className="text-sm py-2  flex md:hidden  justify-end  items-center gap-2 w-full"
            >
              <span>Your friends list </span>
              <span>
                <KeyboardArrowDownIcon sx={{}} />
              </span>
            </div>
          </div>
        )}
      </div>
      <div
        className={`${
          isfriendsModal && "h-[30vh] py-2 mt-3"
        } block md:hidden  overflow-y-auto`}
      >
        {isfriendsModal && <FriendsListWidget userId={user._id} />}
      </div>
    </aside>
  );
};
export default UserWidget;

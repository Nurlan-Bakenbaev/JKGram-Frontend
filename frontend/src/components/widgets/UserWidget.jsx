import { useState } from "react";

import { useSelector } from "react-redux";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import { Divider } from "@mui/material";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import FriendsListWidget from "./FriendsListWidget";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
const UserWidget = ({ mode }) => {
  const [iscollapsed, setIsCollapsed] = useState(false);
  const [isfriendsModal, setIsFriendModal] = useState(false);

  const user = useSelector((state) => state.auth.user);
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
        mode && "bg-[#3a3349]"
      } mx-auto min-w-[260px] w-full md:max-w-[550px]
      drop-shadow-xl border-[0.8px] 
      border-[#4f4f4fb0] p-4 rounded-md  hover:bg-[#524869]`}
    >
      <div className="flex flex-col">
        <div className="flex-gap ">
          <div>
            <img
              className="min-w-[35px] text-xs max-w-[40px] rounded-full"
              src={`http://localhost:3001/assets/${picturePath}`}
              alt="image"
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
              {friends.length} friends
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
                <p>Your profile is liked</p>
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
        {isfriendsModal && <FriendsListWidget />}
      </div>
    </aside>
  );
};

export default UserWidget;

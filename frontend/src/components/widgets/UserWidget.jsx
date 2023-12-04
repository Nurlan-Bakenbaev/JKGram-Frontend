import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
const UserWidget = ({ mode }) => {
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
      className={` mx-auto min-w-[250px] w-full md:max-w-[320px]
      drop-shadow-xl border-[0.8px] 
       border-[#888787] p-4  ${mode ? "darkMode" : "lightMode"} rounded-md`}
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
            <div className="flex">
              <p className="pr-2">{firstName}</p> <p>{lastName}</p>
            </div>
            <p
              className={`text-xs ${mode ? "text-gray-400" : "text-gray-600"}`}
            >
              {friends.length} friends
            </p>
          </div>
        </div>
        <hr className="my-2  " />
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
        <hr className="my-2 " />
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
      </div>
    </aside>
  );
};

export default UserWidget;

import React from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import { useSelector } from "react-redux";

const UserWidget = () => {
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  const { firstName, lastName, picturePath, friends, location, occupation } =
    user;
  return (
    <div className="bg-slate-700 rounded-lg p-5">
      <div className="flex flex-row items-center gap-2 px-5 py-2">
        <img
          className="object-contain w-[40px] h-[40px] rounded-full"
          src={`http://localhost:3001/assets/${picturePath}`}
          alt="user-photo"
        />
        <div className="flex items-center">
          <div className="mx-2">
            <p className="w-full">{`${firstName} ${lastName}`}</p>
            <span>{friends.length} friends</span>
          </div>
          <button className="p-1 rounded-lg ml-8 hover:bg-slate-400">
            {user && (
              <PersonAddIcon sx={{ fontSize: "15px", color: "green" }} />
            )}
          </button>
        </div>
      </div>
      <hr className="mt-3" />
      <div>
        <span className="flex mt-3 gap-2">
          <LocationOnIcon sx={{ color: "red" }} />
          <p>{location}</p>
        </span>
        <span className="flex mt-3 gap-2">
          <WorkIcon sx={{ color: "purple" }} />
          <p>{occupation}</p>
        </span>
      </div>
      <hr className="mt-3" />
      <div>
        <div className="flex justify-between "></div>
      </div>
    </div>
  );
};

export default UserWidget;

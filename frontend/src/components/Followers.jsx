import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";

const Followers = ({ userId, name }) => {
  const [followers, setFollowes] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const mode = useSelector((state) => state.auth.mode);
  const navigate = useNavigate();
  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    setFollowes(data);
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line
  return (
    <div
      className={`w-[280px] px-3 py-5   ${mode ? "bg-[#3a3349]" : "bg-white"}`}
    >
      <h4>
        {`${name.firstName}'s`} <span className="px-1"> friends:</span>{" "}
      </h4>
      {followers?.map(
        ({ _id, firstName, lastName, occupation, picturePath }) => (
          <div
            onClick={() => {
              navigate(`/profile/${_id}`);
            }}
            className="hover:bg-[#5d507a]  w-full
              border border-[#4f4466]
              rounded-md px-4 py-2 mt-1 flex justify-between 
              items-center gap-4 "
            key={_id}
          >
            <div className="flex flex-col">
              <p className="border-b border-[#fba819] text-sm">{`${firstName} ${lastName}`}</p>
              <p className=" text-xs">{occupation}</p>
            </div>
            <Avatar
              sx={{ width: 40, height: 40 }}
              alt="Travis Howard"
              src={`http://localhost:3001/assets/${picturePath}`}
            />
          </div>
        )
      )}
    </div>
  );
};

export default Followers;

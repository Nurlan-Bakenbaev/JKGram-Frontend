import React from "react";
import { useSelector } from "react-redux";

const UserWidget = () => {
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  return (
    <div>
      <div className="w- ">
        <img
          className="object-contain w-[40px] rounded-full "
          src={`http://localhost:3001/assets/${user.picturePath}`}
          alt="user-photo"
        />
      </div>
    </div>
  );
};

export default UserWidget;

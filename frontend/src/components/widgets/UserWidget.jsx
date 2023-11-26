import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
const UserWidget = ({ userId, mode }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUser(data);
    };
    getUser();
  }, [token, userId]);
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
  } = user;
  return (
    <aside className="">
      <div className="flex flex-col">
        <div className="flex-gap ">
          <div>
            <img
              className="w-[45px] rounded-full"
              src={`http://localhost:3001/assets/${picturePath}`}
              alt="User-image"
            />
          </div>
          <div className="w-full">
            <div className="flex">
              <p className="pr-2">{firstName}</p> <p>{lastName}</p>
            </div>
            <p className={`${mode ? "text-gray-400" : "text-gray-600"}`}>
              {friends.length} friends
            </p>
          </div>
        </div>
        <hr className="my-5 " />
        <div>
          <span className="flex-gap m-2">
            <LocationOnIcon />
            <p>{location} </p>
          </span>
          <span className="flex-gap m-2">
            <WorkIcon />
            <p>{occupation} </p>
          </span>
        </div>
      </div>
    </aside>
  );
};

export default UserWidget;

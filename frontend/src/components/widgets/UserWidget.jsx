import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserWidget = ({ userId }) => {
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
    <aside className=" outline ">
      <div>
        <div>
          <img
            className="w-[35px] rounded-full"
            src={`http://localhost:3001/assets/${picturePath}`}
            alt="User-image"
          />
        </div>
        <div>
          <p >{firstName && lastName}</p>
          <p> {friends}</p>
        </div>
      </div>
    </aside>
  );
};

export default UserWidget;

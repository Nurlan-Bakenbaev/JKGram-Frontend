import {
  PersonAddAlt1Outlined,
  PersonRemoveAlt1Outlined,
} from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../redux";
const Friends = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.auth.user);
  const { token } = useSelector((state) => state.auth.token);
  const { friends } = useSelector((state) => state.auth.user.friends);
  const isFriend = friends?.find((friend) => friend._id === friendId);
  const pathFriend = async () => {
    const response = await fetch(`http://localhost:3001/users/${friendId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };
  return (
    <div
      className="border border-slate-400 
    px-4 py-3 rounded-lg drop-shadow-sm flex
     justify-between mt-5 min-w-[180px] "
    >
      <div>
        {userPicturePath ? (
          <img className="w-[40px]" src={userPicturePath} alt="User" />
        ) : (
          <AccountCircleIcon sx={{ fontSize: "25px" }} />
        )}
        <div
          className="flex flex-col"
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <p className="hover:text-blue-600 cursor-pointer">{name} </p>
          <p>{subtitle} </p>
        </div>
      </div>
      <div className="cursor-pointer" onClick={() => pathFriend()}>
        {isFriend ? <PersonRemoveAlt1Outlined /> : <PersonAddAlt1Outlined />}
      </div>
    </div>
  );
};

export default Friends;

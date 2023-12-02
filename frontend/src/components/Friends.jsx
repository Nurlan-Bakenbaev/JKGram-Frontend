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
  console.log(friendId)
  const pathFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };
  return (
    <div
      className=" rounded-lg drop-shadow-lg flex 
     justify-between min-w-[180px] mb-5  pb-4"
    >
      <div className="text-sm flex gap-3 items-center">
        {userPicturePath ? (
          <img
            className="w-[55px] rounded-full"
            src={`http://localhost:3001/assets/${userPicturePath}`}
            alt="User"
          />
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
          <p className="hover:text-blue-600 text-xs cursor-pointer">{name} </p>
          <p className="text-slate-500 text-[12px]">{subtitle} </p>
        </div>
      </div>
      <div className="cursor-pointer" onClick={() => pathFriend()}>
        {isFriend ? (
          <PersonRemoveAlt1Outlined sx={{ color: "green" }} />
        ) : (
          <PersonAddAlt1Outlined sx={{ color: "green" }} />
        )}
      </div>
    </div>
  );
};

export default Friends;

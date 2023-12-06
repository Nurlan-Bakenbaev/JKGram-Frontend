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
  const token = useSelector((state) => state.auth);
  const { friends } = useSelector((state) => state.auth.user);
  const isFriend = friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    console.log(friendId, _id);
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    if (!response.ok) {
      console.error(
        `Error updating friend: ${response.status} - ${response.statusText}`
      );
      return;
    }

    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  return (
    <div
      className=" rounded-lg drop-shadow-lg flex 
     justify-between items-start min-w-[180px] mb-3"
    >
      <div className="text-sm flex gap-3 items-center">
        <div className=" w-[55px] h-[55px]">
          {userPicturePath ? (
            <img
              className="border border-slate-400
               w-full h-full object-cover rounded-full"
              src={`http://localhost:3001/assets/${userPicturePath}`}
              alt="User"
            />
          ) : (
            <AccountCircleIcon sx={{ fontSize: "25px" }} />
          )}
        </div>
        <div
          className="flex flex-col"
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <p className="hover:text-blue-600 text-xs cursor-pointer border-b border-amber-500">
            {name}{" "}
          </p>
          <p className="text-slate-500 text-[12px]">{subtitle} </p>
        </div>
      </div>
      <div
        className="cursor-pointer hover:bg-indigo-400 p-1 rounded-full "
        onClick={() => patchFriend()}
      >
        <div className={_id === friendId && "hidden"}>
          {isFriend ? (
            <PersonRemoveAlt1Outlined sx={{ color: "red" }} />
          ) : (
            <PersonAddAlt1Outlined sx={{ color: "green" }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Friends;

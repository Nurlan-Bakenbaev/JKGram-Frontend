import {
  PersonAddAlt1Outlined,
  PersonRemoveAlt1Outlined,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-dom";
import { setFriends } from "../redux";
import { useSelect } from "@mui/base";
const Friends = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelect((state) => state.auth.user);
  const { token } = useSelect((state) => state.auth.token);
  const { friends } = useSelect((state) => state.auth.friends);
  const isFriend = friends.find((friend) => friend._id === friendId);
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
    <div>
      <div>
        <img className="w-[40px]" src={userPicturePath} alt="User" />
        <div
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
          > </div>
      </div>
    </div>
  );
};

export default Friends;

import { useSelector } from "react-redux";
import Friends from "../Friends";
const FriendsListWidget = () => {
  const { user } = useSelector((state) => state.auth);
  const mode = useSelector((state) => state.auth.mode);

  const token = useSelector((state) => state.auth.token);

 
  return (
    <div
      className={`px-3 mb-4 lg:mb-8  rounded-lg ${
        mode ? "bg-[#3a3349]" : "bg-white"
      } border border-[#2e2839]`}
    >
      <p className="py-3">Friends </p>
      {user.friends.map((friend) => (
        <div
          className="border-b w-full border-[#2e2839] mb-2 px-2 py-1 
          rounded-md transition duration-200 hover:bg-slate-300 "
          key={friend._id}
        >
          <Friends
            postUserId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        </div>
      ))}
    </div>
  );
};
export default FriendsListWidget;

import { useState } from "react";
import Friends from "../Friends";
import { useSelector, useDispatch } from "react-redux";
import { setPost } from "../../redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  ChatBubbleOutline,
  FavoriteBorderOutlined,
  ShareOutlined,
} from "@mui/icons-material";
const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  likes,
  comments,
  userPicturePath,
  picturePath,
  location,
}) => {
  const [isComment, setIsComment] = useState(false);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const loggedInuserId = useSelector((state) => state.auth.user._id);
  const isLiked = Boolean(likes[loggedInuserId]);
  const commentCount = Object.keys(comments).length;
  const likeCount = Object.keys(likes).length;
  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/post/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInuserId }),
    });
    const updatedPost = await response.json();

    dispatch(setPost({ post: updatedPost }));
  };
  return (
    <div
      className=" drop-shadow-md px-4 py-4 
    md:max-w-[520px] lg-w-full min-w-[220px]  border-[1px]
     border-slate-300 rounded-lg  mt-5"
    >
      <Friends
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <p className="text-xs md:text-sm mb-2">{description}</p>
      {picturePath && (
        <img
          className="w-full rounded-lg md:max-w-[520px] h-auto  mb-2 "
          src={`http://localhost:3001/assets/${picturePath}`}
          alt="Post"
        />
      )}
      <hr className="bg-blue-300 h-[2px] mt-3 mb-1 rounded-xl " />
      <div className="flex justify-between flex-row ">
        <div className="flex w-full justify-between ">
          <div className="flex gap-5">
            <div className="flex flex-row  hover:bg-slate-300 p-1 rounded-md">
              <button onClick={patchLike}>
                {isLiked ? <FavoriteIcon /> : <FavoriteBorderOutlined />}
              </button>
              <p className="text-xs">{likeCount}</p>
            </div>
            <div className="flex flex-row  hover:bg-slate-300 p-1 rounded-md">
              <button className="outline-none" onClick={() => setIsComment(!isComment)}>
                <ChatBubbleOutline />
              </button>
              <p className="text-xs">{comments.length}</p>
            </div>
          </div>

          <button className="flex flex-row  hover:bg-slate-300 p-1 rounded-md">
            <ShareOutlined />
          </button>
        </div>
      </div>
      {isComment && (
        <div className=" h-[15vh] overflow-y-auto">
          {comments.map((comment, ind) => (
            <div className="odd:bg-green-800 rounded-lg "
             key={`${name}-${ind}`}>
              <p className="pl-4 py-1 text-[12px] ">{comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostWidget;

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
      className=" px-4  drop-shadow-md py-4 
    md:max-w-[520px] min-w-[220px]  border-[1px]
     border-slate-300 rounded-lg  mt-5"
    >
      <Friends
        border={"none"}
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <p>{description}</p>
      {picturePath && (
        <img
          className="w-full  md:max-w-[520px] h-auto rounded-lg p-2 "
          src={`http://localhost:3001/assets/${picturePath}`}
          alt="Post"
        />
      )}
      <div className="flex justify-between flex-row ">
        <div className="flex w-full justify-between ">
          <div className="flex-gap">
            <div className="flex flex-row">
              <button onClick={patchLike}>
                {isLiked ? <FavoriteIcon /> : <FavoriteBorderOutlined />}
              </button>
              <p className="text-xs">{likeCount}</p>
            </div>
            <div className="flex">
              <button onClick={() => setIsComment(!isComment)}>
                <ChatBubbleOutline />
              </button>
              <p className="text-xs">{comments.types.length}</p>
            </div>
          </div>

          <button>
            <ShareOutlined />
          </button>
        </div>
      </div>
      {isComment && (
        <div>
          {comments.default.map((comment, ind) => (
            <div key={`${name}-${ind}`}>
              <hr />
              <p className="pl-4">{comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostWidget;

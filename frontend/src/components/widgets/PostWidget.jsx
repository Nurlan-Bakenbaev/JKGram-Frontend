import { useState } from "react";
import Friends from "../Friends";
import { useSelector, useDispatch } from "react-redux";
import { setPost } from "../../redux";
import {
  ChatBubbleOutline,
  FavoriteBorder,
  FavoriteBorderOutlined,
  FavoriteOutlined,
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
  console.log(loggedInuserId);
  const isLiked = Boolean(likes[loggedInuserId]);
  const likeCount = Object.keys(likes).length;
  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
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
    <div>
      <Friends
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <p>{description}</p>
      {picturePath && (
        <img
          className="w-full h-auto rounded-lg mt-3"
          src={`http://localhost:3001/assets/${picturePath}`}
          alt="Post"
        />
      )}
      <div className="flex justify-between flex-row ">
        <div>
          <div className="flex-gap">
            <button onClick={patchLike}>
              {isLiked ? <FavoriteOutlined /> : <FavoriteBorderOutlined />}
            </button>
            <p>{likeCount}</p>
          </div>
          <div className="flex-gap">
            <button onClick={() => setIsComment(!isComment)}>
              <ChatBubbleOutline />
            </button>
            <p>{comments?.length}</p>
          </div>
          <div>
            <button>
              <ShareOutlined />
            </button>
          </div>
        </div>
      </div>
      {isComment && (
        <div>
          {comments.map((comment, ind) => (
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

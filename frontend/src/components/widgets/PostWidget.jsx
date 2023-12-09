import { useState } from "react";
import Friends from "../Friends";
import { useSelector, useDispatch } from "react-redux";
import {
  setPost,
  deleteFeedPost,
  setPosts,
  setNotification,
} from "../../redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import Badge from "@mui/material/Badge";
import SendIcon from "@mui/icons-material/Send";
import {
  ChatBubbleOutline,
  FavoriteBorderOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import DoDisturbAltIcon from "@mui/icons-material/DoDisturbAlt";
import { Divider } from "@mui/material";
import Comments from "./Comments";
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
  const user = useSelector((state) => state.auth.user);
  const mode = useSelector((state) => state.auth.mode);

  const isLiked = Boolean(likes[user._id]);
  const likeCount = Object.keys(likes).length;
  const [commentInput, setCommentInput] = useState("");

  const handleCommentInputChange = (e) => {
    setCommentInput(e.target.value);
  };
  //COMMENT
  const submitComment = async () => {
    try {
      const response = await fetch(
        `https://postgrammserver.onrender.com/post/${postId}/comment`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            comment: commentInput,
            firstName: user.firstName,
            lastName: user.lastName,
            userId: user._id,
          }),
        }
      );

      if (response.ok) {
        const updatedPost = await response.json();
        dispatch(
          setNotification({
            key: "Posted",
            value: commentInput,
          })
        );
        dispatch(setPost({ post: updatedPost }));
        setCommentInput("");
      } else {
        console.error("Failed to submit comment:", response.status);
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };
  //DELETE POST
  const deletePost = async (postId) => {
    try {
      const response = await fetch(
        `https://postgrammserver.onrender.com/post/${postId}/delete`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const updatedPost = await response.json();
        console.log(updatedPost);
        dispatch(setPosts({ posts: updatedPost }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  //DELETE FROM STATE
  const RemovePostFromState = (postId) => {
    dispatch(deleteFeedPost({ postId }));
  };
  //LIKE UNLIKE
  const patchLike = async () => {
    const response = await fetch(`https://postgrammserver.onrender.com/post/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user._id }),
    });
    const updatedPost = await response.json();

    dispatch(setPost({ post: updatedPost }));
  };

  const handleSharePost = () => {
    const postUrl = window.location.href;
    navigator.clipboard.writeText(postUrl);

    alert(`Post URL copied to clipboard: ${postUrl}`);
  };
  return (
    <div
      className={`${
        mode && "bg-[#3a3349] hover:bg-[#524869]"
      }  drop-shadow-md px-4 py-4 
    min-w-[300px] md:max-w-[520px] lg-w-full border-[1px]
    border-[#4f4f4fb4] rounded-lg mb-8`}
    >
      <Friends
        postId={postId}
        postUserId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <p className="text-xs md:text-sm mb-2">{description}</p>
      {picturePath && (
        <img
          className="w-full rounded-lg md:max-w-[520px] h-auto  mb-2 "
          src={`https://postgrammserver.onrender.com/assets/${picturePath}`}
          alt="Post"
        />
      )}
      <Divider sx={{ background: "#4f4f4fb4", margin: "15px 0 10px 0" }} />
      <div className="flex justify-between flex-row ">
        <div className="flex w-full justify-between ">
          <div className="flex gap-5">
            <div className="relative flex flex-row  hover:bg-slate-300 p-1 rounded-md">
              <button title="Like it" className="mx-1 " onClick={patchLike}>
                <Badge badgeContent={likeCount} color="secondary">
                  {isLiked ? (
                    <FavoriteIcon sx={{ color: "red" }} />
                  ) : (
                    <FavoriteBorderOutlined sx={{ color: "red" }} />
                  )}
                </Badge>
              </button>
            </div>
            <div className="relative flex flex-row  hover:bg-slate-300 p-1 rounded-md">
              <button
                title="Comment"
                className=" outline-none mx-1"
                onClick={() => setIsComment(!isComment)}
              >
                <Badge badgeContent={comments.length} color="secondary">
                  <ChatBubbleOutline sx={{ color: "green" }} />
                </Badge>
              </button>
            </div>
          </div>
          <div className="flex-gap">
            <button
              title="Remove from List"
              className="flex flex-row  hover:bg-slate-300 p-1 rounded-full"
            >
              <span onClick={() => RemovePostFromState(postId)}>
                <DoDisturbAltIcon sx={{ color: "red" }} />
              </span>
            </button>
            <button
              title="Share Post"
              className="flex flex-row  hover:bg-slate-300 p-1 rounded-full"
            >
              <span onClick={handleSharePost}>
                <ShareOutlined sx={{ color: "#4f46e5" }} />
              </span>
            </button>

            <button
              title="Delete at all"
              className={`${
                user._id !== postUserId && "hidden"
              } p-1 hover:bg-red-500 rounded-full`}
              onClick={() => deletePost(postId)}
            >
              <DeleteIcon sx={{ color: "#3b82f6" }} />
            </button>
          </div>
        </div>
      </div>
      {isComment && (
        <>
          <Comments postId={postId} comments={comments} />
          <form className="relative">
            <input
              value={commentInput}
              onChange={handleCommentInputChange}
              className=" text-black  outline-none  mt-2 text-sm w-full rounded-lg px-4 py-2"
              type="text"
              placeholder="Leave a comment"
            />
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                submitComment();
              }}
              className="absolute bottom-1 right-1"
            >
              <SendIcon sx={{ color: "blue" }} />
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default PostWidget;

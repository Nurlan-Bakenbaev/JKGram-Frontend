import { useState } from "react";
import Friends from "../Friends";
import { useSelector, useDispatch } from "react-redux";
import { setPost, deleteFeedPost } from "../../redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import Badge from "@mui/material/Badge";
import SendIcon from "@mui/icons-material/Send";
import {
  ChatBubbleOutline,
  FavoriteBorderOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Divider } from "@mui/material";
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
  const isLiked = Boolean(likes[user._id]);
  const commentCount = Object.keys(comments).length;
  const likeCount = Object.keys(likes).length;
  const [commentInput, setCommentInput] = useState("");

  //COMMENTS
  const handleCommentInputChange = (e) => {
    setCommentInput(e.target.value);
  };
  console.log(commentInput);

  const submitComment = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/post/${postId}/comment`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            commentInput,
            user.firstName,
            user.lastName,
            user._id
          ),
        }
      );
      console.log(response);
      if (response.ok) {
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
        setCommentInput("");
      } else {
        console.error("Failed to submit comment");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  //LIKE UNLIKE
  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/post/${postId}/like`, {
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
  const handleDeletePost = (postId) => {
    dispatch(deleteFeedPost({ postId }));
  };
  const mode = useSelector((state) => state.auth.mode);
  return (
    <div
      className={`${mode && "bg-[#3a3349]"} drop-shadow-md px-4 py-4 
    md:max-w-[520px] lg-w-full min-w-[220px]  border-[1px]
    border-[#4f4f4fb4] rounded-lg mb-8 mt-5`}
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
      <Divider sx={{ background: "#4f4f4fb4", margin: "15px 0 10px 0" }} />
      <div className="flex justify-between flex-row ">
        <div className="flex w-full justify-between ">
          <div className="flex gap-5">
            <div className="relative flex flex-row  hover:bg-slate-300 p-1 rounded-md">
              <button className="mx-1 " onClick={patchLike}>
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
            <button className="flex flex-row  hover:bg-slate-300 p-1 rounded-full">
              <ShareOutlined sx={{ color: "#4f46e5" }} />
            </button>
            <button
              className="p-1 hover:bg-red-500 rounded-full"
              onClick={() => handleDeletePost(postId)}
            >
              <DeleteIcon sx={{ color: "#3b82f6" }} />
            </button>
          </div>
        </div>
      </div>
      {isComment && (
        <>
          <div className=" h-[15vh] overflow-y-auto">
            {comments === 0 && (
              <div className="flex items-center  justify-center w-full h-full">
                <p className="text-xs">NO COMMENTS</p>
              </div>
            )}
            {comments?.map((comment, index) => (
              <div className="rounded-lg " key={index}>
                <p className="pl-4 py-1 text-sm">{comment}</p>
              </div>
            ))}
          </div>
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

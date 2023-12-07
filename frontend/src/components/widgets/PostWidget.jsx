import { useState } from "react";
import Friends from "../Friends";
import { useSelector, useDispatch } from "react-redux";
import { setPost, deleteFeedPost, updateComments } from "../../redux";
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
  const mode = useSelector((state) => state.auth.mode);

  const isLiked = Boolean(likes[user._id]);
  const commentCount = Object.keys(comments).length;
  const likeCount = Object.keys(likes).length;
  const [commentInput, setCommentInput] = useState("");

  const handleCommentInputChange = (e) => {
    setCommentInput(e.target.value);
  };
  //COMMENT
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
        dispatch(setPost({ post: updatedPost }));
        setCommentInput("");
      } else {
        console.error("Failed to submit comment:", response.status);
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };
  //DELETE COMMENT
  const handleDeleteComment = async (_id) => {
    try {
      const response = await fetch(
        `http://localhost:3001/post/${postId}/comment/${_id}`,
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
        dispatch(setPost({ post: updatedPost }));
        dispatch(
          updateComments({
            postId,
            updatedComments: comments.filter((comment) => comment._id !== _id),
          })
        );
      } else {
        console.error("Failed to delete comment");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
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
  // SHARE POST
  const handleSharePost = () => {
    // Get the current URL and copy it to the clipboard
    const postUrl = window.location.href;
    navigator.clipboard.writeText(postUrl);

    // Alternatively, you can display the URL to the user
    alert(`Post URL copied to clipboard: ${postUrl}`);
  };
  return (
    <div
      className={`${
        mode && "bg-[#3a3349]  hover:bg-[#524869]"
      }  drop-shadow-md px-4 py-4 
    min-w-[225px] md:max-w-[550px] lg-w-full border-[1px]
    border-[#4f4f4fb4] rounded-lg mb-8 mt-5`}
    >
      <Friends
        postUserId={postUserId}
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
              <span onClick={handleSharePost}>
                <ShareOutlined sx={{ color: "#4f46e5" }} />
              </span>
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
          <div
            className={` ${
              commentCount === 0 && "h-[30px]"
            } mt-2 py-1 border-[1px] rounded-lg border-slate-600 px-2 overflow-y-auto`}
          >
            {commentCount === 0 && (
              <div className="flex items-center  justify-center w-full h-full">
                <p className="text-xs">NO COMMENTS</p>
              </div>
            )}
            {comments.map(({ comment, _id, lastName, firstName }) => (
              <div className=" rounded-lg w-full " key={_id}>
                <p className="text-[10px] py-1 px-2">{`${firstName} ${lastName}`}</p>
                <div className="px-3 p-2 rounded-xl bg-green-700">
                  <p className="pl-3 pr-4 text-sm md:text-md flex justify-between">
                    <span>{comment}</span>
                    <span className="hover:bg-slate-800 flex justify-center p-1 w-[22px] h-[22px] rounded-full">
                      <DeleteIcon
                        onClick={() => handleDeleteComment(_id)}
                        sx={{ color: "red", fontSize: "18px" }}
                      />
                    </span>
                  </p>
                </div>
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

import DeleteIcon from "@mui/icons-material/Delete";
import { setNotification, setPost, updateComments } from "../../redux";
import { useDispatch, useSelector } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const Comments = ({ comments, postId }) => {
  const commentCount = Object.keys(comments).length;
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

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
        dispatch(
          setNotification({ key: "comment", value: "Your comment deleted" })
        );

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
  return (
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
            <p className="text-[10px] py-1 px-2">
              <AccountCircleIcon sx={{ fontSize: "18px" }} />{" "}
              {`${firstName} ${lastName}`}
            </p>
            <div className="px-3 p-2 rounded-xl bg-green-700">
              <p className="pl-3 pr-4 text-sm md:text-md flex justify-between">
                <span>{comment}</span>
                <button className="hover:bg-[#3b82f6]  flex justify-center p-2 rounded-md">
                  Delete{" "}
                  <DeleteIcon
                    onClick={() => handleDeleteComment(_id)}
                    sx={{ color: "red", fontSize: "18px", marginLeft: "2px" }}
                  />
                </button>
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Comments;

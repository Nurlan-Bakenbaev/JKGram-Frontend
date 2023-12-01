import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import ImageIcon from "@mui/icons-material/Image";
import { setPosts } from "../../redux";
import Buttons from "../Buttons";

const MyPostWidget = ({ mode }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { _id } = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const handlePost = async () => {
    try {
      const formData = new FormData();
      formData.append("userId", _id);

      formData.append("description", post);
      if (image) {
        formData.append("picture", image);
        formData.append("piturePath", image.name);
      }

      const response = await fetch("http://localhost:3001/posts", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorText}`
        );
      }
      const responseData = await response.json();
      dispatch(setPosts({ posts: responseData }));
      setImage(null);
      setPost("");
      setIsImage(false)
    } catch (error) {
      console.error("Error while posting:", error);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    setImage(acceptedFiles);
  }, []);
  const handleDelete = () => {
    setImage(null);
    setPost("");
  };
  const toggleDropZone = () => {
    setIsImage(!isImage);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div
      className={`${
        mode ? "dark" : "light"
      } md:w-full px-1 mt-2  flex-gap flex-col border
       border-slate-400 p-2 rounded-lg drop-shadow-2xl`}
    >
      <div className=" w-full ">
        <input
          placeholder="Postgramm something ?"
          type="text"
          onChange={(e) => setPost(e.target.value)}
          value={post}
          className="w-full outline-none text-black py-2 bg-slate-200 px-5 rounded-lg"
        />
      </div>
      {isImage && (
        <div className="border border-blue-500 border-dashed p-2 w-full cursor-pointer">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {!isDragActive && (
              <div className="flex flex-col text-center text-[12px] lg:text-[16px]">
                <p>
                  Drag and drop, or
                  <span className="text-blue-500 px-1">click to select</span>
                  file
                </p>
                {image && (
                  <p>
                    Selected image:
                    <span className="text-red-500 px-1 font-extrabold">
                      {image[0].name}
                    </span>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      <div
        className="flex justify-between max-w-[320px] 
        pt-1 px-3 mt-2  border-t border-slate-400 w-full py-2"
      >
        <Buttons
          onclick={toggleDropZone}
          text={"Image"}
          icon={<ImageIcon sx={{ color: "#0096FF" }} />}
        />

        <Buttons
          onclick={handleDelete}
          text={"Delete"}
          icon={<DeleteIcon sx={{ color: "red" }} />}
        />
        <Buttons
          onclick={handlePost}
          text={"Post"}
          icon={<SendIcon sx={{ color: "#0096FF" }} />}
        />
      </div>
    </div>
  );
};

export default MyPostWidget;
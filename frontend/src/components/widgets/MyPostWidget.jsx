import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AttachmentIcon from "@mui/icons-material/Attachment";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import GifBoxIcon from "@mui/icons-material/GifBox";
import ImageIcon from "@mui/icons-material/Image";
import MicIcon from "@mui/icons-material/Mic";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { setPosts } from "../../redux";
import Buttons from "../Buttons";

const MyPostWidget = () => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(true);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { _id } = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("piturePath", image.name);
    }
    const responce = fetch("http://localhost:3001/posts", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await responce.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");
  };
  const onDrop = useCallback((acceptedFiles) => {
    setImage(acceptedFiles);
  }, []);
  console.log(image);
  const handleDelete = () => {
    setImage(null);
    setPost("");
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div className="md:w-full px-1 flex-gap flex-col border border-slate-500 p-2 rounded-lg">
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
              <div className="flex flex-col text-center text-[12px] md:text-[16px]">
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
      <div className="flex justify-between px-4 pt-2 border-t border-slate-400 w-full">
        <Buttons
          onclick={handleDelete}
          text={"delete"}
          title={<DeleteIcon sx={{ color: "red" }} />}
        />
        <Buttons
          onclick={handleDelete}
          text={"delete"}
          title={<DeleteIcon sx={{ color: "red" }} />}
        />
        <Buttons
          onclick={handleDelete}
          text={"delete"}
          title={<DeleteIcon sx={{ color: "red" }} />}
        />
        <Buttons
          onclick={handleDelete}
          text={"delete"}
          title={<DeleteIcon sx={{ color: "red" }} />}
        />
      </div>
    </div>
  );
};

export default MyPostWidget;

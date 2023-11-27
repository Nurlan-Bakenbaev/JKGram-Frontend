import Dropzone from "react-dropzone";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AttachmentIcon from "@mui/icons-material/Attachment";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import GifBoxIcon from "@mui/icons-material/GifBox";
import ImageIcon from "@mui/icons-material/Image";
import MicIcon from "@mui/icons-material/Mic";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { setPosts } from "../../redux";

const MyPostWidget = () => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
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

  return (
    <div>
      <div>
        <input
          placeholder="What's on your mind?"
          type="text"
          onChange={(e) => setPost(e.target.value)}
          value={post}
          className="w-full bg-slate-200 px-3"
        />
      </div>
    </div>
  );
};

export default MyPostWidget;

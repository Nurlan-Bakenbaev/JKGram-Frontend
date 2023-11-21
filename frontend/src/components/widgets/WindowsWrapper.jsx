import { useSelect } from "@mui/base";
import CreatePost from "./CreatePost";
import UserWidget from "./UserWidget";

const WindowsWrapper = () => {
  const mode = useSelect((state) => state.auth.mode);
  return (
    <div className={`flex gap-5 justify-between `}>
      <UserWidget />
      <CreatePost />
      <UserWidget />
    </div>
  );
};

export default WindowsWrapper;

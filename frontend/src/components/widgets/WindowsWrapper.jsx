import { useSelect } from "@mui/base";
import UserWidget from "./UserWidget";

const WindowsWrapper = () => {
  const mode = useSelect((state) => state.auth.mode);
  return (
    <div className={`flex gap-5 justify-between `}>
      <UserWidget />
    </div>
  );
};

export default WindowsWrapper;

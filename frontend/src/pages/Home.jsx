import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import UserWidget from "../components/widgets/UserWidget";
import MyPostWidget from "../components/widgets/MyPostWidget";
import Friends from "../components/Friends";
import PostsWidgets from "../components/widgets/PostsWidgets";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const { _id, picturePath } = useSelector((state) => state.auth.user);
  const mode = useSelector((state) => state.auth.mode);
  return (
    <div className="w-full h-[100vh]">
      <Navbar />
      <div
        className=" p-2 
      flex flex-col-reverse 
      md:flex-row md:items-baseline
      md:justify-between gap-8"
      >
        <div>
          <UserWidget userId={user._id} mode={mode} />
        </div>
        <div className="flex flex-col w-full">
          <MyPostWidget mode={mode} />
          <PostsWidgets userId={_id} />
        </div>
        <div>
          <Friends />
        </div>
      </div>
    </div>
  );
};

export default Home;

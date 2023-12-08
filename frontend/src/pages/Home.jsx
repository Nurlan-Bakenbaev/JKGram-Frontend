import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import UserWidget from "../components/widgets/UserWidget";
import MyPostWidget from "../components/widgets/MyPostWidget";
import PostsWidgets from "../components/widgets/PostsWidgets";
import AdvertisementWidget from "../components/widgets/Advertisement";
import FriendsListWidget from "../components/widgets/FriendsListWidget";

const Home = () => {
  const { _id } = useSelector((state) => state.auth.user);
  const mode = useSelector((state) => state.auth.mode);
  return (
    <div className="w-full min-h-[100vh] max-h-full">
      <Navbar />
      <div className="w-[90%] md:w-full lg:w-[90%] mx-auto">
        <div
          className="
      flex flex-col-reverse 
      md:flex-row md:items-start
      md:justify-between gap-4 px-3 pt-[120px]"
        >
          <div className="hidden lg:flex flex-col gap-5">
            <UserWidget userId={_id} mode={mode} />
          </div>
          <div
            className="flex flex-col drop-shadow-md
           w-full justify-center items-center"
          >
            <div className="w-full flex justify-center">
              <MyPostWidget mode={mode} />
            </div>

            <div className="w-full mt-5 mb-5  flex flex-col lg:hidden">
              <UserWidget userId={_id} mode={mode} />
            </div>
            <PostsWidgets userId={_id} />
          </div>
          <div
            className="hidden flex-col
           items-center lg:flex"
          >
            <AdvertisementWidget />
            <FriendsListWidget userId={_id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

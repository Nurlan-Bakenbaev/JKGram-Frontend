import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import UserWidget from "../components/widgets/UserWidget";
import MyPostWidget from "../components/widgets/MyPostWidget";

import PostsWidgets from "../components/widgets/PostsWidgets";
import AdvertisementWidget from "../components/widgets/Advertisement";
import FriendsListWidget from "../components/widgets/FriendsListWidget";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const { _id } = useSelector((state) => state.auth.user);
  const mode = useSelector((state) => state.auth.mode);
  return (
    <div className="w-full min-h-[100vh] max-h-full">
      <Navbar />
      <div className="w-[90%] md:w-full lg:w-[80%] mx-auto">
        <div
          className="
      flex flex-col-reverse 
      md:flex-row md:items-start
      md:justify-between gap-8 px-3 pt-[120px]"
        >
          <div className="hidden lg:flex">
            <UserWidget userId={user._id} mode={mode} />
          </div>
          <div
            className="flex flex-col drop-shadow-md
           w-full justify-center items-center"
          >
            <MyPostWidget mode={mode} />

            <div className="w-full mt-5  flex flex-col lg:hidden">
              <UserWidget userId={user._id} mode={mode} />
            </div>
            <PostsWidgets userId={_id} />
          </div>
          <div
            className="hidden flex-col
           items-center lg:flex"
          >
          
            <AdvertisementWidget />
            <FriendsListWidget />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

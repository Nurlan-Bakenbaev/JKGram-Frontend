import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import UserWidget from "../components/widgets/UserWidget";
import MyPostWidget from "../components/widgets/MyPostWidget";
import PostsWidgets from "../components/widgets/PostsWidgets";
import AdvertisementWidget from "../components/widgets/Advertisement";
import FriendsListWidget from "../components/widgets/FriendsListWidget";
import RecentPosts from "../components/RecentPosts";
import Footer from "../components/Footer";
const Home = () => {
  const { _id } = useSelector((state) => state.auth.user);
  const mode = useSelector((state) => state.auth.mode);

  return (
    <div className="relative w-full min-h-[100vh] max-h-full">
      <Navbar />
      <div className="w-full lg:w-[80%] mx-auto">
        <div
          className="
      flex flex-col-reverse 
      md:flex-row md:items-start
      justify-center gap-5 px-3 pt-[120px]"
        >
          <div className="hidden  md:flex flex-col gap-3">
            <UserWidget userId={_id} mode={mode} />
            <RecentPosts />
          </div>

          <div
            className="flex  flex-col drop-shadow-md
           justify-center items-center"
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
            className="hidden  flex-col
           items-center lg:flex"
          >
            <AdvertisementWidget />
            <FriendsListWidget userId={_id} />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;

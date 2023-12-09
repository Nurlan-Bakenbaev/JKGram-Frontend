import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import UserWidget from "../components/widgets/UserWidget";
import PostsWidgets from "../components/widgets/PostsWidgets";
import AdvertisementWidget from "../components/widgets/Advertisement";
import FriendsListWidget from "../components/widgets/FriendsListWidget";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { _id } = useSelector((state) => state.auth.user);
  const mode = useSelector((state) => state.auth.mode);
  const token = useSelector((state) => state.auth.token);
  const [userData, setUserData] = useState(null);
  const params = useParams();

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(
        `https://postgrammserver.onrender.com/users/${params.userId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();

      setUserData(data);
    };
    getUser();
  }, [params.userId, token]);
  if (!userData) return null;
  return (
    <div className="w-full min-h-[100vh] max-h-full">
      <Navbar />
      <div className="w-[90%] md:w-full lg:w-[90%] mx-auto">
        <div
          className="
      flex flex-col-reverse 
      md:flex-row md:items-start
      md:justify-between gap-2 px-3 pt-[120px]"
        >
          <div className="hidden lg:flex">
            <UserWidget userId={userData._id} mode={mode} />
          </div>
          <div
            className="flex flex-col drop-shadow-md
           w-full justify-center items-center"
          >
            <div className="w-full mb-5  flex flex-col lg:hidden">
              <UserWidget userId={userData._id} mode={mode} />
            </div>
            <PostsWidgets userId={userData._id} isProfile={true} />
          </div>
          <div
            className="hidden flex-col
           items-center lg:flex"
          >
            <AdvertisementWidget />
            <FriendsListWidget userId={userData._id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

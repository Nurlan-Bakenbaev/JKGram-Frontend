import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";

import UserWidget from "../components/widgets/UserWidget";
import MyPostWidget from "../components/widgets/MyPostWidget";

const Home = () => {
 
  const { user } = useSelector((state) => state.auth);
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
        <UserWidget userId={user._id} mode={mode} />
        <MyPostWidget mode={mode} />
      </div>
    </div>
  );
};

export default Home;

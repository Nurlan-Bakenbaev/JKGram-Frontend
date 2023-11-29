import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { setLogin } from "../redux";
import UserWidget from "../components/widgets/UserWidget";
import Loader from "../components/Loader";
import MyPostWidget from "../components/widgets/MyPostWidget";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const mode = useSelector((state) => state.auth.mode);

  const initializeAuthentication = async () => {
    try {
      const loginData = localStorage.getItem("loginData");
      const loginParsed = JSON.parse(loginData);
      await dispatch(setLogin(loginParsed));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initializeAuthentication();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full h-[100vh]">
      <Navbar />
      <div
        className=" p-2 
      flex flex-col-reverse 
      md:flex-row 
      md:justify-between gap-8"
      >
        <UserWidget userId={user._id} mode={mode} />
        <MyPostWidget mode={mode} />
      </div>
    </div>
  );
};

export default Home;

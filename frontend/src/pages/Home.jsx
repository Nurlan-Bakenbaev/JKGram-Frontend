import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { setLogin } from "../redux";
import UserWidget from "../components/widgets/UserWidget";
import Loader from "../components/Loader";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const mode = useSelector((state) => state.auth.mode);
  useEffect(() => {
    const initializeAuthentication = async () => {
      try {
        const loginData = localStorage.getItem("loginData");
        const loginParsed = JSON.parse(loginData);
        if (loginParsed) {
          await dispatch(setLogin(loginParsed));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuthentication();
  }, [dispatch, setLoading]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full h-[100vh]">
      <Navbar />
      <div className="p-2 border">
        <UserWidget userId={user._id} mode={mode} />
      </div>
    </div>
  );
};

export default Home;

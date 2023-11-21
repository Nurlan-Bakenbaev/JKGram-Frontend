import { useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { setLogin } from "../redux";
import UserWidget from "../components/widgets/UserWidget";
import Loader from "../components/Loader";
import WindowsWrapper from "../components/widgets/WindowsWrapper";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuthentication = async () => {
      try {
        const loginData = localStorage.getItem("loginData");
        const loginParsed = JSON.parse(loginData);
        if (loginParsed) {
          console.log(loginParsed);
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
      <div>
        <WindowsWrapper />
      </div>
    </div>
  );
};

export default Home;

import { useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { setLogin } from "../redux";
import UserWidget from "../components/widgets/UserWidget";
import Loader from "../components/Loader";
const Home = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const initializeAuthentication = async () => {
      try {
        console.log("Start authentication initialization");
        const loginData = localStorage.getItem("loginData");
        const loginParsed = JSON.parse(loginData);
        if (loginParsed) {
          console.log("Dispatching setLogin");
          await dispatch(
            setLogin({ user: loginParsed.user, token: loginParsed.token })
          );
          console.log("setLogin completed");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error during authentication initialization:", error);
      }
    };

    initializeAuthentication();
    console.log("End useEffect");
  }, [dispatch, setLoading]);
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="w-full h-[100vh]">
      <Navbar />
      <div className="flex flex-row justify-between">
        <UserWidget />
      </div>
    </div>
  );
};

export default Home;

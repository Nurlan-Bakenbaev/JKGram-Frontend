import { useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { setLogin } from "../redux";
import UserWidget from "../components/widgets/UserWidget";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const loginData = localStorage.getItem("loginData");

    const loginParsed = JSON.parse(loginData);

    if (loginParsed) {
      dispatch(setLogin({ user: loginParsed.user, token: loginParsed.token }));
    }
  }, [dispatch]);

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

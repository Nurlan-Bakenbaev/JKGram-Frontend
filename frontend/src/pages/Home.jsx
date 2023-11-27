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
    const getUser = async () => {
      const response = await fetch(`http://localhost:3001/users/${user._id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUser(data);
    };
    getUser();
  }, [token, userId]);

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

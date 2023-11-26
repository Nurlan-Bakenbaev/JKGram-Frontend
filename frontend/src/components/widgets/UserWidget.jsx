import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../Loader";
const UserWidget = () => {
  const [loader, setLoader] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const getUser = async () => {
    const response = await fetch(`http://localhost:5173/users${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json;
    console.log(data);
    setUser(data);
  };
  useEffect(() => {
    getUser();
  }, []);
  const {} = user;
  if (!user) {
    return <Loader />;
  }
  return <div>UserWidget</div>;
};

export default UserWidget;

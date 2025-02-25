import React, { useEffect } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { BASE_URL } from "./utils/Constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useSelector } from "react-redux";
export const Body = () => {
  const navigate = useNavigate();
  const userStore = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fetchUser = async () => {
    try {
      const response = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(response.data));
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/login");
      }
      console.log(error);
    }
  };
  useEffect(() => {
    if (!userStore) fetchUser();
  }, []);
  return (
    <div>
      <NavBar />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};

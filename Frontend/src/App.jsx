import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./Components/index.js";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./store/authSlice";
import axiosInstance from "./utils/axiosInstance";

function App() {
  const dispatch = useDispatch();
  const { accessToken, userData } = useSelector((state) => state.auth);

  useEffect(() => {
    if (accessToken && !userData) {
      axiosInstance
        .get("/user/profile")
        .then((res) => {
          dispatch(
            login({
              userData: res.data.info.user,
              accessToken,
            })
          );
        })
        .catch(() => {
          // Optionally handle error (e.g., logout)
        });
    }
  }, [accessToken, userData, dispatch]);

  return (
    <div className="w-full min-h-screen relative font-inter text-white bg-gradient-to-b from-black via-gray-900 to-black">
      <Header />
      <main className="w-full h-full pt-20 sm:pt-28 pb-20 text-sm sm:text-base">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;

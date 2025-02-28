import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

function UserProfile({ setMenuOpen }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth?.userData);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="">
      {/* Profile Icon */}
      <button
        className="flex justify-center items-center bg-slate-600 rounded-full w-10 h-10"
        onClick={() => setOpen(!open)}
      >
        <img
          src={userData?.avatar}
          className="w-full h-full rounded-full object-cover object-top border-gray-100 border-2"
          alt=""
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute h-screen top-0 right-0 mt-2 w-80 cursor-pointer bg-[#191B1F] shadow-md rounded-lg">
          <div className="w-full  p-4 shadow-sm shadow-white">
            <div className="flex justify-start items-center relative">
              <p className="w-12 h-12">
                <img
                  src={userData?.avatar}
                  className="w-full h-full rounded-full object-cover object-top border-gray-100 border-2"
                  alt=""
                />
              </p>
              <div className="pl-3">
                <h1 className="">{userData?.fullname}</h1>
                <h3 className="text-xs">{userData?.email}</h3>
              </div>
            </div>
            <p className="text-xs p-1 rounded-lg bg-gray-600 inline-block ml-14 mt-2">
              {userData?.role}
            </p>
            <i
              onClick={() => {
                setOpen(!open);
              }}
              className=" absolute right-0 top-0 ri-close-line text-xl hover:bg-gray-700 cursor-pointer p-1 rounded-sm"
            ></i>
          </div>

          <ul className="py-2">
            <li
              className="px-7 py-2 hover:bg-gray-600 cursor-pointer "
              onClick={() => {
                navigate("/settings");
                setOpen(!open);
              }}
            >
              <i className="text-sm pr-2 ri-settings-2-line"></i>Settings
            </li>
            <li className="px-7 py-2 hover:bg-gray-600 cursor-pointer">
              <i className="text-sm pr-2 ri-book-open-line"></i>Help guide
            </li>
          </ul>
          <div className="absolute bottom-3 w-full">
            <hr className="w-full" />
            <button
              onClick={() => {
                handleLogout();
                setOpen(!open);
              }}
              className="w-full px-7 py-2 text-start hover:bg-gray-600 cursor-pointer"
            >
              <i className="text-sm pr-2 ri-logout-box-r-line"></i>Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;

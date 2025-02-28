import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Profile() {
  const userData = useSelector((state) => state.auth?.userData);
  const navigate = useNavigate();
  return (
    <div className="w-full h-full relative">
      <h1 className="text-3xl font-bold">Profile</h1>
      <p className="text-gray-400 text-sm">Your persional details</p>
      <p
        className="border-2 py-1 px-2 rounded-md  hover:bg-gray-700 text-sm border-gray-50 absolute right-0 top-1 cursor-pointer"
        onClick={() => navigate("/edit-profile")}
      >
        Edit Profile
      </p>
      <div className="mt-6 leading-10">
        <div className="flex justify-start items-center  border-b-2 border-gray-50 mb-5 pb-2">
          <h1 className="text-gray-500 font-semibold w-1/3">Full name</h1>
          <h1>{userData?.fullname}</h1>
        </div>
        <div className="flex justify-start items-center  border-b-2 border-gray-50 mb-5 pb-2">
          <h1 className="text-gray-500 font-semibold w-1/3">Email</h1>
          <h1>{userData?.email}</h1>
        </div>
        <div className="flex justify-start items-center  border-b-2 border-gray-50 mb-5 pb-2">
          <h1 className="text-gray-500 font-semibold w-1/3">Role</h1>
          <h1>{userData?.role}</h1>
        </div>
        <div className="flex justify-start items-center  border-b-2 border-gray-50 mb-5 pb-2">
          <h1 className="text-gray-500 font-semibold w-1/3">Avatar</h1>
          <div className="w-12 h-12 rounded-full">
            <img
              className="w-full h-full rounded-full object-cover"
              src={userData?.avatar}
              alt=""
              srcset=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

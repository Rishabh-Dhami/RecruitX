import React, { use, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../utils/axiosInstance";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

function ProfileEdit() {
  const userData = useSelector((state) => state?.auth?.userData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState(userData?.email || "");
  const [fullname, setFullname] = useState(userData?.fullname || "");
  const [role, setRole] = useState(userData?.role || "");
  const [avatar, setAvatar] = useState(userData?.avatar || null);
  const [preview, setPreview] = useState(userData?.avatar || "");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file)); // Generate a preview URL for the new image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("email", email);
      formData.append("role", role);
      formData.append("fullname", fullname);
      if (avatar) {
        formData.append("avatar", avatar);
      } else {
        formData.append("avatar", preview); // Send previous avatar if no new file is selected
      }

      const response = await axiosInstance.patch(
        `user/profile/${userData?._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        dispatch(
          login({
            userData: response.data.info.user,
            accessToken: response.data.info.accessToken,
          })
        );
        navigate("/settings");
      }

      setAvatar(response.data.info?.user.avatar || avatar);
      setPreview(response.data.info?.user.avatar || preview);
      setFullname(response.data.info?.user.fullname);
      setEmail(response.data.info?.user.email);
    } catch (error) {
      setError(error?.response?.data?.message || "Edit Profile ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full lg:min-h-screen min-h-[55vh] flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-md bg-[#030508] shadow-md p-6 sm:p-9 rounded-lg">
        <form className="w-full" onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <div className="mb-4">
            <label htmlFor="fullname">Full Name:</label> <br />
            <input
              type="text"
              name="fullname"
              id="fullname"
              className="w-full  py-2 px-4 mt-2 bg-[#191B1F] shadow-[0_0px_5px_rgba(25,27,31,0.6)] outline-none shadow-gray-50 border-0 rounded-lg "
              onChange={(e) => setFullname(e.target.value)}
              value={fullname}
              required
            />
          </div>
          <div className="mb-4 w-full ">
            <label htmlFor="email">Email</label> <br />
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#191B1F] shadow-[0_0px_5px_rgba(25,27,31,0.6)] outline-none shadow-gray-50 border-0 rounded-lg py-2 px-4 mt-2"
              required
            />
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="avatar">Avatar</label>
            <input
              type="file"
              name="avatar"
              id="avatar"
              className="w-full bg-[#191B1F] rounded-lg shadow-[0_0px_5px_rgba(25,27,31,0.6)] outline-none shadow-gray-50 border-0 py-2 px-4 mt-2"
              onChange={handleAvatarChange}
            />
            <input type="hidden" name="existingAvatar" value={preview} />
            {preview && (
              <div className="mt-3 flex justify-center">
                <img
                  src={preview}
                  alt="Avatar Preview"
                  className="w-24 h-24 object-cover rounded-full border-2 border-gray-500"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`bg-[#1D4ED8] text-white rounded-lg w-full py-2 px-4 mt-4 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Editing profile..." : "Edit Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileEdit;

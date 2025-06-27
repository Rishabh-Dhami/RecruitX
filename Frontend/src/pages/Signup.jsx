import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import axiosInstance from "../utils/axiosInstance";
import { Link } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [fullname, setFullname] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showEye, setShowEye] = useState(true);
  const [confirmEye, setConfirmEye] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const togglePasswordVisibility = () => {
    setShowEye(!showEye);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmEye(!confirmEye);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", role);
      formData.append("fullname", fullname);
      formData.append("confirmPassword", confirmPassword);
      if (avatar) {
        formData.append("avatar", avatar); // Only append if an image is selected
      }

      const response = await axiosInstance.post(`/user/signup`, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      if (response.status == 201) {
        dispatch(
          login({
            userData: response.data.info.user,
            accessToken: response.data.info.accessToken,
          })
        );
        localStorage.setItem("accessToken", response.data.info.accessToken);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setPassword("");
        setRole("");
        setFullname("");
        setAvatar(null);
        navigate("/");
      }
    } catch (error) {
      setError(error?.response?.data?.message || "Signup faild");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full lg:min-h-screen min-h-[60vh] flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-md bg-[#030508] shadow-md p-6 sm:p-9 rounded-lg">
        <form onSubmit={submitHandler} className="w-full">
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
          <div className="mb-4 full">
            <label htmlFor="email">Email</label> <br />
            <input
              type="email"
              name="email"
              id="email"
              className="w-full  py-2 px-4 mt-2 bg-[#191B1F] rounded-lg shadow-[0_0px_5px_rgba(25,27,31,0.6)] outline-none shadow-gray-50 border-0"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="password">Password</label>
            <br />
            <div className="relative">
              <input
                type={showEye ? "password" : "text"}
                name="password"
                id="password"
                className=" w-full bg-[#191B1F] rounded-lg shadow-[0_0px_5px_rgba(25,27,31,0.6)] outline-none shadow-gray-50 border-0 py-2 px-4 mt-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {showEye ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </span>
            </div>
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <br />
            <div className="relative">
              <input
                type={confirmEye ? "password" : "text"}
                name="confirmPassword"
                id="confirmPassword"
                className=" w-full bg-[#191B1F] rounded-lg shadow-[0_0px_5px_rgba(25,27,31,0.6)] outline-none shadow-gray-50 border-0 py-2 px-4 mt-2"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={toggleConfirmPasswordVisibility}
              >
                {confirmEye ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </span>
            </div>
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="role">Role:</label>
            <br />
            <select
              name="role"
              id="role"
              className="w-full text-center mt-2 py-2 rounded-lg bg-[#191B1F] shadow-[0_0px_5px_rgba(25,27,31,0.6)] outline-none shadow-gray-50 border-0"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">--Select Role--</option>
              <option value="recruiter">Recruiter</option>
              <option value="candidate">Candidate</option>
            </select>
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="avatar">Avatar</label>
            <input
              type="file"
              name="avatar"
              id="avatar"
              className=" w-full bg-[#191B1F] rounded-lg shadow-[0_0px_5px_rgba(25,27,31,0.6)] outline-none shadow-gray-50 border-0 py-2 px-4 mt-2"
              onChange={(e) => setAvatar(e.target.files[0])}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`bg-[#1D4ED8] text-white w-full rounded-lg py-2 px-4 mt-4 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link
            className="text-blue-400 underline"
            onClick={() => navigate("/login")}
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;

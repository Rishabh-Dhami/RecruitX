import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { login } from "../store/authSlice";
import axiosInstance from "../utils/axiosInstance";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [error, setError] = useState("");
  const [loading, SetLoading] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    try {
      SetLoading(true);
      const response = await axiosInstance.post(`/user/login`, data, {
        headers: { "content-type": "application/json" },
        withCredentials: true,
      });

      if (response.status == 200) {
        dispatch(
          login({
            userData: response.data.info.user,
            accessToken: response.data.info.accessToken,
          })
        );
        localStorage.setItem("accessToken", response.data.info.accessToken);
        setEmail("");
        setPassword("");
        navigate("/");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Invalid email or password");
    } finally {
      SetLoading(false);
    }
  };

  return (
    <div className="w-full lg:min-h-screen min-h-[55vh] flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-md bg-[#030508] shadow-md p-6 sm:p-9 rounded-lg">
        <form onSubmit={submitHandler} className="w-full">
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <div className="mb-4 w-full ">
            <label htmlFor="email">Email</label> <br />
            <input
              type="email"
              name="email"
              id="email"
              className="w-full bg-[#191B1F] shadow-[0_0px_5px_rgba(25,27,31,0.6)] outline-none shadow-gray-50 border-0 rounded-lg py-2 px-4 mt-2"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="password">Password</label>
            <br />
            <div className="relative">
              <input
                type={showPassword ? "password" : "text"}
                name="password"
                id="password"
                className=" w-full bg-[#191B1F] shadow-[0_0px_5px_rgba(25,27,31,0.6)] outline-none shadow-gray-50 border-0 rounded-lg py-2 px-4 mt-2"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <span
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </span>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`bg-[#1D4ED8] text-white rounded-lg w-full py-2 px-4 mt-4 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link
            className="text-blue-400 underline"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/authSlice";

function Header() {
  const authStatus = useSelector((state) => state.auth?.userData || false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "All Jobs",
      slug: "/all-jobs",
      active: true,
    },
    {
      name: "Add Job",
      slug: "/add-job",
      active: authStatus.role == "recruiter" ? true : false,
    },
  ];

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="w-full flex fixed top-0 justify-between z-[999] items-center py-4 px-20 bg-gradient bg-black text-white shadow-sm">
      <div className="w-[12%]">
        <img className="w-full h-full" src="/assets/logo.png" alt="Logo" />
      </div>
      <ul className="flex justify-center items-center gap-5">
        {navItems.map((item) =>
          item.active ? (
            <li key={item.name}>
              <button onClick={() => navigate(item.slug)}>{item.name}</button>
            </li>
          ) : null,
        )}
      </ul>
      <div className="flex items-center justify-center gap-5">
        {!authStatus ? (
          <button onClick={() => navigate("/signup")}>Signup</button>
        ) : null}
        {!authStatus ? (
          <button
            onClick={() => navigate("/login")}
            className=" bg-transparent border border-[#49A0CB] text-[#49A0CB] hover:bg-[#49A0CB] hover:text-white py-2 px-4 rounded-full transition-colors duration-300"
          >
            Login
          </button>
        ) : null}

        {authStatus ? (
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white  py-2 px-4 rounded-full duration-300 transition-colors"
          >
            Logout
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default Header;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/authSlice";
import { Menu, X } from "lucide-react";
import UserProfile from "./UserProfile";

function Header() {
  const authStatus = useSelector((state) => state.auth?.userData || false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

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
      active: authStatus?.role == "recruiter" ? true : false,
    },
    {
      name: "Dashboard",
      slug: "/dashboard",
      active: authStatus ? true : false,
    },
  ];

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("accessToken");
  };

  return (
    <header className="w-full fixed top-0 left-0 z-[999] bg-black text-white shadow-md ">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6 md:px-10 lg:px-15">
        <div className="w-28 md:w-36">
          <img className="w-full h-full" src="/assets/logo.png" alt="Logo" />
        </div>
        <ul className="hidden md:flex items-center gap-6">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <button onClick={() => navigate(item.slug)}>{item.name}</button>
              </li>
            ) : null,
          )}
        </ul>
        <div className="hidden md:flex items-center gap-4">
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
          {authStatus ? <UserProfile /> : null}
        </div>
        <div className="md:hidden flex justify-center items-center gap-2">
          <UserProfile />
          <button
            className=" text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden bg-black text-white flex flex-col items-start pl-8 gap-4 py-6 transition-all">
          {navItems.map(
            (item) =>
              item.active && (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.slug);
                    setMenuOpen(false);
                  }}
                  className="hover:text-gray-300 transition"
                >
                  {item.name}
                </button>
              ),
          )}

          {!authStatus ? (
            <>
              <button
                onClick={() => {
                  navigate("/signup");
                  setMenuOpen(!menuOpen);
                }}
              >
                Signup
              </button>
              <button
                onClick={() => {
                  navigate("/login");
                  setMenuOpen(!menuOpen);
                }}
                className="border border-[#49A0CB] text-[#49A0CB] hover:bg-[#49A0CB] hover:text-white py-2 px-4 rounded-full transition duration-300"
              >
                Login
              </button>
            </>
          ) : null}
        </nav>
      )}
    </header>
  );
}

export default Header;

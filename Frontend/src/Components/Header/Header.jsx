import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/authSlice';

function Header() {
  const authStatus = useSelector((state) => state.auth?.status || false);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
  {
      name: "All Jobs",
      slug: "/all-jobs",
      active: true,
  },
  {
      name: "Add Job",
      slug: "/add-job",
      active: authStatus,
  },
]

const handleLogout = () => {
  dispatch(logout());
}

  
  
  return (
    <div className='w-full flex fixed top-0 justify-between items-center py-4 px-16 bg-white shadow-sm'>
      <div>Logo</div>
      <ul className='flex justify-center items-center gap-5'>
        {navItems.map((item) => (
          item.active ? <li key={item.name}>
            <button onClick={() => navigate(item.slug)}>
              {item.name}
            </button>
          </li> : null
        ))}
      </ul>
      <div className='flex items-center justify-center gap-3'>
      {
        !authStatus ? <button onClick={() => navigate('/login')} className=" bg-transparent border border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white py-2 px-4 rounded-full transition-colors duration-300">
        Login
    </button> : null
      }
      {
        !authStatus ? <button onClick={() => navigate("/signup")} className="bg-[#3A67F5] hover:bg-blue-700 text-white  py-2 px-4 rounded-full duration-300 transition-colors">
        Signup
      </button> : null
      }
     
     {authStatus ? <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white  py-2 px-4 rounded-full duration-300 transition-colors">
        Logout
      </button> : null}
      
      </div>
      
    </div>
  )
}

export default Header
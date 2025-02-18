import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import axiosInstance from '../utils/axiosInstance';


function Signup() {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [fullname, setFullname] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showEye , setShowEye] = useState(true);
    const [confirmEye, setConfirmEye] = useState(true);
    const [error, setError] = useState("");
    const [loading , setLoading] = useState(false);

    const togglePasswordVisibility = () => {
        setShowEye(!showEye);
    };

    const toggleConfirmPasswordVisibility = () => {
      setConfirmEye(!confirmEye);
  };
   

    const navigate = useNavigate();
    const dispatch = useDispatch();


  const submitHandler = async(e) => {
    e.preventDefault();


    if(password !== confirmPassword){
      setError("Passwords do not match")
    }

    const data = {
      email,
      password,
      role,
      fullname,
      confirmPassword
    };

  

    try {

      setLoading(true);

      const response = await axiosInstance.post(`/user/signup`,
        data,{
        headers : {
          "content-type" : "application/json"
        }}
      );

      

      if(response.status == 201){
        dispatch(login({userData : response.data.info.user, accessToken : response.data.info.user}));
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setPassword("");
        setRole("");
        setFullname("");
        navigate("/");
      }

      
    } catch (error) {
      setError(error?.response?.data?.message || "Signup faild");
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className='w-full min-h-[112vh] flex items-center justify-center'>
     <div className='w-[36%]  bg-[#030508] shadow-[0_0px_5px_rgba(25,27,31,0.6)] shadow-gray-50 flex items-center justify-center py-9 px-6 rounded-md '>
      <form onSubmit={submitHandler} className='w-full'>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className='mb-4 w-full'>
          <label htmlFor="fullname">Full Name:</label> <br />
          <input 
          type="text" 
          name="fullname" 
          id="fullname" 
          className='w-full  py-2 px-4 mt-2 bg-[#191B1F] shadow-[0_0px_5px_rgba(25,27,31,0.6)] outline-none shadow-gray-50 border-0 rounded-lg '
          onChange={(e) => setFullname(e.target.value)}
          value={fullname}
          required
          />
        </div>
        <div className='mb-4 w-full'>
          <label htmlFor="email">Email</label> <br />
          <input 
          type="email" 
          name="email" 
          id="email" 
          className='w-full  py-2 px-4 mt-2 bg-[#191B1F] rounded-lg shadow-[0_0px_5px_rgba(25,27,31,0.6)] outline-none shadow-gray-50 border-0'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          />
        </div>
        <div className='mb-4 w-full'>
          <label htmlFor="password">Password</label><br />
          <div className="relative">
          <input 
          type={showEye ? "password" : "text"} 
          name="password" 
          id="password" 
          className=' w-full bg-[#191B1F] rounded-lg shadow-[0_0px_5px_rgba(25,27,31,0.6)] outline-none shadow-gray-50 border-0 py-2 px-4 mt-2' 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
            onClick={togglePasswordVisibility}
          >
            {showEye ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
          </span>
        </div>
        </div>
        <div className='mb-4 w-full'>
          <label htmlFor="confirmPassword">Confirm Password</label><br />
          <div className="relative">
          <input 
          type={confirmEye ? "password" : "text"} 
          name="confirmPassword" 
          id="confirmPassword" 
          className=' w-full bg-[#191B1F] rounded-lg shadow-[0_0px_5px_rgba(25,27,31,0.6)] outline-none shadow-gray-50 border-0 py-2 px-4 mt-2' 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          />
          <span
            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
            onClick={toggleConfirmPasswordVisibility}
          >
            {confirmEye ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
          </span>
          </div>
        </div>
        <div className='mb-4 w-full'>
          <label htmlFor="role">Role:</label><br />
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
            <option value="admin">admin</option> 
          </select>
        </div>
        <button 
        type="submit" 
        disabled={loading} 
        className={`bg-[#1D4ED8] text-white w-full rounded-lg py-2 px-4 mt-4 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
            {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
     </div>
    </div>
  )
}

export default Signup
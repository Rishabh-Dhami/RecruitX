import React from "react";
import { Link } from "react-router-dom";

function Howitswork() {
  return (
    <div className="w-full h-[80vh] px-20 mt-12 relative">
      <div className="w-full relative">
        <h1 className="text-5xl font-semibold">How Its Works</h1>
        <p className="h-2 w-[20%] bg-[#4D9ECB] rounded-lg absolute bottom-[-15px]"></p>
      </div>
      <p className="text-sm mt-10">
        Explore the following these steps will help you find <br /> a job easily
      </p>
      <div className="w-full flex items-center justify-between flex-wrap mt-14">
        <div className="w-[32%] flex justify-between items-center bg-[#333333] rounded-lg py-8 px-10">
          <div>
            <p className="font-bold bg-[#49A0CB] h-16 w-16 flex justify-center items-center text-3xl rounded-full ">
              <i className="ri-login-box-line"></i>
            </p>
            <p className="mt-4">Register / Login</p>
            <p className="text-xs pt-2">First you have an account</p>
            <Link className="text-blue-500 text-xs" to={"/signup"}>
              Register Account
            </Link>
          </div>
          <div className="text-9xl font-extrabold">1</div>
        </div>
        <div className="w-[32%] flex justify-between items-center bg-[#333333] rounded-lg py-8 px-10">
          <div>
            <p className="font-bold bg-[#49A0CB] h-16 w-16 flex justify-center items-center text-3xl rounded-full ">
              <i className="ri-search-line"></i>
            </p>
            <p className="mt-4">Find Job</p>
            <p className="text-xs pt-2">Search your dream job</p>
            <Link className="text-blue-500 text-xs" to={"/all-jobs"}>
              Find Job
            </Link>
          </div>
          <div className="text-9xl font-extrabold">2</div>
        </div>
        <div className="w-[32%] flex justify-between items-center bg-[#333333] rounded-lg py-8 px-10">
          <div>
            <p className="font-bold bg-[#49A0CB] h-16 w-16 flex justify-center items-center text-3xl rounded-full ">
              <i className="ri-survey-fill"></i>
            </p>
            <p className="mt-4">Apply Job</p>
            <p className="text-xs pt-2">Apply to the company and wait it.</p>
            <Link className="text-blue-500 text-xs" to={"/signup"}>
              Learn More
            </Link>
          </div>
          <div className="text-9xl font-extrabold">3</div>
        </div>
      </div>
    </div>
  );
}

export default Howitswork;

import React from "react";
import { Link } from "react-router-dom";

function Howitswork() {
  return (
    <div className="w-full lg:min-h-screen mb-4 px-6 sm:px-12 lg:px-20 mt-12 relative lg:pt-20">
      <div className="w-full relative text-center ">
        <h1 className="text-3xl lg:text-6xl font-semibold   lg:text-left">
          How Its Works
        </h1>
        <p className="h-2 w-[30%] lg:w-[20%] bg-[#4D9ECB] rounded-lg absolute left-1/2 lg:left-0 transform lg:transform-none -translate-x-1/2 lg:translate-x-0 bottom-[-15px]"></p>
      </div>
      <p className="w-full text-sm mt-10 text-center lg:text-left">
        Explore the following these steps will help you find{" "}
        <br className="hidden md:block" /> a job easily
      </p>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
        <div className="w-full bg-[#333333] rounded-lg py-8 px-6 md:px-10 flex justify-between items-center">
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
        <div className="w-full bg-[#333333] rounded-lg py-8 px-6 md:px-10 flex justify-between items-center">
          <div>
            <p className="font-bold bg-[#49A0CB] h-16 w-16 flex justify-center items-center text-3xl rounded-full ">
              <i className="ri-search-line"></i>
            </p>
            <p className="mt-4 text-lg md:text-base">Find Job</p>
            <p className="text-xs pt-2">Search your dream job</p>
            <Link className="text-blue-500 text-xs" to={"/all-jobs"}>
              Find Job
            </Link>
          </div>
          <div className="text-9xl font-text-6xl md:text-9xl font-extrabold">
            2
          </div>
        </div>
        <div className="w-full bg-[#333333] rounded-lg py-8 px-6 md:px-10 flex justify-between items-center">
          <div>
            <p className="font-bold bg-[#49A0CB] h-16 w-16 flex justify-center items-center text-3xl rounded-full ">
              <i className="ri-survey-fill"></i>
            </p>
            <p className="mt-4 text-lg md:text-base">Apply Job</p>
            <p className="text-xs pt-2">Apply to the company and wait it.</p>
            <Link className="text-blue-500 text-xs" to={"/signup"}>
              Learn More
            </Link>
          </div>
          <div className="text-9xl font-text-6xl md:text-9xl font-extrabold">
            3
          </div>
        </div>
      </div>
    </div>
  );
}

export default Howitswork;

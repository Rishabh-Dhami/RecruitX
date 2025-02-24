import React from "react";

function Hero() {
  return (
    <div className="w-full  min-h-[82vh] py-4 px-6 sm:px-12 lg:px-20 flex  flex-col-reverse lg:flex-row lg:items-center text-start lg:justify-between justify-center gap-12 lg:gap-0">
      <div className="w-full lg:w-1/2 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl w-full  lg:text-6xl font-extrabold leading-[1.1] text-white">
          Find your <br />
          <span className="text-[#48A0C8]">dream job</span> here <br /> easily
          and quickly
        </h1>
        <p className="text-sm sm:text-base text-gray-50 mt-3 sm:mt-5">
          Effortless hiring and job searching with our smart ATS—connect faster,
          hire better!{" "}
        </p>
      </div>
      <div className="w-full  lg:w-2/5 flex justify-center">
        <img
          className="w-full h-full max-w-[400px] md:max-w-full object-cover"
          src="https://images.unsplash.com/photo-1573496130407-57329f01f769?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
    </div>
  );
}

export default Hero;

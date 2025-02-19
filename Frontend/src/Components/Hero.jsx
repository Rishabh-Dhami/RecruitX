import React from "react";

function Hero() {
  return (
    <div className="w-full h-[80vh]  py-4 px-20 flex items-center justify-between">
      <div className="w-1/2">
        <h1 className="text-6xl font-extrabold leading-[1.1] text-white">
          Find your <br />
          <span className="text-[#48A0C8]">dream job</span> here <br /> easily
          and quickly
        </h1>
        <p className="text-sm text-gray-50 mt-2">
          Effortless hiring and job searching with our smart ATS—connect faster,
          hire better!{" "}
        </p>
      </div>
      <div className="h-full w-2/5">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1573496130407-57329f01f769?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
    </div>
  );
}

export default Hero;

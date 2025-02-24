import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function FeaturedJob() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");

  const userData = useSelector((state) => state.auth?.userData);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axiosInstance.get(`/jobs/`);
        setJobs(response.data.info.jobs);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch jobs. Please try again.");
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="w-full px-5 md:px-10 lg:px-20 min-h-[75vh] relative">
      <div className="w-full">
        <h1 className="text-4xl lg:text-5xl font-bold text-center lg:text-left">Featured Job</h1>
        <p className="h-2 w-[40%] lg:w-[13%] bg-[#4B9FCD] mt-3 rounded-lg mx-auto lg:mx-0"></p>
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start mt-10 gap-4">
        <p className="w-full lg:w-[40%] text-center lg:text-left">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel veniam
          et eum nulla obcaecati repudiandae minima iste in quia numquam.
        </p>
        <Link to={"/all-jobs"} className="bg-[#4199c9] py-2 px-8 rounded-lg absolute bottom-[-7%] right-[42%]">
          Find More Job
        </Link>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-center mt-10">
        {jobs.map((item, index) => (
          <div
            key={index}
            className="w-full p-5 lg:p-8 bg-[#333333] hover:bg-[#408BB1] rounded-xl"
          >
            <div>
              <p className="text-red-500 font-semibold text-xl md:text-2xl">
                {item.companyName}
              </p>
              <p className="text-[12px] font-extralight text-gray-300">
                {item.location}
              </p>
            </div>
            <div className="my-4">
              <h5 className="text-lg">{item.jobTitle}</h5>
              <p className="text-xs text-gray-400">{item.employmentType}</p>
            </div>
            <p className="text-gray-300 text-sm">{item.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <h4 className="text-lg md:text-xl font-semibold">${item.salary}/month</h4>
              {userData?.role === "candidate" ? (
                <Link
                  to={`/job/${item?._id}/apply`}
                  className="bg-white text-black py-2 px-6 text-sm rounded-lg"
                >
                  Apply Now
                </Link>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedJob;

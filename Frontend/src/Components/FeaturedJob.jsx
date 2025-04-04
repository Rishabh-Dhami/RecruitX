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
        setError("Failed to fetch jobs. Please try again.");
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="w-full px-5 md:px-10 lg:px-20 min-h-[70vh] mb-8 relative">
      <div className="w-full">
        <h1 className="text-4xl lg:text-5xl font-bold text-center lg:text-left">
          Featured Job
        </h1>
        <p className="h-2 w-[40%] lg:w-[13%] bg-[#4B9FCD] mt-3 rounded-lg mx-auto lg:mx-0"></p>
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start mt-10 gap-4">
        <p className="w-full lg:w-[40%] text-center lg:text-left">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel veniam
          et eum nulla obcaecati repudiandae minima iste in quia numquam.
        </p>
        <Link
          to={"/all-jobs"}
          className="bg-[#4199c9] py-2 px-8 rounded-lg absolute bottom-[-10%] right-[42%]"
        >
          Find More Job
        </Link>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-center mt-10">
        {jobs.map((data, index) => (
          <div
            key={index}
            className="w-full bg-gray-800 shadow-lg rounded-xl p-6 transition hover:bg-gray-700"
          >
            <div>
              <h3 className="text-2xl font-semibold text-white">
                {data.jobTitle}
              </h3>
              <span className="text-sm text-gray-400">
                {data.employmentType}
              </span>
              <p className="text-lg text-blue-400 mt-2">{data.companyName}</p>
              <p className="text-sm text-gray-300">{data.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedJob;

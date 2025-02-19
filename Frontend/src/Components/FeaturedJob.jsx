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
    <div className="w-full px-20 min-h-[70vh]">
      <div className="w-full">
        <h1 className="text-5xl font-bold">Featured Job</h1>
        <p className="h-2 w-[13%] bg-[#4B9FCD] mt-3 rounded-lg"></p>
      </div>
      <div className="flex justify-between items-start mt-10">
        <p className="w-[40%]">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel veniam
          et eum nulla obcaecati repudiandae minima iste in quia numquam.
        </p>
        <Link to={"/all-jobs"} className="bg-[#4199c9] py-2 px-8 rounded-lg">
          Find More Job
        </Link>
      </div>
      <div className="w-full flex justify-between flex-wrap gap-y-4 items-center mt-10">
        {jobs.map((item, index) => (
          <div
            key={index}
            className="w-[32%] p-8 bg-[#333333] hover:bg-[#408BB1] rounded-xl"
          >
            <div>
              <p className="text-red-500 font-semibold text-2xl">
                {item.companyName}
              </p>
              <p className="text-[12px] font-extralight text-gray-300">
                {item.location}
              </p>
            </div>
            <div className="my-4">
              <h5>{item.jobTitle}</h5>
              <p className="text-xs text-gray-400">{item.employmentType}</p>
            </div>
            <p className="text-gray-300 text-sm">{item.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <h4 className="text-xl font-semibold">${item.salary}/month</h4>
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

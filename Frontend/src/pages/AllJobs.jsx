import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AllJobs() {
  const [error, setError] = useState("");
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const limit = 6;
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth?.userData);

  function handlePrevPage() {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  }

  function handleNextPage() {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  }

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `/jobs?page=${currentPage}&limit=${limit}`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          setJobs(response?.data?.info?.jobs || []);
          setTotalPages(response?.data?.info?.totalPages || 1);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("Failed to fetch jobs. Please try again.");
        setLoading(false);
      }
    };

    fetchJobs();
  }, [currentPage]);

  const deleteJob = async (jobId) => {
    try {
      const jobDelete = await axiosInstance.delete(`/jobs/${jobId}`, {
        headers: { "Content-Type": "application/json" },
      });
      if (jobDelete.status === 200) {
        setAlertMessage("Job deleted successfully");
        setJobs(jobs.filter((job) => job._id !== jobId));
        setTimeout(() => setAlertMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      setAlertMessage("Failed to delete job");
      setTimeout(() => setAlertMessage(""), 3000);
    }
  };

  return loading ? (
    <div className="w-full h-[80vh] flex  items-center justify-center">
      <h1 className="text-4xl font-bold">Loading...</h1>
    </div>
  ) : (
    <div className="w-full flex flex-col p-5 lg:p-20 gap-5">
      {/* Alert Messages */}
      {alertMessage && (
        <div className="fixed top-0 left-0 right-0 bg-red-500 text-white text-center py-2">
          {alertMessage}
        </div>
      )}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Job Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6 w-full">
        {jobs.map((data, index) => (
          <div
            key={index}
            className="w-full bg-gray-800 shadow-lg rounded-xl p-6 relative transition hover:bg-gray-700 "
          >
            {/* Edit/Delete Actions */}
            <div className=" absolute top-5 right-4 flex gap-2 z-[9]">
              {userData?._id === data?.owner && (
                <Link
                  to={`/edit-job/${data._id}`}
                  className="bg-blue-700 hover:bg-blue-500 py-1 px-2 rounded-md"
                >
                  <i className="ri-pencil-fill"></i>
                </Link>
              )}
              {(userData?._id === data?.owner || userData?.role === "admin") && (
                <button
                  onClick={() => deleteJob(`${data._id}`)}
                  className="bg-red-700 hover:bg-red-500 py-1 z-999 px-2 rounded-md"
                >
                  <i className="ri-delete-bin-fill"></i>
                </button>
              )}
            </div>

            {/* Job Details */}
            <div
              onClick={
                userData?.role === "candidate"
                  ? () => navigate(`/job/${data?._id}/apply`)
                  : () => navigate(`/job/${data?._id}/show`)
              }
              className="cursor-pointer"
            >
              <h3 className="text-xl font-semibold text-white">
                {data.jobTitle}
              </h3>
              <span className="text-sm text-gray-400">
                {data.employmentType}
              </span>
              <p className="text-lg text-blue-400 mt-2">{data.companyName}</p>
              <p className="text-sm text-gray-300">{data.location}</p>
            </div>
            <div className="mt-6 flex justify-between items-center">
              <span className="text-lg font-bold text-green-400">
                ${data.salary}/month
              </span>

              {userData?.role === "candidate" && (
                <Link to={`/job/${data?._id}/apply`}>
                  <button className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg">
                    Apply Now
                  </button>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={handlePrevPage}
          disabled={currentPage <= 1}
          className="bg-gray-700 text-white px-4 py-2 rounded-md disabled:opacity-50 hover:bg-gray-600"
        >
          <i className="ri-arrow-left-wide-line"></i> Prev
        </button>

        <span className="text-white text-lg font-semibold">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNextPage}
          disabled={currentPage >= totalPages}
          className="bg-gray-700 text-white px-4 py-2 rounded-md disabled:opacity-50 hover:bg-gray-600"
        >
          Next <i className="ri-arrow-right-wide-fill"></i>
        </button>
      </div>
    </div>
  );
}

export default AllJobs;

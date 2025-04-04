import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../utils/axiosInstance";
import CandidatesList from "./CandidatesList";
import CandidateApplicationsTable from "./CandidateApplicationsTable";

function DashboardAllJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [jobId, setJobId] = useState(null);
  const userData = useSelector((state) => state.auth?.userData);

  useEffect(() => {
    async function fetchJobs() {
      if (userData?.role !== "recruiter" || !userData?._id) return;
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `/jobs/${userData.role}/${userData._id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        setJobs(response.data?.info);
      } catch (error) {
        setError(
          error.response?.data?.message || "Failed to fetch jobs."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, [userData?.role, userData?._id]);

  return userData?.role == "recruiter" ? (
    <div className="w-full">
      {loading ? (
        <p className="text-center text-xl text-white">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="w-full overflow-x-auto flex gap-6 py-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 cursor-pointer">
          {jobs.map((data, index) => (
            <div
              key={index}
              onClick={() => setJobId(data?._id)}
              className={`min-w-[300px] cursor-pointer  shadow-lg rounded-xl p-6 transition hover:bg-gray-700 ${
                jobId === data._id ? "bg-[#000000] " : "bg-gray-800  "
              }`}
            >
              <h3 className="text-lg font-semibold text-blue-400 ">
                {data.jobTitle}
              </h3>
              <span className="text-sm text-gray-400">
                {data.employmentType}
              </span>
              <p className="text-sm text-gray-300">{data.location}</p>
            </div>
          ))}
        </div>
      )}
      {jobId && <CandidatesList jobId={jobId} />}
    </div>
  ) : userData?.role === "candidate" ? (
    <CandidateApplicationsTable />
  ) : null;
}

export default DashboardAllJobs;

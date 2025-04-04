import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useSelector } from "react-redux";

function CandidateApplicationsTable() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);

  const userData = useSelector((state) => state?.auth.userData);

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);

        const response = await axiosInstance.get(
          `/jobs/candidate/${userData?.email}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        const sortedJobs = response?.data?.info?.sort(
          (a, b) => new Date(b.appliedAt) - new Date(a.appliedAt)
        );

        setJobs(sortedJobs);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch jobs.");
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, [userData?.email]);

  return (
    <div className="mt-5">
      {loading && (
        <p className="text-center text-gray-400">Loading applications...</p>
      )}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {loading && jobs.length === 0 && !loading && !error && (
        <p className="text-center text-gray-400">No job applications found.</p>
      )}

      {jobs.length > 0 && (
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 border-b border-gray-800">
              <th className="px-4 py-3">Job Role</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Applied Date</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr
                key={job?._id}
                className="border-b border-gray-800 hover:bg-gray-800/50"
              >
                <td className="px-4 py-4">{job?.jobTitle}</td>
                <td className="px-4 py-4">{job?.employmentType}</td>
                <td className="px-4 py-4">{job?.location}</td>
                <td className="px-4 py-4">
                  {new Date(job?.appliedAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-4">{job?.applicantStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CandidateApplicationsTable;
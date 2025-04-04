import React, { useState, useEffect } from "react";
import { Star, FileText } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";

function CandidatesList({ jobId }) {
  const [candidates, setCandidates] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchCandidates();
  }, [jobId]);

  const fetchCandidates = async () => {
    try {
      const response = await axiosInstance.get(`/jobs/${jobId}/applicants`);
      setCandidates(response.data.info);
    } catch (error) {
      console.error("Error fetching candidates", error);
    }
  };

  const updateStatus = async (applicantId, newStatus) => {
    try {
      const response = await axiosInstance.patch(
        `/jobs/${jobId}/applicants/${applicantId}`,
        { status: newStatus },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setCandidates((prev) =>
          prev.map((c) =>
            c._id === applicantId ? { ...c, status: newStatus } : c
          )
        );
      }
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  const filteredCandidates = candidates.filter((c) =>
    filter === "all" ? true : c.status === filter
  );

  return (
    <div className="min-h-auto bg-gray-900 text-white p-6 mt-6">
      <h1 className="text-2xl font-bold mb-4">Candidates</h1>
      <div className="flex space-x-4 mb-4">
        {["all", "shortlisted", "rejected"].map((status) => (
          <button
            key={status}
            className={`px-4 py-2 rounded ${
              filter === status ? "bg-blue-500" : "bg-gray-700"
            }`}
            onClick={() => setFilter(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 border-b border-gray-700">
              <th className="px-4 py-3">Candidate Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Resume</th>
              <th className="px-4 py-3">Applied Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.map(({ applicant, status, _id, appliedAt }) => (
              <tr
                key={_id}
                className="border-b border-gray-800 hover:bg-gray-800/50"
              >
                <td className="px-4 py-4 flex items-center">
                  <img
                    src={applicant?.avatar}
                    alt={applicant?.name}
                    className="w-8 h-8 rounded-full mr-3 object-cover"
                  />
                  {applicant?.name}
                </td>
                <td className="px-4 py-4">{applicant?.email}</td>
                <td className="px-4 py-4">
                  <a
                    href={applicant?.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400"
                  >
                    <FileText className="inline-block w-5 h-5 mr-1" /> View
                    Resume
                  </a>
                </td>
                <td className="px-4 py-4">
                  {new Date(appliedAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-4 capitalize">{status}</td>
                <td className="px-4 py-4 space-x-2">
                  <button
                    onClick={() => {
                      updateStatus(_id, "shortlisted");
                    }}
                    className="px-3 py-1 bg-green-500 rounded text-white"
                  >
                    Shortlist
                  </button>
                  <button
                    onClick={() => {
                      updateStatus(_id, "rejected");
                    }}
                    className="px-3 py-1 bg-red-500 rounded text-white"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CandidatesList;

import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function AddJob() {
  const [step, setStep] = useState(1);
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState([]); // Array for requirements
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle adding a requirement
  const handleAddRequirement = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      e.preventDefault();
      setRequirements([...requirements, e.target.value.trim()]);
      e.target.value = "";
    }
  };

  // Remove requirement
  const removeRequirement = (index) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  // Function to submit the form
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!jobTitle || !companyName || !employmentType || !location || !salary || !description || requirements.length === 0) {
      setError("All fields are required!");
      return;
    }

    const data = {
      jobTitle,
      companyName,
      employmentType,
      location,
      salary,
      description: description.replace(/<[^>]+>/g, ""), // Remove HTML tags from description
      requirements, // Send as an array
    };

    try {
      setLoading(true);
      const response = await axiosInstance.post("/jobs/", data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.status === 201) {
        navigate("/all-jobs");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Posting job failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-gray-900 shadow-lg p-8 rounded-lg">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Step 1: Job Details */}
        {step === 1 && (
          <form>
            <h2 className="text-white text-2xl font-bold mb-4">Step 1: Job Details</h2>

            <div className="mb-4">
              <label className="text-gray-300">Company Name:</label>
              <input
                type="text"
                className="w-full py-2 px-4 mt-2 bg-gray-800 rounded-lg text-white"
                onChange={(e) => setCompanyName(e.target.value)}
                value={companyName}
              />
            </div>

            <div className="mb-4">
              <label className="text-gray-300">Job Title:</label>
              <input
                type="text"
                className="w-full py-2 px-4 mt-2 bg-gray-800 rounded-lg text-white"
                onChange={(e) => setJobTitle(e.target.value)}
                value={jobTitle}
              />
            </div>

            <div className="mb-4">
              <label className="text-gray-300">Employment Type:</label>
              <select
                className="w-full py-2 px-4 mt-2 bg-gray-800 rounded-lg text-white"
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value)}
              >
                <option value="">--Select Type--</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="text-gray-300">Location:</label>
              <input
                type="text"
                className="w-full py-2 px-4 mt-2 bg-gray-800 rounded-lg text-white"
                onChange={(e) => setLocation(e.target.value)}
                value={location}
              />
            </div>

            <div className="mb-4">
              <label className="text-gray-300">Salary ($):</label>
              <input
                type="number"
                className="w-full py-2 px-4 mt-2 bg-gray-800 rounded-lg text-white"
                onChange={(e) => setSalary(Number(e.target.value))}
                value={salary}
              />
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="bg-blue-600 text-white w-full rounded-lg py-2 px-4 mt-4 hover:bg-blue-500"
            >
              Next: Add Description
            </button>
          </form>
        )}

        {/* Step 2: Job Description */}
        {step === 2 && (
          <form onSubmit={submitHandler}>
            <h2 className="text-white text-2xl font-bold mb-4">Step 2: Job Description</h2>

            <div className="mb-4">
              <label className="text-gray-300">Description:</label>
              <ReactQuill value={description} onChange={setDescription} />
            </div>

            <div className="mb-4">
              <label className="text-gray-300">Requirements:</label>
              <input
                type="text"
                placeholder="Press Enter to add"
                className="w-full py-2 px-4 mt-2 bg-gray-800 rounded-lg text-white"
                onKeyDown={handleAddRequirement}
              />
              <ul className="mt-2">
                {requirements.map((req, index) => (
                  <li key={index} className="flex justify-between items-center text-white bg-gray-700 px-3 py-2 rounded-md mt-2">
                    {req}
                    <button
                      type="button"
                      onClick={() => removeRequirement(index)}
                      className="text-red-500 hover:text-red-400"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Buttons for navigation */}
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="bg-gray-500 text-white rounded-lg py-2 px-4"
              >
                Back
              </button>

              <button
                type="submit"
                disabled={loading}
                className={`bg-green-600 text-white rounded-lg py-2 px-4 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {loading ? "Adding Job..." : "Add Job"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default AddJob;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function EditJob() {
  const [step, setStep] = useState(1);
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [requirements, setRequirements] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { slug } = useParams();

  const handleAddRequirement = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      e.preventDefault();
      setRequirements([...requirements, e.target.value.trim()]);
      e.target.value = "";
    }
  };

  const removeRequirement = (index) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  useEffect(() => {
    async function fetchJob() {
      try {
        const response = await axiosInstance.get(`/jobs/${slug}`);
        if (response.status === 200) {
          const fetchedJob = response.data.info.job;
          setJobTitle(fetchedJob?.jobTitle || "");
          setCompanyName(fetchedJob?.companyName || "");
          setEmploymentType(fetchedJob?.employmentType || "");
          setLocation(fetchedJob?.location || "");
          setSalary(fetchedJob?.salary || "");
          setDescription(fetchedJob?.description || "");
          setRequirements(fetchedJob?.requirements || []);
        }
      } catch (error) {
        console.error(error);
        setError(error?.response?.data?.message || "Failed to fetch job details.");
      }
    }
    fetchJob();
  }, [slug]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = { jobTitle, companyName, employmentType, location, salary, description, requirements };
    try {
      setLoading(true);
      const response = await axiosInstance.patch(`/jobs/${slug}`, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.status === 200) {
        navigate("/all-jobs");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[85vh] flex items-center justify-center">
      <div className="w-[40%] bg-[#030508] shadow-md rounded-lg flex flex-col items-center justify-center py-9 px-6">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {step === 1 && (
          <form onSubmit={(e) => e.preventDefault()} className="w-full">
            <h2 className="text-xl text-[#54BAEC] font-bold text-center mb-4">Step 1: Job Details</h2>
            {[
              { label: "Company Name", state: companyName, setter: setCompanyName },
              { label: "Job Title", state: jobTitle, setter: setJobTitle },
              { label: "Location", state: location, setter: setLocation },
              { label: "Salary", state: salary, setter: (e) => setSalary(Number(e.target.value)), type: "number" },
            ].map(({ label, state, setter, type = "text" }, index) => (
              <div className="mb-4 w-full" key={index}>
                <label htmlFor={label}>{label}:</label>
                <input
                  type={type}
                  name={label}
                  id={label}
                  className="w-full py-2 px-4 mt-2 bg-[#191B1F] shadow-md outline-none border-0 rounded-lg"
                  onChange={(e) => setter(e.target.value)}
                  value={state}
                  required
                />
              </div>
            ))}
            <div className="mb-4 w-full">
              <label htmlFor="employmentType">Employment Type:</label>
              <select
                name="employmentType"
                id="employmentType"
                className="w-full text-center mt-2 py-2 rounded-lg bg-[#191B1F] shadow-md outline-none border-0"
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value)}
                required
              >
                <option value="">--Select Type--</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>
            <button
              type="button"
              className="bg-[#1D4ED8] text-white w-full rounded-lg py-2 px-4 mt-4"
              onClick={() => setStep(2)}
            >
              Next: Job Description
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={submitHandler} className="w-full">
            <h2 className="text-xl text-[#54BAEC] font-bold text-center mb-4">Step 2: Job Description</h2>
            <div className="mb-4 w-full">
              <label htmlFor="description">Description:</label>
              <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
                className="mt-2 bg-white text-black rounded-lg"
              />
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
            <div className="flex justify-between w-full gap-10 mt-4">
              <button
                type="button"
                className="bg-gray-500 text-white  rounded-lg py-2 px-4"
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`bg-[#1D4ED8] text-white  rounded-lg py-2 px-4 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {loading ? "Updating..." : "Update Job"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default EditJob;

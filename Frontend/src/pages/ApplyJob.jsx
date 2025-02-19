import React from "react";
import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useParams } from "react-router-dom";
import { PickerOverlay } from "filestack-react";

function ApplyJob() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const { slug } = useParams();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!resumeUrl) {
      setError("Please upload your resume before applying.");
      setLoading(false);
      return;
    }

    setLoading(true);

    const data = {
      email,
      name,
      resume: resumeUrl,
    };

    try {
      const response = await axiosInstance.post(`/jobs/${slug}/apply`, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.status == 200) {
        setSuccess(true);
      }
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "failed to apply");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUploadSuccess = (res) => {
    console.log("File Upload Response:", res);
    if (res.filesUploaded.length > 0) {
      const uploadedFile = res.filesUploaded[0];
      console.log("Uploaded File URL:", uploadedFile.url);
      setResumeUrl(uploadedFile.url);
      setShowPicker(false);
    } else {
      setError("File upload failed. Please try again.");
    }
  };

  return (
    <div className="w-full h-[95vh] flex items-center justify-center">
      {success ? (
        <div className="w-[50%] min-h-[50vh] rounded-md flex flex-col items-center justify-center gap-5 bg-[#030508dc] p-10">
          <h1 className=" font-semibold ">
            <i className="ri-checkbox-circle-line text-8xl"></i>
          </h1>
          <h1 className="text-3xl font-bold">
            Application submitted successfully!
          </h1>
        </div>
      ) : (
        <div className="w-[36%]  bg-[#030508] shadow-[0_0px_5px_rgba(25,27,31,0.6)] rounded-lg shadow-gray-50 flex items-center justify-center py-9 px-6 ">
          <form onSubmit={submitHandler} className="w-full">
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <div className="mb-4 w-full ">
              <label htmlFor="email">Name</label> <br />
              <input
                type="text"
                name="name"
                id="name"
                className="w-full bg-[#191B1F] shadow-[0_0px_5px_rgba(25,27,31,0.6)] outline-none shadow-gray-50 border-0 rounded-lg py-2 px-4 mt-2"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>
            <div className="mb-4 w-full ">
              <label htmlFor="email">Email</label> <br />
              <input
                type="email"
                name="email"
                id="email"
                className="w-full bg-[#191B1F] shadow-[0_0px_5px_rgba(25,27,31,0.6)] outline-none shadow-gray-50 border-0 rounded-lg py-2 px-4 mt-2"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <div className="mb-4 w-full">
              <label>Upload your resume</label> <br />
              <button
                type="button"
                className="w-full bg-[#1E1F26] text-white shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-700 rounded-lg py-3 px-5 mt-2"
                onClick={() => setShowPicker(true)}
              >
                {resumeUrl
                  ? `Uploaded: ${resumeUrl.split("/").pop()}`
                  : "Click to Upload"}
              </button>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`bg-[#1D4ED8] text-white rounded-lg w-full py-2 px-4 mt-4 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? "Applying..." : "Apply"}
            </button>
          </form>
        </div>
      )}
      {showPicker && (
        <PickerOverlay
          apikey={import.meta.env.VITE_FILESTACK_API_KEY}
          onSuccess={handleFileUploadSuccess}
          onError={(e) => setError(e.message)}
          pickerOptions={{
            accept: [".pdf", ".doc", ".docx"],
            maxFiles: 1,
          }}
        />
      )}
    </div>
  );
}

export default ApplyJob;

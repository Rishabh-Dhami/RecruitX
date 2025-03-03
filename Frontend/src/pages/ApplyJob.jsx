import React, { useEffect } from "react";
import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useParams } from "react-router-dom";
import { PickerOverlay } from "filestack-react";
import { useSelector } from "react-redux";

function ApplyJob() {
  const [error, setError] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const { slug } = useParams();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [job, setJob] = useState("")

  const userData = useSelector((state) => state.auth?.userData);


  useEffect(() => {
    async function fetchJob(){
      
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/jobs/${slug}`,{
          withCredentials : true
        })

        if(response.status === 200){
          setJob(response.data.info?.job);
        }
      } catch (error) {
        console.error(error);
        setError(error.response?.data?.message || "failed to fecth job");
      }finally{
        setLoading(false);
      }
    }

    fetchJob();
  },[slug])

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!resumeUrl) {
      setError("Please upload your resume before applying.");
      setLoading(false);
      return;
    }

    setLoading(true);

    const data = {
      email : userData?.email,
      name : userData?.fullname,
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
      setResumeUrl(uploadedFile.url);
      setShowPicker(false);
    } else {
      setError("File upload failed. Please try again.");
    }
  };

  return (
     <div className="w-full min-h-[95vh] flex items-center justify-center">
      {success ?  (
        <div className="lg-w-[50%] min-h-[50vh] rounded-md flex flex-col items-center justify-center gap-5 bg-[#030508dc] p-10">
          <h1 className=" font-semibold ">
            <i className="ri-checkbox-circle-line text-8xl"></i>
          </h1>
          <h1 className="text-3xl font-bold">
            Application submitted successfully!
          </h1>
        </div>
      ) : (
       loading  ? 
       <p className="text-4xl font-bold">Loading....</p> : 
       <div className="w-[40%]  bg-[#030508] shadow-[0_0px_5px_rgba(25,27,31,0.6)] rounded-lg shadow-gray-50 flex flex-col items-center justify-center py-9 px-6 ">
          <div className="w-full  mb-5">
            <h1 className="text-4xl text-[#54BAEC] font-bold">{job?.companyName}</h1>
            <div className="mt-2">
            <h3 className="text-lg text-gray-50 mt-2">{job?.jobTitle}</h3>
              <span className="text-sm text-gray-400">{job?.employmentType}</span>
              <p className="text-sm text-gray-300">{job?.location}</p>
            </div>
            <p className="pt-4 pb-2 font-semibold ">Description:</p>
            <i className="text-gray-400 text-sm w-full ">{job?.description}</i>
            <h4 className="mt-4 text-gray-50 font-medium">Requirements:</h4>
            <ul className="list-disc pl-5 text-gray-300 text-sm leading-[2.1rem]">
              {Array.isArray(job.requirements) ? (
                job.requirements.map((item, index) => <li key={index}>{item}</li>)
              ) : (
                <li>No specific requirements listed.</li>
              )}
            </ul>
          </div>
          {userData?.role === "candidate" ? <form onSubmit={submitHandler} className="w-full">
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
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
          </form> : null}
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

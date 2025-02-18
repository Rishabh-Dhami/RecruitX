import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

function Editjob() {

  const [jobTitle , setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {slug} = useParams()
  const [job, setJob] = useState([]);

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
        }
      } catch (error) {
        console.error(error);
        setError(error?.response?.data?.message || "Failed to fetch job details.");
      }
    }

    fetchJob();
  }, [slug]);

  const submitHandler = async(e) => {
    e.preventDefault();

    const data = {
      jobTitle,
      companyName,
      employmentType,
      location, 
      salary,
      description
    };

    

    try {
      setLoading(true);
      const response = await axiosInstance.post('/jobs/', data, {
        headers : {"Content-Type" : "application/json"},
        withCredentials : true
      });

      if(response.status == 201){
        navigate('/all-jobs');
        setJobTitle("");
        setCompanyName("");
        setDescription("");
        setEmploymentType("");
        setLocation("");
        setSalary("");
      }

    } catch (error) {
      setError(error.response?.data?.message || "Post job is faild!")
    }finally {
      setLoading(false);
    }
  }
  return (
    <div className='w-full min-h-[112vh] flex items-center justify-center'>
        <div className='w-[36%]  bg-[#030508] shadow-[0_0px_5px_rgba(25,27,31,0.6)] shadow-gray-50 flex items-center justify-center py-9 px-6 rounded-md '>
         <form onSubmit={submitHandler} className='w-full'>
         {error && <p className="text-red-500 text-center mb-4">{error}</p>}
         <div className='mb-4 w-full'>
             <label htmlFor="companyName">Company Name:</label> <br />
             <input 
             type="text" 
             name="companyName" 
             id="companyName" 
             className='w-full  py-2 px-4 mt-2 bg-[#191B1F] shadow-[0_0px_5px_rgba(25,27,31,0.6)] outline-none shadow-gray-50 border-0 rounded-lg '
             onChange={(e) => setCompanyName(e.target.value)}
             value={companyName}
             required
             />
          </div>
         <div className='mb-4 w-full'>
             <label htmlFor="jobTitle">Job Title:</label> <br />
             <input 
             type="text" 
             name="jobTitle" 
             id="jobTitle" 
             className='w-full  py-2 px-4 mt-2 bg-[#191B1F] shadow-[0_0px_5px_rgba(25,27,31,0.6)] outline-none shadow-gray-50 border-0 rounded-lg '
             onChange={(e) => setJobTitle(e.target.value)}
             value={jobTitle}
             required
             />
         </div>
         <div className='mb-4 w-full'>
             <label htmlFor="employmentType">Employment Type:</label><br />
             <select  
             name="employmentType"
             id="employmentType"
             className="w-full text-center mt-2 py-2 rounded-lg bg-[#191B1F] shadow-[0_0px_5px_rgba(25,27,31,0.6)] outline-none shadow-gray-50 border-0"
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
         <div className='mb-4 w-full'>
             <label htmlFor="location">Location:</label> <br />
             <input 
             type="text" 
             name="location" 
             id="location" 
             className='w-full  py-2 px-4 mt-2 bg-[#191B1F] shadow-[0_0px_5px_rgba(25,27,31,0.6)] outline-none shadow-gray-50 border-0 rounded-lg '
             onChange={(e) => setLocation(e.target.value)}
             value={location}
             required
             />
         </div>
         <div className='mb-4 w-full'>
             <label htmlFor="salary">Salary:</label> <br />
             <input 
             type="number" 
             name="salary" 
             min={0}
             id="salary" 
             className='w-full  py-2 px-4 mt-2 bg-[#191B1F] shadow-[0_0px_5px_rgba(25,27,31,0.6)] outline-none shadow-gray-50 border-0 rounded-lg '
             onChange={(e) => setSalary(Number(e.target.value))}
             value={salary}
             required
             />
         </div>
         <div className='mb-4 w-full'>
             <label htmlFor="location">Description:</label> <br />
             <textarea
             type="text" 
             rows={5}
             name="description" 
             id="description" 
             className='w-full  py-2 px-4 mt-2 bg-[#191B1F] shadow-[0_0px_5px_rgba(25,27,31,0.6)] outline-none shadow-gray-50 border-0 rounded-lg '
             onChange={(e) => setDescription(e.target.value)}
             value={description}
             required
             />
         </div>
           <button 
           type="submit" 
           disabled={loading} 
           className={`bg-[#1D4ED8] text-white w-full rounded-lg py-2 px-4 mt-4 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
           >
               {loading ? "Adding Job..." : "Add Job"}
           </button>
         </form>
        </div>
       </div>
  )
}

export default Editjob
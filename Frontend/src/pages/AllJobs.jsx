import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance'
import { data, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AllJobs() {
  const [error, setError] = useState("");
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const limit = 6;

  const userData = useSelector(state => state.auth?.userData);
  

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/jobs?page=${currentPage}&limit=${limit}`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        if (response.status === 200) {
          setJobs(response?.data?.info?.jobs || []);
          setTotalPages(response?.data?.info?.totalPages || 1);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("Failed to fetch jobs. Please try again.");
      }
    };

    fetchJobs();
  }, [currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const deleteJob = async(jobId) => {
    try{
    const jobDelete = await axiosInstance.delete(`/jobs/${jobId}`,
      {headers : {"Content-Type" : "application/json"}}
    )
    if(jobDelete.status == 200){
      setAlertMessage("Job deleted successfully");
      setJobs(jobs.filter(job => job._id !== jobId));
      setTimeout(() => setAlertMessage(""), 3000);
    }
  }catch(error){
    console.error("Error deleting job:", error);
    setAlertMessage("Failed to delete job");
    setTimeout(() => setAlertMessage(""), 3000);
  }
  }

  

  return ( 
    loading ? 
     <div className='w-full h-80vh'><h1 className='text-5xl font-bold'>Loading....</h1></div>
    :
    <div className='w-full h-full flex justify-center items-center flex-col p-20  gap-5'>
      {alertMessage && <div className='fixed top-0 left-0 right-0 bg-red-500 text-white text-center py-2'>{alertMessage}</div>}
      {error && <p className='text-red-500'>{error}</p>}
      {jobs.map((data, index) => (
        <div key={index} className='w-full relative  p-8  py-4 bg-[#333333] hover:bg-[#408BB1] rounded-xl'>
          <div className=' absolute top-4 right-8 flex justify-center items-center gap-3'>
            {(userData?._id == data?.owner) ? <Link to={`/edit-job/${data._id}`} className='bg-blue-700 hover:bg-blue-500 py-1 px-2 rounded-md'>Edit</Link> : null}
            {(userData?._id == data?.owner || userData?.role === "admin") ? <button 
            onClick={() => deleteJob(`${data._id}`)} 
            className='bg-red-700 hover:bg-red-500 py-1 px-2 rounded-md'>
            Delete
            </button> : null}
          </div>
        <div >
        <p className='text-red-500 font-semibold text-2xl'>{data.companyName}</p>
        <p className='text-[12px] font-extralight text-gray-300'>{data.location}</p>
        </div>
        <div className='my-2'>
          <h5>{data.jobTitle}</h5>
          <p className='text-xs text-gray-400'>{data.employmentType}</p>
        </div>
        <p className='text-gray-300 text-sm'>
          {data.description}
        </p>
        <div className='mt-2 flex justify-between items-center'>
          <h4 className='text-xl font-semibold'>${data.salary}/month</h4>
          <Link to={`/job/${data?._id}`}>
          <button className='bg-white text-black py-2 px-6 text-sm rounded-lg'>Apply Now</button>
          </Link>
        </div>
      </div>
      ))}
      <div className=' w-full mt-5'>
         <span className='text-white block w-full text-center'>Page {currentPage} of {totalPages}</span>
        <div  className='w-full flex items-center justify-center gap-3 mt-4'>
        <button onClick={handlePrevPage} disabled={currentPage === 1} className='bg-gray-600 text-white py-1 px-2 rounded disabled:opacity-50'>
        <i className="ri-arrow-left-wide-line"></i>
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className='bg-gray-600 text-white py-1 px-2 rounded disabled:opacity-50'>
        <i className="ri-arrow-right-wide-fill"></i>
        </button>
        </div>
      </div>
    </div>
  )
}

export default AllJobs
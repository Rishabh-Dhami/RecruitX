import React from 'react'
import { useSelector } from 'react-redux'
import { RecruiterDashboard } from '../Components';

function Dashboard() {

    const userData = useSelector((state) => state.auth?.userData);
  return (
    <div className="w-full h-[80vh] py-4 px-6 sm:px-8 lg:px-20">
        {userData?.role === "recruiter" ? <RecruiterDashboard/> : null}
    </div>    
  )
}

export default Dashboard
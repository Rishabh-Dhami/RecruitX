import React from "react";
import { useSelector } from "react-redux";
import { DashboardAllJobs } from "../Components";
import CandidatesList from "../Components/CandidatesList";

function Dashboard() {
  const userData = useSelector((state) => state.auth?.userData);
  return (
    <div className="w-full min-h-[80vh] py-4 px-8 sm:px-8 lg:px-20">
      <div className="py-5">
        <h1 className="text-4xl font-bold">
          {userData?.role === "recruiter"
            ? "Current Openings"
            : userData?.role === "candidate"
            ? "My Applications"
            : null}
        </h1>
        <p className="w-[15%] bg-[#429dc7] h-1.5 mt-2 rounded-lg"></p>
      </div>
      <DashboardAllJobs />
    </div>
  );
}

export default Dashboard;
import React from "react";

const jobCategories = [
  { title: "UI/UX Designer", positions: 155, icon: "ri-brush-line" },
  { title: "Software Engineer", positions: 210, icon: "ri-code-line" },
  { title: "Data Scientist", positions: 95, icon: "ri-database-2-line" },
  { title: "Marketing", positions: 180, icon: "ri-megaphone-line" },
  { title: "Project Manager", positions: 120, icon: "ri-stack-line" },
  { title: "HR Manager", positions: 75, icon: "ri-user-star-line" },
  { title: "Content Writer", positions: 160, icon: "ri-file-text-line" },
  { title: "Graphic Designer", positions: 140, icon: "ri-paint-brush-line" },
];

function PopularJob() {
  return (
    <div className="w-full  mt-5 py-4 px-6 sm:px-12 lg:px-20 text-center">
      <div>
        <div className="relative w-full">
          <h1 className="text-5xl font-bold">Popular Job Categories</h1>
          <h5 className="h-2 rounded-lg bg-[#48A1CB] w-[20%] absolute left-[40%] bottom-[-20px]"></h5>
        </div>
        <div className="w-full flex justify-center items-center">
          <h2 className="mt-10 lg:w-[60%] text-center text-sm">
            Discover the most in-demand job categories across various
            industries. Start your career in your desired field today!
          </h2>
        </div>
      </div>

      {/* Job Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-20">
        {jobCategories.map((job, index) => (
          <div
            key={index}
            className="bg-[#080c13] hover:bg-[#49a0cbc0] hover:shadow-[#49a0cbc0] shadow-[0_0px_5px_rgba(25,27,31,0.6)] py-10 rounded-lg shadow-gray-50 flex  justify-center text-start items-start gap-6"
          >
            <p className="bg-[#54baec] shadow-[#54baec] shadow-sm text-xl font-semibold py-2 px-3 rounded-md">
              <i className={job.icon}></i>
            </p>
            <div>
              <p className="text-sm pb-1">{job.title}</p>
              <p className="text-xs">{job.positions} open positions</p>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-10 bg-[#49A0CB] hover:bg-[#49a0cbda] rounded-lg py-3 px-10">
        Explore More
      </button>
    </div>
  );
}

export default PopularJob;

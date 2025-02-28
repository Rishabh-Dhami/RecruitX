import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="px-6 md:px-12 lg:px-20 md:py-8 py-14  bg-gradient-to-b from-black via-black to-black w-full min-h-[40vh] relative text-white">
      <div className=" flex  justify-between items-start flex-wrap gap-6 ">
        <div className="w-full md:w-2/5 lg:w-2/6 ">
          <div className="w-[30%] mb-4">
            <img className="w-full h-full" src="/assets/logo.png" alt="Logo" />
          </div>
          <p className="text-sm md:text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum porro
            asperiores nam recusandae quasi saepe aliquid, consectetur
            cupiditate mollitia ratione ipsam id esse libero inventore voluptas
            vitae hic quas eveniet deserunt ipsa ducimus sequi consequuntur
            molestias
          </p>
        </div>

        {[
          {
            title: "Links",
            items: ["Home", "Find a job", "Post a job", "Blog", "Contact"],
          },
          {
            title: "About",
            items: ["Partners", "Careers", "Press", "Community"],
          },
          {
            title: "Support",
            items: [
              "Customer Service",
              "Terms and Condition",
              "Security",
              "Our Team",
            ],
          },
          {
            title: "Contact",
            items: ["+91 8938070768", "recruitx12@gmail.com"],
          },
        ].map((section, index) => (
          <div key={index} className="w-full sm:w-[48%] md:w-auto">
            <h1 className="font-semibold text-[#49A0CB] text-lg md:text-xl">
              {section.title}
            </h1>
            <ul className="mt-2 leading-[1.6]">
              {section.items.map((item, idx) => (
                <li key={idx}>
                  <Link to="#" className="text-sm md:text-base">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="text-sm text-center md:text-left absolute bottom-2  left-[50%] md:left-[6%] transform md:transform-none -translate-x-1/2 md:translate-x-0">
        &copy;2025 RecruitX. All rights reserved.
      </p>
    </div>
  );
}

export default Footer;

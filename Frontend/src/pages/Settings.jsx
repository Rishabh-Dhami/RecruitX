import React, { useEffect, useRef, useState } from "react";
import { Profile, Security } from "../Components/index";
import gsap from "gsap";

function Settings() {
  const [activeTab, setActiveTab] = useState("Profile");
  const profileRef = useRef(null);
  const securityRef = useRef(null);

  useEffect(() => {
    if (activeTab === "Profile") {
      gsap.fromTo(
        profileRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
      );
    } else {
      gsap.fromTo(
        securityRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [activeTab]);

  return (
    <div className="w-full min-h-[100vh] py-4 px-6 sm:px-8 lg:px-20 ">
      <div className="relative">
        <h1 className="text-5xl font-semibold">Settings</h1>
        <p className="h-2 bg-[#4D9ECB] w-[11%] rounded-lg mt-2"></p>
      </div>
      <ul className="flex items-center justify-start gap-5 text-xl pt-8 pb-4 mb-8 border-b-2 border-gray-700 cursor-pointer">
        <li
          onClick={() => {
            setActiveTab("Profile");
          }}
          className="relative"
        >
          Profile
          {activeTab === "Profile" ? (
            <p className="h-1 w-[50%] bg-[#4D9ECB]  rounded-md absolute bottom-[-4px]"></p>
          ) : null}
        </li>
        <li
          onClick={() => {
            setActiveTab("Security");
          }}
          className="relative"
        >
          Security
          {activeTab === "Security" ? (
            <p className="h-1 w-[50%] bg-[#4D9ECB]  rounded-md absolute bottom-[-4px]"></p>
          ) : null}
        </li>
      </ul>
      {activeTab === "Profile" && (
        <div ref={profileRef} className="mt-2 w-full h-full">
          <Profile />
        </div>
      )}
      {activeTab === "Security" && (
        <div ref={securityRef} className="mt-2 w-full h-full">
          <Security />
        </div>
      )}
    </div>
  );
}

export default Settings;

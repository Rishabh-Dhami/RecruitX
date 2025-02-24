import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./Components/index.js";

function App() {
  return (
    <div className="w-full min-h-screen relative font-inter text-white bg-gradient-to-b from-black via-gray-900 to-black">
      <Header />
      <main className="w-full h-full pt-20 sm:pt-28 pb-20 text-sm sm:text-base">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;

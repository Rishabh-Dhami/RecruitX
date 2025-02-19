import React from "react";
import { PopularJob, Hero, Howitswork, FeaturedJob } from "../Components";

function Home() {
  return (
    <div className="w-full relative h-full">
      <Hero />
      <PopularJob />
      <Howitswork />
      <FeaturedJob />
    </div>
  );
}

export default Home;

import React from "react";
import HeroSection from "./HeroSection";
import HomeDeferredSections from "./HomeDeferredSections";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <HeroSection />
      <div className="section-spacer" />

      <HomeDeferredSections />
    </div>
  );
};

export default Home;

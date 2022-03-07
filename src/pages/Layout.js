import { useState, useEffect } from "react";
import ProgressLoader from "../components/progress-loader/progress-loader";
import "./Layout.scss";
import Hero from "./hero/Hero";
import TechnicalProjects from "./technical-projects/technical-projects";
import AboutMe from "./about-me/about-me";

function Layout() {
  const [isLoadingDone, setIsLoadingDone] = useState(false);
  document.body.style.overflow = "hidden";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingDone(true);
      document.body.style.overflow = "visible";
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoadingDone ? "" : <ProgressLoader />}
      <div className="layout">
        <Hero isLoadingDone={isLoadingDone} className="page"></Hero>
        <TechnicalProjects className="page"></TechnicalProjects>
        <AboutMe></AboutMe>
      </div>
    </>
  );
}

// Lite vitt målarsplätt på Christopher Flodin
export default Layout;

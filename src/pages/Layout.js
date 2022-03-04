import "./Layout.scss";
import Hero from "./hero/Hero";
import TechnicalProjects from "./technical-projects/technical-projects";
import AboutMe from "./about-me/about-me";

function Layout() {
  return (
    <div className="layout">
      <Hero className="page"></Hero>
      <TechnicalProjects className="page"></TechnicalProjects>
      <AboutMe></AboutMe>
    </div>
  );
}

// Lite vitt målarsplätt på Christopher Flodin
export default Layout;

import "./Layout.scss";
import Hero from "./hero/Hero";
import TechnicalProjects from "./technical-projects/technical-projects";

function Layout() {
  return (
    <div className="layout">
      <Hero className="page"></Hero>
      <TechnicalProjects className="page"></TechnicalProjects>
    </div>
  );
}

// Lite vitt målarsplätt på Christopher Flodin
export default Layout;

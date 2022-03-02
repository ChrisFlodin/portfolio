import "./technical-projects.scss";
import angular from "../../images/angular.png";

function TechnicalProjects() {
  const techList = [
    {
      url: angular,
      techName: "HTML",
    },
    {
      url: angular,
      techName: "CSS",
    },
    {
      url: angular,
      techName: "SCSS",
    },
    {
      url: angular,
      techName: "JavaScript",
    },
    {
      url: angular,
      techName: "Canvas",
    },
    {
      url: angular,
      techName: "GSAP",
    },
    {
      url: angular,
      techName: "D3.js",
    },
    {
      url: angular,
      techName: "Firebase",
    },
    {
      url: angular,
      techName: "Angular 10",
    },
    {
      url: angular,
      techName: "Git",
    },
    {
      url: angular,
      techName: "RXJS",
    },
    {
      url: angular,
      techName: "React",
    },
    {
      url: angular,
      techName: "Material UI",
    },
  ].map((tech) => (
    <div className="tech">
      <img src={tech.url} className="tech-image"></img>
      <div className="tech-name">{tech.techName}</div>
    </div>
  ));

  return (
    <section>
      <div className="page-container">
        <div className="upper-left">
          <h2>Technologies</h2>
          <p>
            These are the programming languages, frameworks and tools I know and love. Most of these I’ve used
            extensively, some less frequently.
          </p>
        </div>
        <div className="upper-right">{techList}</div>
        <div className="divider"></div>

        <div className="down-left">
          <h2>Projects</h2>
          <p>
            These are the programming languages, frameworks and tools I know and love. Most of these I’ve used
            extensively, some less frequently.
          </p>
        </div>
        <div className="down-right"></div>
        <div className="sub-divider"></div>
      </div>
    </section>
  );
}

export default TechnicalProjects;

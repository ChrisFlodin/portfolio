import './technical-projects.scss';
import LogoPaths from '../../utils/logo-directories';

function TechnicalProjects() {
  const techList = [
    {
      url: LogoPaths.typescript,
      techName: 'TypeScript',
    },
    {
      url: LogoPaths.react,
      techName: 'React',
    },
    {
      url: LogoPaths.angular,
      techName: 'Angular 10',
    },
    {
      url: LogoPaths.git,
      techName: 'Git',
    },
    {
      url: LogoPaths.nodejs,
      techName: 'Node.js',
    },
    {
      url: LogoPaths.express,
      techName: 'Express',
    },
    {
      url: LogoPaths.mongodb,
      techName: 'MongoDB',
    },
    {
      url: LogoPaths.js,
      techName: 'JavaScript',
    },
    {
      url: LogoPaths.css,
      techName: 'CSS',
    },
    {
      url: LogoPaths.scss,
      techName: 'SCSS',
    },
    {
      url: LogoPaths.js,
      techName: 'Canvas',
    },
    {
      url: LogoPaths.d3,
      techName: 'D3.js',
    },
    {
      url: LogoPaths.firebase,
      techName: 'Firebase',
    },
    {
      url: LogoPaths.gsap,
      techName: 'GSAP',
    },
    {
      url: LogoPaths.sql,
      techName: 'SQL',
    },
    {
      url: LogoPaths.html,
      techName: 'HTML',
    },
  ].map((tech) => {
    const regex = /\s|\./gi;
    const className = 'tech-image ' + tech.techName.replace(regex, '') + '-img';

    return (
      <div key={tech.techName} className="tech">
        <div className="image-container">
          <img alt="Christopher Flodin" className={className} src={tech.url}></img>
        </div>
        <div className="tech-name">{tech.techName}</div>
      </div>
    );
  });

  return (
    <section id="tech-projects" className="technical-projects">
      <div className="technical-proj-container">
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
            Projects I have worked on as a software engineer, generally in smaller tight-knight teams with agile
            development methods.
          </p>
        </div>

        <div className="down-right">
          <div className="project-holder holder-left">
            <div className="project">
              <div className="project-title">
                <h3>Paladium</h3>
                <span>Analytics</span>
              </div>
              <p>
                An analytics platform with all the dashboards, graphs and charts you would expect. Think mix panel for
                video games.
              </p>
            </div>

            <div className="project">
              <div className="project-title">
                <h3>Hyperion</h3>
                <span>QA</span>
              </div>
              <p>Quality Assurance management service providing ticket tracking, coordination, and monitoring.</p>
            </div>
          </div>

          <div className="project-holder holder-right">
            <div className="project">
              <div className="project-title">
                <h3>Chronos</h3>
                <span>Error Monitoring</span>
              </div>
              <p>
                Error monitoring software with data-sorting capabilities for tracking bugs in video game applications.
              </p>
            </div>
            <div className="project">
              <div className="project-title">
                <h3>Intranet</h3>
                <span>Business</span>
              </div>
              <p>
                MVP intranet solution for the Enad Global 7 group. Serving news, knowledge articles, documentation and
                more.
              </p>
            </div>
          </div>
        </div>
        <div className="sub-divider"></div>
      </div>
    </section>
  );
}

export default TechnicalProjects;

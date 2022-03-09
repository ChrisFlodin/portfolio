import './technical-projects.scss';
import LogoPaths from '../../utils/logo-directories';

function TechnicalProjects() {
  const techList = [
    {
      url: LogoPaths.js,
      techName: 'JavaScript',
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
      url: LogoPaths.html,
      techName: 'HTML',
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
      url: LogoPaths.rxjs,
      techName: 'RXJS',
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
      url: LogoPaths.git,
      techName: 'Git',
    },
    {
      url: LogoPaths.gsap,
      techName: 'GSAP',
    },
    {
      url: LogoPaths.material,
      techName: 'Material UI',
    },
    {
      url: LogoPaths.sql,
      techName: 'SQL',
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
              <p>An analytics platform with dashboards, graphs and charts. Think mix panel for video games.</p>
            </div>

            <div className="project">
              <div className="project-title">
                <h3>Hyperion</h3>
                <span>Analytics</span>
              </div>
              <p>Quality Assurance management service. Ticket tracking, coordination and monitoring.</p>
            </div>
          </div>

          <div className="project-holder holder-right">
            <div className="project">
              <div className="project-title">
                <h3>Logger</h3>
                <span>Bug Tracking</span>
              </div>
              <p>An analytics platform with dashboards, graphs and charts. Think mix panel for video games.</p>
            </div>
            <div className="project">
              <div className="project-title">
                <h3>Intranet</h3>
                <span>Business</span>
              </div>
              <p>Intranet solution for the EG7 group. Serving news, documentation and more.</p>
            </div>
          </div>
        </div>
        <div className="sub-divider"></div>
      </div>
    </section>
  );
}

export default TechnicalProjects;

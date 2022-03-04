import "./about-me.scss";

function AboutMe() {
  return (
    <section className="about-me">
      <div className="profile"></div>
      <div className="img-container">
        <img src={require("../../images/chris_profile.png")} alt="" />
      </div>
    </section>
  );
}

export default AboutMe;

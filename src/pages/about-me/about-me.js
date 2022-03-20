import './about-me.scss';

function AboutMe() {
  const Interests = () => {
    const intList = [
      'Rock Climber',
      'Web Developer',
      'Videographer',
      'Choir Singer',
      'Exercise Enthusiast',
      'D&D Nerd',
      'Enjoys Outdoors',
      'Agile Champion',
      'Photographer',
      'Coffee Lover',
      'Stockholmer',
      'Striving to Meditate Consistently',
      'Product Manager',
    ].map((interest, i, arr) => {
      return (
        <span key={interest} style={{ color: i % 2 === 0 ? '#fcd0a9' : 'white' }} className="interest-text">
          {interest} {i === arr.length - 1 ? '' : <span className="pipe">| </span>}
        </span>
      );
    });
    return <div className="interests">{intList}</div>;
  };

  return (
    <section className="about-me">
      <div className="profile-container">
        <img src={require('../../images/chris_profile_2_square.jpg')} alt="Image of Christopher Flodin" />
        <div className="text-container">
          {<Interests />}
          <div className="reach-out">
            <div className="cta">Get in touch</div>
            <div className="detail">+46 76 145 53 98</div>
            <div className="detail">christopher.flodin@gmail.com</div>
            <div className="detail">Stockholm, Sweden</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;

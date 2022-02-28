import { useRef } from "react";
import HeroCanvas from "./hero-canvas/HeroCanvas";
import "./Hero.scss";

function Hero() {
  const greetingNameRef = useRef();

  return (
    <div className="page_container">
      <HeroCanvas greetingNameRef={greetingNameRef}></HeroCanvas>
      <div className="greeting_container">
        <h2 className="greeting">Hi, I'm</h2>
        <h2 ref={greetingNameRef} className="greeting_name">
          Christopher Flodin
        </h2>
        <p className="greeting_paragraph">
          I build software for big and small companies{" "}
          <span className="second_paragraph">Formerly Head of Product at Digiexam</span>
        </p>
      </div>
    </div>
  );
}

export default Hero;

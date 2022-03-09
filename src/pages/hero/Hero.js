import { useRef, useEffect, useState } from 'react';
import HeroCanvas from './hero-canvas/HeroCanvas';
import './Hero.scss';
import { gsap } from 'gsap';

function Hero(props) {
  const greetingRef = useRef();
  const greetingNameRef = useRef();
  const greetingParagraphRef = useRef();
  const tl = useRef();
  const [paintClicked, setPaintClicked] = useState(false);
  const [cleanClicked, setCleanClicked] = useState(false);

  useEffect(() => {
    if (props.isLoadingDone) {
      tl.current = gsap.timeline();

      // prettier-ignore
      tl.current
      .from(greetingNameRef.current, {duration: 0.3, y: -10, opacity: 0})
      .from(greetingParagraphRef.current, {duration: 0.5, y: -10, opacity: 0}, '-=0.2')
      .from(greetingRef.current, { duration: 1, opacity: 0 }, '-=0.6');
    }
  }, [props.isLoadingDone]);

  const onPaint = () => {
    setPaintClicked((prev) => !prev);
  };

  const onClean = () => {
    setCleanClicked((prev) => !prev);
  };

  return (
    <div className="hero-page-container">
      <HeroCanvas
        cleanClicked={cleanClicked}
        paintClicked={paintClicked}
        greetingNameRef={greetingNameRef}
      ></HeroCanvas>
      <div className="greeting-container">
        <h2 ref={greetingRef} className="greeting">
          Hi, I'm
        </h2>
        <h2 ref={greetingNameRef} className="greeting-name">
          Christopher Flodin
        </h2>
        <p ref={greetingParagraphRef} className="greeting-paragraph">
          I build software for big and small companies{' '}
          <span className="second_paragraph">Formerly Head of Product at Digiexam</span>
        </p>
        <div className="btn-container">
          <button className="pink" onClick={onPaint}>
            Paint
          </button>
          <button className="blue" onClick={onClean}>
            Clean
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;

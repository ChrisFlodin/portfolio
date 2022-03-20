import { useRef, useEffect, useState } from 'react';
import HeroCanvas from './hero-canvas/HeroCanvas';
import './Hero.scss';
import { gsap } from 'gsap';

const animationTime = 0.4;
const animationHeadStart = 0.2;

function Hero(props) {
  const greetingRef = useRef();
  const greetingNameRef = useRef();
  const greetingParagraphRef = useRef();
  const imageRef = useRef();
  const paintBtnRef = useRef();
  const cleanBtnRef = useRef();
  const tl = useRef();
  const [paintClicked, setPaintClicked] = useState(false);
  const [cleanClicked, setCleanClicked] = useState(false);

  useEffect(() => {
    if (props.isLoadingDone) {
      tl.current = gsap.timeline();

      // prettier-ignore
      tl.current
      .addLabel("start")
        .from(greetingRef.current, { duration: animationTime, opacity: 0, y: -10 }, `=-${animationHeadStart}`)
        .from(greetingNameRef.current, { duration: animationTime, y: -10, opacity: 0 }, `=-${animationHeadStart}`)
        .from(greetingParagraphRef.current, { duration: animationTime, y: -10, opacity: 0 }, `=-${animationHeadStart}`)
        .addLabel('buttons')
        .from(paintBtnRef.current, { duration: animationTime, opacity: 0, y: -10 }, 'buttons -=0.3') 
        .from(cleanBtnRef.current, { duration: animationTime, opacity: 0, y: -10 }, 'buttons -=0.3')
        .from(imageRef.current, { duration: 1.2, opacity: 0, y: -30,  }, "start")
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
          <img ref={imageRef} src={require('../../images/chris_profile.jpg')} alt="" />
          Christopher Flodin
        </h2>
        <p ref={greetingParagraphRef} className="greeting-paragraph">
          I build software for big and small companies{' '}
          <span className="second_paragraph">Formerly Head of Product at Digiexam</span>
        </p>
        <div className="btn-container">
          <button ref={paintBtnRef} className="pink" onClick={onPaint}>
            Paint
          </button>
          <button ref={cleanBtnRef} className="blue" onClick={onClean}>
            Clean
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;

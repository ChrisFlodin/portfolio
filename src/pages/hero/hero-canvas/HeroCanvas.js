import { useEffect, useRef, useState } from 'react';
import './HeroCanvas.scss';

const particleVelocity = { x: 0.1, y: 0 },
  nrOfSpawns = 6,
  spawnFrequency = 60000,
  lowertItemRadius = 20;
let windowWidth;
let upperItemRadiusRatio;
let time = 0;
let prevTime = 0;

//#1 Chris (not expanded)
const colors = ['#FFB8B8', '#fcd0a9', '#bde0fe', '#a2d2ff'];
// const colors = ["#051100"];

function HeroCanvas({ greetingNameRef, paintClicked, cleanClicked }) {
  const [particles, setParticles] = useState([]);
  const [particleId, setParticleId] = useState(1);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeCircle, setActiveCircle] = useState();
  const canvasRef = useRef(null);
  // We can use contextRef's property contextRef.current to store state outside of a component.
  const contextRef = useRef();

  // We can use non-state variables, but remember that updating these will not trigger a re-render! Which is positive in this case.
  let animationFrameId;

  useEffect(() => {
    setParticles([]);
  }, [cleanClicked]);

  useEffect(() => {
    spawnParticle(particleId, window.innerWidth * Math.random());
    spawnParticle(particleId, window.innerWidth * Math.random());
    spawnParticle(particleId, window.innerWidth * Math.random());
  }, [paintClicked]);

  useEffect(() => {
    init();
    setTimeout(() => {}, 4000);
  }, []);

  useEffect(() => {
    const animate = (timestamp) => {
      contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      particles.forEach((particle) => {
        particle.update();
      });

      if (time - prevTime >= spawnFrequency) {
        prevTime = time;
        spawnParticle();
      }

      time = timestamp;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // For UseEffect, we can clean things up on unmount by using the return statement.
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [particles]);

  const spawnParticle = (
    id = particleId,
    x = -300,
    y,
    itemRadius,
    color = colors[Math.floor(colors.length * Math.random())]
  ) => {
    let currentParticles = [];

    itemRadius = itemRadius ? itemRadius : upperItemRadiusRatio * Math.random() + lowertItemRadius;
    y = y ? y : (window.innerHeight - itemRadius) * Math.random() + itemRadius;

    const newParticle = new Particle(id, x, y, particleVelocity, itemRadius, contextRef.current, color);

    setParticleId((prevParticleId) => prevParticleId + 1);
    setParticles((prev) => {
      const cleanedUpParticles = prev.filter((particle) => {
        return particle.x < window.innerWidth + 500;
      });
      currentParticles = [...cleanedUpParticles, newParticle];
      return currentParticles;
    });

    return currentParticles;
  };

  const init = () => {
    setParticles([]);
    windowWidth = document.documentElement.clientWidth;
    upperItemRadiusRatio = windowWidth / 14;
    const canvas = canvasRef.current;
    canvas.width = windowWidth;
    canvas.height = window.innerHeight;

    const context = canvas.getContext('2d');

    const h2 = greetingNameRef.current;
    const offSetTop = h2.offsetTop;
    contextRef.current = context;

    //Initial Spawn
    let count = 1;
    for (let i = -(windowWidth / nrOfSpawns) * 1.3; i < windowWidth; i += windowWidth / nrOfSpawns) {
      switch (count) {
        case 1:
          spawnParticle(count, i);
          break;
        case 2:
          spawnParticle(count, i, null, upperItemRadiusRatio * 0.5);
          break;
        case 3:
          spawnParticle(count, i + 50, offSetTop * 1.1, upperItemRadiusRatio * 1.5, colors[0]);
          break;
        case 4:
          spawnParticle(count, i, offSetTop * 1.65, upperItemRadiusRatio * 0.5, colors[2]);
          break;
        case 5:
          spawnParticle(count, i, null, null, colors[1]);
          break;
        default:
          spawnParticle(count, i);
          break;
      }
      count++;
    }
  };

  const onMouseMove = (event) => {
    setMousePosition({ x: event.pageX, y: event.pageY });
    particleInteraction();
  };

  const particleInteraction = () => {
    particles.forEach((particle) => {
      const isWithinXValues =
        mousePosition.x >= particle.x - particle.radius && mousePosition.x <= particle.x + particle.radius;
      const isWithinYValues =
        mousePosition.y >= particle.y - particle.radius && mousePosition.y <= particle.y + particle.radius;

      if (isWithinXValues && isWithinYValues) {
        setActiveCircle(particle);
      } else {
        setActiveCircle(null);
      }
    });
  };

  class Particle {
    constructor(id, x, y, velocity, radius, context, color) {
      this.id = id;
      this.x = x;
      this.y = y;
      this.velocity = velocity;
      this.radius = radius;
      this.context = context;
      this.color = color;
    }

    draw() {
      this.context.beginPath();
      this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      this.context.fillStyle = this.color;
      this.context.fill();
      this.context.closePath();
    }

    update() {
      this.x += this.velocity.x;
      this.y += this.velocity.y;
      this.draw();
    }
  }

  return (
    <>
      <canvas onMouseMove={onMouseMove} ref={canvasRef}></canvas>
    </>
  );
}

export default HeroCanvas;

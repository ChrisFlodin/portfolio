import { getSelectionRange } from "@testing-library/user-event/dist/utils";
import { useEffect, useRef, useState } from "react";
import "./HeroCanvas.scss";

const particleVelocity = { x: 0.1, y: 0 };
const resolution = window.innerWidth;
const nrOfSpawns = 6;
const spawnFrequency = 60000;
let time = 0;
let prevTime = 0;
const upperItemRadiusRatio = resolution / 14;
const lowertItemRadius = 20;

//#1 Chris (not expanded)
const colors = ["#FFB8B8", "#fcd0a9", "#bde0fe", "#a2d2ff"];
// const colors = ["#051100"];

class Particle {
  constructor(x, y, velocity, radius, context, id, color) {
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

function HeroCanvas(props) {
  const [particles, setParticles] = useState([]);
  const [particleId, setParticleId] = useState(0);
  const canvasRef = useRef(null);
  // We can use contextRef's property contextRef.current to store state outside of a component.
  const contextRef = useRef();

  // We can use non-state variables, but remember that updating these will not trigger a re-render! Which is positive in this case.
  let animationFrameId;

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const context = canvas.getContext("2d");

    const h2 = props.greetingNameRef.current;
    const height = h2.clientHeight;
    const offSetLeft = h2.offsetLeft;
    const offSetTop = h2.offsetTop;

    // Initial Spawn
    contextRef.current = context;
    let count = 0;
    for (let i = -(resolution / nrOfSpawns) * 1.3; i < resolution; i += resolution / nrOfSpawns) {
      switch (count) {
        case 1:
          spawnParticles(1, i, null, upperItemRadiusRatio * 0.5);
          break;
        case 2:
          spawnParticles(1, i + 50, offSetTop * 1.1, upperItemRadiusRatio * 1.5, colors[0]);
          break;
        case 3:
          spawnParticles(1, i, offSetTop * 1.65, upperItemRadiusRatio * 0.5, colors[2]);
          break;
        case 4:
          spawnParticles(1, i, null, null, colors[1]);
          break;
        default:
          spawnParticles(1, i);
          break;
      }
      count++;
    }
  }, []);

  useEffect(() => {
    const animate = (timestamp) => {
      contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      particles.forEach((particle) => {
        particle.update();
      });

      if (time - prevTime >= spawnFrequency) {
        prevTime = time;
        spawnParticles(1);
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

  const spawnParticles = (
    nrOfParticles,
    x = -300,
    y,
    itemRadius,
    color = colors[Math.floor(colors.length * Math.random())]
  ) => {
    let latestParticleId = particleId,
      activeParticles = [],
      newParticles = [];

    for (let i = 0; i < nrOfParticles; i++) {
      latestParticleId++;
      itemRadius = itemRadius ? itemRadius : upperItemRadiusRatio * Math.random() + lowertItemRadius;
      y = y ? y : (window.innerHeight - itemRadius) * Math.random() + itemRadius;

      const newParticle = new Particle(x, y, particleVelocity, itemRadius, contextRef.current, latestParticleId, color);
      newParticles.push(newParticle);
    }

    setParticleId(latestParticleId);

    setParticles((prev) => {
      const cleanedUpParticles = prev.filter((particle) => {
        return particle.x < window.innerWidth + 500;
      });

      activeParticles = [...cleanedUpParticles, ...newParticles];

      // Force pink particle to be present
      let pinkParticleIsPresent = activeParticles.some((particle) => particle.color === "#FFB8B8");
      if (!pinkParticleIsPresent) {
        activeParticles[activeParticles.length - 1].color = "#FFB8B8";
      }

      return activeParticles;
    });

    return activeParticles;
  };

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default HeroCanvas;

const getRange = (value, lowerLimit, upperLimit) => {
  return (upperLimit - lowerLimit) * Math.random();
};

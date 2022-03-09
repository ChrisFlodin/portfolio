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

const colors = ['#FFB8B8', '#fcd0a9', '#bde0fe', '#a2d2ff'];

function HeroCanvas({ greetingNameRef, paintClicked, cleanClicked }) {
  const [particles, setParticles] = useState([]);
  const particleId = useRef(0);
  const canvasRef = useRef(null);
  const contextRef = useRef();
  const spawnParticle = useRef(null);
  const init = useRef(null);
  const animationFrameId = useRef();

  useEffect(() => {
    setParticles([]);
  }, [cleanClicked]);

  useEffect(() => {
    spawnParticle.current(particleId, window.innerWidth * Math.random());
    spawnParticle.current(particleId, window.innerWidth * Math.random());
    spawnParticle.current(particleId, window.innerWidth * Math.random());
  }, [paintClicked]);

  useEffect(() => {
    init.current();
  }, []);

  useEffect(() => {
    const animate = (timestamp) => {
      contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      particles.forEach((particle) => {
        particle.update();
      });

      if (time - prevTime >= spawnFrequency) {
        prevTime = time;
        spawnParticle.current();
      }

      time = timestamp;
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [particles]);

  spawnParticle.current = (
    id = particleId.current,
    x = -300,
    y,
    itemRadius,
    color = colors[Math.floor(colors.length * Math.random())]
  ) => {
    let currentParticles = [];

    itemRadius = itemRadius ? itemRadius : upperItemRadiusRatio * Math.random() + lowertItemRadius;
    y = y ? y : (window.innerHeight - itemRadius) * Math.random() + itemRadius;

    const newParticle = new Particle(id, x, y, particleVelocity, itemRadius, contextRef.current, color);

    particleId.current = +1;
    setParticles((prev) => {
      const cleanedUpParticles = prev.filter((particle) => {
        return particle.x < window.innerWidth + 500;
      });
      currentParticles = [...cleanedUpParticles, newParticle];
      return currentParticles;
    });

    return currentParticles;
  };

  init.current = () => {
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
          spawnParticle.current(count, i);
          break;
        case 2:
          spawnParticle.current(count, i, null, upperItemRadiusRatio * 0.5);
          break;
        case 3:
          spawnParticle.current(count, i + 50, offSetTop * 1.1, upperItemRadiusRatio * 1.5, colors[0]);
          break;
        case 4:
          spawnParticle.current(count, i, offSetTop * 1.65, upperItemRadiusRatio * 0.5, colors[2]);
          break;
        case 5:
          spawnParticle.current(count, i, null, null, colors[1]);
          break;
        default:
          spawnParticle.current(count, i);
          break;
      }
      count++;
    }
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
      <canvas ref={canvasRef}></canvas>
    </>
  );
}

export default HeroCanvas;

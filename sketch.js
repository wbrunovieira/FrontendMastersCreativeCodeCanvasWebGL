const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [2048, 2048],
};

const sketch = ({ update }) => {
  const count = 40;

  const createGrid = () => {
    const points = [];
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = x / (count - 1);
        const v = y / (count - 1);
        points.push([u, v]);
      }
    }
    return points;
  };
  random.setSeed(512);
  const points = createGrid().filter(() => random.value() > 0.5);
  const margin = 400;

  return ({ context, width, height, params }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    points.forEach(([u, v]) => {
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.beginPath();
      context.arc(x, y, 10, 0, Math.PI * 2);
      context.strokeStyle = 'black';
      context.lineWidth = 5;
      context.stroke();
    });
  };
};

canvasSketch(sketch, settings);

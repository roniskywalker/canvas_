window.addEventListener("load", () => {
  resize();
  window.addEventListener("resize", resize);
  window.addEventListener("mousedown", startPainting);
  window.addEventListener("mouseup", stopPainting);
  window.addEventListener("mousemove", sketch);
});

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const resize = () => {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
};

let coord = {
  x: 0,
  y: 0,
};
let paint = false;

const getPosition = (e) => {
  coord.x = e.clientX - canvas.offsetLeft;
  coord.y = e.clientY - canvas.offsetTop;
};

const startPainting = (e) => {
  paint = true;
  getPosition(e);
};

const stopPainting = () => {
  paint = false;
};

let lineWidth = 5;
let colour = "black";

const sketch = (e) => {
  if (paint) {
    ctx.beginPath();

    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.strokeStyle = colour;

    ctx.moveTo(coord.x, coord.y);
    getPosition(e);
    ctx.lineTo(coord.x, coord.y);

    ctx.stroke();
  }
};

const colours = document.querySelectorAll(".colours .colour");
colours.forEach((singleColour) => {
  singleColour.addEventListener("click", () => {
    colour = singleColour.getAttribute("colour");
  });
});

let SaveImg = document.querySelector(".SaveImg");

const tools = document.querySelectorAll(".tools .tool");
tools.forEach((tool) => {
  tool.addEventListener("click", () => {
    console.log(true);
    switch (tool.getAttribute("tool")) {
      case "pencil":
        lineWidth = 5;
        colour = "black";
        break;
      case "clear":
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        lineWidth = 5;
        colour = "black";
        break;
      case "eraser":
        lineWidth = 20;
        colour = "white";
        break;
        case "save":
            const link = document.createElement("a");
            link.download = `${Date.now()}.jpg`;
            link.href = canvas.toDataURL();
            link.click();
            break;
      default:
        lineWidth = 5;
        colour = "black";
    }
  });
});


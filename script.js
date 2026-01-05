const grid = document.getElementById("grid");
const colorPicker = document.getElementById("colorPicker");
const paintBtn = document.getElementById("paintBtn");
const eraseBtn = document.getElementById("eraseBtn");
const eraserSize = document.getElementById("eraserSize");
const gridSizeSelect = document.getElementById("gridSize");

let painting = false;
let mode = "paint";

function createGrid(size) {
  grid.innerHTML = "";
  grid.style.gridTemplateColumns = `repeat(${size}, 20px)`;

  for (let i = 0; i < size * size; i++) {
    const pixel = document.createElement("div");
    pixel.className = "pixel";

    pixel.addEventListener("mousedown", () => paintPixel(pixel));
    pixel.addEventListener("mouseover", () => {
      if (painting) paintPixel(pixel);
    });

    grid.appendChild(pixel);
  }
}

function paintPixel(pixel) {
  if (mode === "paint") {
    pixel.style.backgroundColor = colorPicker.value;
  } else {
    pixel.style.backgroundColor = "white";
  }
}

document.addEventListener("mousedown", () => painting = true);
document.addEventListener("mouseup", () => painting = false);

paintBtn.onclick = () => {
  mode = "paint";
  paintBtn.classList.add("active");
  eraseBtn.classList.remove("active");
};

eraseBtn.onclick = () => {
  mode = "erase";
  eraseBtn.classList.add("active");
  paintBtn.classList.remove("active");
};

document.getElementById("resizeBtn").onclick = () => {
  createGrid(Number(gridSizeSelect.value));
};

document.getElementById("clearBtn").onclick = () => {
  document.querySelectorAll(".pixel").forEach(p => {
    p.style.backgroundColor = "white";
  });
};

document.getElementById("saveBtn").onclick = () => {
  const pixels = document.querySelectorAll(".pixel");
  const size = Math.sqrt(pixels.length);
  const pixelSize = 20;

  const canvas = document.createElement("canvas");
  canvas.width = size * pixelSize;
  canvas.height = size * pixelSize;
  const ctx = canvas.getContext("2d");

  pixels.forEach((p, i) => {
    const x = (i % size) * pixelSize;
    const y = Math.floor(i / size) * pixelSize;
    ctx.fillStyle = p.style.backgroundColor || "#fff";
    ctx.fillRect(x, y, pixelSize, pixelSize);
  });

  const link = document.createElement("a");
  link.download = "pixel-art.png";
  link.href = canvas.toDataURL();
  link.click();
};

createGrid(16);

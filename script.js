const grid = document.getElementById("grid");
const colorPicker = document.getElementById("colorPicker");
const paintBtn = document.getElementById("paintBtn");
const eraseBtn = document.getElementById("eraseBtn");
const clearBtn = document.getElementById("clearBtn");
const saveBtn = document.getElementById("saveBtn");
const exportCanvas = document.getElementById("exportCanvas");

const GRID_SIZE = 16;     // 16x16 grid for kids
const PIXEL_SIZE = 20;    // 20px per pixel

let mode = "paint";       // painting or erasing

// Buttons to switch mode
paintBtn.onclick = () => mode = "paint";
eraseBtn.onclick = () => mode = "erase";

// Create the pixel grid
grid.style.display = "grid";
grid.style.gridTemplateColumns = `repeat(${GRID_SIZE}, ${PIXEL_SIZE}px)`;

for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
  const pixel = document.createElement("div");
  pixel.className = "pixel";
  pixel.style.width = PIXEL_SIZE + "px";
  pixel.style.height = PIXEL_SIZE + "px";
  pixel.style.background = "white";

  // Click to paint or erase
  pixel.addEventListener("click", () => {
    if (mode === "paint") {
      pixel.style.background = colorPicker.value;
    } else {
      pixel.style.background = "white";
    }
  });

  grid.appendChild(pixel);
}

// Clear the canvas
clearBtn.onclick = () => {
  document.querySelectorAll(".pixel").forEach(p => {
    p.style.background = "white";
  });
};

// SAVE PNG WITH WATERMARK
saveBtn.onclick = () => {
  const pixels = document.querySelectorAll(".pixel");

  exportCanvas.width = GRID_SIZE * PIXEL_SIZE;
  exportCanvas.height = GRID_SIZE * PIXEL_SIZE;

  const ctx = exportCanvas.getContext("2d");

  // Draw pixels
  pixels.forEach((pixel, i) => {
    const x = (i % GRID_SIZE) * PIXEL_SIZE;
    const y = Math.floor(i / GRID_SIZE) * PIXEL_SIZE;
    ctx.fillStyle = pixel.style.background || "white";
    ctx.fillRect(x, y, PIXEL_SIZE, PIXEL_SIZE);
  });

  // ADD WATERMARK for kids site
  const watermarkText = "Made from Pixel Art";
  ctx.font = "20px 'Brush Script MT', cursive"; // fancy script
  ctx.fillStyle = "rgba(0,0,0,0.4)"; // semi-transparent
  ctx.textAlign = "right";
  ctx.textBaseline = "bottom";
  ctx.fillText(watermarkText, exportCanvas.width - 5, exportCanvas.height - 5);

  // Download PNG
  const link = document.createElement("a");
  link.download = "pixel-art.png";
  link.href = exportCanvas.toDataURL("image/png");
  link.click();
};


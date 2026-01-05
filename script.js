const grid = document.getElementById("grid");
const colorPicker = document.getElementById("colorPicker");
const paintBtn = document.getElementById("paintBtn");
const eraseBtn = document.getElementById("eraseBtn");
const clearBtn = document.getElementById("clearBtn");
const saveBtn = document.getElementById("saveBtn");
const exportCanvas = document.getElementById("exportCanvas");

const GRID_SIZE = 16;
const PIXEL_SIZE = 20;

let mode = "paint";

// Mode buttons
paintBtn.onclick = () => mode = "paint";
eraseBtn.onclick = () => mode = "erase";

// Build pixel grid
grid.style.display = "grid";
grid.style.gridTemplateColumns = `repeat(${GRID_SIZE}, ${PIXEL_SIZE}px)`;

for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
  const pixel = document.createElement("div");
  pixel.className = "pixel";
  pixel.style.width = PIXEL_SIZE + "px";
  pixel.style.height = PIXEL_SIZE + "px";
  pixel.style.background = "white";

  pixel.addEventListener("click", () => {
    if (mode === "paint") {
      pixel.style.background = colorPicker.value;
    } else {
      pixel.style.background = "white";
    }
  });

  grid.appendChild(pixel);
}

// Clear canvas
clearBtn.onclick = () => {
  document.querySelectorAll(".pixel").forEach(p => {
    p.style.background = "white";
  });
};

// SAVE AS PNG TO FILES / DOWNLOADS
saveBtn.onclick = () => {
  const pixels = document.querySelectorAll(".pixel");

  exportCanvas.width = GRID_SIZE * PIXEL_SIZE;
  exportCanvas.height = GRID_SIZE * PIXEL_SIZE;

  const ctx = exportCanvas.getContext("2d");

  pixels.forEach((pixel, i) => {
    const x = (i % GRID_SIZE) * PIXEL_SIZE;
    const y = Math.floor(i / GRID_SIZE) * PIXEL_SIZE;
    ctx.fillStyle = pixel.style.background || "white";
    ctx.fillRect(x, y, PIXEL_SIZE, PIXEL_SIZE);
  });

  const link = document.createElement("a");
  link.download = "pixel-art.png";
  link.href = exportCanvas.toDataURL("image/png");
  link.click();
};

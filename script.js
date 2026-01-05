const grid = document.getElementById("grid");
const colorPicker = document.getElementById("colorPicker");
const paintBtn = document.getElementById("paintBtn");
const eraseBtn = document.getElementById("eraseBtn");
const clearBtn = document.getElementById("clearBtn");
const saveBtn = document.getElementById("saveBtn");

let mode = "paint";

paintBtn.onclick = () => mode = "paint";
eraseBtn.onclick = () => mode = "erase";

for (let i = 0; i < 256; i++) {
  const pixel = document.createElement("div");
  pixel.className = "pixel";

  pixel.addEventListener("click", () => {
    if (mode === "paint") {
      pixel.style.background = colorPicker.value;
    } else {
      pixel.style.background = "white";
    }
  });

  grid.appendChild(pixel);
}

clearBtn.onclick = () => {
  document.querySelectorAll(".pixel").forEach(p => {
    p.style.background = "white";
  });
};

saveBtn.onclick = () => {
  const data = [];
  document.querySelectorAll(".pixel").forEach(p => {
    data.push(p.style.background);
  });
  localStorage.setItem("pixelArt", JSON.stringify(data));
  alert("Saved 💾");
};

// Load saved art
const saved = JSON.parse(localStorage.getItem("pixelArt"));
if (saved) {
  document.querySelectorAll(".pixel").forEach((p, i) => {
    p.style.background = saved[i];
  });
}

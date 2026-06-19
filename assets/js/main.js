const palettes = [
  {
    name: "Ocean Mist",
    description: "冷静、克制，适合仪表盘和信息密度较高的界面。",
    tag: "Dashboard",
    colors: ["#0F172A", "#1E293B", "#334155", "#38BDF8", "#7DD3FC"],
  },
  {
    name: "Sunlit Paper",
    description: "温暖但不喧闹，适合品牌页和内容展示场景。",
    tag: "Editorial",
    colors: ["#FFF7ED", "#FDBA74", "#FB7185", "#F59E0B", "#7C2D12"],
  },
  {
    name: "Forest Signal",
    description: "自然系高对比配色，适合强调状态和增长。",
    tag: "Growth",
    colors: ["#052E16", "#166534", "#22C55E", "#86EFAC", "#D1FAE5"],
  },
  {
    name: "Midnight Neon",
    description: "偏科技感的高饱和组合，适合活动页和深色产品界面。",
    tag: "Launch",
    colors: ["#020617", "#312E81", "#7C3AED", "#22D3EE", "#FDE047"],
  },
];

const paletteGrid = document.getElementById("paletteGrid");
const previewSwatches = document.getElementById("previewSwatches");
const previewName = document.getElementById("previewName");
const previewDescription = document.getElementById("previewDescription");
const previewHex = document.getElementById("previewHex");
const copyPreviewButton = document.getElementById("copyPreviewButton");
const toast = document.getElementById("toast");

let activePalette = palettes[0];
let activeHex = palettes[0].colors[0];
let toastTimer = null;

function normalizeHex(hex) {
  return hex.toUpperCase();
}

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const value = clean.length === 3
    ? clean.split("").map((part) => part + part).join("")
    : clean;
  const number = Number.parseInt(value, 16);
  const red = (number >> 16) & 255;
  const green = (number >> 8) & 255;
  const blue = number & 255;
  return `rgb(${red}, ${green}, ${blue})`;
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const fallback = document.createElement("textarea");
    fallback.value = text;
    fallback.style.position = "fixed";
    fallback.style.opacity = "0";
    document.body.appendChild(fallback);
    fallback.focus();
    fallback.select();
    const copied = document.execCommand("copy");
    fallback.remove();
    return copied;
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 1700);
}

function setActivePalette(palette, hex) {
  activePalette = palette;
  activeHex = hex;
  previewName.textContent = palette.name;
  previewDescription.textContent = palette.description;
  previewHex.textContent = normalizeHex(hex);
  previewSwatches.innerHTML = palette.colors
    .map(
      (color) => `
        <button
          class="preview-swatch"
          type="button"
          data-hex="${normalizeHex(color)}"
          aria-label="复制 ${normalizeHex(color)}"
          style="background:${color}"
        ></button>
      `,
    )
    .join("");
  previewSwatches.querySelectorAll(".preview-swatch").forEach((button) => {
    button.addEventListener("click", async () => {
      const hexCode = button.dataset.hex;
      const ok = await copyText(hexCode);
      if (ok) {
        showToast(`已复制 ${hexCode}`);
        setActivePalette(palette, hexCode);
      } else {
        showToast("复制失败，请手动选择");
      }
    });
  });
  copyPreviewButton.textContent = `复制 ${normalizeHex(hex)}`;
  copyPreviewButton.style.background = `linear-gradient(135deg, ${palette.colors[3]}, ${palette.colors[4]})`;
  copyPreviewButton.onclick = async () => {
    const ok = await copyText(normalizeHex(hex));
    showToast(ok ? `已复制 ${normalizeHex(hex)}` : "复制失败，请手动选择");
  };
}

function renderPaletteCards() {
  paletteGrid.innerHTML = palettes
    .map(
      (palette) => `
      <article class="palette-card">
        <div class="palette-header">
          <div>
            <p class="section-kicker">${palette.tag}</p>
            <h3>${palette.name}</h3>
            <p>${palette.description}</p>
          </div>
          <span class="palette-tag">${palette.colors.length} 色</span>
        </div>
        <div class="palette-swatches">
          ${palette.colors
            .map(
              (color) => `
                <button
                  class="palette-swatch"
                  type="button"
                  data-hex="${normalizeHex(color)}"
                  style="background:${color}"
                  aria-label="复制 ${normalizeHex(color)}"
                ></button>
              `,
            )
            .join("")}
        </div>
        <div class="palette-footer">
          <div class="palette-values">
            <strong>${palette.colors.join(" • ")}</strong>
            <span>${hexToRgb(palette.colors[0])} 起始色</span>
          </div>
          <button class="palette-cta" type="button" data-palette="${palette.name}">
            查看此组
          </button>
        </div>
      </article>
    `,
    )
    .join("");

  paletteGrid.querySelectorAll(".palette-swatch").forEach((button) => {
    button.addEventListener("click", async () => {
      const hexCode = button.dataset.hex;
      const ok = await copyText(hexCode);
      showToast(ok ? `已复制 ${hexCode}` : "复制失败，请手动选择");
    });
  });

  paletteGrid.querySelectorAll(".palette-cta").forEach((button) => {
    button.addEventListener("click", () => {
      const palette = palettes.find((item) => item.name === button.dataset.palette);
      if (!palette) return;
      setActivePalette(palette, palette.colors[0]);
      showToast(`已切换到 ${palette.name}`);
    });
  });
}

renderPaletteCards();
setActivePalette(activePalette, activeHex);

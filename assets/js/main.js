const libraryDefinitions = [
  {
    key: "palettes",
    label: "配色",
    selector: "[data-library-grid='palettes']",
    file: "data/palettes.json",
    thumbnailLabel: "Palette",
    scenarios: "PPT / 日报 / 驾驶舱 / 视觉系统",
    pageStructure: "色块组合 / 强调层级 / 氛围分层",
    chartStyle: "色彩对比 / 指标强调 / 信息层级",
    iconStyle: "简洁线性 / 高识别 / 圆角化",
    illustrationStyle: "扁平 / 色彩统一 / 氛围感",
    pptPattern: "封面色带 / 章节页 / 主题块拼接",
    rules: "先定主色，再补强调色和中性色。",
  },
  {
    key: "charts",
    label: "图表",
    selector: "[data-library-grid='charts']",
    file: "data/charts.json",
    thumbnailLabel: "Chart",
    scenarios: "日报 / 经营看板 / 决策汇报",
    pageStructure: "标题区 / 指标区 / 主图表 / 辅助说明",
    chartStyle: "高对比 / 信息密度高 / 直读型",
    iconStyle: "数据符号化 / 轻量辅助 / 语义清晰",
    illustrationStyle: "弱装饰 / 功能优先 / 轻视觉点缀",
    pptPattern: "数据块并列 / 趋势图组合 / 结论前置",
    rules: "让图表先讲结论，再补过程。",
  },
  {
    key: "pages",
    label: "页面",
    selector: "[data-library-grid='pages']",
    file: "data/pages.json",
    thumbnailLabel: "Page",
    scenarios: "首页 / 落地页 / 长图叙事页",
    pageStructure: "首屏标题 / 模块分区 / 节奏递进",
    chartStyle: "混合图表 / 内容辅助 / 视觉锚点",
    iconStyle: "导航型 / 分组型 / 状态提示型",
    illustrationStyle: "叙事型 / 背景增强 / 情绪氛围",
    pptPattern: "封面-目录-内容-总结",
    rules: "先保证层级，再保证节奏。",
  },
  {
    key: "templates",
    label: "模板",
    selector: "[data-library-grid='templates']",
    file: "data/templates.json",
    thumbnailLabel: "Template",
    scenarios: "PPT / 报告 / 章节页 / 方案页",
    pageStructure: "封面 / 章节转场 / 对照页 / 说明页",
    chartStyle: "模板化 / 组件化 / 易替换",
    iconStyle: "概念性 / 模块化 / 标识明确",
    illustrationStyle: "拼接式 / 版式优先 / 主题统一",
    pptPattern: "封面大标题 / 分章 / 双栏说明",
    rules: "版式先统一，再追求风格扩散。",
  },
];

const storageKey = "xiabao.inspiration.drafts.v1";
const seedState = {};
const localDraftState = loadDraftState();
let currentDraft = null;

const dom = {
  assetTotal: document.getElementById("assetTotal"),
  draftTotal: document.getElementById("draftTotal"),
  importState: document.getElementById("importState"),
  assetImageInput: document.getElementById("assetImageInput"),
  assetLibrarySelect: document.getElementById("assetLibrarySelect"),
  assetTitleInput: document.getElementById("assetTitleInput"),
  assetSourceInput: document.getElementById("assetSourceInput"),
  assetTypeInput: document.getElementById("assetTypeInput"),
  assetTagsInput: document.getElementById("assetTagsInput"),
  importThumb: document.getElementById("importThumb"),
  draftTitle: document.getElementById("draftTitle"),
  draftSummary: document.getElementById("draftSummary"),
  draftMainColor: document.getElementById("draftMainColor"),
  draftScenarios: document.getElementById("draftScenarios"),
  draftPageStructure: document.getElementById("draftPageStructure"),
  draftChartStyle: document.getElementById("draftChartStyle"),
  draftIconStyle: document.getElementById("draftIconStyle"),
  draftIllustrationStyle: document.getElementById("draftIllustrationStyle"),
  draftPptPattern: document.getElementById("draftPptPattern"),
  draftRules: document.getElementById("draftRules"),
  saveDraftButton: document.getElementById("saveDraftButton"),
  exportDraftButton: document.getElementById("exportDraftButton"),
};

function loadDraftState() {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function saveDraftState(nextState) {
  localStorage.setItem(storageKey, JSON.stringify(nextState));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function ensureArray(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === "string" && value.trim()) return value.split(/[，,、|]/).map((item) => item.trim()).filter(Boolean);
  return [];
}

function parseTags(value) {
  return ensureArray(value).slice(0, 8);
}

function normalizeHex(hex) {
  return String(hex || "").toUpperCase();
}

function hexToRgb(hex) {
  const clean = normalizeHex(hex).replace("#", "");
  if (clean.length !== 6) return "";
  const number = Number.parseInt(clean, 16);
  const red = (number >> 16) & 255;
  const green = (number >> 8) & 255;
  const blue = number & 255;
  return `rgb(${red}, ${green}, ${blue})`;
}

function rgbToHsl(red, green, blue) {
  const r = red / 255;
  const g = green / 255;
  const b = blue / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  const d = max - min;

  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case r:
        h = 60 * (((g - b) / d) % 6);
        break;
      case g:
        h = 60 * ((b - r) / d + 2);
        break;
      default:
        h = 60 * ((r - g) / d + 4);
        break;
    }
  }

  return { h: (h + 360) % 360, s, l };
}

function guessMood(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return ["通用", "克制"];
  const [red, green, blue] = rgb.match(/\d+/g).map(Number);
  const { h, s, l } = rgbToHsl(red, green, blue);
  const tags = [];
  if (l < 0.35) tags.push("深色");
  if (l > 0.7) tags.push("浅色");
  if (s > 0.55) tags.push("高饱和");
  if (s < 0.25) tags.push("低饱和");
  if (h >= 170 && h <= 240) tags.push("科技感");
  if (h >= 80 && h <= 160) tags.push("自然感");
  if (h >= 330 || h <= 25) tags.push("强调感");
  return tags.length ? tags.slice(0, 3) : ["通用", "克制"];
}

function createId(prefix = "draft") {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function buildDefaultFields(libraryDef) {
  return {
    source: "示例资产",
    type: libraryDef.label,
    styleTags: [libraryDef.label],
    scenarios: libraryDef.scenarios,
    pageStructure: libraryDef.pageStructure,
    chartStyle: libraryDef.chartStyle,
    iconStyle: libraryDef.iconStyle,
    illustrationStyle: libraryDef.illustrationStyle,
    pptPattern: libraryDef.pptPattern,
    rules: libraryDef.rules,
  };
}

function normalizeAsset(item, libraryDef, origin = "seed") {
  const base = buildDefaultFields(libraryDef);
  const thumbnailColors = item.thumbnail?.colors?.length >= 2
    ? item.thumbnail.colors.slice(0, 2)
    : [item.mainColor || "#0F172A", "#38BDF8"];
  const mainColor = normalizeHex(item.mainColor || thumbnailColors[0] || "#0F172A");
  return {
    id: item.id || `${origin}-${libraryDef.key}-${item.title}`,
    title: item.title || "未命名灵感",
    source: item.source || base.source,
    type: item.type || base.type,
    styleTags: ensureArray(item.styleTags || item.tags || base.styleTags),
    mainColor,
    scenarios: item.scenarios || base.scenarios,
    pageStructure: item.pageStructure || base.pageStructure,
    chartStyle: item.chartStyle || base.chartStyle,
    iconStyle: item.iconStyle || base.iconStyle,
    illustrationStyle: item.illustrationStyle || base.illustrationStyle,
    pptPattern: item.pptPattern || base.pptPattern,
    rules: item.rules || item.note || base.rules,
    highlight: item.highlight || "",
    note: item.note || "",
    thumbnail: {
      label: item.thumbnail?.label || libraryDef.thumbnailLabel,
      colors: thumbnailColors.map((color) => normalizeHex(color)),
      imageDataUrl: item.thumbnail?.imageDataUrl || item.thumbnail?.image || "",
    },
    draft: origin === "local",
  };
}

function renderTags(tags) {
  return tags.map((tag) => `<span class="asset-tag">${escapeHtml(tag)}</span>`).join("");
}

function renderAssetCard(item) {
  const colors = item.thumbnail.colors.length >= 2 ? item.thumbnail.colors : [item.mainColor, "#38BDF8"];
  const thumbStyle = item.thumbnail.imageDataUrl
    ? `background-image: linear-gradient(135deg, rgba(8, 17, 31, 0.2), rgba(8, 17, 31, 0.55)), url('${item.thumbnail.imageDataUrl}'); background-size: cover; background-position: center;`
    : `background: linear-gradient(135deg, ${colors[0]}, ${colors[1]});`;

  return `
    <article class="asset-card ${item.draft ? "asset-card-draft" : ""}">
      <div class="asset-thumb" style="${thumbStyle}">
        <span>${escapeHtml(item.thumbnail.label)}</span>
      </div>
      <div class="asset-body">
        <div class="asset-topline">
          <span class="asset-type">${escapeHtml(item.type)}</span>
          <span class="asset-color">${escapeHtml(item.mainColor)}</span>
        </div>
        <h3>${escapeHtml(item.title)}</h3>
        <div class="asset-tags">${renderTags(item.styleTags)}</div>
        <dl class="asset-meta">
          <div>
            <dt>来源</dt>
            <dd>${escapeHtml(item.source)}</dd>
          </div>
          <div>
            <dt>适用场景</dt>
            <dd>${escapeHtml(item.scenarios)}</dd>
          </div>
          <div>
            <dt>页面结构</dt>
            <dd>${escapeHtml(item.pageStructure)}</dd>
          </div>
          <div>
            <dt>图表风格</dt>
            <dd>${escapeHtml(item.chartStyle)}</dd>
          </div>
          <div>
            <dt>icon风格</dt>
            <dd>${escapeHtml(item.iconStyle)}</dd>
          </div>
          <div>
            <dt>插画风格</dt>
            <dd>${escapeHtml(item.illustrationStyle)}</dd>
          </div>
          <div>
            <dt>PPT图形拼接特点</dt>
            <dd>${escapeHtml(item.pptPattern)}</dd>
          </div>
          <div>
            <dt>可复用设计规则</dt>
            <dd>${escapeHtml(item.rules)}</dd>
          </div>
        </dl>
      </div>
    </article>
  `;
}

async function loadJson(file) {
  const response = await fetch(file, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Failed to load ${file}`);
  }
  return response.json();
}

function exportJson(filename, payload) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

function setImportState(text) {
  if (dom.importState) {
    dom.importState.textContent = text;
  }
}

function updateStats() {
  const seedTotal = libraryDefinitions.reduce((sum, libraryDef) => sum + (seedState[libraryDef.key]?.length || 0), 0);
  const draftTotal = libraryDefinitions.reduce((sum, libraryDef) => sum + (localDraftState[libraryDef.key]?.length || 0), 0);
  if (dom.assetTotal) dom.assetTotal.textContent = String(seedTotal + draftTotal);
  if (dom.draftTotal) dom.draftTotal.textContent = String(draftTotal);
}

function getActiveLibraryKey() {
  return dom.assetLibrarySelect?.value || "palettes";
}

function getLibraryDef(key) {
  return libraryDefinitions.find((item) => item.key === key) || libraryDefinitions[0];
}

function renderAllLibraries() {
  for (const libraryDef of libraryDefinitions) {
    const container = document.querySelector(libraryDef.selector);
    if (!container) continue;
    const seeds = seedState[libraryDef.key] || [];
    const drafts = localDraftState[libraryDef.key] || [];
    const items = [...seeds, ...drafts].map((item) => normalizeAsset(item, libraryDef, item.draft ? "local" : "seed"));
    container.innerHTML = items.map(renderAssetCard).join("");
  }
  updateStats();
}

function defaultDraftTitle(libraryDef, imageName) {
  const suffix = imageName ? imageName.replace(/\.[^.]+$/, "") : "灵感";
  return `${libraryDef.label}灵感 ${suffix}`;
}

function buildDraftSummary(title, libraryDef, colors) {
  return `${title} | 由 ${libraryDef.label} 导入草稿生成，主色 ${normalizeHex(colors[0])}，可继续补充字段后导出。`;
}

function buildDraftRecord(file, imageDataUrl, imageMeta) {
  const libraryDef = getLibraryDef(getActiveLibraryKey());
  const dominantColors = imageMeta.colors.length >= 2 ? imageMeta.colors.slice(0, 2) : ["#0F172A", "#38BDF8"];
  const title = dom.assetTitleInput?.value.trim() || defaultDraftTitle(libraryDef, file.name);
  const source = dom.assetSourceInput?.value.trim() || file.name || "本地图片导入";
  const type = dom.assetTypeInput?.value.trim() || libraryDef.label;
  const styleTags = parseTags(dom.assetTagsInput?.value).length ? parseTags(dom.assetTagsInput.value) : guessMood(dominantColors[0]);
  return {
    id: createId(libraryDef.key),
    title,
    source,
    type,
    styleTags,
    mainColor: normalizeHex(dominantColors[0]),
    scenarios: libraryDef.scenarios,
    pageStructure: libraryDef.pageStructure,
    chartStyle: libraryDef.chartStyle,
    iconStyle: libraryDef.iconStyle,
    illustrationStyle: libraryDef.illustrationStyle,
    pptPattern: libraryDef.pptPattern,
    rules: libraryDef.rules,
    thumbnail: {
      label: libraryDef.thumbnailLabel,
      colors: dominantColors.map((color) => normalizeHex(color)),
      imageDataUrl,
    },
    sourceFile: file.name,
  };
}

async function extractImagePalette(file) {
  const imageUrl = URL.createObjectURL(file);
  const image = new Image();
  image.decoding = "async";
  const loaded = new Promise((resolve, reject) => {
    image.onload = () => resolve(image);
    image.onerror = reject;
  });
  image.src = imageUrl;
  try {
    await loaded;

    const maxSide = 160;
    const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.width * scale));
    canvas.height = Math.max(1, Math.round(image.height * scale));
    const context = canvas.getContext("2d", { willReadFrequently: true });
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    const { data } = context.getImageData(0, 0, canvas.width, canvas.height);

    const histogram = new Map();
    let totalRed = 0;
    let totalGreen = 0;
    let totalBlue = 0;
    let counted = 0;

    for (let i = 0; i < data.length; i += 16) {
      const alpha = data[i + 3];
      if (alpha < 100) continue;
      const red = data[i];
      const green = data[i + 1];
      const blue = data[i + 2];
      totalRed += red;
      totalGreen += green;
      totalBlue += blue;
      counted += 1;

      const key = `${Math.round(red / 32) * 32}-${Math.round(green / 32) * 32}-${Math.round(blue / 32) * 32}`;
      histogram.set(key, (histogram.get(key) || 0) + 1);
    }

    const colors = [...histogram.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([key]) => {
        const [red, green, blue] = key.split("-").map(Number);
        return `#${[red, green, blue].map((part) => part.toString(16).padStart(2, "0")).join("").toUpperCase()}`;
      });

    if (counted > 0) {
      const avg = [totalRed, totalGreen, totalBlue].map((value) => Math.round(value / counted));
      const averageHex = `#${avg.map((part) => part.toString(16).padStart(2, "0")).join("").toUpperCase()}`;
      colors.unshift(averageHex);
    }

    return {
      colors: [...new Set(colors)].slice(0, 4),
      imageUrl,
      previewDataUrl: canvas.toDataURL("image/jpeg", 0.72),
      width: image.width,
      height: image.height,
    };
  } catch (error) {
    URL.revokeObjectURL(imageUrl);
    throw error;
  }
}

function updateDraftPreview(draft) {
  if (!draft) {
    dom.importThumb.style.background = "rgba(8, 17, 31, 0.55)";
    dom.importThumb.style.backgroundImage = "";
    dom.importThumb.textContent = "等待导入";
    dom.draftTitle.textContent = "尚未选择图片";
    dom.draftSummary.textContent = "选择一张截图后，会自动提取主色并填充灵感字段。";
    dom.draftMainColor.textContent = "-";
    dom.draftScenarios.textContent = "-";
    dom.draftPageStructure.textContent = "-";
    dom.draftChartStyle.textContent = "-";
    dom.draftIconStyle.textContent = "-";
    dom.draftIllustrationStyle.textContent = "-";
    dom.draftPptPattern.textContent = "-";
    dom.draftRules.textContent = "-";
    return;
  }

  dom.importThumb.style.background = draft.thumbnail.imageDataUrl
    ? `linear-gradient(135deg, rgba(8, 17, 31, 0.12), rgba(8, 17, 31, 0.54)), url('${draft.thumbnail.imageDataUrl}') center/cover no-repeat`
    : `linear-gradient(135deg, ${draft.thumbnail.colors[0]}, ${draft.thumbnail.colors[1]})`;
  dom.importThumb.textContent = draft.thumbnail.imageDataUrl ? "" : draft.thumbnail.label;
  dom.draftTitle.textContent = draft.title;
  dom.draftSummary.textContent = buildDraftSummary(draft.title, getLibraryDef(getActiveLibraryKey()), draft.thumbnail.colors);
  dom.draftMainColor.textContent = draft.mainColor;
  dom.draftScenarios.textContent = draft.scenarios;
  dom.draftPageStructure.textContent = draft.pageStructure;
  dom.draftChartStyle.textContent = draft.chartStyle;
  dom.draftIconStyle.textContent = draft.iconStyle;
  dom.draftIllustrationStyle.textContent = draft.illustrationStyle;
  dom.draftPptPattern.textContent = draft.pptPattern;
  dom.draftRules.textContent = draft.rules;
}

function persistDraft(draft) {
  const libraryKey = getActiveLibraryKey();
  const list = localDraftState[libraryKey] || [];
  list.unshift({ ...draft, draft: true });
  localDraftState[libraryKey] = list.slice(0, 30);
  saveDraftState(localDraftState);
  renderAllLibraries();
  setImportState(`已保存到 ${getLibraryDef(libraryKey).label} 草稿`);
}

function exportDraft(libraryKey) {
  const libraryDef = getLibraryDef(libraryKey);
  const seeds = seedState[libraryKey] || [];
  const drafts = localDraftState[libraryKey] || [];
  const normalizedSeeds = seeds.map((item) => normalizeAsset(item, libraryDef, "seed"));
  const normalizedDrafts = drafts.map((item) => normalizeAsset(item, libraryDef, "local"));
  exportJson(`${libraryKey}.json`, { items: [...normalizedSeeds, ...normalizedDrafts] });
  setImportState(`已导出 ${libraryDef.label} JSON`);
}

async function initImportPipeline() {
  if (!dom.assetImageInput) return;

  dom.assetLibrarySelect.addEventListener("change", () => {
    currentDraft = null;
    updateDraftPreview(null);
  });

  dom.assetImageInput.addEventListener("change", async () => {
    const file = dom.assetImageInput.files?.[0];
    if (!file) return;
    setImportState("正在解析图片...");
    try {
      const palette = await extractImagePalette(file);
      currentDraft = buildDraftRecord(file, palette.previewDataUrl, palette);
      URL.revokeObjectURL(palette.imageUrl);
      updateDraftPreview(currentDraft);
      setImportState("草稿已生成");
    } catch (error) {
      console.error(error);
      setImportState("图片解析失败");
    }
  });

  dom.assetTitleInput.addEventListener("input", () => {
    if (!currentDraft) return;
    currentDraft.title = dom.assetTitleInput.value.trim() || currentDraft.title;
    updateDraftPreview(currentDraft);
  });

  dom.assetSourceInput.addEventListener("input", () => {
    if (!currentDraft) return;
    currentDraft.source = dom.assetSourceInput.value.trim() || currentDraft.source;
  });

  dom.assetTypeInput.addEventListener("input", () => {
    if (!currentDraft) return;
    currentDraft.type = dom.assetTypeInput.value.trim() || currentDraft.type;
  });

  dom.assetTagsInput.addEventListener("input", () => {
    if (!currentDraft) return;
    currentDraft.styleTags = parseTags(dom.assetTagsInput.value).length ? parseTags(dom.assetTagsInput.value) : currentDraft.styleTags;
    updateDraftPreview(currentDraft);
  });

  dom.saveDraftButton.addEventListener("click", () => {
    if (!currentDraft) {
      setImportState("请先导入一张图片");
      return;
    }
    persistDraft(currentDraft);
  });

  dom.exportDraftButton.addEventListener("click", () => {
    exportDraft(getActiveLibraryKey());
  });
}

async function init() {
  for (const libraryDef of libraryDefinitions) {
    const data = await loadJson(libraryDef.file);
    seedState[libraryDef.key] = Array.isArray(data?.items) ? data.items : [];
  }
  renderAllLibraries();
  updateDraftPreview(null);
  setImportState("等待导入");
  initImportPipeline();
}

init().catch((error) => {
  console.error(error);
  setImportState("初始化失败");
});

const libraryDefinitions = [
  {
    key: "palettes",
    label: "配色",
    selector: "[data-library-grid='palettes']",
    file: "data/palettes.json",
    thumbnailLabel: "Palette",
    mainColor: "#0F172A",
    secondaryColor: "#38BDF8",
    backgroundColor: "#08111F",
    gradientRule: "深色底 + 冷色强调，保持 70% 深色面、20% 辅助色、10% 强调点。",
    styleName: "冷静数据感",
    moodKeywords: ["克制", "理性", "高对比"],
    emotionKeywords: ["稳定", "清晰", "专业"],
    pageStructure: "色块组合 / 强调层级 / 氛围分层",
    cardStructure: "一主一辅的并列色块，卡片边缘保留呼吸感。",
    infoHierarchy: "标题先行，主色承载视觉锚点，辅助色用于提示。",
    radius: "20px / 圆角卡片",
    shadow: "柔和外阴影，控制层级而不抢主体。",
    material: "半透明玻璃感",
    glow: "低强度冷色发光",
    border: "细边框 + 低透明度描边",
    suitableScenarios: "数据看板 / 运营日报 / 指标总览",
    unsuitableScenarios: "强节日氛围 / 高温暖品牌叙事",
    recommendedPageTypes: "首页总览 / 卡片流 / 指标面板",
    reusableRules: "先定主色，再补强调色和中性色。",
    prompt: "用于信息密度较高的界面，强调冷静、秩序和清晰层级。",
  },
  {
    key: "charts",
    label: "图表",
    selector: "[data-library-grid='charts']",
    file: "data/charts.json",
    thumbnailLabel: "Chart",
    mainColor: "#7DD3FC",
    secondaryColor: "#0F172A",
    backgroundColor: "#08111F",
    gradientRule: "深色底 + 高亮数据色，主体留白与数据面板并重。",
    styleName: "经营分析感",
    moodKeywords: ["分析", "清晰", "密度高"],
    emotionKeywords: ["可信", "聚焦", "专业"],
    pageStructure: "标题区 / 指标区 / 主图表 / 辅助说明",
    cardStructure: "图表区居中，左右模块承接结论与注释。",
    infoHierarchy: "先呈现结论，再呈现趋势和解释。",
    radius: "16px / 更紧凑的看板圆角",
    shadow: "低模糊深阴影，强调面板层级。",
    material: "数据仪表盘面板感",
    glow: "重点数据轻微外发光",
    border: "清晰边界线，便于读数",
    suitableScenarios: "日报 / 经营看板 / 决策汇报",
    unsuitableScenarios: "纯品牌展示 / 情绪氛围图",
    recommendedPageTypes: "看板页 / 指标页 / 汇报页",
    reusableRules: "让图表先讲结论，再补过程。",
    prompt: "用于经营汇报和指标监控，强调可读性、层级和结论前置。",
  },
  {
    key: "pages",
    label: "页面",
    selector: "[data-library-grid='pages']",
    file: "data/pages.json",
    thumbnailLabel: "Page",
    mainColor: "#A78BFA",
    secondaryColor: "#0F172A",
    backgroundColor: "#0B1220",
    gradientRule: "首屏大面积主色，模块切换使用中性色过渡。",
    styleName: "叙事导览感",
    moodKeywords: ["故事", "节奏", "导览"],
    emotionKeywords: ["沉浸", "连贯", "有层次"],
    pageStructure: "首屏标题 / 模块分区 / 节奏递进",
    cardStructure: "强封面 + 中段模块化 + 末尾总结块。",
    infoHierarchy: "标题和主视觉先出现，内容按节奏逐层展开。",
    radius: "24px / 叙事型圆角",
    shadow: "中等柔和阴影，增强页面漂浮感。",
    material: "轻雾面 + 层叠卡片",
    glow: "章节转场弱发光",
    border: "低对比边框，避免干扰阅读",
    suitableScenarios: "首页 / 落地页 / 长图叙事页",
    unsuitableScenarios: "极简工具页 / 纯表格页面",
    recommendedPageTypes: "首页 / 长图 / 品牌页",
    reusableRules: "先保证层级，再保证节奏。",
    prompt: "用于内容叙事和页面导览，强调从首屏到细节的层次推进。",
  },
  {
    key: "templates",
    label: "模板",
    selector: "[data-library-grid='templates']",
    file: "data/templates.json",
    thumbnailLabel: "Template",
    mainColor: "#FDE047",
    secondaryColor: "#0F172A",
    backgroundColor: "#111827",
    gradientRule: "封面主色 + 黑白中性色，形成清晰版式骨架。",
    styleName: "演示模板感",
    moodKeywords: ["结构化", "规范", "演示"],
    emotionKeywords: ["干净", "明确", "可靠"],
    pageStructure: "封面 / 章节转场 / 对照页 / 说明页",
    cardStructure: "模块拼接清晰，留白支持信息转场。",
    infoHierarchy: "标题、章节、说明三层分明。",
    radius: "18px / 演示模板圆角",
    shadow: "轻中度阴影，强调投影和层级。",
    material: "编辑排版感",
    glow: "章节标题轻微高亮",
    border: "克制边线，突出结构稳定性",
    suitableScenarios: "PPT / 报告 / 章节页 / 方案页",
    unsuitableScenarios: "高情绪化活动页 / 过度装饰页面",
    recommendedPageTypes: "封面 / 章节页 / 说明页",
    reusableRules: "版式先统一，再追求风格扩散。",
    prompt: "用于 PPT 与方案表达，强调标准化、可替换和视觉秩序。",
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
  draftSecondaryColor: document.getElementById("draftSecondaryColor"),
  draftBackgroundColor: document.getElementById("draftBackgroundColor"),
  draftGradientRule: document.getElementById("draftGradientRule"),
  draftStyleName: document.getElementById("draftStyleName"),
  draftMoodKeywords: document.getElementById("draftMoodKeywords"),
  draftEmotionKeywords: document.getElementById("draftEmotionKeywords"),
  draftPageStructure: document.getElementById("draftPageStructure"),
  draftCardStructure: document.getElementById("draftCardStructure"),
  draftInfoHierarchy: document.getElementById("draftInfoHierarchy"),
  draftRadius: document.getElementById("draftRadius"),
  draftShadow: document.getElementById("draftShadow"),
  draftMaterial: document.getElementById("draftMaterial"),
  draftGlow: document.getElementById("draftGlow"),
  draftBorder: document.getElementById("draftBorder"),
  draftSuitableScenarios: document.getElementById("draftSuitableScenarios"),
  draftUnsuitableScenarios: document.getElementById("draftUnsuitableScenarios"),
  draftRecommendedPageTypes: document.getElementById("draftRecommendedPageTypes"),
  draftReusableRules: document.getElementById("draftReusableRules"),
  draftPrompt: document.getElementById("draftPrompt"),
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
    mainColor: libraryDef.mainColor,
    secondaryColor: libraryDef.secondaryColor,
    backgroundColor: libraryDef.backgroundColor,
    gradientRule: libraryDef.gradientRule,
    styleName: libraryDef.styleName,
    moodKeywords: libraryDef.moodKeywords,
    emotionKeywords: libraryDef.emotionKeywords,
    pageStructure: libraryDef.pageStructure,
    cardStructure: libraryDef.cardStructure,
    infoHierarchy: libraryDef.infoHierarchy,
    radius: libraryDef.radius,
    shadow: libraryDef.shadow,
    material: libraryDef.material,
    glow: libraryDef.glow,
    border: libraryDef.border,
    suitableScenarios: libraryDef.suitableScenarios,
    unsuitableScenarios: libraryDef.unsuitableScenarios,
    recommendedPageTypes: libraryDef.recommendedPageTypes,
    reusableRules: libraryDef.reusableRules,
    prompt: libraryDef.prompt,
  };
}

function normalizeAsset(item, libraryDef, origin = "seed") {
  const base = buildDefaultFields(libraryDef);
  const thumbnailColors = item.thumbnail?.colors?.length >= 2
    ? item.thumbnail.colors.slice(0, 2)
    : [item.mainColor || base.mainColor || "#0F172A", item.secondaryColor || base.secondaryColor || "#38BDF8"];
  const mainColor = normalizeHex(item.mainColor || thumbnailColors[0] || "#0F172A");
  return {
    id: item.id || `${origin}-${libraryDef.key}-${item.title}`,
    title: item.title || "未命名灵感",
    source: item.source || base.source,
    type: item.type || base.type,
    styleTags: ensureArray(item.styleTags || item.tags || base.styleTags),
    mainColor,
    secondaryColor: normalizeHex(item.secondaryColor || thumbnailColors[1] || base.secondaryColor || "#38BDF8"),
    backgroundColor: normalizeHex(item.backgroundColor || base.backgroundColor || "#08111F"),
    gradientRule: item.gradientRule || base.gradientRule,
    styleName: item.styleName || base.styleName,
    moodKeywords: ensureArray(item.moodKeywords || base.moodKeywords),
    emotionKeywords: ensureArray(item.emotionKeywords || base.emotionKeywords),
    pageStructure: item.pageStructure || base.pageStructure,
    cardStructure: item.cardStructure || base.cardStructure,
    infoHierarchy: item.infoHierarchy || base.infoHierarchy,
    radius: item.radius || base.radius,
    shadow: item.shadow || base.shadow,
    material: item.material || base.material,
    glow: item.glow || base.glow,
    border: item.border || base.border,
    suitableScenarios: item.suitableScenarios || item.scenarios || base.suitableScenarios,
    unsuitableScenarios: item.unsuitableScenarios || base.unsuitableScenarios,
    recommendedPageTypes: item.recommendedPageTypes || base.recommendedPageTypes,
    reusableRules: item.reusableRules || item.rules || item.note || base.reusableRules,
    prompt: item.prompt || base.prompt,
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

function renderPills(values) {
  return values.map((value) => `<span class="asset-pill">${escapeHtml(value)}</span>`).join("");
}

function renderLayerBlock(title, pairs) {
  return `
    <section class="asset-section">
      <h4>${escapeHtml(title)}</h4>
      <dl class="asset-layer-list">
        ${pairs
          .map(
            ([label, value]) => `
              <div>
                <dt>${escapeHtml(label)}</dt>
                <dd>${Array.isArray(value) ? renderPills(value) : escapeHtml(value)}</dd>
              </div>
            `,
          )
          .join("")}
      </dl>
    </section>
  `;
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
        <div class="asset-layer-grid">
          ${renderLayerBlock("颜色层", [
            ["主色", item.mainColor],
            ["辅助色", item.secondaryColor],
            ["背景色", item.backgroundColor],
            ["渐变规则", item.gradientRule],
          ])}
          ${renderLayerBlock("风格层", [
            ["风格名称", item.styleName],
            ["气质关键词", item.moodKeywords],
            ["情绪关键词", item.emotionKeywords],
          ])}
          ${renderLayerBlock("结构层", [
            ["页面结构", item.pageStructure],
            ["卡片结构", item.cardStructure],
            ["信息层级", item.infoHierarchy],
          ])}
          ${renderLayerBlock("视觉层", [
            ["圆角", item.radius],
            ["阴影", item.shadow],
            ["材质", item.material],
            ["发光", item.glow],
            ["边框", item.border],
          ])}
          ${renderLayerBlock("复用层", [
            ["适合场景", item.suitableScenarios],
            ["不适合场景", item.unsuitableScenarios],
            ["推荐页面类型", item.recommendedPageTypes],
          ])}
          ${renderLayerBlock("AI参考层", [
            ["可复用设计规则", item.reusableRules],
            ["虾堡生成页面时的参考提示词", item.prompt],
          ])}
        </div>
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
  const dominantColors = imageMeta.colors.length >= 3 ? imageMeta.colors.slice(0, 3) : [libraryDef.mainColor, libraryDef.secondaryColor, libraryDef.backgroundColor];
  const title = dom.assetTitleInput?.value.trim() || defaultDraftTitle(libraryDef, file.name);
  const source = dom.assetSourceInput?.value.trim() || file.name || "本地图片导入";
  const type = dom.assetTypeInput?.value.trim() || libraryDef.label;
  const styleTags = parseTags(dom.assetTagsInput?.value).length ? parseTags(dom.assetTagsInput.value) : guessMood(dominantColors[0]);
  const backgroundColor = normalizeHex(dominantColors[2] || libraryDef.backgroundColor);
  const secondaryColor = normalizeHex(dominantColors[1] || libraryDef.secondaryColor);
  return {
    id: createId(libraryDef.key),
    title,
    source,
    type,
    styleTags,
    mainColor: normalizeHex(dominantColors[0]),
    secondaryColor,
    backgroundColor,
    gradientRule: libraryDef.gradientRule,
    styleName: libraryDef.styleName,
    moodKeywords: libraryDef.moodKeywords,
    emotionKeywords: libraryDef.emotionKeywords,
    pageStructure: libraryDef.pageStructure,
    cardStructure: libraryDef.cardStructure,
    infoHierarchy: libraryDef.infoHierarchy,
    radius: libraryDef.radius,
    shadow: libraryDef.shadow,
    material: libraryDef.material,
    glow: libraryDef.glow,
    border: libraryDef.border,
    suitableScenarios: libraryDef.suitableScenarios,
    unsuitableScenarios: libraryDef.unsuitableScenarios,
    recommendedPageTypes: libraryDef.recommendedPageTypes,
    reusableRules: libraryDef.reusableRules,
    prompt: libraryDef.prompt,
    thumbnail: {
      label: libraryDef.thumbnailLabel,
      colors: [dominantColors[0], secondaryColor, backgroundColor].map((color) => normalizeHex(color)),
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
    dom.draftSecondaryColor.textContent = "-";
    dom.draftBackgroundColor.textContent = "-";
    dom.draftGradientRule.textContent = "-";
    dom.draftStyleName.textContent = "-";
    dom.draftMoodKeywords.textContent = "-";
    dom.draftEmotionKeywords.textContent = "-";
    dom.draftPageStructure.textContent = "-";
    dom.draftCardStructure.textContent = "-";
    dom.draftInfoHierarchy.textContent = "-";
    dom.draftRadius.textContent = "-";
    dom.draftShadow.textContent = "-";
    dom.draftMaterial.textContent = "-";
    dom.draftGlow.textContent = "-";
    dom.draftBorder.textContent = "-";
    dom.draftSuitableScenarios.textContent = "-";
    dom.draftUnsuitableScenarios.textContent = "-";
    dom.draftRecommendedPageTypes.textContent = "-";
    dom.draftReusableRules.textContent = "-";
    dom.draftPrompt.textContent = "-";
    return;
  }

  dom.importThumb.style.background = draft.thumbnail.imageDataUrl
    ? `linear-gradient(135deg, rgba(8, 17, 31, 0.12), rgba(8, 17, 31, 0.54)), url('${draft.thumbnail.imageDataUrl}') center/cover no-repeat`
    : `linear-gradient(135deg, ${draft.thumbnail.colors[0]}, ${draft.thumbnail.colors[1]})`;
  dom.importThumb.textContent = draft.thumbnail.imageDataUrl ? "" : draft.thumbnail.label;
  dom.draftTitle.textContent = draft.title;
  dom.draftSummary.textContent = buildDraftSummary(draft.title, getLibraryDef(getActiveLibraryKey()), draft.thumbnail.colors);
  dom.draftMainColor.textContent = draft.mainColor;
  dom.draftSecondaryColor.textContent = draft.secondaryColor;
  dom.draftBackgroundColor.textContent = draft.backgroundColor;
  dom.draftGradientRule.textContent = draft.gradientRule;
  dom.draftStyleName.textContent = draft.styleName;
  dom.draftMoodKeywords.textContent = draft.moodKeywords.join("、");
  dom.draftEmotionKeywords.textContent = draft.emotionKeywords.join("、");
  dom.draftPageStructure.textContent = draft.pageStructure;
  dom.draftCardStructure.textContent = draft.cardStructure;
  dom.draftInfoHierarchy.textContent = draft.infoHierarchy;
  dom.draftRadius.textContent = draft.radius;
  dom.draftShadow.textContent = draft.shadow;
  dom.draftMaterial.textContent = draft.material;
  dom.draftGlow.textContent = draft.glow;
  dom.draftBorder.textContent = draft.border;
  dom.draftSuitableScenarios.textContent = draft.suitableScenarios;
  dom.draftUnsuitableScenarios.textContent = draft.unsuitableScenarios;
  dom.draftRecommendedPageTypes.textContent = draft.recommendedPageTypes;
  dom.draftReusableRules.textContent = draft.reusableRules;
  dom.draftPrompt.textContent = draft.prompt;
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

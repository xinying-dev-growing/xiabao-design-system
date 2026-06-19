const libraries = [
  { key: "palettes", selector: "[data-library-grid='palettes']", file: "data/palettes.json" },
  { key: "charts", selector: "[data-library-grid='charts']", file: "data/charts.json" },
  { key: "pages", selector: "[data-library-grid='pages']", file: "data/pages.json" },
  { key: "templates", selector: "[data-library-grid='templates']", file: "data/templates.json" },
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderTags(tags) {
  return tags.map((tag) => `<span class="asset-tag">${escapeHtml(tag)}</span>`).join("");
}

function renderAssetCard(item) {
  const colors = item.thumbnail?.colors ?? ["#0F172A", "#38BDF8"];
  const thumbLabel = item.thumbnail?.label ?? item.type;
  const thumbStyle = `background: linear-gradient(135deg, ${colors[0]}, ${colors[1]});`;

  return `
    <article class="asset-card">
      <div class="asset-thumb" style="${thumbStyle}">
        <span>${escapeHtml(thumbLabel)}</span>
      </div>
      <div class="asset-body">
        <div class="asset-topline">
          <span class="asset-type">${escapeHtml(item.type)}</span>
          <span class="asset-color">${escapeHtml(item.mainColor)}</span>
        </div>
        <h3>${escapeHtml(item.title)}</h3>
        <div class="asset-tags">${renderTags(item.tags ?? [])}</div>
        <dl class="asset-meta">
          <div>
            <dt>适用场景</dt>
            <dd>${escapeHtml(item.scenarios)}</dd>
          </div>
          <div>
            <dt>设计亮点</dt>
            <dd>${escapeHtml(item.highlight)}</dd>
          </div>
          <div>
            <dt>备注</dt>
            <dd>${escapeHtml(item.note)}</dd>
          </div>
        </dl>
      </div>
    </article>
  `;
}

async function loadLibrary(file) {
  const response = await fetch(file, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Failed to load ${file}`);
  }
  return response.json();
}

async function init() {
  for (const library of libraries) {
    const container = document.querySelector(library.selector);
    if (!container) continue;

    try {
      const data = await loadLibrary(library.file);
      const items = Array.isArray(data?.items) ? data.items : [];
      container.innerHTML = items.map(renderAssetCard).join("");
    } catch (error) {
      container.innerHTML = `
        <div class="library-error">
          <strong>数据加载失败</strong>
          <p>请检查 <code>${escapeHtml(library.file)}</code> 是否存在且内容有效。</p>
        </div>
      `;
    }
  }
}

init();

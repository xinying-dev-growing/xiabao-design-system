# 🦞 虾堡灵感资产库

纯静态灵感资产首页，适合直接部署到 GitHub Pages。

## 目录结构

```text
/
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── images/
│       └── favicon.svg
├── README.md
└── .gitignore
```

## 本地预览

建议通过本地静态服务器打开，或直接访问 GitHub Pages。

## 更新方式

1. 修改 `data/*.json` 里的资产数据。
2. 如需调整样式，编辑 `assets/css/style.css`。
3. 如需调整渲染结构，编辑 `assets/js/main.js`。
4. 提交并推送到 `main` 分支后，GitHub Pages 会自动更新。

## 说明

- 页面不依赖本地磁盘路径。
- 页面保持纯静态结构，不包含上传、AI 分析或登录功能。
- 点击色块会复制 HEX 值到剪贴板。

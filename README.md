# Xiabao Design System

静态配色管理页，适合直接部署到 GitHub Pages。

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

直接用浏览器打开 `index.html` 即可。

## 更新方式

1. 修改 `assets/js/main.js` 里的配色数据。
2. 如需调整样式，编辑 `assets/css/style.css`。
3. 提交并推送到 `main` 分支后，GitHub Pages 会自动更新。

## 说明

- 页面不依赖本地磁盘路径。
- 页面不依赖本地协议资源。
- 点击色块会复制 HEX 值到剪贴板。

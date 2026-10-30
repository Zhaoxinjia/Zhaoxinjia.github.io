# v3 移动端补丁记录

日期：2026-10-30
实施分支：codex/homepage-v3-mobile-fixes
基线：053dc9c（v2）
依据：作者本轮提供的 zhaoxinjia-homepage-revision-v3.md，延续已授权的主页更新。

## 实际处理

- V3-01：为双语 About 加 about-page 作用域，≤600px 将原来的每行三列改为堆叠卡片。桌面表格继续使用 table-cell 布局，不影响其他页面。表头视觉隐藏但保留在可访问树中。全部教育/工作文字保持原样。
- V3-02：采用工单方案 A。三张图继续保留清晰标注与局部横向滚动；外层固定右缘渐隐，并在手机图注后加入英文/中文可见滑动提示。保留各图独立 region 名称、tabindex 和键盘滚动。
- V3-03：仅改第 2、4、5 条说明（pub-24、pub-19、pub-13），分别采用数字、问句、方法式开头；其余三条原样保留。未照搬“电容决定噪声下限”“中性糖链没有可读电荷所以不能读出”等绝对化草案，保留既有事实。
- V3-04：≤360px 使用 12px 菜单间距、14px 菜单字；实测 320px 下四个链接均位于视口内。
- V3-05：采用工单推荐的“接受现状”，保持图中深色底和原对比度。
- V3-06：英文导航简化为 CV，title 与可访问名称明确 Chinese-language PDF；首页按钮仍为 CV (中文)，Contact 正文保持原样。
- V3-07：采用“保持现状”，仍显示可复制的完整 DOI。
- 未修改已正确的图注单数、中文 SVG 标注或自动版权年份。没有新增 Talks 空页、论文 PDF 假链接或招生信息。

## 验证

- Hugo --gc --minify --cleanDestinationDir 通过，无 warning。
- 13 个 HTML、283 处站内引用、10 个双语核心页面检查通过。
- 专项 Edge 检测：中英 × 深浅色 × 320/360/390/1024/1440 × 首页/About/Research，共 60 个布局组合通过。
- About 每个语言页的 2 张表、4 行、12 个单元格检查通过。手机全部单元格为 block、宽度至少 220px、无单元格横向溢出、word-break 为 normal。桌面单元格仍为 table-cell。
- 320/360/390 下四个菜单项均位于视口范围内；最大手机页头高度 107px。
- 双语科研图的可见滑动提示均存在；聚焦后 ArrowRight 能推动图框滚动；无页面横向溢出。
- 双语 About/Research × 深浅色共八组 axe WCAG A/AA、2.1 A/AA 与 best-practice 检查无违规项。
- 浏览器无脚本错误或 404 资源；人工复核英文手机 About 与中文手机 Research。
- 逐条比对数据，25 条论文记录除指定三条 summary 外完全一致（包括作者、位次、状态、期刊、年份、DOI、完整引文）。
- Contact 正文、CV PDF、主题源文件、原科研 SVG 均未修改。
- Git diff --check 通过。截图与专项脚本位于被 Git 忽略的 qa/。

## 主要文件

- assets/css/extended/custom.css
- content/en/about.md
- content/zh/about.md
- data/publications.json
- layouts/_partials/header.html
- layouts/baseof.html
- layouts/shortcodes/research-figure.html
- docs/V3-REPORT.md

## 预览

- qa/v3-about-en-390-dark.png
- qa/v3-about-zh-390-light.png
- qa/v3-research-zh-390-light.png

## 发布

源码保留独立分支并普通快进更新 main；构建产物通过隔离 gh-pages 检出目录普通推送，保留发布历史。
具体提交、部署与线上逐页核对结果见本次交付消息。

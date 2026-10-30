# v2 补丁交付记录

日期：2026-10-30
分支：codex/homepage-v2-polish
基线：dedc465（已上线第二阶段）
依据：作者提供的 zhaoxinjia-homepage-revision-v2.md，以及本轮确认“重画为带中英文标注的清晰概念图”。

## 改动

- V2-01：仓库只有中文 CV。英文导航与首页按钮明确写 CV (中文)，下载提示为 Download Chinese-language CV (PDF)；中文导航写简历。未生成未经确认的英文 CV。
- V2-02：双语三个研究方向统一为正文 → 图 → 相关论文；研究正文除中文引号外未改写。
- V2-03：重画三套 1200×520 SVG，并分别提供英文和中文标注。标注膜、孔道、分子、电流及概念流程。图像没有测量坐标、虚构轨迹或 MD 数据。窄屏图框可横向滚动，保证标注大小，滚动区域有独立可访问名称与键盘焦点。
- 图注改为“概念示意，非等比例绘制。”，13px/400 字重；完整非实验数据说明保留在 alt。
- V2-04：中文研究首段使用成对中文引号，避免 typographer 在加粗后判断错误。
- V2-05：α2–8 符号统一；英文 About 使用 Sep 2015 / Jan 2021 等自然日期；中文论文页移除空预印本类别说明；About bullet 句末标点统一；● 只出现在七篇已发表第一/通讯作者论文中，在审条目不加；语言切换名称包含可见标签及当前语言操作说明，兼顾 label-in-name；版权确认沿用主题 now.Year，没有硬编码。
- V2-06：首页按钮与区块均读取同一双语标题，分别为 Selected publications / 代表性论文。
- V2-07：头像底部使用 CSS 渐隐，深浅色与手机版共用，不改人像本身。
- V2-08：六篇说明改为问题/做法/结果的简短结构。没有照搬工单草稿中的“第一次”“噪声下限由膜电容决定”“一次穿孔才成为测量”等不充分或绝对化表述；基于此前核对过的论文内容保守表达，两篇综述保持明确标识。
- V2-09：手机社交链接为 2×2 网格，高度至少 44px。
- V2-10：论文标题保留唯一 DOI 链接，行尾为可复制 DOI 文字；展开引文里的重复 DOI 锚点仅在渲染时移除，原始数据保留。
- V2-11：专利英文译名为主行，中文原名为 13px 副行，编号与原名保留。
- News 英文日期改用 Jul 2026，中文仍为 2026.07。
- V2-12/13：未找到报告清单或可公开论文 PDF，未建立空页面、未添加假 PDF 入口。

## 范围与事实保真

- Contact 两个内容文件与 CV PDF 均未修改；导航是全站共享组件，其 CV 标注与语言说明会在 Contact 页同样更新。
- 24 篇已发表、1 条在审状态不变，6 篇代表作选目及排序不变。
- 25 条记录的作者、角色、期刊、年份、DOI 与基线完全一致；50 条完整双语引文只统一了 α2-8 → α2–8 的排版符号。
- 保留 Hugo、PaperMod、URL 结构及原主题源文件；没有新增网站依赖。

## 验证

- Hugo --gc --minify --cleanDestinationDir：通过，无 warning。
- 13 个 HTML、283 处站内引用和 10 个双语核心页面检查通过。
- 既有 60 个页面/屏宽检查通过，覆盖 320/360/390/768/1024/1440。
- 本轮另测 24 个首页语言/屏宽/主题组合；两列社交链接、渐隐、CTA 一致性通过；最大手机导航高度 107px。
- 正文位于图和相关论文前；三张图在两个语言页均可解码；图注样式为 13px、400。
- 展开全部引文后，24 篇已发表论文每条仍只有一个 DOI 锚点；已发表作者标记恰为 7，在审为 0。
- 四个代表页面 × 深浅色，共八组 axe-core WCAG 2 A/AA、2.1 A/AA 和 best-practice 检查无违规项。发现并修复了重复图框 region 名称。
- Lighthouse 自带 Chrome 启动器本轮无法取得调试端口，未生成新分数；没有沿用上轮的 100 分充作本轮结果。改用实际可用的 Playwright Edge 会话直接运行 axe 规则。
- 截图人工复核：新版中文研究页、浅色英文手机首页，另有多尺寸深浅色预览保存在 qa/v2-*.png。
- Git diff --check 通过；主题源文件与部署脚本未修改。

## 预览与素材

- qa/v2-home-en-390-light.png：浅色英文手机首页。
- qa/v2-research-zh-1440.png：中文研究页。
- static/img/research-recognition.svg / research-recognition-zh.svg
- static/img/research-manipulation.svg / research-manipulation-zh.svg
- static/img/research-mechanism.svg / research-mechanism-zh.svg
- QA 工具、临时脚本、截图均在被忽略的 qa/，不进入网站。

## 发布

保留独立工作分支，源码与构建产物分别通过普通快进推送更新 main / gh-pages。
GitHub Pages 运行结果与线上逐页比对以本次交付消息为准。

## 文件清单

- assets/css/extended/custom.css
- content/en/about.md
- content/en/publications.md
- content/en/research.md
- content/zh/publications.md
- content/zh/research.md
- data/publications.json
- layouts/_partials/header.html
- layouts/_partials/publication-entry.html
- layouts/index.html
- layouts/shortcodes/research-figure.html
- static/img/research-manipulation.svg
- static/img/research-mechanism.svg
- static/img/research-recognition.svg
- static/img/research-manipulation-zh.svg
- static/img/research-mechanism-zh.svg
- static/img/research-recognition-zh.svg
- docs/V2-REPORT.md

# 第二阶段改版交付记录

日期：2026-10-29
实施分支：codex/academic-homepage-phase2
依据：F:/deepseek/zhaoxinjia-homepage-revision.md，以及作者在本会话中的明确修改意见。

## 作者确认与内容口径

- 采用工单六篇代表论文，顺序为 pub-22、pub-24、pub-23、pub-19、pub-13、pub-15；四篇原创研究、两篇综述。以最新确认覆盖此前第一作者优先的候选建议。
- 英文职称改为 Research Assistant Professor，中文保留助理研究员。不添加 tenure-track 或其他职级等同断言。
- 中英文统计统一：24 篇同行评议论文，7 篇第一/共同第一或通讯作者。结构化作者标记逐条核对：6 篇第一/共同第一、1 篇共同通讯；不计在审稿件。
- 奖项按作者确认的工单表述改为 2025 年中国分析测试协会科学技术奖（CAIA）一等奖，英文使用工单给定全称，去掉贡献者名次括注。英文措辞在相关高校公开报道中有使用，但不是对颁奖机构官方英文译名的独立认证。
- 不添加招生、博士后招聘、会议报告、基金号或引用指标。
- 在审稿件按原状态保留，独立分类，没有编造预印本链接。

## 实现

- 首页：移除代表作占位说明；六篇论文采用年份/期刊、可点击标题、简短中英文介绍；明确标注 Review/研究论文。添加 #selected，CTA 指向代表论文及 CV。
- 联系：Email、Google Scholar、ORCID、ResearchGate 使用文字链接，补齐可访问名称。已有中文 CV 通过导航、首页及联系页下载；沿用原 PDF 文件，不重写 CV 内容。
- 动态：三条真实论文上线记录，Crossref published-online 日期分别为 2026-07-31、2026-07-09、2026-03-04；保存在 data/news.json，未采用工单示例日期。
- 论文：保留原 citation.en/zh，在记录上增加标题、年份、作者、DOI、作者角色与类型；按年份分组；本人姓名始终显示；作者较多时简写，完整作者与原始引文可展开；空预印本节不输出。
- 专利：英文页采用工单提供的描述性译名，标注 English translation，同时保留中文原名、作者和专利号。
- 手机导航：品牌/工具一行、菜单一行，小屏可横向滚动菜单，不撑宽页面。语言切换保持当前对应页。
- 中文研究卡片：中文主标题，英文副标题。
- About 日期列不换行，表格可在局部横向滚动。
- 深色为默认；增加浅色切换和持久化，浅色强调使用 #146572；增加打印样式。
- SEO：首页含研究关键词标题；项目级 JSON-LD 用 ProfilePage/WebPage + Person，机构仍使用 Organization；inLanguage 放在网页实体上；中英语言码统一 en-US / zh-CN；新增分享图片。
- 禁用空 taxonomy 与静态页 RSS；sitemap 不再包含空标签/分类页；404 提供中英说明与返回入口。
- 版权年份已由原主题 now.Year 自动生成，核对后未重复修改。
- 主题源码没有修改；没有增加网站 npm 运行依赖。Lighthouse 仅安装在被忽略的 qa/audit-tools 内。
- README 更新了维护结构、正确的显式网站链接与发布方式。

## 图片与来源

- 头像：对仓库原 photo.jpg 使用内置 image_gen 进行 background-extraction，保留人物身份和服装，生成透明 cutout；原照片不覆盖。
- 最终资产：static/img/portrait-cutout.webp（480px，31,196 bytes）、portrait-cutout.png（480px 原透明 PNG）、portrait-240.webp（手机，10,950 bytes）、portrait-fallback.png（240px PNG 兜底，16,437 bytes）。
- logo：64px WebP 2,794 bytes；128px WebP 5,000 bytes；PNG 兜底。原始 logo 和 favicon 保留。
- 分享封面：static/img/og-cover.png / .webp，1200×630，由程序绘制姓名、研究方向、机构和概念孔道符号，不含实验数据。
- 科研图：static/img/research-recognition.svg、research-manipulation.svg、research-mechanism.svg，项目内绘制的概念矢量图，附双语图注，三个方向各挂两篇既有论文。
- ref-image.png 是旧网页截图，cover-art.jpg 是期刊封面，均未拿来伪装实验结果。
- 仓库没有真实电流轨迹或 MD 快照，因此这两类工单素材尚未落实。当前图只表达概念，不代表测量或模拟结果；后续可由作者提供可公开原图后替换。

头像使用的最终内置工具提示：
> Use case: background-extraction. Edit target: the supplied academic portrait. Remove ONLY the white background and output a genuinely transparent RGBA PNG cutout. Preserve the exact same person, facial features, expression, skin, hairstyle, hair edge detail, earrings, clothes, lighting, pose and framing. No beautification, no retouching, no face regeneration, no added objects, no text, no watermark. Square composition, head and shoulders fully preserved, intended display 240px on an academic website. Keep the subject identical; only background becomes transparent.

## 验证

- Hugo 0.166.0 extended：正式域名构建 --gc --minify --cleanDestinationDir 通过，无 warning。
- 实际启动 hugo server（仅 127.0.0.1:7312）进行检测，完成后停止。
- 13 个输出 HTML、283 处站内链接/资源引用通过检查。
- 中英文各 5 个核心页 × 320 / 360 / 390 / 768 / 1024 / 1440 共 60 个布局组合通过；无页面横向溢出；小屏 header ≤110px；导航高度 ≥44px。
- 深浅色切换、刷新持久化、Tab/Enter 跳过导航、减少动态效果设置通过。
- 10 页无 JavaScript 异常或失败资源请求；JSON-LD 全部可解析，未向第三方 Schema 验证器提交。
- 3 张科研 SVG 成功解码，naturalWidth=1200；人工复核研究页、桌面中文首页、手机英文首页与浅色中文论文页截图。
- 原 25 条记录、状态与 50 条双语完整引文和第一阶段提交逐条一致；已发表总数仍为 24，在审为 1。
- Lighthouse 13.6.0、本机 Edge、移动模式抽检英文首页与中文论文页：Performance 100 / Accessibility 100 / SEO 100。label-content-name-mismatch 与 heading-order 均通过。
- Lighthouse 抽检传输量：英文首页约 65 KB，中文论文页约 76 KB；这是本地测量，不承诺公网所有设备取得同一分数。
- GitHub Pages 上的缓存策略由平台控制；未运行微信/Telegram 客户端分享预览。已经输出可访问的 1200×630 og:image 与 summary_large_image。
- qa/ 内保留截图及 Lighthouse JSON，不提交到源码仓库或部署网站。

## 发布

源码在独立分支完成，合并 main 上此前的 README 链接修复后快进更新 main。
构建产物在隔离 gh-pages 检出目录更新，保留历史，普通推送；不执行旧 deploy.js、不强推。
发布提交与 GitHub Pages 运行结果以本次交付消息及工作流为准。

## 文件变更清单

- README.md
- assets/css/extended/custom.css
- content/en/about.md
- content/en/contact.md
- content/en/publications.md
- content/en/research.md
- content/zh/about.md
- content/zh/contact.md
- content/zh/publications.md
- content/zh/research.md
- data/home.json
- data/publications.json
- data/selected_publications.json
- docs/CONTENT-REVIEW.md
- hugo.yaml
- layouts/_partials/head.html
- layouts/_partials/header.html
- layouts/baseof.html
- layouts/index.html
- layouts/shortcodes/publication-list.html
- scripts/check-browser.cjs
- scripts/check-site.cjs
- data/news.json
- layouts/404.html
- layouts/_partials/page-title.html
- layouts/_partials/publication-entry.html
- layouts/_partials/social_icons.html
- layouts/_partials/templates/opengraph.html
- layouts/_partials/templates/schema_json.html
- layouts/_partials/templates/twitter_cards.html
- layouts/shortcodes/research-figure.html
- static/img/logo-128.png
- static/img/logo-128.webp
- static/img/logo-64.png
- static/img/logo-64.webp
- static/img/og-cover.png
- static/img/og-cover.webp
- static/img/portrait-240.webp
- static/img/portrait-cutout.png
- static/img/portrait-cutout.webp
- static/img/portrait-fallback.png
- static/img/research-manipulation.svg
- static/img/research-mechanism.svg
- static/img/research-recognition.svg
- docs/PHASE2-REPORT.md

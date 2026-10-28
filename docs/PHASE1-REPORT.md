# 第一阶段改版交付记录

日期：2026-10-16
工作分支：codex/academic-homepage-phase1
源代码基线：2a19e2301a0e9fba244c2ee1ba8f40a4259f509e
状态：本地工作区修改，未提交、未推送、未部署。

## 实际项目检查

- 仓库自带 tools/hugo.exe，实测 Hugo 0.166.0 extended windows/amd64。
- PaperMod 作为 themes/PaperMod 中的跟踪文件存在，不是 Git 子模块；主题声明最低版本 0.146.0，未见独立语义版本号。
- hugo.yaml 配置默认英文 content/en，中文 content/zh；共 8 篇正文与 2 个首页。
- 原来已使用 layouts/index.html、layouts/_partials/{head,header,extend_head}.html 和 assets/css/extended/custom.css 做项目级定制。
- 源码远端默认分支 main，存在 gh-pages；README 和部署脚本指向 gh-pages。没有 Actions 工作流，未访问后台确认 Pages 当前设置。
- 原样式有彩虹旋转背景、网格、标题辉光动画和研究页滚动隐藏脚本，均从项目定制中移除。
- 原语言导航跳往对方语言首页；现切换到当前对应页面。
- 原 head 引用不存在的 safari-pinned-tab.svg；改为配置存在时才输出。

## 改版结果

- 采用指定的五色方案、系统字体和明确焦点轮廓；桌面 Hero 左文右像，移动端单列，保留姓名、职称、机构、研究方向和现有个人照片。
- 三方向卡片链接到双语研究页稳定锚点，简述仅概括既有研究正文。
- Selected Publications 已建好双语区域和渲染器；confirmed_ids 留空，完整候选池在 CONTENT-REVIEW.md，不擅自选代表作。
- 25 条原记录集中到 data/publications.json，按原状态分为 24 条已发表、1 条在审；单设预印本区域，明确本站没有列出记录，不断言没有预印本。
- 原论文总数与 About 不一致，部分期刊举例把在审稿件混入成果概览；对应统计移入待确认文档，未重算或改动论文状态。
- 首页不展示旧科研封面图，静态文件保留。无新增科研图、实验结果、出版信息或外部运行依赖。
- 主题源码、部署脚本、静态图片和 CV 均未修改。

## 验证结果

- tools/hugo.exe --gc --minify：通过，EN 14 / ZH 12 个 Hugo 输出页（包含辅助输出）。
- node scripts/check-site.cjs：17 个 HTML 文件、335 个内部链接/资源引用全部有效；10 个核心双语页面均保留且 canonical、description、lang、翻译链接、当前导航和图片 alt 检查通过。
- node scripts/check-browser.cjs：使用本机 Edge headless；10 页 × 320/390/768/1440 px 共 40 个组合无横向页面溢出，导航触控高度至少 44 px。
- 键盘 Tab / Enter 跳过导航后焦点进入 main；减少动态效果模式通过；无页面 JavaScript 异常。
- 截图人工复核：英文桌面与中文手机布局；四份双语桌面/手机截图保存在 qa/，不纳入 Git。
- 原始内容审计：中英文合计 50 条引文逐条一致；两个专利段落一致；研究正文除新增锚点外一致（归一化 CRLF/LF）。
- 指定标题/正文/强调色在主背景和卡片背景上的对比度均超过 4.5:1，最低 6.72:1。
- git diff --check：通过。Windows LF/CRLF 提示不是构建错误。
- 未对外部 DOI、个人资料和最新出版状态作联网核验；上述状态保真是与仓库原记录比较，不代表最新出版事实认证。
- 未进行完整屏幕阅读器审计。浏览器测试是 Edge，不代表全部浏览器。

## 已知限制与发布前事项

- PaperMod 内部 RSS / OpenGraph 使用旧 .Language.LanguageCode，Hugo 给出弃用提示但构建成功。保留主题源码未修改，后续升级主题时解决。
- 原部署脚本会强推 gh-pages，并使用可能向上匹配父仓库的 git rev-parse 来检测 public/。首次部署前应单独审核隔离检查。本阶段未执行此脚本。
- 用户需确认代表作 ID 与排序、统计数字及日期、在审稿件是否继续公开投稿期刊。详见 CONTENT-REVIEW.md。
- GitHub Pages 后台发布源需要发布阶段确认，本阶段不自行上线。

## 文件变更清单

- .gitignore
- README.md
- assets/css/extended/custom.css
- content/en/about.md
- content/en/publications.md
- content/en/research.md
- content/zh/about.md
- content/zh/publications.md
- content/zh/research.md
- hugo.yaml
- layouts/_partials/extend_head.html
- layouts/_partials/head.html
- layouts/_partials/header.html
- layouts/index.html
- package.json
- data/home.json
- data/publications.json
- data/selected_publications.json
- docs/CONTENT-REVIEW.md
- layouts/_partials/extend_footer.html
- layouts/baseof.html
- layouts/shortcodes/publication-list.html
- scripts/check-browser.cjs
- scripts/check-site.cjs
- docs/PHASE1-REPORT.md

## 2026-10-28 发布更新
用户确认已发表论文统一为 24 篇，并授权更新线上网站。重新构建及链接检查通过。源码提交到 codex/academic-homepage-phase1，发布产物通过独立 gh-pages 检出目录进行普通快进推送，不运行旧 deploy.js。实际发布结果见本次交付消息。

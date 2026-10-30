# v5 研究方向配图与页面收尾

## 状态与依据

独立分支 codex/site-v5-research-diagrams。本轮在本地完成并验证，未推送或部署。依据作者提供的 F:/deepseek/zhaoxinjia-site-v5-brief.md 与 F:/deepseek/cv/figdraft/fig{1,2,3}-wire.svg/png。工单中的旧素材目录与实际附件位置不同，使用实际提供的文件。用户本轮明确确认继续不加招生信息，因此 Contact 保持原内容。

## 完成内容

- 六张 SVG 保留原文件名和 1200×520 尺寸，使用项目原生矢量；未引入依赖，未修改 Hugo 或 PaperMod 主题源文件。
- 图一：通用固态孔、五类局部相互作用、共用电流尺度的两种分子示意曲线、ΔI 与 Δt。
- 图二：同一时间轴的电压与电流示意，捕获／驱回／再捕获；采用工单允许的定性 σ 对比柱，未生成无来源散点或填写 N。电压极性尚未确认，图中不标正负极性，图注明确曲线和电流幅度仅为示意。
- 图三：MD 与有限元（PNP）左右并行，各自对照电流特征；使用孔内分子、定性相互作用标签、网格与电势-位置示意，未使用假 MD 快照、云图或相互作用数值。
- alt 和实际 figcaption 共用双语描述，均含 schematic／概念示意、not to scale／非等比例，并区分实验数据与模拟结果。无 DRAFT、placeholder、to be supplied 字样。
- Research 与首页方向名对应。方向一新锚点 molecular-recognition，并保留 nanopore-sensing 旧锚点。方向二保留 single-molecule-manipulation，方向三保留 mechanistic-studies。
- 方向三相关论文改为 pub-04（Small 2022）、pub-21（Angew 2025）、pub-23（Analysis & Sensing 2026 综述）；其余两个方向相关论文不变。
- 首页八篇代表论文按年份降序：2026、2026、2025、2024、2024、2021、2021、2019。已接收状态采用统一的 Accepted · in press／已接收 · 待刊标签。
- 全站公开说明文字不再使用 multiscale／多尺度，原论文标题与完整引文保留原文。全部论文标题、年份、作者、DOI、状态等元数据不变，仍为 24 篇已发表与 1 篇已接收待刊。
- 无会议报告材料，未创建或发布空 Talks 页面；未提供可公开论文 PDF，本轮未新增论文下载链接。

## 改动文件

- static/img/research-{recognition,manipulation,mechanism}{,-zh}.svg
- scripts/generate-research-diagrams.cjs：可维护的生成源；运行 node scripts/generate-research-diagrams.cjs 重建六张图。
- layouts/shortcodes/research-figure.html：完整图注、alt、相关论文，保留原容器、渐隐、焦点、滑动提示和 lazy 加载。
- content/en/research.md、content/zh/research.md：研究方向标题与正文、兼容锚点。
- data/home.json、data/selected_publications.json：首页卡片与论文顺序。
- data/publications.json、data/news.json：综述说明去掉多尺度措辞，未改论文标题或出版字段。
- layouts/_partials/publication-entry.html、layouts/shortcodes/publication-list.html：统一待刊标签。
- README.md、docs/V5-REPORT.md：维护方法与验收记录。

## 验证结果

- Hugo 0.166.0 extended，hugo --gc --minify --cleanDestinationDir 构建通过，无构建 warning。
- 13 个 HTML、297 个内部引用、10 个双语核心页面检查通过。
- 全站 60 项响应式检查通过，宽度 320、360、390、768、1024、1440；无浏览器运行错误，键盘跳转和减少动画检查通过。
- Research 20 项双语、深浅色布局检查通过；8 组 axe 检查（390/1440 px、双语、深浅色）零违规。
- 六张 SVG 的实际字体、图幅边界和文字包围框检查通过，未发现文字相互重叠；已查看六张 650 px 宽渲染图。
- 新旧锚点、三个可聚焦滚动区域、移动端滑动提示与方向三论文检查通过。

| SVG | 体积 | 英文词数／中文字数 | 最小字号 |
|---|---|---|---|
| research-recognition.svg | 4031 B | 24 | 22 px |
| research-manipulation.svg | 3178 B | 26 | 22 px |
| research-mechanism.svg | 4858 B | 31 | 22 px |
| research-recognition-zh.svg | 4008 B | 37 | 22 px |
| research-manipulation-zh.svg | 3211 B | 44 | 22 px |
| research-mechanism-zh.svg | 4813 B | 59 | 22 px |

## 后续可替换素材

真实同尺度 I–t 轨迹、带协议极性的连续 V/I 记录、同一分子的 N 次重捕数据、MD 快照与有限元网格／电势结果尚未提供。现版可直接作为标明的概念图使用，不阻碍本地交付；日后获取真实数据后再按来源替换，不能直接取消 schematic 标注。

# 赵新佳个人学术网站

[访问网站](https://zhaoxinjia.github.io/) · [中文版](https://zhaoxinjia.github.io/zh/)

Hugo 0.166.0 extended + PaperMod，默认英文，中文位于 /zh/。定制均在项目级目录，不修改主题源码。

## 本地构建与检查

```powershell
npm run build
npm run check
npm run dev -- --host 127.0.0.1
```

构建使用 tools/hugo.exe，输出 public/，不提交构建目录。可直接执行 tools/hugo.exe --gc --minify --cleanDestinationDir。
scripts/check-browser.cjs 为可选浏览器检查，需要环境中的 Playwright 与 Edge，不属于站点运行依赖。

## 页面与维护

| 页面 | 英文 | 中文 |
|---|---|---|
| 首页 | / | /zh/ |
| 关于 | /about/ | /zh/about/ |
| 研究 | /research/ | /zh/research/ |
| 论文 | /publications/ | /zh/publications/ |
| 联系 | /contact/ | /zh/contact/ |

- 双语正文：content/en/ 与 content/zh/，必须同步维护。
- 首页文案与研究入口：data/home.json。
- 论文：data/publications.json，使用稳定 ID；状态为 published、in_press（已接收待刊）、preprint、under_review。citation.en/zh 保留原始完整引文，结构化 title/authors/year/journal/doi 用于列表展示，更新时同步维护。
- self_role 为 first、cofirst、corresponding 或空字符串；当前已发表 24 篇，其中 6 篇第一/共同第一、1 篇共同通讯。另有 1 篇已接收待刊，不计入 24 篇已发表数字。
- short_authors 控制简短作者显示，必须保留本人姓名；完整作者可在页面展开。
- 代表作：data/selected_publications.json 的 confirmed_ids，顺序即首页展示顺序；summary.en/zh 在论文记录中维护。
- 动态：data/news.json，日期使用真实上线日期，附对应 publication ID，最多展示 5 条。
- CV：static/cv/Xinjia_Zhao_CV_EN.pdf 与 Xinjia_Zhao_CV_ZH.pdf；data/cv.json 控制双语主页、导航的对应下载入口，联系页提供两版。旧 Xinjia_Zhao_CV.pdf 为中文版兼容地址，更新中文时须同步。PDF 由作者维护，原文件直接发布。
- 专利：data/patents.json，granted 与 application 分开维护，保留各语言标题、发明人顺序、专利号/申请号及来源。
- 头像：static/img/portrait-cutout.webp，PNG 兜底；原始 photo.jpg 保留。logo 使用 64/128 px 版本。
- 科研示意图：static/img/research-*.svg，中英各三张概念图。运行 node scripts/generate-research-diagrams.cjs 可重建；在生成脚本中修改图形后运行，不手工修改生成文件。图注和相关论文由 layouts/shortcodes/research-figure.html 维护。不代表实验数据或模拟结果；不要填入未确认的电压极性、次数和数值。
- 分享图：static/img/og-cover.png（1200×630）。
- 深浅色与移动端样式：assets/css/extended/custom.css；默认深色，可切换浅色。
- schema、OpenGraph、Twitter 与首页标题：layouts/_partials/ 内项目级覆盖。
- 主题升级后复核项目级覆盖。版权年份已由原主题 now.Year 自动生成。
- 详细变更和限制见 docs/PHASE2-REPORT.md。历史记录见 docs/PHASE1-REPORT.md。

## 部署

GitHub Pages 发布源已通过成功的 Pages 工作流确认使用 gh-pages。main 保存源码；在独立工作分支完成修改后再合入。
发布时在独立目录检出 gh-pages，替换构建产物，普通快进推送，不强制覆盖历史；.nojekyll 必须保留。

**不要直接运行旧 npm run deploy。** scripts/deploy.js 的 public/ Git 隔离检测可能向上匹配源码仓库，且会强推发布分支。
当前使用独立发布目录；qa/ 下的截图、工具与发布目录均被 Git 忽略，不进入源码或网站。

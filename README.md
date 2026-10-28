# 赵新佳个人学术网站

Hugo 0.166.0 extended + PaperMod，默认英文，中文位于 /zh/。保留原主题，定制均在项目级目录。

## 本地构建与检查

```powershell
npm run build
npm run check
npm run dev -- --host 127.0.0.1
```

Hugo 使用 tools/hugo.exe，无需全局安装。构建输出 public/，不提交。
scripts/check-browser.cjs 是可选浏览器验证工具，需要环境中可用的 Playwright 和 Edge；不属于站点运行依赖。
可通过 PLAYWRIGHT_CHANNEL 改选已安装的浏览器通道。

## 内容与路径

| 页面 | 英文 | 中文 |
|---|---|---|
| 首页 | / | /zh/ |
| 关于 | /about/ | /zh/about/ |
| 研究 | /research/ | /zh/research/ |
| 论文 | /publications/ | /zh/publications/ |
| 联系 | /contact/ | /zh/contact/ |

- 双语正文：content/en/ 与 content/zh/。
- 首页双语文案与研究入口：data/home.json。方向文案来自对应 research.md；三个稳定锚点在研究页标题中维护。
- 全部引文：data/publications.json。ID 稳定且不复用；status 仅使用 published、preprint、under_review；citation.en / citation.zh 保留双语原始引文 HTML，仅维护者可编辑。
- 更新论文状态必须以作者确认或可核验出版记录为依据，不按年份、期刊名或是否有 DOI 推断。
- 代表作：data/selected_publications.json。confirmed_ids 决定首页展示与顺序；目前为空。pending_ids 是待确认池，不会展示为代表作。确认后从 pending_ids 移除对应 ID；仅 published 记录可进入 confirmed_ids。
- 待确认完整清单与原始统计：[docs/CONTENT-REVIEW.md](docs/CONTENT-REVIEW.md)。
- 头像和历史图片：static/img/；CV：static/cv/Xinjia_Zhao_CV.pdf。
- 配色、响应式和焦点样式：assets/css/extended/custom.css。
- 主题升级后复核 layouts/baseof.html、layouts/_partials/head.html 及其他项目级覆盖，不直接改 themes/。

## 部署边界

原有源码分支 main；仓库存在 gh-pages，原 README 与 scripts/deploy.js 指向该分支发布。
未查询 GitHub Pages 后台设置，因此发布源以实际仓库设置为准。没有 GitHub Actions 工作流。
本阶段仅本地分支 codex/academic-homepage-phase1，不推送、不上线。

**不要把 npm run deploy 当作预览命令。** 现有脚本会强推 gh-pages 并尝试提交和推送 main。
它使用 git rev-parse 检测 public/ 的仓库，可能向上匹配源码仓库；首次部署前应单独审核并修正隔离检查。
本阶段未执行或修改该脚本。未来部署需另行明确授权。

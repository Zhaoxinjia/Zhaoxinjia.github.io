# 赵新佳个人学术网站

基于 **Hugo + PaperMod** 的双语（英文默认 / 中文）个人学术主页，极简扁平暗色风格。

## 本地预览

```bash
npm run dev        # 启动开发服务器，默认 http://localhost:7100
```

## 页面结构

| 路径 | 英文 | 中文 |
|---|---|---|
| 首页 | `/` | `/zh/` |
| 关于我 | `/about/` | `/zh/about/` |
| 研究方向 | `/research/` | `/zh/research/` |
| 发表论文 | `/publications/` | `/zh/publications/` |
| 科研项目 | `/projects/` | `/zh/projects/` |
| 联系方式 | `/contact/` | `/zh/contact/` |

## 更新内容

- 英文内容：`content/` 根目录下的 `.md` 文件
- 中文内容：`content/zh/` 目录下的同名 `.md` 文件
- 发表新论文：同时编辑 `content/publications.md` 和 `content/zh/publications.md`
- 头像 / 图标：`static/img/`；简历 PDF：`static/cv/Xinjia_Zhao_CV.pdf`
- 站点配置（菜单、社交链接、简介文字）：`hugo.yaml`

## 部署到 GitHub Pages（免费域名 zhaoxinjia.github.io）

1. 在 GitHub 创建账号，新建仓库，仓库名必须为 **`zhaoxinjia.github.io`**
2. 推送代码：`git remote add origin https://github.com/zhaoxinjia/zhaoxinjia.github.io.git && git push -u origin main`
3. 在仓库 **Settings → Pages** 中，Source 选择 **GitHub Actions**
4. 新建 `.github/workflows/deploy.yml`（Hugo 官方 Action 工作流，可从 Hugo 官网复制），推送后自动构建部署
5. 几分钟后访问 https://zhaoxinjia.github.io

以后每次更新内容：修改 `.md` 文件 → `git add . && git commit -m "update" && git push`，网站自动重新部署。

## 注意事项

- `hugo.yaml` 中的 `baseURL` 已与 GitHub Pages 域名对应；若改用自定义域名需同步修改
- Hugo 可执行文件在 `tools/hugo.exe`（v0.166.0 extended），无需另行安装

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
| 联系方式 | `/contact/` | `/zh/contact/` |

## 更新内容

- 英文内容：`content/` 根目录下的 `.md` 文件
- 中文内容：`content/zh/` 目录下的同名 `.md` 文件
- 发表新论文：同时编辑 `content/publications.md` 和 `content/zh/publications.md`
- 头像 / 图标：`static/img/`；简历 PDF：`static/cv/Xinjia_Zhao_CV.pdf`
- 站点配置（菜单、社交链接、简介文字）：`hugo.yaml`

## 部署（已上线：https://zhaoxinjia.github.io）

网站已部署到 GitHub Pages，发布源为仓库的 `gh-pages` 分支（存放构建后的静态文件），源代码在 `main` 分支。

**更新网站后发布：**

```bash
npm run deploy      # 本地构建 → 提交 public/ → 推送到 gh-pages，自动上线
```

日常更新内容的完整流程：

1. 编辑 `content/` 下的 Markdown 文件（中英文同步修改）
2. `git add . && git commit -m "update" && git push`（保存源代码）
3. `npm run deploy`（发布到线上）

> 首次在新机器上使用时，需先在 `public/` 目录里配置一次推送凭据（`git remote add origin https://github.com/Zhaoxinjia/Zhaoxinjia.github.io.git`，并登录 GitHub 账号或使用令牌）。

## 注意事项

- `hugo.yaml` 中的 `baseURL` 已与 GitHub Pages 域名对应；若改用自定义域名需同步修改
- Hugo 可执行文件在 `tools/hugo.exe`（v0.166.0 extended），无需另行安装

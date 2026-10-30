# 2026-10-30 双语 CV 与网站同步

## 依据与范围

依据作者提供的 F:/deepseek/cv/out/Xinjia_Zhao_CV_EN.pdf 与 Xinjia_Zhao_CV_ZH.pdf。已逐页查看两份 PDF（各 2 页），原文件按字节直接发布，未修改 PDF 正文或加入标记。专利和稿件状态取自作者简历，未额外声称已通过出版商或专利登记机关核验。

## 改动文件

- static/cv/Xinjia_Zhao_CV_EN.pdf、Xinjia_Zhao_CV_ZH.pdf：新双语下载；旧 Xinjia_Zhao_CV.pdf 同步为新版中文文件，保留旧地址。
- data/cv.json、layouts/_partials/header.html、layouts/index.html、content/{en,zh}/contact.md：各语言导航与首页下载相应版本，联系页同时提供两版。
- data/home.json、content/{en,zh}/{about,research}.md、hugo.yaml、layouts/_partials/templates/schema_json.html：PIToN 模型、分子重复测量、分子动力学与有限元模拟；补齐科研项目、人才计划、会员信息；更新 SEO 描述。
- static/img/research-mechanism{,-zh}.svg：现有概念图文字补齐有限元模拟，仍明确标注为示意图。
- data/publications.json、data/selected_publications.json、layouts/shortcodes/{publication-list,research-figure}.html、layouts/_partials/publication-entry.html：已发表 24 篇的标题、作者、引文、年份、期刊和 DOI 未变；pub-25 按双语 CV 从在审改为已接收待刊，单独分组，不补造 DOI、卷期页码或接收日期；首页与中文 CV 的八篇代表性论文对齐。已发表第一／共同第一／通讯论文仍为 7 篇。
- data/patents.json、layouts/shortcodes/patent-list.html、content/{en,zh}/publications.md：3 项授权与 2 项申请分组，列原名称、双语名称、发明人顺序及专利号／申请号。
- assets/css/extended/custom.css：待刊标签与专利条目排版。
- layouts/_partials/footer.html、layouts/baseof.html：项目级主题覆盖，为返回页首按钮补充导航区域和双语名称，并按语言缓存页脚。未修改主题源码。
- scripts/check-{site,browser}.cjs、README.md、docs/CONTENT-REVIEW.md：维护规则与检查支持待刊状态、八篇选目和双语 CV。

## 验证

- Hugo 0.166.0 extended 构建通过；13 个 HTML、297 个内部引用、10 个双语核心页面检查通过。
- 60 项核心页面响应式检查通过，覆盖 320/360/390/768/1024/1440 px；键盘跳转、减少动画、运行错误检查通过。
- 60 项深浅色首页／About／Research 布局检查通过；8 组 About／Research axe 检查无违规。
- 12 组深浅色、双语首页／论文／联系页新增内容检查通过，axe 无违规；已核对 8 篇选目、1 篇待刊、3 项授权、2 项申请和两种 CV 入口。
- 查看首页和移动端专利区截图，未见文字遮挡或横向溢出。
- 两份静态 PDF 的 SHA-256 与源文件一致；旧地址与中文文件一致。

英文 SHA-256：900096e741b74a957dbe7c569be22acba145e496e4cc33b937100ee0983ae5fa

中文 SHA-256：2375a2703e6a6c7628043a730cbcec9f4b52419778361e4cfee48099e8786f9d

## 后续维护

待作者取得 pub-25 正式 DOI、卷期页码与出版状态后再更新，不推断发表日期。专利后续授权状态以作者新资料或官方记录为准。未增加招生信息。

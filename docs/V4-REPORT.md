# v4 收尾补丁记录

日期：2026-10-30
分支：codex/homepage-v4-final-polish
基线：0ec115c（v3）
依据：作者提供的 zhaoxinjia-homepage-revision-v4.md，延续主页更新任务。

## 实施

- V4-01：仅收短首页第 2、4、5 条中文说明，移除“针对……改进”“回应……挑战”等生硬表达。
- 第 2 条保留电容低于 1 pF；没有加入“电容是主要噪声来源”或“主导噪声下限”的更强断言。
- 第 4 条采用“同一个分子能不能被测量上千次？”的问句；综述类型、论文数据与现有英文不变。
- 第 5 条保留中性糖链不带电、可辨识信号难以获取的事实，没有改成“几乎没有信号”。
- V4-02：仅改第 2、5 条英文说明，删除 addressing 结尾；第 5 条拆为两个短句。英文六条均不超过 30 词。
- V4-03：采用方案 B，手机滑动提示为 12px、斜体、2px 顶部间距、0.8 透明度。保留 13px 原图注和桌面隐藏行为；0.8 用于兼顾轻量视觉与浅色对比度。
- V4-04：实测后保留小 logo。≤360px 显示 20×20px logo，品牌字为 15px、间距 6px；导航仍完整。
- 正确的 caption、中文 SVG、About 卡片、DOI、七个作者标记、CV 提示、自动版权年份均未调整。
- Contact、Talks、论文 PDF、科研图浅色版本仍不在本轮范围。

## 最终文案

pub-24 / EN：
Below 1 pF: a quartz-supported suspended membrane reduces solid-state nanopore capacitance for low-noise single-molecule recording.

pub-24 / ZH：
石英支撑悬膜将固态纳米孔电容降至 1 pF 以下，为低噪声单分子检测提供器件基础。

pub-19 / ZH：
同一个分子能不能被测量上千次？这篇综述梳理分子乒乓的原理、技术进展与前景。

pub-13 / EN：
Molecular tagging and an engineered aerolysin pore make neutral glycan structures distinguishable. The approach also reveals pore–molecule interactions during translocation.

pub-13 / ZH：
中性糖链不带电，难以在纳米孔中产生可辨识信号。分子标记结合工程化孔道，让结构差异变得可分辨。

## 验证

- Hugo --gc --minify --cleanDestinationDir 无 warning，13 个 HTML、283 处内部引用和十个核心双语页面检查通过。
- Edge：中英 × 深浅 × 320/360/390/1024/1440 × 首页/About/Research，共 60 个组合通过。
- 320/360px logo 实际宽度为 20px；四个菜单链接均位于视口内；最大手机 header 高度仍为 107px。
- 手机提示 computed style 为 12px / italic / opacity 0.8；局部图形键盘横向滚动正常。
- 双语 About/Research × 深浅色共八组 axe WCAG 2 A/AA、2.1 A/AA 与 best-practice 检查无违规项，无脚本错误或失败资源请求。
- 25 条论文记录除指定五个 summary 语言字段外完全一致，未改任何作者、状态、年份、期刊、DOI、原始引文或数字。
- 原有卡片/表格检查、窄屏无溢出检查通过，Git diff --check 通过。
- QA 结果保存在被忽略的 qa/v4-check-results.json；没有为网站增加依赖。

## 文件

- assets/css/extended/custom.css
- data/publications.json
- docs/V4-REPORT.md

## 发布

保留独立分支，源码普通快进同步 main；构建产物经隔离目录普通推送 gh-pages，不强推。
GitHub Pages 结果与线上十页比对以本次交付消息为准。

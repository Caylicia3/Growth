# My Growth Space

一个可长期维护的个人成长主页，展示学习记录、技术项目和有实践依据的技能。站点使用纯 HTML、CSS 和 JavaScript，适合部署到 GitHub Pages 的仓库子路径。

在线访问：<https://Caylicia3.github.io/Growth/>（首次部署完成后生效）。

## 目录结构

```text
my-growth-space/
├── index.html          # 首页
├── learning.html       # 学习时间线与新增记录表单
├── projects.html       # 项目、技能和详情弹窗
├── assets/
│   ├── style.css       # 响应式样式
│   ├── main.js         # 本地记录与项目详情交互
│   └── mnist-validation-accuracy.png  # 已核对的验证准确率曲线
├── 提交说明.txt          # 100–200 字网页说明
└── README.md
```

## 技术栈与运行方式

- HTML5、CSS3、原生 JavaScript；无构建步骤、后端或付费依赖。
- 直接双击 `index.html` 即可浏览；也可在此目录运行 `python -m http.server 8000`，然后访问 `http://localhost:8000/`。
- 三个页面通过 `./` 相对路径互相跳转，资源路径也使用相对地址。

## GitHub Pages 部署

1. 将本目录中的文件提交并推送到 GitHub 仓库的默认分支根目录。如果本目录作为仓库内子目录保存，先把站点文件移到仓库根目录，或将它们放在仓库的 `docs/` 目录。
2. 在仓库 **Settings → Pages → Build and deployment** 中选择 **Deploy from a branch**。
3. 选择默认分支和对应目录（`/(root)` 或 `/docs`），保存后等待 Pages 提供网址。项目仓库网址通常形如 `https://用户名.github.io/仓库名/`。
4. 检查首页、学习记录和项目页面，以及移动端布局。

## 内容维护

- 首页身份文字、简介及 GitHub 链接位于 `index.html`；首页使用公开称呼 Caylicia；发布前请核对 GitHub 用户名。
- 初始学习记录位于 `learning.html`。新增公开记录时，可复制一个 `.timeline-item` 并设置 `data-sort-date="YYYY-MM-DD"`；日期越新越靠前。
- 项目卡片位于 `projects.html`，详情数据位于 `assets/main.js` 的 `projects` 对象；添加新项目时两处需要使用相同的项目键。
- 表单新增的学习记录只保存在**当前浏览器的 LocalStorage**，不会自动同步到其他设备，也不会自动发布到 GitHub Pages。要公开展示，请手动把内容整理进 `learning.html`，提交并重新部署。清除浏览器站点数据会删除这些本地记录。
- 表单展示用户输入时使用 `textContent`，避免将输入当作 HTML 执行。

## 内容与证据原则

- 项目页的代码片段来自实际项目；其中失物招领项目的原始源码经过压缩，因此变量名较短。MixTunes 片段来自 `app/ui/locate-playing.js`。
- MNIST 的 exp_007 验证准确率来自原项目 `summary.csv` 与 `runs/exp_007_training_steps/README.md`；站内展示的是验证曲线，不是测试集结果。
- 不上传占位截图、虚构邮箱或未经核实的个人资料。首页使用本人确认的公开称呼。
- 改动网站内容时，先更新相应 HTML 或 `assets/main.js`，本地检查三页导航和交互，再提交 Git。部署到 GitHub Pages 后，核对仓库子路径下的页面与资源。

## 作业提交

压缩包应包含本目录的三个独立 HTML 页面、`assets/`、README 和说明文字。`submission/` 是之前为单文件平台限制制作的兼容版本，不属于本次多文件作业压缩包。
压缩包内的 `首页截图-提交版.jpg` 由最终首页的浏览器整页截图压缩而来；原始截图未修改。

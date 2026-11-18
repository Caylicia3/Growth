"use strict";

// 仅存储访客当前浏览器里的新增学习记录。公开内容需更新 HTML 并重新部署。
const STORAGE_KEY = "my-growth-space.learning.v1";

function readEntries() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed.filter(item => item && /^\d{4}-\d{2}-\d{2}$/.test(item.date)) : [];
  } catch { return []; }
}

function makeText(tag, value, className) {
  const el = document.createElement(tag);
  el.textContent = value;
  if (className) el.className = className;
  return el;
}

function renderEntries() {
  const timeline = document.querySelector("#timeline");
  if (!timeline) return;
  timeline.querySelectorAll(".local-entry").forEach(el => el.remove());
  const items = readEntries().sort((a, b) => b.date.localeCompare(a.date));
  for (const item of items) {
    const article = makeText("article", "", "timeline-item local-entry");
    article.dataset.sortDate = item.date;
    article.append(makeText("div", item.date.replaceAll("-", "."), "timeline-date"));
    const card = makeText("div", "", "timeline-card");
    card.append(makeText("span", "本地新增", "pill"), makeText("h3", item.title));
    const list = document.createElement("dl");
    [["学习内容", item.content], ["遇到的问题", item.problem], ["解决过程", item.solution]].forEach(([label, value]) => {
      const row = document.createElement("div");
      row.append(makeText("dt", label), makeText("dd", value));
      list.append(row);
    });
    card.append(list);
    article.append(card);
    timeline.append(article);
  }
  // 对内置记录与新增记录统一按开始日期排序。
  [...timeline.children].sort((a, b) => (b.dataset.sortDate || "").localeCompare(a.dataset.sortDate || "")).forEach(el => timeline.append(el));
}

const form = document.querySelector("#entry-form");
if (form) {
  renderEntries();
  form.addEventListener("submit", event => {
    event.preventDefault();
    const status = document.querySelector("#form-status");
    const data = Object.fromEntries(new FormData(form));
    for (const key of ["date", "title", "content", "problem", "solution"]) data[key] = String(data[key] || "").trim();
    if (Object.values(data).some(value => !value)) { status.textContent = "请填写全部字段。"; return; }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...readEntries(), data]));
      renderEntries(); form.reset(); status.textContent = "已保存在当前浏览器。";
    } catch { status.textContent = "保存失败：请检查浏览器是否允许本地存储，或清理存储空间。"; }
  });
}

const projects = {
  lost: { type: "课程实践", title: "失物招领系统", intro: "使用 HTML、CSS、JavaScript 完成的单文件前端网页。", details: [["解决的问题", "将失物信息发布和查找集中到一个网页，提供关键词搜索与联系方式脱敏。"], ["完成的工作", "实现失物发布、列表展示、关键词搜索、联系方式脱敏和 LocalStorage 数据保存。"], ["实现取舍", "使用浏览器本地存储，无需后端；数据只在当前浏览器内保留。"], ["实践成果", "完成可在浏览器中运行的单文件前端实现。"]], tags: ["HTML", "CSS", "JavaScript", "LocalStorage"] },
  mix: { type: "开源软件开发", title: "MixTunes 功能改进", intro: "参与 Electron 音乐应用的功能开发与协作。", details: [["解决的问题", "改进播放歌曲定位、搜索范围与 Windows 后台播放等使用体验。"], ["参与的工作", "参与当前播放歌曲定位、搜索范围优化、Windows 托盘后台播放和背景系统等功能开发。"], ["验证方式", "配合自动化测试并通过 GitHub Pull Request 提交改动。"], ["实践成果", "完成多项功能实现、自动化测试和 GitHub Pull Request 提交。"]], tags: ["JavaScript", "Git", "GitHub", "Electron"] },
  mnist: { type: "机器学习实践", title: "MNIST 深度学习实验", intro: "用手写数字识别理解神经网络训练流程。", details: [["解决的问题", "用基础图像分类任务理解神经网络训练、验证和参数对比。"], ["完成的工作", "使用 PyTorch 搭建 MLP 网络，开展训练、验证和不同超参数配置的对比实验。"], ["遇到的问题", "张量维度、广播机制、随机初始化和网络内部计算过程需要进一步理解。"], ["解决过程", "结合代码分析模型结构，记录实验指标并比较不同配置的效果。"], ["当前目标", "逐步掌握可复现的实验记录方法。"]], tags: ["Python", "PyTorch", "NumPy", "CUDA"] }
};
const dialog = document.querySelector("#project-dialog");
if (dialog) {
  function openProject(key) {
    const project = projects[key]; if (!project) return;
    dialog.querySelector("#dialog-type").textContent = project.type;
    dialog.querySelector("#dialog-title").textContent = project.title;
    dialog.querySelector("#dialog-intro").textContent = project.intro;
    const detail = dialog.querySelector("#dialog-detail"); detail.replaceChildren();
    project.details.forEach(([heading, value]) => { const section = document.createElement("section"); section.append(makeText("h3", heading), makeText("p", value)); detail.append(section); });
    const tags = dialog.querySelector("#dialog-tags"); tags.replaceChildren(...project.tags.map(tag => makeText("span", tag)));
    dialog.showModal();
  }
  document.querySelectorAll("[data-project], [data-open-project]").forEach(el => el.addEventListener("click", event => {
    if (el.matches("a")) event.preventDefault();
    openProject(el.dataset.project || el.dataset.openProject);
  }));
  dialog.querySelector(".close-dialog").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
}

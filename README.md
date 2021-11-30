# 在公司悄悄看微信读书😀😀😀

---

## 核心功能

- **窗口无边框**
- **调整透明度**
- **窗口置顶**
- **老板键**

---

## 创意由来

事情是这样的

我~~有个同事老王~~，有一天老王在公司摸鱼看小说被老板发现了，直接罚老王996一个月，~~内卷制造者~~老王承认了错误，接受了处罚，但仍然要在工作时间看小说

**问我有没有上班时间看小说不容易被发现的软件**

让我想想办法

作为一个乐于助人的好同事兼程序员，我决定自己写一个工具来帮助老王摸鱼，所以有了这个项目

---

## 下载方式

选择进入下面的下载地址，选择最新的版本，下载 weread-in-company.7z 这个文件

[国内：Gitee](https://gitee.com/zjxlooou/weread-in-company/releases)

[国外：GitHub](https://github.com/zjxlooou/weread-in-company/releases)

---

## 使用方法

下载解压 → 打开 weread-in-company.exe

可以看见熟悉的微信读书网页版了

最上面有一排六个按钮，功能分别是

拖动窗口、刷新、~~调整透明度~~ -> 设置、置顶窗口、最小化窗口（后台运行、托盘里有图标）、关闭窗口

接下来你要做的是

扫码登陆 → 调整窗口到合适的大小 → 调整透明度 → 置顶 → 开始摸鱼吧😊😊😊

---

## 技术栈

[Electron](https://github.com/electron/electron)

[Vue.js 3.0](https://github.com/vuejs/docs-next-zh-cn)

[UI: Ant Design of Vue](https://github.com/vueComponent/ant-design-vue)

---

## 我要开发

- 开发
  
```
npm i                   -- 拉取依赖

npm run dev             -- 运行 Vue

cd ./electron && npm i  -- 拉取 Electron 相关依赖

npm run electron        -- 运行 Electron
```

- 打包（只适配 Windows）
  
```
npm run pack:pre        -- 编译 Vue 项目并准备文件

npm run pack:win        -- 打包 Electron
```

---

## TODO

✅~~增加老板键（默认 Ctrl+Alt+M，这功能真有用）~~

✅~~编辑老板键（本来想让用户自己改配置的，想想还是弄个界面吧😂）~~

✅~~老板键开关~~

✅~~更改主页链接（👴就不用微信读书，👴要看起点）~~

~~好像没啥要做的了，就这样吧~~

2021.11.29 自由拖拽移动窗口（老王强烈要求）
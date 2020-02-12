# Intellij Idea中配置Java web项目
<!-- TOC -->

- [项目设置](#项目设置)
  - [项目](#项目)
  - [模块](#模块)
  - [库](#库)
  - [Facets](#facets)
  - [Artifacts](#artifacts)
    - [什么是artifacts](#什么是artifacts)
    - [配置使用artifacts](#配置使用artifacts)
    - [构建artifacts](#构建artifacts)
    - [部署artifacts到服务器和云平台](#部署artifacts到服务器和云平台)

<!-- /TOC -->
## 项目设置

### 项目

名称 | 作用
--- | ----
`Project name` | 项目名称
`Project SDK` | 项目开发工具包：项目所有模块默认的工具包。每个模块可以根据需求配置指定的SDK。
`Project language level` | 项目语言等级：项目所有模块默认的语言等级。每个模块可以根据需求配置指定的语言等级。
`Project compiler output` | 项目编译输出路径：路径用来存储项目所有编译结果。和每个模块相似的目录都创建在这个路径下面。这个目录包含两个子目录：production和test分别是为了生成代码和测试源代码。每个模块可以根据需求配置指定的编译输出路径。

### 模块

- `Sources`选项卡

  - `Language level`：给此模块单独指定语言等级。
  - `Mark as`：标记目录

- `Paths`选项卡

  给此模块选择编译输出路径：
  
  - `Inherit project compile output path`：继承项目中设置的编译输出路径
  - `Use module compile output path`：单独设置此模块的编译输出路径

- `Dependencies`选项卡

  `Module SDK`：设置此模块依赖的工具包

### 库

### Facets

### Artifacts

#### 什么是artifacts

artifacts是一个项目资产的集合，你把这些项目整合在一起来测试、部署或者分发软件解决方案或其部分。示例包括编译的Java类的集合或打包在Java存档中的Java应用程序、作为目录结构的Web应用程序或Web应用程序存档等。

artifacts是一个档案文件或者是一个包含下列结构元素的目录：

- 一个或多个模块的编译输出
- 模块依赖项中包含的库
- 资源集合（web页面、图片、描述性文件等等）
- 其他artifacts
- 单独的文件、目录、档案

#### 配置使用artifacts

Artifacts根据它的配置生成。它的配置被管理在**Project Structure**面板中（**File | Project Structure | Artifacts**）。

使用artifacts配置关键部分是在**Output Layout tab**具体说明artifacts的结构和内容。

#### 构建artifacts

- 自己构建artifacts：**Build | Build Artifacts**。
- 执行运行/调试配置来构建：

  在运行/调试配置中，**Before launch**任务列表里添加**Build \<ArtifactName\> artifact**任务。当你执行运行/调试配置（**Run | Run 或者 Run | Debug**）时，这个artifacts就会自动构建。

  当运行/调试配置以某种方式使用相关的artifacts时，把构建artifacts任务包含在运行/调试配置中很有用，例如：启动在JAR artifacts中打包的应用程序、部署一个WAR artifacts或者EAR artifacts到应用服务器。

  构建artifacts好后，它会放在`out/artifacts/<artifact_dir>`文件夹里

#### 部署artifacts到服务器和云平台

许多artifacts格式（例如：WAR、Exploded WAR, EAR, Exploded EAR）都可以部署到服务器和云平台。下面是如何部署artifacts的方法：

1. 在服务器或者云`run/debug`配置中，指定一个artifacts来部署。（使用`Deployment`标签）
2. 执行`run/debug`配置，或者使用应用程序服务器、运行或调试工具窗口中的Deploy命令（deploymentConsoleDeployAll）。

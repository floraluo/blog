# VsCode开发JavaWeb程序

2020-02-09 11:11:39

<!-- TOC -->

- [准备工作](#准备工作)
- [安装Java需要的插件](#安装java需要的插件)
- [使用maven创建一个Webapp](#使用maven创建一个webapp)
  - [设置maven的镜像](#设置maven的镜像)
  - [创建Webapp](#创建webapp)
- [发布到本地Tomcat服务器](#发布到本地tomcat服务器)

<!-- /TOC -->
## 准备工作

确保已经安装：

1. jdk
2. tomcat

## 安装Java需要的插件

- `Java Extension Pack`

  收集了包括编辑、测试、调试的流行插件

  名称 | 描述
  --- | ---
  `Language Support for Java(TM) by Red HatPreview` | 提供智能语言服务（代码跳转、自动完成、重构、代码模板）
  `Debugger for Java` | 提供调试功能
  `Java Test Runner` | 在VS Code中运行和调试 JUint/TestNG 测试
  `Maven for Java` | 提供更丰富的Maven支持（项目脚手架、自定义goal）
  `Java Dependency ViewerPreview`| 查看Java依赖（引用库、资源文件、包、class）
  `Visual Studio IntelliCode`| AI辅助开发

- 其他流行的插件

  1. `Spring Boot Tools`
  2. `Spring Initializr Java Support`
  3. `Spring Boot Dashboard`
  4. `Tomcat`
  5. `Jetty`
  6. `CheckStyle`

## 使用maven创建一个Webapp

### 设置maven的镜像

1. 查找到maven安装位置

    ```sh
    which mvn
    ```

2. 打开maven的安装目录`/conf/settings.xml`，在`mirrors`节点中添加下面代码

    ```xml
    <mirror>
      <id>alimaven</id>
      <name>aliyun maven</name>
      <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
      <mirrorOf>central</mirrorOf>
    </mirror>  
    ```

### 创建Webapp

1. 按下`ctrl + shift + p`输入 maven，选择从 Maven 原型生成
2. 选择`maven-archetype-webapp`，等待maven下载各种依赖，并要求你填写 `groupId`、`artifactId`等，然后就会建立一个简单的java web app项目

    - `groupId`：是项目组织唯一的标识符，实际对应JAVA的包的结构，是main目录里java的目录结构。
    - `artifactId`: 是项目的唯一的标识符，实际对应项目的名称，就是项目根目录的名称。

      例如tomcat项目的GroupId是org.apache，它的域是org（因为tomcat是非营利项目），公司名称是apache，`ArtifactId`是tomcat。域又分为org、com、cn等等许多，其中org为非营利组织，com为商业组织，cn表示域为中国。我创建的这个Java Web项目groupId: cn.lf, artifactId: webapp
3. 执行`mvn clean package`将项目打包后，在 target 目录中会生成 `.war` 文件

## 发布到本地Tomcat服务器

1. `shit + commond + P`打开命令面板，选择`Tomcat: Add Tomcat Server`添加tomcat服务
2. 右击`target`目录中的`.war`文件，选择`Run On Tomcat Server`
3. 在`TOMCAT SERVERS`列表里，启动的server中右击选择`Open In Browser`

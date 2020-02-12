# 搭建JavaWeb开发环境
<!-- TOC -->

- [1. JDK安装](#1-jdk安装)
- [2. tomcat安装与配置](#2-tomcat安装与配置)
  - [安装tomcat](#安装tomcat)
  - [Intellij Idea中配置tomcat](#intellij-idea中配置tomcat)
  - [VS Code中配置tomcat](#vs-code中配置tomcat)
- [创建Java web应用](#创建java-web应用)
  - [VS Code中创建](#vs-code中创建)
  - [Intellij Idea中创建](#intellij-idea中创建)

<!-- /TOC -->

## 1. JDK安装

## 2. tomcat安装与配置

### 安装tomcat

[安装tomcat](https://github.com/floraluo/blog/blob/master/tomcat/macOS%E5%AE%89%E8%A3%85tomcat.md)

### Intellij Idea中配置tomcat

在【运行/调试配置】（Run/Debug Configurations）面板中：

名称 | 作用/含义
--- | ---
`Name` | 这个tomcat服务器名称
`Before launch` | 启动服务器之前需要干什么。`Activate tool window`: 激活工具窗口
`Application server` | 应用服务器
`On 'Update' action` | Idea中执行‘更新’操作时：`Update resources`服务器更新静态资源， `Updata classes and resources`服务器更新类和静态资源，`Redeploy`服务器重新部署， `Restart server`重启服务器
`On frame deactivation` | Idea失活时：`Do nothing`什么也不做， `Update resources`服务器更新静态资源， `Updata classes and resources`服务器更新类和静态资源

### VS Code中配置tomcat

## 创建Java web应用

### VS Code中创建

[VSCode开发JavaWeb程序](https://github.com/floraluo/blog/blob/master/java/VSCode%E5%BC%80%E5%8F%91JavaWeb%E7%A8%8B%E5%BA%8F.md)

### Intellij Idea中创建

# 搭建JavaWeb开发环境
<!-- TOC -->

- [1. JDK安装](#1-jdk安装)
- [2. tomcat安装](#2-tomcat安装)
  - [2.1. tomcat目录结构](#21-tomcat目录结构)

<!-- /TOC -->

## 1. JDK安装

## 2. tomcat安装

```sh
#搜索tomcat是否存在：
brew search tomcat

#安装tomcat：
brew install tomcat

#检查是否安装成功：
catalina -h

#运行tomcat：
catalina run
```

使用`brew`命令安装不需要再额外配置环境变量，因为安装时HomeBrew自动软连接命令文件至`/usr/local/bin`

### 2.1. tomcat目录结构

| 目录 | 说明
| --- | ---
| `/bin` | 存放各种平台下用于启动和停止的命令文件
| `/conf` | 存放Tomcat服务器的各种配置文件
| `/lib` | 存放Tomcat服务器所需的各种JAR文件
| `/logs` | 存放Tomcat的日志文件
| `/temp` | 存放Tomcat运行时的临时文件
| `/webapps` | 当发布Web应用时，默认会将Web应用的文件发布到此目录中
| `/work` | Tomcat把由JSP生成的Servlet放于此目录

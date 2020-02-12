# macOS安装tomcat
<!-- TOC -->

- [使用HomeBrew安装](#使用homebrew安装)
- [手动安装](#手动安装)
- [tomcat目录结构](#tomcat目录结构)

<!-- /TOC -->
## 使用HomeBrew安装

```sh
#搜索tomcat是否存在：
brew search tomcat

#安装tomcat：
brew install tomcat

#检查是否安装成功：
catalina -h

#运行tomcat：
catalina run
# 浏览器输入http://localhost:8080出现tomcat主页即启动成功
```

使用`brew`命令安装不需要再额外配置环境变量，因为安装时HomeBrew自动软连接命令文件至`/usr/local/bin`

## 手动安装

1. 到[tomcat](http://tomcat.apache.org/)官网选择要安装的版本号，并下载`tar.gz`格式的安装包
2. 把解压后的文件复制到用户个人资源库`~/Library`
    - 手动复制步骤：
      1. 打开访达`Finder`，在导航栏点击【前往】【前往文件夹】（快捷键：`Shift + Command + G`）打开前往文件夹面板，输入`~/Library`
      2. 复制刚才解压的tomcat安装包到资源库`Library`
    - 命令复制步骤：

      ```sh
      # 移动目录命令语法：
      # mv <原始路径> <目标路径>
      # 假如`tar.gz`包下载并解压到`Downloads`目录
      mv ~/Downloads/apache-tomcat-9.0.30 ~/Library

      # 或者先进入到`~/Downloads` 再进行移动操作
      cd ~/Downloads
      mv apache-tomcat-9.0.30 ~/Library
      ```

3. 授权`bin`目录下`.sh`文件权限

    ```sh
    cd ~/Library/apache-tomcat-9.0.30/bin
    sudo chmod 755 *.sh
    ```

4. 启动tomcat

    ```sh
    cd ~/Library/apache-tomcat-9.0.30/bin
    # 启动tomcat服务器，浏览器输入http://localhost:8080出现tomcat主页即启动成功
    sh startup.sh
    # 关闭tomcat服务器，刷新tomcat主页显示【该网页无法正常运作】即关闭成功
    sh shutdown.sh
    ```

## tomcat目录结构

| 目录 | 说明
| --- | ---
| `/bin` | 存放各种平台下用于启动和停止的命令文件
| `/conf` | 存放Tomcat服务器的各种配置文件
| `/lib` | 存放Tomcat服务器所需的各种JAR文件
| `/logs` | 存放Tomcat的日志文件
| `/temp` | 存放Tomcat运行时的临时文件
| `/webapps` | 当发布Web应用时，默认会将Web应用的文件发布到此目录中
| `/work` | Tomcat把由JSP生成的Servlet放于此目录

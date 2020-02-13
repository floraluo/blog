# HomeBrew 常用命令

- `brew services <subcommand>`: 使用macOS的launchctl（1）后台程序管理器管理后台服务。如果使用**sudo**执行这个命令，那启动的时候在`/Library/LaunchDaemons`下操作。否则登录的时候在`~/Library/LaunchAgents`下操作

  命令 | 作用
  --- | ---
  `[sudo] brew services list` | 列出当前用户所有正在运行的服务
  `[sudo] brew services run (formula\|--all)` | 运行服务方案并在登录（或启动）时不注册启动
  `[sudo] brew services start (formula\|--all)` | 立即启动这个服务方案并在登录（或启动）时注册启动
  `[sudo] brew services stop (formula\|--all)` | 立即停止这个服务方案并在登录（或启动）时不注册启动
  `[sudo] brew services restart (formula\|--all)` | 立即停止（如必须）并启动服务，在登录（或启动）时注册启动
  `[sudo] brew services cleanup` | 删除所有未使用的服务

  例子：

  ```sh
  # 启动/停止mysql服务
  brew services start/stop mysql
  # 或者
  mysql.server start/stop

  # 启动/停止tomcat服务
  brew services start/stop tomcat
  # 或者
  catalina start/stop
  ```

  **注意：只有使用`brew services <subcommond>`启动的服务才能使用`brew services list`查看各个服务的状态和信息**
- `brew info [options] [formula]`: 给使用HomeBrew安装的方案显示简略的统计信息。`[options]`:可选参数项。可通过`brew info -h`查看所有可选项；`[formula]`:方案。即安装的各个软件名字。
# HomeBrew 常用命令

## 基本命令

- `brew install/uninstall <formula>`: 安装/卸载一个包
- `brew list`: 列出所有已安装的包
- `brew search (text|/text/)`: 对`text`的容器标记(cask tokens)和程序公式(formula)名称执行子字符串搜索。如果`text`两侧带有斜杠则将其解释为正则表达式。在线搜索扩展到`homebrew/core`和`homebrew/cask`。如果未提供搜索词，则会列出所有本地可用的公式（formula）。

## 其他命令

- `brew cat <formula>`: 显示程序公式的源码
- `brew cleanup [options] [formula|cask]`: 删除所有formula和cask的过时的锁定文件和过时的下载，并删除已安装公式的旧版本。 如果指定了参数，则仅对给定的`formula`和`cask`执行此操作。

    **options:**

    `--prune`：删除所有早于指定日期的缓存文件。

    `-n，--dry-run`：显示要删除的内容，但实际上不删除任何内容。

    `-s`：清除高速缓存，包括最新版本的下载。 注意对于任何已安装的`formula`或`cask`的下载仍不会被删除。 如果您也要删除它们：`rm -rf“ $（brew --cache）”`

    `--prune-prefix`：仅修剪前缀中的符号链接和目录，不删除其他文件。

- `brew config`: 显示可用于调试的Homebrew和系统配置信息。 如果提交错误报告，则需要提供此信息。
- `brew home <formula>`: 打开formula主页
- `brew tap [options] user/repo [URL]`: 安装包仓库到本地。
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
- `brew extract [options] formula tap`: 浏览仓库历史记录以查找`formula`的最新版本，并在`tap/Formula/formula@version.rb`中创建一个副本。 如果尚未安装tap，请尝试/克隆(install/clone)tap，然后再继续。 要从非`homebrew/core`的tap中获取包，请使用其完全限定的`user/repo/formula`形式。

  **options:**

  `--version`: 获取指定版本formula，而不是最新版。

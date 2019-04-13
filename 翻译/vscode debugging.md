## Launch.json attributes
有许多`launch.json`的属性来支持不同的调试和调试场景。只要你指定了`type`的值，就可以使用智能感知（IntelliSense **`^Space`**）功能来查看可用属性的列表。
![launch-json-suggestions](https://github.com/floraluo/blog/blob/master/%E7%BF%BB%E8%AF%91/image/vscode/launch-json-suggestions.png)
**每个启动配置都必须具有以下属性：**

- `type` - 用于此启动配置的调试器类型。每个安装的调试扩展都会引入一种类型，例如，node内置节点调试器，php以及goPHP和Go扩展。
- `request` - 此启动配置的请求类型。目前只支持`launch`和`attach`。
- `name` - 查看方便的名字，显示在“调试启动配置”下拉列表中。

**所有启动配置的一些可选属性：**

- `preLaunchTask` - 在调试会话开始之前将要启动的任务，这个属性的值是`tasks.json`（在工作区的`.vscode`文件夹中）的一个任务名字。
- `postDebugTask` - 调试会话刚结束时将要启动的任务，这个属性的值是`tasks.json`（在工作区的`.vscode`文件夹中）的一个任务名字。
- `internalConsoleOptions` - 在调试会话期间，控制调试控制台面板是否可见。
- `debugServer` - **仅适用于调试扩展作者**：连接到指定端口替代启动配置适配器
- `serverReadyAction` - 每当调试程序输出指定消息到调试控制台或者集成终端时，你想在web浏览器中打开一个url。更详细的信息查看[调试服务器程序时自动打开一个URI](https://code.visualstudio.com/docs/editor/debugging#_remote-debugging)章节。

**很多调试器支持下面某些属性：**

- `program` - 启动调试器时将要运行的可执行文件或文件
- `args` - 传给程序的调试参数
- `env` - 环境变量（值`null`可用于“未赋值”变量）
- `cwd` - 当前工作目录，用于查找依赖项和其他文件
- `port` - 附加到正在运行程序的端口
- `stopOnEntry` - 这个程序启动时立即中断
- `console` - 使用什么种类的控制台，例如，`internalConsole`,`integratedTerminal`,`externalTerminal`

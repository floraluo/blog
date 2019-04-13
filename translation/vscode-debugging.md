## Launch configurations

在VS Code中调试一个简单的应用按`F5`VS Code将会尝试调试你当前活动的文件。

但是，对于大部分调试情景，创建一个启动配置文件会更好，因为它允许你配置并且保存搭建配置的详细信息。在工作区（项目根目录）或者[user settings](https://code.visualstudio.com/docs/editor/debugging#_global-launch-configuration)或者[workspace settings](https://code.visualstudio.com/docs/editor/multi-root-workspaces#_workspace-launch-configurations)中，VS Code会保存位于`.vscode`目录中的`launch.json`文件的调试配置信息。

在VS Code中打开你项目目录（**File** > **Open Folder**）然后在Debug视图顶部选择齿轮图标来创建一个`launch.json`文件。

![launch-configuration.png](https://github.com/floraluo/blog/blob/master/translation/image/vscode/launch-configuration.png)

VS Code将会自动检查你的调试环境，如果失败，你就不得不手动选择了：

![debug-environments.png](https://github.com/floraluo/blog/blob/master/translation/image/vscode/debug-environments.png)

这是调试Node.js生成的启动配置：

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "program": "${file}"
        }
    ]
}
```

如果你回到**文件资源管理器**（`Ctrl+Shift+E` `⌘⇧E`）,就会看到已经创建`.vscode`目录和`launch.json`文件在你的工作区中。

> **注意：** 即使在VS Code中你没有打开一个文件夹，你也可以调试一个简单的应用。但是不可能管理启动配置并且搭建高级的调试。如果你没有打开文件夹，状态栏会是紫色的。

注意，启动配置中可用的属性因调试器而异。你可以用IntelliSense的建议给指定的调试器找出存在的属性。也可以用所有属性的悬停帮助。

不要假设一个调试器的属性对另一个调试器也自动可以使用。如果在启动配置中看到绿色波浪线，鼠标悬停在上面看看是什么问题，并且在启动调试会话之前努力修复它。

检查`launch.json`文件中所有自动生成的值，并确保它们对您的项目和调试环境有意义。

### Launch versus attach configurations

Vs Code中，有两种核心调试模式，**Launch**和**Attach**，它们处理两个不同的工作流和开发人员段。根据你的工作流，选择适用于你的项目的配置会很困惑。

如果你是来自浏览器工具开发背景，可能不习惯“从你的工具启动”，因为浏览器已经打开了。当你打开DevTools，你只是将DevTools附加（**Attach**）到打开的浏览器选项卡。另一方面，如果你是来自服务器或者桌面开发背景，用编辑器为你启动（**Launch**）程序和编辑器自动附加调试器到新启动的程序那是很正常的。

解释**Launch**和**Attach**的不同最好的方法是,VS Code连接应用之前在调试模式中怎样启动应用是**lanuch**配置，怎样连接VS Code调试器到已经运行的应用或程序是**attach**配置。

VS Code通常在调试模式中支持启动一个应用还是连接到一个已经运行的程序。这取决于`request`属性的值是`launch`还是`attach`,VS Code的`launch.json`的验证和建议应该会有一些帮助。

### Add a new configuration

使用下列方法之一可以添加一个新的配置到已经存在的`launch.json`文件：

- 如果光标在`configurations`数组之内，可以使用智能感知（`^Space`）
- 点击`Add Configuration`按钮，在数组起始位置调用智能感知片段
- 在Debug菜单中选择`Add Configuration`选项

![add-config.gif](https://github.com/floraluo/blog/blob/master/translation/image/vscode/add-config.gif)

VS Code也支持在同一时间启动多个配置的混合启动配置。想了解更详细的信息，查看这个[Compound launch configurations](https://code.visualstudio.com/docs/editor/debugging#_compound-launch-configurations)章节

为了启动一个调试会话，首先在Debug视图中使用**配置下拉列表**选择命名为**Launch Program**的配置。一旦在`launch.json`文件中设置了你的启动配置，按`F5`开始调试会话。

另外，也可以通过命令面板（`Ctrl+Shift+P`）运行你的配置，输入`debug `过滤，选择**Debug: Select and Start Debugging**，然后再选择你想要调试的配置。

只要启动了调试会话，**调试控制台**面板会显示出来并展示调试输出信息，状态栏也会改变颜色（橘色是默认的主题色）：

![debug-session.png](https://github.com/floraluo/blog/blob/master/translation/image/vscode/debug-session.png)

另外，**调试状态**出现在状态栏显示正在调试配置的名称。通过选择调试状态，你可以改变正启动的配置并且不需要打开Debug视图启动新的调试。

![debug-status](https://github.com/floraluo/blog/blob/master/translation/image/vscode/debug-status.png)

## Launch.json attributes

有许多`launch.json`的属性来支持不同的调试和调试场景。只要你指定了`type`的值，就可以使用智能感知（IntelliSense **`^Space`**）功能来查看可用属性的列表。

![launch-json-suggestions](https://github.com/floraluo/blog/blob/master/translation/image/vscode/launch-json-suggestions.png)

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


## Variable substitution

vscode生成常用的路径和其他可用的值作为变量，支持在`launch.json`文件中的字符串内变量替换。意味着在调试配置中非必须使用绝对路径。例如，`${workspaceFolder}`表示工作区文件夹的根路径，`${file}`表示在活动编辑器中打开的文件，`${env:Name}`表示‘Name’环境变量。在[Variables Reference](https://code.visualstudio.com/docs/editor/variables-reference)中可以看到所有预定义变量列表，或者在`launch.json`字符串属性调用IntelliSense。

``` json
{
    "type": "node",
    "request": "launch",
    "name": "Launch Program",
    "program": "${workspaceFolder}/app.js",
    "cwd": "${workspaceFolder}",
    "args": [ "${env:USERNAME}" ]
}
```

  ### Variables Reference
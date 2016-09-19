# Android平台指南
  这个指南展示了怎样搭建你的SDK开发环境部署Android设备的Cordova应用程序。将会带你走过整个程序包括安装Android SDK，
在EclipseSDK打开一个Android项目，和部署到一个模拟器或真实设备上。你要跟着这个指南至少需要安装 Android SDK, 不管你下面要进行哪一个
工作流。 ( *Web项目开发* 和 *本地平台开发* 工作流都需要安装 Android SDK并且通过你的PATH可访问)

查看下列指定平台更详细的信息：
    
* [Android Configuration](http://cordova.apache.org/docs/en/3.3.0/guide/platforms/android/config.html)（译本：[Android配置](https://github.com/floraluo/cordova-guide/blob/master/Android%20Configuration.md)）
* [Android WebViews](http://cordova.apache.org/docs/en/3.3.0/guide/platforms/android/webview.html) (译本：[Android Web视图](https://github.com/floraluo/cordova-guide/blob/master/AndroidWebViews.md))
* [Android Plugins](http://cordova.apache.org/docs/en/3.3.0/guide/platforms/android/plugin.html)
* [Upgrading Android](http://cordova.apache.org/docs/en/3.3.0/guide/platforms/android/upgrading.html)
* [Android Command-line Tools](http://cordova.apache.org/docs/en/3.3.0/guide/platforms/android/tools.html)

上面命令行工具（Android Command-line Tools）指的是Cordova3.0以前的版本，[The Command-Line Interface](http://cordova.apache.org/docs/en/3.3.0/guide/platforms/android/tools.html) 关于当前接口的信息。

### Requirements and Support

　　Cordova  Android 需要 Android SDK. 查看 Android SDK的 [系统要求](http://developer.android.com/sdk/index.html)

　　Cordova 支持 Android 2.3.x (华而不实的,从Android API10开始) 和 4.x。根据一般规则，在Google的  [distribution dashboard](http://developer.android.com/about/dashboards/index.html)
上面当Android版本使用人数比例掉到5%，那这个版本就不会被Cordova支持。 Android版本早于API10，和3.x版本(AP11-13) 低于5%。

　　开发者应该使用cordova 工具和 Android SDK结合。怎样安装它看命令行工具接口，添加项目，然后构建部署一个项目。

　　从 [developer.android.com/sdk](http://developer.android.com/sdk/index.html)安装 Android SDK。Android SDK是
分布式的'adt-bundle---'文件。在Windows上，这个adt-bundle被包装到安装程序。在OSX 和Linux，只是把 'adt-bundle'解压到你在本地存
放开放工具的地方。 [在这可以找到更多详细的信息](http://developer.android.com/sdk/index.html)关于Android SDK的安装。

　　为了使用cordova命令行工具，你需要将SDK的 tools 和 platform-tools 目录添加到你的PATH环境中。在Mac中，你可以使用一个文本编辑
器来创建或修改 ~/.bash_profile 文件， 添加一个像下面这样的代码，这个值就是你安装SDK的位置:
> export PATH=${PATH}:/Development/adt-bundle/sdk/platform-tools:/Development/adt-bundle/sdk/tools


　　在新开终端窗口显示SDK工具。另外运行下面这一行，让它在当前的对话窗口可用：
> $ source ~/.bash_profile

在win7中修改PATH环境：

* 点击桌面左下角开始 **菜单**，右击**计算机**，然后点击**属性**.
* 点击左边的**高级系统设置**
* 在打开的对话框中，点击**环境变量**
* 选择 **PATH** 变量并且点击 **编辑**.
* 添加基于你SDK的安装位置到PATH最后，例如：
> ;C:\Development\adt-bundle\sdk\platform-tools;C:\Development\adt-bundle\sdk\tools
 
* 保存并关闭 这两个对话框.

　　你可能也需要使用Java和Ant. 打开一个命令提示符并输入 java 和 ant. 下面添加到 PATH 后面无论哪一个失败：

> ;%JAVA_HOME%\bin;%ANT_HOME%\bin

### 在SDK打开一个项目
使用 cordova 新建一个项目，就像在 Cordova 命令行界面 描述的那样 。例如，在一个源码目录：   

> $ cordova create hello com.example.hello "HelloWorld"
> $ cd hello
> $ cordova platform add android
> $ cordova build

一旦创建成功，这里就是如果使用SDK来修改它：

* 启动 Eclipse 应用程序.
* 选择 新建项目 菜单选项.
* 从弹出的对话框选择 Android Project from Existing Code ,然后点击 Next:
* 放到 hello目录，或者随便哪个你创建项目的目录，然后到 platforms/android 子目录.
* 点击 Finish（完成）.

一旦Eclipse窗口打开，一个红色的 X 可能出现，表示未解决的问题。如果这样的话，继续下面的步骤：

* 右击项目目录.
* 在Properties（属性） 对话框，从导航面板选择Android.
* 对于项目构建目标，选择你已经安装的最高级别Android API
* 点击OK（完成）.
* 从Project 菜单选择 Clean 。这应该纠正项目中所有的错误。

### 部署到模拟器
你可以使用 cordova 在一个模拟器中运行app，或者你也可以在SDKl里运行。不管怎样,至少在一个设备中必须配置 SDK 显示。
使用 Android SDK Manager来配置，从Eclipse分开运行一个Java应用程序。这有两种方法来打开它：

* 在命令行运行android 命令.
* 从Eclipse里，点击这个工具条图标:

一旦开大，这个Android SDK Manager 像是各种各种的运行时库:

选择 **Tools** → **Manage AVDs** (Android Virtual Devices),然后从这个对话框中的**[Device](http://cordova.apache.org/docs/en/3.3.0/cordova/device/device.html) Definitions** 选择任何项目:

点击 **Create AVD**，随便修改name，然后点击 **OK** 保存修改:

然后这个AVD出现在**Android Virtual Devices** 列表中:

打开模拟器作为一个单独的应用程序，选择AVD并且点击**Start**。它将会在这个设备上启动，这个设备上还有一些可控制的硬件按钮:

这时，你可以在命令行使用如下命令将应用程序部署到模拟器:
> $ cordova emulate android

如果你是在Eclipse里工作，右击项目选择**Run As** → **Android Application**. 如果没有你可能会被要求制定一个已经打开的AVD.
为了更快速的体验，使用一个基于Intel处理器的模拟器图片：
* 安装一个或更多在**Extras**下面可用的Intel x86 Atom System Images 和 Intel Hardware Accelerated Execution Manager。
* 运行Intel安装包，在 extras/intel/Hardware_Accelerated_Execution_Manager 目录你Android SDK是可用的。
* 根据设置为Intel image的目标创建一个新的 AVD
* 当启动模拟器的时候，确保这里没有表示加载HAX模块失败的错误信息

 ### 部署到真实的设备
 
直接把app放到设备上面，就像在[Android Developer Site](http://developer.android.com/tools/device.html)中描述的那样确保USBdebugging能够使用，并且连接USB插入到你的系统上。

使用如下命令将app放到设备上行：

> $ cordova run android

其他选择是在Eclipse里，右击项目并且选择**Run As** → **Android Application**.

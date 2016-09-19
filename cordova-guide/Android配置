# Android配置

这个 config.xml 文件控制一个app的基本设置应用于每个应用程序和 CordovaWebView 接口。 这一节详细说明只应用于Android构建的选择参数。这里的[config.xml File](http://cordova.apache.org/docs/en/3.3.0/config_ref/index.html) 文件提供了全局配置选项的信息。

* KeepRunning (boolean, 默认为 true): 决定应用程序在后台是否继续运行即使在 pause 事件触发之后。注意：设置这个值为 false ，在触发 pause 之后将不会退出这个app，当这个app在后台的时候，在cordova webview 只是停止代码的执行。
```
<preference name="KeepRunning" value="false"/>
```
* LoadUrlTimeoutValue (number, default to 20000, 20 seconds): 当加载一个页面时候的时，抛出一个timeout错误之前等待的时间。这个例子指定的是10s而不是默认的20s：
```
<preference name="LoadUrlTimeoutValue" value="10000"/>
```
* SplashScreen: 在 res/drawable 目录里文件减号的扩展名。在不同的子目录里各种各样的资源必须分享这个name。
```
<preference name="SplashScreen" value="splash"/>
```
* SplashScreenDelay (number, defaults to 5000):闪屏图像显示的时间。
```
<preference name="SplashScreenDelay" value="10000"/>
```
* InAppBrowserStorageEnabled (boolean, defaults to true): 控制在[InAppBrowser](http://cordova.apache.org/docs/en/3.3.0/cordova/inappbrowser/inappbrowser.html) 打开页面是否能访问相同的localStorage 和WebSQL 存储当在默认浏览器打开页面的时候。

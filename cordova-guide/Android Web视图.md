# [Android Web视图](http://cordova.apache.org/docs/en/3.3.0/guide/platforms/android/webview.html)

　　这一节展示在一个更大的Android应用程序里如何嵌入一个Cordova-enabled WebView 组件。 有关这些组件之间如果能沟通的详细说明，
请看应用程序插件。

　　如果你对Android不熟悉，那在你尝试更多嵌入一个WebView的不寻常开发选择之前，你首先就应该熟悉 [Android 平台指南](https://github.com/floraluo/cordova-guide/blob/master/AndroidPlatformGuide.md) 和安装了的最新
Android软件开发工具包（Android SDK ） 。开始Cordova 1.9这个Android平台依赖一个 CordovaWebView 组件，它建立在一个遗留的
CordovaActivity 组件之上，这个组件刷新了1.9版本。

1. 保证你有最新版的Cordova来遵循这些说明。从 [cordova.apache.org](http://cordova.apache.org/)下载并且解压他的Android包.
2. 在控制台进入到这个Android包的/framework 目录并且运行 ant jar。它会创建Cordova的 .jar 文件,形成像这样的 /framework/cordova-3.3.0.jar.
3. 复制这个 .jar文件到Android 项目的 /libs 目录.
4. 添加下面内容到应用程序的 /res/xml/main.xml 文件,而且把 layout_height, layout_width 和 id修改成适合这个应用程序的:

  ```
  <org.apache.cordova.CordovaWebView 
    android:id="@+id/tutorialView" 
    android:layout_width="match_parent" 
    android:layout_height="match_parent" />
  ```

5. 修改这个活动这样他就可以实现 CordovaInterface. 它应该实现这个借口包含的所有方法。你可能希望从/framework/src/org/apache/cordova/CordovaActivity.java复制他们，或者你自己来实现他们。下面代码片段展示了一个依赖这个借口的基本应用程序。注意引用的视图id如何匹配上面XML代码片段指定的 id 属性：

  ```
public class CordovaViewTestActivity extends Activity implements CordovaInterface {
     CordovaWebView cwv;
     /* Called when the activity is first created. */
     @Override
     public void onCreate(Bundle savedInstanceState) {
         super.onCreate(savedInstanceState);
         setContentView(R.layout.main);
         cwv = (CordovaWebView) findViewById(R.id.tutorialView);
         Config.init(this);
         cwv.loadUrl(Config.getStartUrl());
     }
```

6. 如果这个应用程序需要使用camera，如下实现：

    ```
    @Override
    public void setActivityResultCallback(CordovaPlugin plugin) {
      this.activityResultCallback = plugin;
    }
    /**
    * Launch an activity for which you would like a result when it finished. When this activity exits,
    * your onActivityResult() method is called.
    *
    * @param command           The command object
    * @param intent            The intent to start
    * @param requestCode       The request code that is passed to callback to identify the activity
    */
    public void startActivityForResult(CordovaPlugin command, Intent intent, int requestCode) {
      this.activityResultCallback = command;
      this.activityResultKeepRunning = this.keepRunning;
  
      // If multitasking turned on, then disable it for activities that return results
      if (command != null) {
        this.keepRunning = false;
      }
  
      // Start activity
      super.startActivityForResult(intent, requestCode);
    }   
  
    @Override
    /**
    * Called when an activity you launched exits, giving you the requestCode you started it with,
    * the resultCode it returned, and any additional data from it.
    *
    * @param requestCode       The request code originally supplied to startActivityForResult(),
    *                          allowing you to identify who this result came from.
    * @param resultCode        The integer result code returned by the child activity through its setResult().
    * @param data              An Intent, which can return result data to the caller (various data can be attached to Intent "extras").
    */
    protected void onActivityResult(int requestCode, int resultCode, Intent intent) {
      super.onActivityResult(requestCode, resultCode, intent);
      CordovaPlugin callback = this.activityResultCallback;
      if (callback != null) {
        callback.onActivityResult(requestCode, resultCode, intent);
      }
    }
```
 
7. 最后，记得加入这个线程池，否则插件没有一个线程来运行：
  ``` java
 @Override
 public ExecutorService getThreadPool() {
     return threadPool;
 }
 ```
 
8. 复制这个应用程序的HTML 和JavaScript 文件到Android 项目的 /assets/www 目录.
 
9. 从 /framework/res/xml 复制这个config.xml 文件到项目的 /res/xml 目录.

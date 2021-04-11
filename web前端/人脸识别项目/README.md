# 人脸采集签到

> 辞职在家待产中，做的一个私活 `^_^`

## 项目框架

项目置于甲方的框架中，脱离了甲方的测试环境等，故而不能正常启动，仅有核心代码可参考。前端框架使用的**layui**

### 目录结构

<del>

|  目录 | 说明 |
|--------|-------|
| `src/views/edu/ai-face/index.html` | 主页面 |
| `src/style/ai_face/` | 静态资源 |
| `src/style/ai_face/signSuccess.mp3` | 音频文件 |
| `src/style/ai_face/js/` |  依赖插件 |

</del>

### 插件
- [cropper](https://github.com/fengyuanchen/cropper)
- [trackingjs](https://trackingjs.com/)

### 核心逻辑说明
- 签到与采集共用一个video；
- 识别人脸签到过程：
  
  1. 获取到摄像头访问权限打开摄像头；
  2. trackingjs插件识别到人脸发起签到请求；
  3. 有多节课时，弹出批量签到窗口，反之插入签到记录到列表第一行；

- 人脸录入采集过程：

  1. 选择需要采集人脸的学员；
  2. 拍摄或者上传一张合格的照片即可；

- 人脸识别跟踪使用trackingjs插件，具体使用方式参考[官方文档](https://trackingjs.com/)
- 拍摄使用cropper插件，具体使用方式参考[官方文档](https://github.com/fengyuanchen/cropper)

- 右侧面板内容的切换，点击tab显示对应panel
- 人脸识别标记人脸过程（trackFace方法）：
  1. 创建人脸对象跟踪，初始化相关参数；
  ``` javascript
  tracker = new tracking.ObjectTracker('face');
  tracker.setInitialScale(4);
  tracker.setStepSize(2);
  tracker.setEdgesDensity(0.1);
  ```
  2. 初始化跟踪源
  ``` javascript
  trackTask = tracking.track('#videoSignIn', tracker, { camera: true });
  ```
  3. 监听跟踪事件
  ``` javascript
  tracker.on('track', (event) => {
    // do something
  });
  ```
  4. 监听到人脸数据标记人脸位置
  ``` js
  let faceCanvas = document.getElementById('canvasFace'),
    faceContext = faceCanvas.getContext('2d'),
    formData = new FormData();
  faceCanvas.width = canvas.width;
  faceCanvas.height = canvas.height;
  // 1。遍历trackingjs插件返回的人脸坐标数据
  // 2.在隐藏的canvas中画出所有人脸位置
  // 3.将第二步的canvas画在显示的canvas中（为了同步标记所有人脸位置）
  event.data.forEach((rect, index) => {
    faceContext.strokeStyle = '#5DAFE2';
    faceContext.lineWidth = 5;
    faceContext.strokeRect(rect.x, rect.y, rect.width, rect.height);

    if (index === (event.data.length - 1) ){
      canvasContext.drawImage(faceCanvas, 0,0);
      faceCanvas.width = 400;
      faceCanvas.height = 300;
      faceContext.drawImage(videoSignIn, 0, 0, 400, 300);
      imgPlaceholder.src = faceCanvas.toDataURL('image/png');
    }
  })
  ```
  5. 发起签到请求

### 注意事项

- 点击人脸采集tab，若摄像头还未打开就切换到人脸考勤，不会关闭摄像头，注意在摄像头打开前禁止触发人脸签到tab点击事件；
- 注意是https协议，否则摄像头启动不了；
- 人脸采集面板中，每个按钮点击注意初始化每一块内容的显隐；
- 适配笔记本尺寸，监听了窗口resize事件，需重新设置video、canvas的尺寸；
- 插入签到记录到列表时，增加了弹簧动效，效果演示完毕需清除动效，否则从采集页切换回来会继续演示一次；
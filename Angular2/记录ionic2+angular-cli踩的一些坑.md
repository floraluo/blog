1. 在chrome和safiri浏览器中运行正常的app，在低版本的安卓手机中，报如下错误。
>  EXCEPTION: TypeError: undefined is not a function


  打断点调试之后发现在ionic2源码中`el.closest('ion-item')`,el没有closest这个方法，所以报错。根据资料[https://developer.mozilla.org/zh-CN/docs/Web/API/Element/closest](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/closest)和[http://caniuse.com/#feat=element-closest](http://caniuse.com/#feat=element-closest)是
低版本安卓不兼容导致的。然后安装了一个[element-closest](https://www.npmjs.com/package/element-closest)包`npm install --save element-closest`解决了这个问题。安装之后在app模块中或者`polyfills.js`文件中（推荐）导入这个包
  ```
//polyfills.ts
//其它已经存在的导入包

import 'element-closest';
```

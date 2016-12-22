2. 在chrome和safiri浏览器中运行正常的app，在低版本的安卓手机中，报如下错误。
>  EXCEPTION: TypeError: undefined is not a function    
> at TextInput.InputBase.initFocus


  打断点调试之后发现在ionic2源码中`el.closest('ion-item')`,el没有closest这个方法，所以报错。根据资料[https://developer.mozilla.org/zh-CN/docs/Web/API/Element/closest](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/closest)和[http://caniuse.com/#feat=element-closest](http://caniuse.com/#feat=element-closest)是
低版本安卓不兼容导致的。然后安装了一个[element-closest](https://www.npmjs.com/package/element-closest)包`npm install --save element-closest`解决了这个问题。安装之后在app模块中或者`polyfills.js`文件中（推荐）导入这个包
  ```
//polyfills.ts
//其它已经存在的导入包

import 'element-closest';
```
1. ios9中遇到的错误

  > EXCEPTION: Can't find variable: Intl 
  
  在[]()找到解决方法，是由于angular2的date pipe依赖internalization API,而这个API不是所有浏览器都适用（例如ios9）
  
  > That's because it relies on the internalization API, which is not currently available in all browsers (for example not on iOS browser).
See the compatibility table.
This is a known issue (beta.1).
You can try to use a polyfill for Intl.
To do so, you can use the CDN version, and add this to your index.html:
<script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.en"></script>
Or if you use Webpack, you can install the Intl module with NPM:
  > ```
npm install --save intl
  > ```
  > And add these imports to your app:
  > ```
import 'intl';
import 'intl/locale-data/jsonp/en';
  > ```

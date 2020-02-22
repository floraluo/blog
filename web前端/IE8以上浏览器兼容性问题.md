# IE8以上浏览器兼容性归纳（持续更新...）

- [HTML5语义标签兼容方案：html5shiv.js](#html5语义标签兼容方案html5shivjs)
- [css3媒体查询（media query）兼容方案：Respond.js](#css3媒体查询media-query兼容方案respondjs)
  - [Respond.js 与 跨域（cross-domain） CSS 的问题](#respondjs-与-跨域cross-domain-css-的问题)
  - [关于Respond.js其他注意事项](#关于respondjs其他注意事项)
- [css3字体单位rem兼容方案：REM-unit-polyfill](#css3字体单位rem兼容方案rem-unit-polyfill)
- [IE8 与 box-sizing 属性](#ie8-与-box-sizing-属性)

## HTML5语义标签兼容方案：html5shiv.js

html5语义标签包括：`section`, `article`, `aside`, `header`, `footer`, `nav`, `figure`, `figcaption`, `time`, `mark` & `main`.

[HTML5 Shiv](https://github.com/aFarkas/html5shiv)使IE6-8可以兼容以上标签

**用法**：将HTML5 shiv包含在页面的`<head>`中的条件注释中以及任何样式表之后

```html
<!--[if lt IE 9]>
<script src="bower_components/html5shiv/dist/html5shiv.js"></script>
<![endif]-->
```

## css3媒体查询（media query）兼容方案：Respond.js

[Respond.js](https://github.com/scottjehl/Respond): 快速，轻便的polyfill，可用于`min/max-width`的CSS3媒体查询（适用于IE 6-8等）。最小化3kb，压缩后压缩1kb，需要兼容IE8及以下版本浏览器的css3媒体查询做响应式网页时用。

**用法**：在引用完所有css(运行的越早，IE8以下用户看到这个样式闪烁的概率就越小)文件之后引入`renpond.min.js`(1kb)

### Respond.js 与 跨域（cross-domain） CSS 的问题

Respond.js的工作原理是通过AJAX请求CSS的原始副本，因此，如果将样式表托管在CDN（或子域）上，则需要设置本地代理为老版本IE浏览器请求CSS。

### 关于Respond.js其他注意事项

- 不支持嵌套的媒体查询
- 只给不支持`min/max width`的媒体查询和所有媒体类型（`screen`, `print`等等）的浏览器转换
- 测试是否支持媒体查询的脚本已经包括进去，如果引入`https://github.com/paulirish/matchMedia.js`脚本可以删掉
- 不依赖其他任何脚本或框架（除了已经内置的matchMedia polyfill）
- 不支持通过 @import 指令所引入的 CSS 文件
- css样式表中的`@media`语句相比`<link media>`元素上的`media`属性权限更高。也就是说如果样式表和`link`标签同时设置了media，那么`link` 标签上的属性将会失效
- 在媒体查询中包含`@ font-face`规则将导致IE7和IE8在加载期间挂起。 要解决此问题，需要将`@ font-face`规则作为其他媒体查询的同级对象。

## css3字体单位rem兼容方案：REM-unit-polyfill

[rem.js](https://github.com/chuckcarpenter/REM-unit-polyfill): 这个polyfill会测试所有浏览器是否支持`rem`单位。确定不支持后，会读取所有的样式表并查找到有使用`rem`的选择器。然后重新计算为`px`并写入头部以覆盖样式表中的`rem`。

**用法**：推荐在所有样式表之后引用`rem.js`，或者最好在`<body>`标签的末尾引用`rem.js`。

## IE8 与 box-sizing 属性

当 `box-sizing: border-box;` 与 `min-width`、`max-width`、`min-height` 或 `max-height` 一同使用时，IE8 不能完全支持 `box-sizing` 属性

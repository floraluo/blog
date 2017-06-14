原文地址：http://www.cnblogs.com/fan-xiaofan/p/6028194.html

http-equiv，相当于http的文件头作用，它可以向浏览器传回一些有用的信息，以帮助正确和精确地显示网页内容，与之对应的属性值为content，content中的内容其实就是各个参数的变量值。

meta标签的http-equiv属性语法格式是：＜meta http-equiv="参数" content="参数变量值"＞ ；其中http-equiv属性主要有以下几种参数：

1. `<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />`

  content-Type(显示字符集的设定) 
  
  **说明**：设定页面使用的字符集。 
  
  **用法**：
```
＜meta http-equiv="content-Type" content="text/html; charset=gb2312"＞
```

2. `<meta http-equiv="Cache-Control" content="no-cache"/>`

清除缓存（再访问这个网站要重新下载！）

Cache-Control头域

Cache-Control指定请求和响应遵循的缓存机制。在请求消息或响应消息中设置Cache-Control并不会修改另一个消息处理过程中的缓存处理过程。

* 请求时的缓存指令包括no-cache、no-store、max-age、max-stale、min-fresh、only-if-cached
* 响应消息中的指令包括public、private、no-cache、no-store、no-transform、must-revalidate、proxy-revalidate、max-age。

各个消息中的指令含义如下:

* Public指示响应可被任何缓存区缓存

* Private指示对于单个用户的整个或部分响应消息，不能被共享缓存处理。这允许服务器仅仅描述当用户的部分响应消息，此响应消息对于其他用户的请求无效

* no-cache指示请求或响应消息不能缓存

* no-store用于防止重要的信息被无意的发布。在请求消息中发送将使得请求和响应消息都不使用缓存。

* max-age指示客户机可以接收生存期不大于指定时间（以秒为单位）的响应

* min-fresh指示客户机可以接收响应时间小于当前时间加上指定时间的响应

* max-stale指示客户机可以接收超出超时期间的响应消息。如果指定max-stale消息的值，那么客户机可以接收超出超时期指定值之内的响应消息。

3. `<meta http-equiv="Expires" content="0"/>`

设定网页的到期时间


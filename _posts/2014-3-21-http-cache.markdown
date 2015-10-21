---
layout: post
title:  "Http缓存"
date:   2014-3-21 08:18:01
categories: 缓存
---
http://www.cnblogs.com/cuixiping/archive/2008/05/04/1181056.html
http://kb.cnblogs.com/page/73901/
https://www.mnot.net/cache_docs/
http://www.oschina.net/news/41397/web-cache-knowledge?p=2
http://www.cnblogs.com/skynet/archive/2012/11/28/2792503.html
http://my.oschina.net/leejun2005/blog/369148

在web开发或面试中经常会遇到浏览器缓存的问题
浏览器缓存机制，其实主要就是HTTP协议定义的缓存机制（如： Expires； Cache-control等）。但是也有非HTTP协议定义的缓存机制，如使用HTML Meta 标签，Web开发者可以在HTML页面的<head>节点中加入<meta>标签，代码如下：

下面我主要介绍HTTP协议定义的缓存机制。

### Expires策略
Expires是Web服务器响应消息头字段，在响应http请求时告诉浏览器在过期时间前浏览器可以直接从浏览器缓存取数据，而无需再次请求。
不过Expires 是HTTP 1.0的东西，现在默认浏览器均默认使用HTTP 1.1，所以它的作用基本忽略。

### Cache-control策略（重点关注）
Cache-Control与Expires的作用一致，都是指明当前资源的有效期，控制浏览器是否直接从浏览器缓存取数据还是重新发请求到服务器取数据。只不过Cache-Control的选择更多，设置更细致，如果同时设置的话，其优先级高于Expires。

http协议头Cache-Control    ：
    值可以是public、private、no-cache、no- store、no-transform、must-revalidate、proxy-revalidate、max-age
    各个消息中的指令含义如下：
    Public指示响应可被任何缓存区缓存。
    Private指示对于单个用户的整个或部分响应消息，不能被共享缓存处理。这允许服务器仅仅描述当用户的部分响应消息，此响应消息对于其他用户的请求无效。
    no-cache指示请求或响应消息不能缓存
    no-store用于防止重要的信息被无意的发布。在请求消息中发送将使得请求和响应消息都不使用缓存。
    max-age指示客户机可以接收生存期不大于指定时间（以秒为单位）的响应。
    min-fresh指示客户机可以接收响应时间小于当前时间加上指定时间的响应。
    max-stale指示客户机可以接收超出超时期间的响应消息。如果指定max-stale消息的值，那么客户机可以接收超出超时期指定值之内的响应消息。
    还是上面那个请求，web服务器返回的Cache-Control头的值为max-age=300，即5分钟（和上面的Expires时间一致，这个不是必须的）。


### Last-Modified/If-Modified-Since
Last-Modified/If-Modified-Since要配合Cache-Control使用。

l  Last-Modified：标示这个响应资源的最后修改时间。web服务器在响应请求时，告诉浏览器资源的最后修改时间。
l  If-Modified-Since：当资源过期时（使用Cache-Control标识的max-age），发现资源具有Last-Modified声明，则再次向web服务器请求时带上头 If-Modified-Since，表示请求时间。web服务器收到请求后发现有头If-Modified-Since 则与被请求资源的最后修改时间进行比对。若最后修改时间较新，说明资源又被改动过，则响应整片资源内容（写在响应消息包体内），HTTP 200；若最后修改时间较旧，说明资源无新修改，则响应HTTP 304 (无需包体，节省浏览)，告知浏览器继续使用所保存的cache。

Etag/If-None-Match
Etag/If-None-Match也要配合Cache-Control使用。

l  Etag：web服务器响应请求时，告诉浏览器当前资源在服务器的唯一标识（生成规则由服务器觉得）。Apache中，ETag的值，默认是对文件的索引节（INode），大小（Size）和最后修改时间（MTime）进行Hash后得到的。
l  If-None-Match：当资源过期时（使用Cache-Control标识的max-age），发现资源具有Etage声明，则再次向web服务器请求时带上头If-None-Match （Etag的值）。web服务器收到请求后发现有头If-None-Match 则与被请求资源的相应校验串进行比对，决定返回200或304。

既生Last-Modified何生Etag？
你可能会觉得使用Last-Modified已经足以让浏览器知道本地的缓存副本是否足够新，为什么还需要Etag（实体标识）呢？HTTP1.1中Etag的出现主要是为了解决几个Last-Modified比较难解决的问题：

l  Last-Modified标注的最后修改只能精确到秒级，如果某些文件在1秒钟以内，被修改多次的话，它将不能准确标注文件的修改时间
l  如果某些文件会被定期生成，当有时内容并没有任何变化，但Last-Modified却改变了，导致文件没法使用缓存
l  有可能存在服务器没有准确获取文件修改时间，或者与代理服务器时间不一致等情形

Etag是服务器自动生成或者由开发者生成的对应资源在服务器端的唯一标识符，能够更加准确的控制缓存。Last-Modified与ETag是可以一起使用的，服务器会优先验证ETag，一致的情况下，才会继续比对Last-Modified，最后才决定是否返回304。

用户行为与缓存
浏览器缓存行为还有用户的行为有关！！！

用户操作
Expires/Cache-Control
Last-Modified/Etag
地址栏回车
有效
有效
页面链接跳转
有效
有效
新开窗口
有效
有效
前进、后退
有效
有效
F5刷新
无效
有效
Ctrl+F5刷新
无效
无效
总结
浏览器第一次请求：

clip_image004

浏览器再次请求时：

clip_image006


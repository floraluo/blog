# 如何将 .m3u8 转换为 .mp4

```
ffmpeg -allowed_extensions ALL -i "filename.m3u8" -codec copy filename.mp4
```

## 怎么安装ffmpeg

1. 官网下载对应版本的包
2. 解压后将ffmpeg执行文件放到`/usr/local/bin`
3. 终端输入`ffmpeg -h`或者 `ffmpeg -version` 测试是否输出内容
4. 如果第三步提示命令错误。配置`ffmpeg`环境变量

   ```
   open ~/.bash_profile
   ```
   打开的文件中输入 `PATH=$PATH:/usr/local/bin`
    
    再执行命令`source ~/.bash_profile`

5. 第3步测试

ffmpeg 安装成功后。只要拿到`.m3u8`文件的服务端地址，执行命令即可自动下载合并，并输出`.mp4`文件到本地。例如：
```
ffmpeg -allowed_extensions ALL -i "http://xxx.cn/白雪公主.m3u8" -codec copy 白雪公主.mp4
```

## 什么是m3u8文件
M3U8 文件是一种常见的播放列表文件格式，主要用于流媒体传输。它具有以下几个特点：

1. 格式说明：

    M3U8 是 UTF-8 编码的 M3U 文件格式。
    它通常用于 HLS（HTTP Live Streaming）协议中，由 Apple 开发。
    M3U8 文件包含了多个媒体片段（视频或音频片段）的 URL 地址以及相关元数据。

2. 用途：
    用于存储一系列媒体文件的 URL 列表。
    支持播放直播和点播内容。
    可以包含多个不同质量的媒体片段，实现自适应比特率流。

3. 文件结构示例：

    ``` m3u8
    m3u8
    #EXTM3U
    #EXT-X-VERSION:3
    #EXT-X-TARGETDURATION:10
    #EXT-X-MEDIA-SEQUENCE:0
    #EXT-X-PLAYLIST-TYPE:VOD
    #EXTINF:10.000,
    segment_1.ts
    #EXTINF:10.000,
    segment_2.ts
    #EXTINF:10.000,
    segment_3.ts
    ```

    在这个示例中：

    - `#EXTM3U` 表示这是一个 M3U 文件。
    - `#EXT-X-VERSION:3` 指定了文件版本。
    - `#EXT-X-TARGETDURATION:10` 表示每个片段的目标持续时间为 10 秒。
    - `#EXT-X-MEDIA-SEQUENCE:0` 表示媒体序列的起始编号。
    - `#EXT-X-PLAYLIST-TYPE:VOD` 表示这是一个点播（Video On Demand）播放列表。
    - `#EXTINF:10.000`, 表示每个媒体片段的持续时间。
    - `segment_1.ts`, `segment_2.ts`, `segment_3.ts` 分别表示不同的媒体片段文件。

M3U8 文件在流媒体传输中起到了重要的作用，使得视频可以在不同的网络条件下流畅播放。
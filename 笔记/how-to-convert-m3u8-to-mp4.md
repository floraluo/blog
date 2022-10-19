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

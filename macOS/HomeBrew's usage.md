# [HomeBrew](https://brew.sh/index_zh-cn)的用法 

<!-- TOC -->

1. [使用镜像](#使用镜像)
2. [设置环境变量](#设置环境变量)

<!-- /TOC -->

## 使用镜像
``` sh
#使用中科大镜像替换brew.git:
cd "$(brew --repo)"
git remote set-url origin https://mirrors.ustc.edu.cn/brew.git

#替换homebrew-core.git:
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git

#更新
brew updata
```
替换Homebrew Bottles源: 参考:[替换Homebrew Bottles源](https://lug.ustc.edu.cn/wiki/mirrors/help/homebrew-bottles)


在中科大源失效或宕机时可以： 
1. 使用[清华源设置参考](https://mirrors.tuna.tsinghua.edu.cn/help/homebrew/)。 
2. 切换回官方源：
```sh
#重置brew.git（恢复默认源）:
cd "$(brew --repo)"
git remote set-url origin https://github.com/Homebrew/brew.git

#重置homebrew-core.git:
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://github.com/Homebrew/homebrew-core.git

#更新
brew updata
```
注释掉bash配置文件里的有关Homebrew Bottles即可恢复官方源。 重启bash或让bash重读配置文件。

## 设置环境变量
HomeBrew安装包时会将软件包安装到独立目录`/usr/local/Cellar`，并将其命令文件软链接至 `/usr/local/bin`

由于`/usr/local/bin`一般是存在`$PATH`中，所以不需要再额外配置环境变量
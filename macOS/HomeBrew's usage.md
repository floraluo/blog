# [HomeBrew](https://brew.sh/index_zh-cn)的用法

<!-- TOC -->

- [命令](#命令)
- [使用镜像](#使用镜像)
- [从第三方库安装formula/application](#从第三方库安装formulaapplication)
    - [**brew tap**命令](#brew-tap命令)
    - [仓库命名约定和假设](#仓库命名约定和假设)
    - [重复名称的formula](#重复名称的formula)
- [设置环境变量](#设置环境变量)

<!-- /TOC -->

## 命令

[Homebrew命令](https://github.com/floraluo/blog/blob/master/macOS/HomeBrew%E5%91%BD%E4%BB%A4.md)

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

## 从第三方库安装formula/application

HomeBrew官仓并不能囊括所有包或应用程序，当我们需要安装的包在官仓里没有时，就需要从第三方仓库里下载安装了。

`brew tap`命令将更多仓库添加到`brew`跟踪，更新和安装的formula列表中。 默认情况下，tap假定仓库来自GitHub，但命令不限于任何一个位置。

### **brew tap**命令

- `brew tap`: 不带参数时，列出当前所有tap仓库。例如：

    ```sh
    $ brew tap
    homebrew/core
    homebrew/cask
    adoptopenjdk/openjdk
    ```

- `brew tap <user/repo>`: 在https://github.com/user/homebrew-repo上对存储库进行浅表克隆。 之后，`brrew`将能够处理这些formula，就像它们在Homebrew的规范仓库中一样。 您可以使用`brew [un] install`来安装和卸载它们，并且在运行`brew update`时会自动更新formula。 （有`brew tap`如何处理存储库名称的详细信息，请[参见下文](#仓库命名约定和假设)。）
- `brew tap <user/repo> <URL>`: 对`URL`的仓库进行浅表克隆。与上一个单参数版本不同，URL不假定为GitHub，也不必为HTTP。 Git可以处理的任何位置和协议都可以。
- `brew tap --full <user/repo> / brew tap --full <user/repo> <URL>`: 将`--full`添加到一个或两个参数的调用中，以使Git进行完整的克隆而不是浅表的克隆。 “--full”是Homebrew开发人员的默认设置。
- `brew untap user/repo [user/repo user/repo ...]`: 删除给定的tap。仓库将被删除并且brew也不在知道这个仓库下的formula。`brew untap`可以一次处理多个清楚操作。

### 仓库命名约定和假设

- 在GitHub上，你的仓库命名必须是`homebrew-<something>`，才能使用`brew tap`的单参数形式。前缀homebrew-不是可选的。（具有两个参数的表单没有此限制，但它会强制您明确提供完整的URL）
- 在命令行中使用`brew tap`可以省略“homebrew-”前缀。

    也就是说，`brew tap username/foobar`命令是`brew tap username/homebrew-foobar`的快捷方式。`brew`会在需要时自动添加回“ homebrew-”前缀。

### 重复名称的formula

如果自己添加的仓库里有和**homebrew/core**同名的formula，那就意味着需要自己默认显示安装。

每当发出`brew install <formula>`命令时，`brew`都会通过按以下顺序搜索来找到要使用的formula：

1. homebrew/core fomula
2. 其他自己克隆下来的仓库

```sh
# installs from homebrew/core
brew install vim
# installs from your custom repository
brew install username/repo/vim
```

## 设置环境变量

HomeBrew安装包时会将软件包安装到独立目录`/usr/local/Cellar`，并将其命令文件软链接至 `/usr/local/bin`

由于`/usr/local/bin`一般是存在`$PATH`中，所以不需要再额外配置环境变量

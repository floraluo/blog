进入ng2+ionic2的坑，公司项目有多个环境。 [angularCli](https://github.com/angular/angular-cli#build-targets-and-environment-files) 的文档说明不是很明确，找了好多资料，然后搞懂怎么配置。

在项目中，如果我们需要环境变量，就只需要引入`environment.ts`文件。在这个文件中的每一个property，在其它环境文件中都要存在。比如：

`environment.ts`中有`apiUrl`property
```
export const environment = {
  apiUrl: 'http://api-a.xxx.com/'
};
```
在`environment.prod.ts`中也必须有`apiUrl`property
```
export const environment = {
  apiUrl: 'http://api-b.xxx.com/'
};
```

`environment.prod.ts`是你生产环境的环境变量文件，你还需要一个测试环境,一个国外环境。这时候就在`environment.prod.ts`文件所在的目录，添加其它两个环境的文件

`environment.test.ts`测试环境,`environment.other.ts`国外环境。中间这个单词你自己随便自定义。
现在打开`angular-cli.json`文件。找到`environments`属性，这里应该已经添加的有`source`,`dev`,`prod`。再添加一个`test`,一个`other`
```
    "environments": {
        "source": "environments/environment.ts",
        "dev": "environments/environment.ts",
        "prod": "environments/environment.prod.ts",
        "test": "environments/environment.test.ts",
        "other": "environments/environment.other.ts"
      }
```
现在就可以编译你想要的环境了
```
$ ng build --env=test
```
如果需要编译压缩的文件
```
$ ng build --prod --env=test
```
由于编译后每个文件会有映射文件，而这个影射文件比较大，我知道可以在`tsconfig.json`文件通过修改`sourceMap`可以实现，
但是我不知道怎么通过引入环境配置文件，当`--target=prod`我不需要map文件，当`--target=dev`再生成map文件。

另一个问题，引入了ionic的css文件，编译后ionic的css文件引用的字体文件全部都编译在根目录下面，这样不太好看，由于我们有了一个assets文件，所以是否有方法通过配置能让这些字体文件编译后放在assets文件中。

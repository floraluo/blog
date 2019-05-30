# Vue组件通信方式

1. <a href="#父传子">父传子</a>
2. <a href="#子传父">子传父</a>
3. <a href="#兄弟组件通信">兄弟组件通信</a>
4. <a href="#跨层级祖传孙组件通信">跨层级祖传孙组件通信：provide&inject</a>
5. <a href="#dispatch">dispatch</a>
6. <a href="#boardcast">boardcast</a>
7. <a href="#eventBus">eventBus</a>
8. <a href="#VueX">VueX</a>

## 1. <a name="父传子">父传子</a>
```html
<!-- parent.vue -->
<template>
  <div>
    <child :title="msg"></child>
  </div>
</template>
<script>
  import Child from "./child"
  export defalut {
    components: { Child },
    data() {
      return {
        msg: '我是父组件',
      }
    }
  });
</script>
```
```html
<!-- child.vue -->
<template>
  <div>
    <h2>{{title}}</h2>
    <p></p>
  </div>
</tempalte>
<script>
  export defalut {
    props: ['title']
  }
</script>
```

## 2. <a name="子传父">子传父</a>
```html
<!-- parent.vue -->
<template>
  <div>
    <child @some-event="doSomething"></child>
  </div>
</template>
<script>
  import Child from "./child"
  export defalut {
    components: { Child },
    methods: {
      doSomething (msg) {
        console.log("收到来自子组件的事件通知");
        console.log(`子组件传递来的消息: ${msg}`);
      }
    }
  }
</script>
```
```html
<!-- child.vue -->
<template>
  <div>
    <button @click="noticeParent">通知父组件</button>
  </div>
</template>
<script>
  export defalut {
    methods: {
      noticeParent() {
        this.$emit("someEvent", "我是子组件，这是我传递给父组件的消息")
      }
    }
  }
</script>
```

## 3. <a name="兄弟组件通信">兄弟组件通信</a>
兄弟组件之间不能直接通信，需要借助于父组件

## 4. <a name="跨层级祖传孙组件通信">跨层级祖传孙组件通信：provide&inject</a>
> **provide**: `Object | () => Object `选项应该是一个对象或返回一个对象的函数。该对象包含可注入其子孙的属性。在该对象中你可以使用 ES2015 Symbols 作为 key，但是只在原生支持 Symbol 和 Reflect.ownKeys 的环境下可工作。
> **inject**: `Array<string> | { [key: string]: string | Symbol | Object }` 选项应该是：
> - 一个字符串数组，或
> - 一个对象，对象的 key 是本地的绑定名，value 是：
>   - 在可用的注入内容中搜索用的 key (字符串或 Symbol)，或
>   - 一个对象，该对象的：
>     - `from` 属性是在可用的注入内容中搜索用的 key (字符串或 Symbol)
>     - `default` 属性是降级情况下使用的 value
```html
<!-- parent.vue -->
<script>
import Child from '@/components/Child1'
export default {
  provide: {
    content: '来自parent组件的内容'
  },
  components: { Child }
}
</script>
```

```html
<!-- grand-grand-child.vue -->
<template>
  <div>
    <p>
      祖先元素提供的数据 : {{content}}
    </p>
  </div>
</template>
<script>
export default {
  inject: ['content']
}
</script>
```
> **<font color='red'>提示</font>：`provide` 和 `inject` 绑定并不是可响应的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的属性还是可响应的。**

## 5. <a name="dispatch">dispatch</a>
通过`this.$parent`递归获取$parent
```html
<!-- grand-grand-child.vue -->
<button @click="dispatch('dispatch', '我是grand grand child')">dispatch</button>
···
metchods: {
  dispatch(eventName, data) {
    let parent = this.$parent;
    //查找父元素
    while(parent) {
      if (parent) {
        //父元素出发事件
        parent.$emit(eventName, data);
        //递归查找父元素
        parent = parent.$parent;
      } else {
        break;
      }
    }
  }
}
···
```
**全局挂载dispatch**
```js
Vue.prototype.$dispatch = function(eventName, data) {
  let parent = this.$parent;
  while (parent) {
    if (parent) {
      parent.$emit(eventName, data);
      parent = parent.$parent;
    } else {
      break;
    }
  }
}
```

## 6. <a name="boardcast">boardcast</a>
通过`this.$children`递归获取`$children`来向所有子元素广播
```html
<!-- parent.vue -->
<button @click="boardcast('boardcast', '我是父元素')">boarcast</button>
···
methods: {
  boarcast (eventName, data) {
    $boarcast.call(this, eventName, data);
  }
}
···
function $boarcast(eventName, data) {
  this.$children.forEach(child => {
    child.$emit(eventName, data);
    if (child.$children.length) {
      //递归调用，通过call修改this指向child
      $boarcast.call(child, eventName, data);
    }
  })
}
```
**全局挂载boarcast**
```js
Vue.prototype.$boardcast = function(eventName, data) {
  boardcast.call(this, eventName, data);
}
function boardcast(eventName, data) {
  this.$children.forEach(child => {
    child.$emit(eventName, data);
    if (child.$children.length) {
      //递归调用，通过call修改this指向child
      boardcast.call(child, eventName, data);
    }
  })
}
```
## 7. <a name="eventBus">eventBus</a>
# vue事件通信原理
Vue 事件机制主要分为两种：父子组件通信和非父子组件通信。

## 父子组件通信

父子组件通信的原理是通过 props 和事件来实现的。

父组件通过 props 将数据传递给子组件，子组件通过 props 接收父组件传递的数据。父组件还可以通过 props 将自己的方法传递给子组件，子组件可以调用父组件传递的方法来实现与父组件的通信。

子组件通过 $emit 触发事件将数据传递给父组件。父组件可以通过在子组件上监听事件来接收子组件传递的数据。

在 Vue 中，父子组件之间的通信是单向的，即父组件可以向子组件传递数据和方法，但子组件不能直接修改父组件的数据。如果需要修改父组件的数据，可以通过 $emit 触发事件，让父组件来修改数据。

## 非父子组件通信

非父子组件通信需要借助一个中央事件总线，可以使用 Vue 实例作为事件总线，也可以使用一个空的 Vue 实例作为事件总线。

### 使用Vue 实例作为事件总线和使用一个空的 Vue 实例作为事件总线有什么区别？

使用 Vue 实例作为事件总线时，事件总线的作用域是**全局的**，所有组件都可以访问该实例，从而实现了非父子组件之间的通信。这种方式的缺点是，如果事件总线被滥用，可能会导致代码的可读性和可维护性变差。

使用一个空的 Vue 实例作为事件总线时，事件总线的作用域是**局部的**，只有在该实例的子组件中才能访问该实例，从而实现了非父子组件之间的通信。这种方式的优点是，可以避免事件总线被滥用，从而提高代码的可读性和可维护性。

另外，使用一个空的 Vue 实例作为事件总线时，需要在组件销毁时手动销毁该实例，避免内存泄漏。而使用 Vue 实例作为事件总线时，不需要手动销毁该实例，因为该实例会随着应用程序的销毁而自动销毁。

| | Vue 实例 | 空的 Vue 实例 |
|------|-----|---------- |
| 作用域 | 全局的 | 局部的 |
| 优点| 不需要手动销毁 | 可避免被滥用，提高代码可读性和可维护性 |
| 缺点 | 滥用会导致代码可读性和可维护性变差 | 组件销毁时需要手动销毁，避免内存泄漏|


**Vue实例作为事件总线时，被滥用的场景：**
- 多个组件之间频繁地进行通信，导致事件总线的事件监听器过多，影响性能。
- 事件总线的事件命名不规范，导致事件冲突或者事件难以维护。
- 事件总线的作用域过于广泛，导致事件被误用或者滥用，影响代码的可读性和可维护性。

**空的 Vue 实例作为事件总线时，为什么可以避免事件总线被滥用**
- 空的 Vue 实例只包含事件通信相关的逻辑，不包含任何业务逻辑，因此开发人员只能在该实例中定义事件和监听器，而不能在该实例中定义任何业务逻辑。这样可以避免事件总线被滥用，从而提高代码的可读性和可维护性。
- 另外，使用空的 Vue 实例作为事件总线时，需要在组件销毁时手动销毁该实例，避免内存泄漏。这也可以避免事件总线被滥用，因为开发人员需要手动管理该实例的生命周期，从而更加谨慎地使用事件总线。

## 源码解析

```js
function eventsMixin(Vue) {
    var hookRE = /^hook:/;
    /** 监听事件方法*/
    Vue.prototype.$on = function (event, fn) {
        var vm = this;
        if (isArray(event)) {
            for (var i = 0, l = event.length; i < l; i++) {
                vm.$on(event[i], fn);
            }
        }
        else {
            /**
            采用数组管理每个事件的监听列表。一个事件有多处监听，$emit方法触发某个事件，获取并执行此事件的所有方法
            （这样的逻辑学习了一个新写法）
            if (!vm._events[event]) {
              vm._events[event] = []
            }
            vm._events[event].push(fn)
            */
            (vm._events[event] || (vm._events[event] = [])).push(fn);
            // optimize hook:event cost by using a boolean flag marked at registration
            // instead of a hash lookup
            if (hookRE.test(event)) {
                /** _hasHookEvent 是 Vue 实例中的一个标志位，用于优化 hook: 事件的性能。
                在 Vue 中，hook: 事件是一种特殊的事件，用于在组件的生命周期钩子函数中触发事件。
                当一个组件注册了 hook: 事件时，Vue 会将该组件的 _hasHookEvent 标志位设置为 true，
                从而在下一次触发 hook: 事件时，可以直接判断该组件是否注册了 hook: 事件，从而避免了不必要的事件查找和触发。*/
                vm._hasHookEvent = true;
            }
        }
        return vm;
    };
    /** 监听事件方法， 触发一次就销毁该事件*/
    Vue.prototype.$once = function (event, fn) {
        var vm = this;
        function on() {
            /** 调用on方法就移除，实现监听一次就移除监听*/
            vm.$off(event, on);
            fn.apply(vm, arguments);
        }
        /** 将fn方法挂在on的fn属性上，是为了移除监听时，能查找到需要移除的fn方法。*/
        on.fn = fn;
        vm.$on(event, on);
        return vm;
    };
    /** 移除监听方法 */
    Vue.prototype.$off = function (event, fn) {
        var vm = this;
        // all
        if (!arguments.length) {
            vm._events = Object.create(null);
            return vm;
        }
        // array of events 移除多个事件的监听
        if (isArray(event)) {
            for (var i_1 = 0, l = event.length; i_1 < l; i_1++) {
                vm.$off(event[i_1], fn);
            }
            return vm;
        }
        // specific event
        var cbs = vm._events[event];
        if (!cbs) {
            return vm;
        }
        // 移除具体事件的所有监听
        if (!fn) {
            vm._events[event] = null;
            return vm;
        }
        // specific handler
        var cb;
        var i = cbs.length;
        while (i--) {
            cb = cbs[i];
            if (cb === fn || cb.fn === fn) {
                cbs.splice(i, 1);
                break;
            }
        }
        return vm;
    };
    Vue.prototype.$emit = function (event) {
        var vm = this;
        {
            var lowerCaseEvent = event.toLowerCase();
            if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
                tip("Event \"".concat(lowerCaseEvent, "\" is emitted in component ") +
                    "".concat(formatComponentName(vm), " but the handler is registered for \"").concat(event, "\". ") +
                    "Note that HTML attributes are case-insensitive and you cannot use " +
                    "v-on to listen to camelCase events when using in-DOM templates. " +
                    "You should probably use \"".concat(hyphenate(event), "\" instead of \"").concat(event, "\"."));
            }
        }
        var cbs = vm._events[event];
        if (cbs) {
            /** 
            toArray:  将类数组对象转成真正的数组
            */
            cbs = cbs.length > 1 ? toArray(cbs) : cbs;
            var args = toArray(arguments, 1);
            var info = "event handler for \"".concat(event, "\"");
            for (var i = 0, l = cbs.length; i < l; i++) {
                 /**
                 invokeWithErrorHandling方法核心代码：
                 传入参数调用事件监听的回调方法
                 args ? cbs[i].apply(vm, args) : cbs[i].call(vm);
                */
                invokeWithErrorHandling(cbs[i], vm, args, vm, info);
               
            }
        }
        return vm;
    };
}
function invokeWithErrorHandling(handler, context, args, vm, info) {
  var res;
  try {
      res = args ? handler.apply(context, args) : handler.call(context);
      if (res && !res._isVue && isPromise(res) && !res._handled) {
          res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
          res._handled = true;
      }
  }
  catch (e) {
      handleError(e, vm, info);
  }
  return res;
}
```

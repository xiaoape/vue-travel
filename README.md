# 说明

> vue2+vue-router+vuex的移动端项目，麻雀虽小，五脏俱全

## Build Setup

``` bash
# 克隆到本地
git clone https://github.com/bailicangdu/vue2-happyfri.git

# 进入文件夹
cd vue2-happyfri

# 安装依赖
npm install 或 yarn

# 开启本地服务器localhost:8088
npm run dev

# 发布环境
npm run build
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
修改了文件config/index.js
dev: {

    // Paths fiddler charles
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
}

### 项目总结

###移动端常见的问题：

1.点击屏幕300ms延迟。解决方法：引入fastclick包

2.兼容低版本的手机不支持promise（项目使用axios请求数据）。解决方法：引入babel-polyfill包

3.@touchstart在真机中会出现一些问题 。解决方法是：加上一个.prevent 

### 性能优化

1.使用`keep-alive`组件进行缓存

2.对scroll事件进行节流操作

3.使用localstorage进行缓存

4.异步加载路由组件（因为项目不大就没有使用）

5.通过修改了逻辑来减少发送ajax请求的次数

### 项目的难点

1.在城市选择页，进行滚动字母相应的区域能够同步更新。

解决：使用touchstart计算出当前触摸的位置，减去字母A距离顶部的距离再减去header的距离除以每个字母所占的空间就能找到我们当前应该显示的字母区域

### 高级用法

1.使用vuex中mapState,mapActions方法做一个简写

2.使用vue中的递归组件来减少代码

### 项目细节

1.拖动多个页面默认会互相影响，所以我们需要跳转每个页面的初始值x,y为0，也就是页面从最顶部开始展示

```javascript
//route.js
scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
}
```

2.使用vue内置的动画组件transition 

3.使用solt定制组件

4.使用router-link中的tag属性改变渲染标签

```
<router-link
      tag="div"
      to="/"
      class="header-abs"
      v-show="showAbs">
  <div class="iconfont header-abs-back">&#xe624;</div>
</router-link>
```

5.keep-alive不需要缓存的组件Detail

```
<keep-alive exclude="Detail">
	<router-view/>
</keep-alive>
```

6.真机调试配置 --host 0.0.0.0

```javascript
    "dev": "webpack-dev-server --host 0.0.0.0 --inline --progress --config build/webpack.dev.conf.js", 
```

7.webpack中的代理

```javascript
proxyTable: {
    // 将/api下的请求都代理到/static/mock
      '/api': {
        target: 'http://localhost:8081',
        pathRewrite: {
          '^/api': '/static/mock'
        }
      }
    },
```

8.有关@

@是一个别名，在webpack中你可以找到它的配置

```
resolve: {
    extensions:['.js','.vue','.json'],
    alias:{
    	'vue$':'vue/dist/vue.esm.js',
   		 //表示在路径中使用的@就是这里配置的src目录
    	'@':resolve('src')
    }
}
//比如在css中引入一个.styl文件
<style lang="stylus" scoped>
	//在css中引入css文件，需要在路径的前面加上一个~
    @import '~@/assets/styles/varibles.styl'
</style>
```

### 我的问题

1.真机无法调试，不知道为什么有待解决

2.fastclick在真机中依旧存在问题




















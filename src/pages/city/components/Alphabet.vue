<template>
  <ul class="list">
    <li
      class="item"
      v-for="item of letters"
      :key="item"
      :ref="item"
      @touchstart.prevent="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      @click="handleLetterClick"
    >
      {{item}}
    </li>
  </ul>
</template>

<script>
// 上面的@touchstart在真机中会出现一些问题，我们需要加上一个.prevent就可以解决了
export default {
  name: 'CityAlphabet',
  props: {
    cities: Object
  },
  computed: {
    // 因为cities是一个对象，我们需要一个数组，所以弄了一个计算属性letters
    letters () {
      const letters = []
      for (let i in this.cities) {
        letters.push(i)
      }
      return letters
    }
  },
  data () {
    return {
      touchStatus: false,
      startY: 0,
      timer: null
    }
  },
  updated () {
    // 优化性能，初始的时候cities是一个空对象，当使用axios获取完数据后会得到更新去触发这个钩子函数
    // 获取字母A元素距离字母区域（注意不是顶部）
    this.startY = this.$refs['A'][0].offsetTop
  },
  methods: {
    handleLetterClick (e) {
      // e.target.innerText就是我们点击的那个字母，触发City组件中监听的change事件
      this.$emit('change', e.target.innerText)
    },
    handleTouchStart () {
      this.touchStatus = true
    },
    handleTouchMove (e) {
      if (this.touchStatus) {
        // 这里做了一个节流操作
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          // 79是字母区域距离顶部的高度 20是每个字母的距离
          const touchY = e.touches[0].clientY - 79
          // touchY是触摸的字母距离字母区域的高度，index就是我们计算出来的字母小标
          const index = Math.floor((touchY - this.startY) / 20)
          if (index >= 0 && index < this.letters.length) {
            this.$emit('change', this.letters[index])
          }
        }, 16)
      }
    },
    handleTouchEnd () {
      this.touchStatus = false
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl'
  .list
    display: flex
    flex-direction: column
    justify-content: center
    position: absolute
    top: 1.58rem
    right: 0
    bottom: 0
    width: .4rem
    .item
      line-height: .4rem
      text-align: center
      color: $bgColor
</style>

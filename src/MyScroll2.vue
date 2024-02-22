<template>
  <div class="scroll-container" @scroll="handleScroll">
    <!-- 滚动区域的内容 -->
    sdfasdfa<br/>
    sdfasdfa<br/>
    sdfasdfa<br/>
    sdfasdfa<br/>

  </div>
</template>

<script>
export default {
  methods: {
    handleScroll(event) {
      // 在这里处理滚动事件
      console.log('滚动事件触发:', event);
    }
  }
};
</script>

<style scoped>
.scroll-container {
  /* 设置滚动容器的样式 */
  height: 50px;
  overflow: auto;
}
</style>
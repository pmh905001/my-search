<template>
  <div class="container" ref="containerRef" @scroll="handleScroll">
    <ul>
      <li v-for="item in items" :key="item.id">{{ item.title }}</li>
      <li v-if="loading">Loading...</li>
    </ul>
  </div>
</template>
 
<script>
import { ref, onMounted } from 'vue'
 
export default {
  setup() {
    const containerRef = ref(null)
    const items = ref([])
    const loading = ref(false)
    const page = ref(1)
 
    const handleScroll = () => {
      const container = containerRef.value
      if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
        loadMore()
        console.log('到底了');
      }
    }
 
    const loadMore = () => {
      if (loading.value) return
      loading.value = true
      // 发送请求加载新数据
      fetchData(page.value)
        .then(newData => {
          console.log('go to here?');
          items.value = [...items.value, ...newData]
          loading.value = false
          page.value++
        })
    }

    const fetchData = async (pageIndex) => {
      // const url = 'http://localhost:5000/search';
      const url = 'https://my-json-server.typicode.com/pmh905001/my-search/app1';

      let result= await (await fetch(url)).json();
      console.log(result);
      return result;
    }



 
    onMounted(() => {
      // 初始化加载数据
      loadMore()
    })
 
    return {
      containerRef,
      items,
      loading,
      handleScroll
    }
  }
}
</script>



<style scoped>
.container {
  height: 300px;
  overflow: auto; 
}
</style>

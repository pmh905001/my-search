<template>
  <div class="container" ref="containerRef" @scroll="handleScroll">
    <ul>
      <li v-for="item in items" :key="item.id">{{ item.title }}</li>
      <li v-if="loading">Loading...</li>
    </ul>
  </div>
</template>
 

<script>
export default {
  data() {
    return {
      items: [],
      loading: false,
      page: 1
    }
  },

  methods: {
    handleScroll() {
      const container = this.$refs.containerRef
      if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
        this.loadMore()
        console.log('到底了');
      }
    },


    loadMore() {
      if (this.loading) return;
      this.loading = true;
      // const records = this.fetchData(this.page);

      // this.items = this.items.concat(records) ;
      this.fetchData(this.page);
      this.loading = false;
      this.page++;
    },

    async fetchData(pageIndex) {
      const url = 'http://localhost:5000/search';
      let result = await (await fetch(url)).json();
      this.items = this.items.concat(result)
      console.log(result)
      return result;
    }


  },



  mounted() {
    this.loadMore()
  },
}
</script>





<style scoped>
.container {
  height: 300px;
  overflow: auto;
}
</style>
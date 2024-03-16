<template>
  <input v-model="text" @keyup.enter="do_search">{{ page }}
  <br />

  <ul class="container" ref="containerRef" @scroll="handleScroll">
    <li v-for="item of favs">
      {{ item.title }}
      <br />
      <a href="item.url" target="_blank">{{ item.title }}</a>
    </li>
    <li v-if="loading">Loading...</li>
  </ul>
</template>



<script>
export default {
  data() {
    return {
      text: '',
      favs: [],
      loading: false,
      page: 0,

    }
  },

  created() {
    this.loadMore();
  },

  methods: {
    async fetchData() {
      // const url = 'http://localhost:5000/search';
      const url = 'https://my-json-server.typicode.com/pmh905001/my-search/app1'

      let res = await (await fetch(url)).json()

      if (this.page == 3) {
        res = [];
        this.loading = false;
      }
      if (res.length != 0) {
        this.favs = [...this.favs, ...res];
        this.loading = false;
        this.page++;
      }
      else {
        console.log('已经到最后了！')
      }

    },

    do_search() {
      console.log('user enter search');
      this.favs = [];
      this.page = 0;
      this.fetchData();
    },


    handleScroll() {
      const container = this.$refs.containerRef;
      if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
        this.loadMore()
        console.log('到底了', this.page);
      }
    },


    loadMore() {
      if (this.loading) return;
      this.loading = true;
      this.fetchData(this.page)
    },
  },

}
</script>

<style scoped>
.container {
  height: 500px;
  overflow: auto;
}
</style>


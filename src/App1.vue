<script>
export default {
  data() {
    return {
      text: '',
      favs: []

    }
  },

  created() {
    // this.favs = [{ id: 1, title: 'title 1', url: 'https://toutiao.com/1' }, { id: 2, title: 'title 2', url: 'https://toutiao.com/2' }]
    this.fetchData()
  },

  methods: {
    async fetchData() {
      // const url = 'http://localhost:5000/search';
      const url = 'https://my-json-server.typicode.com/pmh905001/my-search/app1'
      this.favs = await (await fetch(url)).json()
      console.log(this.favs)
    },

    do_search(){
      console.log('user enter search');
      this.fetchData();
    },
  }





}
</script>

<template>
  <input v-model="text"  @keyup.enter="fetchData" >
  <br />
  <ul>
    <li v-for="item of favs">
      {{ item.title }}
      <br/>
      <a href="item.url" target="_blank">{{ item.title }}</a>
    </li>
  </ul>
</template>


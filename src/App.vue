<style scoped>
#container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  margin: 20px auto 20px auto;
  max-height: calc(100vh - 200px);
  max-width: 100%;
  overflow-y: auto;
}

.result {
  font-weight: 300;
  width: 80%;
  padding: 20px;
  text-align: center;
  background: #eceef0;
  border-radius: 10px;
}

</style>

<template>
  <div id="container">
    <el-input v-model="text" style="width: 82%;" clearable @keyup.enter="do_search" />{{ page }}
    <div class="result" v-for="fav in favs" :key="fav.id">
      <div>{{ fav.title }}</div>
      <div>{{ fav.url }}</div>
    </div>
    <infinite-loading target="#container" @infinite="load"></infinite-loading>
  </div>
</template>


<script>
import InfiniteLoading from "v3-infinite-loading"
import "v3-infinite-loading/lib/style.css"


export default {
  components: {
    "infinite-loading": InfiniteLoading,
  },


  data() {
    return {
      text: '',
      favs: [],
      page: 0,

    }
  },


  methods: {
    async load($state) {
      console.log("loading...", $state);
      try {
        const response = await fetch("http://localhost:5000/search");
        const json = await response.json();
        if (json.length < 10) {
          $state.complete();
        }
        else {
          this.favs.push(...json);
          $state.loaded();
        }
        this.page++;
      } catch (error) {
        $state.error();
      }
    },

    do_search() {
      this.page = 0;
      this.favs = [];
    },


  },


}
</script>



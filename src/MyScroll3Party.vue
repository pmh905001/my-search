<style scoped>
#container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  margin: 20px auto 20px auto;
  /* max-height: 400px; */
  max-height: calc(100vh - 100px);
  /* max-width: 400px; */
  max-width: 100%;
  /* overflow-y: scroll; */
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
    <input v-model="text" style="width: 81%;"/>
    <div class="result" v-for="comment in comments" :key="comment.id">
      <div>{{ comment.email }}</div>
      <div>{{ comment.id }}</div>
    </div>
    <infinite-loading target="#container" @infinite="load"></infinite-loading>
  </div>
</template>




<script>
import InfiniteLoading from "v3-infinite-loading"
import "v3-infinite-loading/lib/style.css"

export default {
  components: {
    // InfiniteLoading: infinite-loading,//bad
    // InfiniteLoading,
    "infinite-loading": InfiniteLoading,
  },

  data() {
    return {
      text:'',
      comments: [],
      page: 1,
    }
  },

  methods: {
    async load($state) {
      console.log("loading...");
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/comments?_limit=10&_page=" + this.page);
        const json = await response.json();
        if (json.length < 10) {
          $state.complete();
        }
        else {
          this.comments.push(...json);
          $state.loaded();
        }
        this.page++;
      } catch (error) {
        $state.error();
      }
    },

  },

}

</script>







<style scoped>
#container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  margin: 20px auto 20px auto;
  max-height: calc(100vh - 110px);
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


.content {
  margin-bottom: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  max-height: 84px;
  font-size: 18px;
  line-height: 28px;
  word-break: break-all;
  color: #222;
}
</style>

<template>

  <el-container>
    <el-header>
      <el-row>
        <el-col :span="3">
          <el-image src="https://www.baidu.com/img/flexible/logo/pc/result.png" alt="logo" width="100px" height="100px" />
        </el-col>
        <el-col :span="21">
          <h1 align="center">打造您个人的收藏空间</h1>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-input v-model="text" clearable @keyup.enter="do_search" />
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <div id="container">
        <div class="result" v-for="fav in favs" :key="fav.id">
          <div v-if="fav.title" class="content">{{ fav.title }}</div>
          <!-- <div v-else>{{ fav.content }}</div> -->
          <!-- <div v-else v-html="fav.rich_content" class="content"></div> -->
          <div v-else-if="fav.rich_content" v-html="fav.rich_content" class="content"></div>

          <div v-if="fav.url">{{ fav.url }}</div>
          <div v-else-if="fav.share_url">{{ fav.share_url }}</div>
          <div v-else-if="fav.share_info && fav.share_info.share_url">{{ fav.share_info.share_url }}</div>
        </div>
        <infinite-loading target="#container" @infinite="load"></infinite-loading>

      </div>
    </el-main>
    <el-backtop :right="100" :bottom="100" />
  </el-container>


</template>







<script>
import InfiniteLoading from "v3-infinite-loading"
import "v3-infinite-loading/lib/style.css"
import axios from 'axios';



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
    // async load($state) {
    //   console.log("loading...", $state);
    //   try {
    //     const url = `http://localhost:5000/search?keywords=${this.text}&&page=${this.page + 1}`
    //     const response = await fetch(url);
    //     const json = await response.json();
    //     if (json.length < 10) {
    //       $state.complete();
    //     }
    //     else {
    //       this.favs.push(...json);
    //       $state.loaded();
    //     }
    //     this.page++;
    //   } catch (error) {
    //     $state.error();
    //   }
    // },


    load($state) {
      console.log("loading...", $state);
      const url = `http://localhost:5000/search?keywords=${this.text}&&page=${this.page + 1}`
      axios.get(url)
        .then(response => {
          console.log(response.data);
          if (response.data.length < 10) {
            $state.complete();
          }
          this.favs.push(...response.data);
          $state.loaded();
          this.page++;
        })
        .catch(error => {
          console.error(error);
          $state.error();
        });
    },

    do_search() {
      this.page = 0;
      this.favs = [];
    },

  },


}
</script>

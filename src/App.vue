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
  text-align: left;
}
</style>

<template>

  <el-container>
    <el-header>
      <el-row>
        <el-col :span="3">
          <!-- <el-image src="https://www.baidu.com/img/flexible/logo/pc/result.png" alt="logo" width="202px" height="66px" /> -->
          <img alt="logo" class="logo" src="./assets/myfavs.png" width="202" height="66" />
        </el-col>
        <el-col :span="21">
          <h1 align="center">打造您个人的收藏空间</h1>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-input v-model="text" clearable @keyup.enter="do_search" placeholder="搜索您在头条收藏的东西" :prefix-icon="Search" />
        </el-col>
      </el-row>
    </el-header>

    <el-container>
      <el-aside width="600px">
        <div id="container" >
          <div class="result" v-for="fav in favs" :key="fav.id">
            <div v-if="fav.title" class="content" @click="handleSelect(fav.md_content?fav.md_content:fav )">{{ fav.title }}</div>
            <div v-else-if="fav.rich_content" v-html="fav.rich_content" class="content" @click="handleSelect(fav.rich_content )"></div>
            <div v-else-if="fav.comment_base && fav.comment_base.share && fav.comment_base.share.share_title"
              class="content"  @click="handleSelect(fav.comment_base.share.share_title )">{{ fav.comment_base.share.share_title }}</div>
            <div v-else class="content" @click="handleSelect(fav )">[无文字]</div>

            <div v-if="fav.url" class="content"><a :href="fav.url" target="_blank">here</a> &nbsp;<a href="#" @click.prevent="remove(fav._id)">Remove</a>  </div>
            <div v-else-if="fav.share_url" class="content"><a :href="fav.share_url" target="_blank">here</a>&nbsp;<a href="#" @click.prevent="remove(fav._id)">Remove</a></div>
            <div v-else-if="fav.share_info && fav.share_info.share_url" class="content"><a
                :href="fav.share_info.share_url" target="_blank">here</a>&nbsp;<a href="#" @click.prevent="remove(fav._id)">Remove</a></div>
            <div v-else-if="fav.comment_base && fav.comment_base.share && fav.comment_base.share.share_url"
              class="content"><a :href="fav.comment_base.share.share_url" target="_blank">here</a>&nbsp;<a href="#" @click.prevent="remove(fav._id)">Remove</a></div>
            <div v-else-if="fav.schema" class="content"><a :href="fav.schema" target="_blank">here</a>&nbsp;<a href="#" @click.prevent="remove(fav._id)">Remove</a></div>
            <div v-else>{{ fav }}</div>

            <!-- <div class="content"  @click="handleSelect(fav.comment_base.share.share_title )> Remove </div> -->
          </div>
          <infinite-loading target="#container" @infinite="load"></infinite-loading>

        </div>
      </el-aside>

      <el-main>
        <br/>
          <Markdown :source="selected_fav" />
      </el-main>
    </el-container>


  </el-container>
</template>







<script>
import InfiniteLoading from "v3-infinite-loading"
import "v3-infinite-loading/lib/style.css"
import axios from 'axios'
// import { selectGroupKey } from "element-plus";
// import  {Markdown}  from 'vue3-markdown-it';
import Markdown from 'vue3-markdown-it';



export default {
  components: {
    Markdown,
    "infinite-loading": InfiniteLoading,
    "Markdown":Markdown
     
  },


  data() {
    return {
      text: '',
      favs: [],
      page: 0,
      selected_fav: '',      
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



    handleSelect(md_content) {
      this.selected_fav=typeof md_content == 'string' ? md_content:md_content.md_content;
      if (typeof md_content != 'string'){
        console.log(md_content);
      }
      
    },

    

    remove(_id) {
      console.log(_id)
      const url = `http://localhost:5000/remove`
      const data={_id:_id}
      axios.delete(url,{params:data})
        .then(response => {
          this.favs=this.favs.filter(item => item._id!=_id);
         
        })
        .catch(error => {
          console.error(error);
          
        });
    },
      
      

}
    


}
</script>

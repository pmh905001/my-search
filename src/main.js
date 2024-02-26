// import './assets/main.css'
import { createApp } from 'vue'


// import App from './App.vue'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// const app = createApp(App);
// app.use(ElementPlus)
// app.mount('#app')


// import AppBySelf from './AppBySelf.vue'
// createApp(AppBySelf).mount('#app')


// import MyFav from './MyFav.vue'
// createApp(MyFav).mount('#app')


// import MyScroll from './MyScroll.vue'
// createApp(MyScroll).mount('#app')


// import MyScroll2 from './MyScroll2.vue'
// createApp(MyScroll2).mount('#app')


// import MyScrollOpt from './MyScrollOpt.vue'
// createApp(MyScrollOpt).mount('#app')


// import InfiniteLoading from "v3-infinite-loading"
// import "v3-infinite-loading/lib/style.css"
// import MyScroll3Party from './MyScroll3Party.vue'
// const app = createApp(MyScroll3Party)
// app.component("infinite-loading", InfiniteLoading);
// app.mount("#app");

// import MyScroll3Party from './MyScroll3Party.vue'
// createApp(MyScroll3Party).mount('#app');


import MyElementPlus from './MyElementPlus.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(MyElementPlus);
// app.component("ElementPlus", ElementPlus);
app.use(ElementPlus)
app.mount('#app')


// import AppInfiniteLoading from './AppInfiniteLoading.vue'
// createApp(AppInfiniteLoading).mount('#app')
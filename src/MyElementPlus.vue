


<template>
  <el-input v-model="text" clearable style="width: 200px"  />



  <el-button type="primary">leenhem</el-button>

  <br/>

  <el-button type="primary" :suffix-icon="['el-icon-search']">Search</el-button>


</template>

<script>
export default {
  data() {
    return {
      text: "test"
    }
  },
}
</script>


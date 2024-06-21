<template>
  <div>
    <Markdown :source="source" />
  </div>
</template>

<script>

import Markdown from 'vue3-markdown-it';

export default {
  components: {
    Markdown
  },
  data() {
    return {
      source: '# this is not so cool!'
    }
  }
}
</script>
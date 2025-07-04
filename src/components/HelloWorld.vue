<template>
  <div v-html="content" class="markdown-body" id="markdown"></div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { marked } from 'marked';
// import "github-markdown-css/github-markdown-dark.css"
import "../assets/styles/markdown.css"
import "../assets/styles/github.css"
import hljs from 'highlight.js'
import 'highlight.js/styles/foundation.css'
const route = useRoute();
const content = ref('');

watchEffect(() => {
  const modules = import.meta.glob('../lib/**/*.md', { as: 'raw' })
  console.log("🚀 ~ watchEffect ~ modules:", modules)
  // const path = `../lib/处理模型载荷计算逻辑/${route.params.name.join('/')}`

for(let module in modules){
 modules[module]().then((mdContent) => {
      content.value = marked.parse(mdContent)
    })
    }
});
</script>

<style scoped>
@import 'github-markdown-css/github-markdown.css';

.markdown-body {
  padding: 20px;
}
</style>
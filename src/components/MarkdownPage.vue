<template>
    <div v-html="content" class="markdown-body" id="markdown"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { router } from "../router";
import { marked } from 'marked';
import "../assets/styles/markdown.css"
import "../assets/styles/github.css"
import 'highlight.js/styles/foundation.css'
const content = ref('');
onMounted(() => {
    updateMarkdown()
})

const updateMarkdown = () => {
    const markdown = router.currentRoute.value.meta.markdown
    if (markdown) {
        content.value = marked.parse(markdown as string) as string
    }
}
watch(router.currentRoute, () => {
    updateMarkdown()
})
</script>

<style scoped>
@import 'github-markdown-css/github-markdown.css';

.markdown-body {
    padding: 20px;
}
</style>
<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import MarkdownPage from '../components/MarkdownPage.vue'
import { router } from "../router";
import { generateMarkdownRoutes } from "../router/markdown-routes";
import { useRoute, type RouteRecordRaw } from "vue-router";

const MarkdownRoutes = ref<RouteRecordRaw[]>([]);
const filteredRoutes = ref<RouteRecordRaw[]>([]);
const route = useRoute();
const activePath = computed(() => route.path);
const searchQuery = ref('');

onMounted(() => {
    generateMarkdownRoutes().then(r => {
        MarkdownRoutes.value = r;
        filteredRoutes.value = r;
    });
});

// 监听搜索框变化
watch(searchQuery, (newVal) => {
    if (!newVal) {
        filteredRoutes.value = MarkdownRoutes.value;
        return;
    }

    const lowerQuery = newVal.toLowerCase();
    filteredRoutes.value = MarkdownRoutes.value.filter(route =>
        (route.name as string)?.includes(lowerQuery)
    );
});
</script>

<template>
    <div class="app-container">
        <!-- 侧边栏菜单 -->
        <aside class="sidebar">
            <div class="sidebar-header">
                <h1>Cesium Tools</h1>
                <!-- 搜索框 -->
                <div class="search-container">
                    <input v-model="searchQuery" type="text" placeholder="搜索文档..." class="search-input">
                    <i class="fa fa-search search-icon">🔍</i>
                </div>
            </div>

            <nav class="sidebar-content">
                <div v-for="routeItem in filteredRoutes" :key="routeItem.path" @click="router.push(routeItem.path)"
                    :class="[
                        'sidebar-item',
                        activePath === routeItem.path ? 'sidebar-item-active' : 'sidebar-item-hover'
                    ]">
                    <i class="fa fa-file-text-o"></i>
                    <span class="sidebar-item-text" title="{{ routeItem.name }}">{{ routeItem.name }}</span>
                </div>
            </nav>
        </aside>

        <!-- 主内容区 -->
        <main class="main-content">
            <div class="markdown-container">
                <MarkdownPage />
            </div>
        </main>
    </div>
</template>

<style scoped>
/* 基础样式 */
body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
    color: #333;
    margin: 0;
    padding: 0;
}

/* 应用容器 */
.app-container {
    display: flex;
    height: 100vh;
    background-color: #f9fafb;
}

/* 侧边栏 */
.sidebar {
    min-width: 240px;
    background-color: white;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    z-index: 40;
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.sidebar-header {
    padding: 1rem;
    border-bottom: 1px solid #e5e7eb;
}

.sidebar-header h1 {
    font-size: 1.25rem;
    font-weight: bold;
    color: #1f2937;
    margin: 0 0 1rem 0;
}

/* 搜索框样式 */
.search-container {
    position: relative;
}

.search-input {
    width: calc(100% - 2.5rem);
    padding: 0.5rem 0.5rem 0.5rem 2rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    background-color: #f9fafb;
    outline: none;
    transition: border-color 0.2s;
}

.search-input:focus {
    border-color: #93c5fd;
}

.search-icon {
    position: absolute;
    left: 0.5rem;
    top: 0.25rem;
    color: #9ca3af;
}

/* 侧边栏内容 */
.sidebar-content {
    padding: 0.5rem;
    overflow-y: auto;
    flex: 1;
}

/* 侧边栏项目 */
.sidebar-item {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    margin: 0.25rem 0;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
}

.sidebar-item i {
    margin-right: 0.75rem;
    min-width: 1rem;
}

.sidebar-item-text {
    overflow: hidden;
    text-overflow: ellipsis;
}

.sidebar-item-active {
    background-color: #e0e7ff;
    color: #4f46e5;
    font-weight: 500;
}

.sidebar-item-hover:hover {
    background-color: #f3f4f6;
    color: #1f2937;
}

/* 主内容区 */
.main-content {
    flex: 1;
    overflow-y: auto;
    padding: 2rem;
    background-color: white;
}

.markdown-container {
    max-width: 80rem;
    margin: 0 auto;
    background-color: white;
    border-radius: 0.75rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    margin-bottom: 2rem;
}

/* 平滑滚动 */
html {
    scroll-behavior: smooth;
}

/* 自定义滚动条 */
::-webkit-scrollbar {
    width: 0.5rem;
}

::-webkit-scrollbar-track {
    background-color: #f3f4f6;
    border-radius: 0.5rem;
}

::-webkit-scrollbar-thumb {
    background-color: #d1d5db;
    border-radius: 0.5rem;
}

::-webkit-scrollbar-thumb:hover {
    background-color: #9ca3af;
}
</style>
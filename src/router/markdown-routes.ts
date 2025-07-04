import type { RouteRecordRaw } from 'vue-router';

// 路由配置生成函数
export async function generateMarkdownRoutes(): Promise<RouteRecordRaw[]> {
    // 动态导入所有 Markdown 文件
    const mdModules = import.meta.glob('../lib/**/*.md', { as: 'raw' });

    // 处理每个模块并生成路由配置
    const routePromises = Object.entries(mdModules).map(async ([path, loader], num) => {
        // 提取 lib 下的一级文件夹名作为路由路径和名称
        const { routePath, routeName } = extractRouteInfo(path);

        // 异步加载 Markdown 内容
        const markdownContent = await loader();

        // 返回路由配置
        return {
            path: `/${num + 1}`,
            name: routeName,
            component: () => import('../components/MarkdownPage.vue'),
            meta: {
                title: extractTitle(markdownContent),
                markdown: markdownContent
            }
        } as RouteRecordRaw;
    });

    // 等待所有路由配置完成
    return Promise.all(routePromises);
}

// 从文件路径提取路由信息
function extractRouteInfo(filePath: string): { routePath: string; routeName: string } {
    // 匹配 lib/ 后的第一个文件夹
    const match = filePath.match(/^\.\.\/lib\/([^/]+)/);

    if (match) {
        const folderName = match[1];
        return {
            routePath: `/${folderName}`, // 路由路径（保留斜杠）
            routeName: folderName        // 路由名称（去除斜杠）
        };
    }

    // 处理无文件夹的情况（如 ../lib/readme.md）
    const pathWithoutLib = filePath.replace(/^\.\.\/lib/, '');
    const pathWithoutExt = pathWithoutLib.replace(/\.md$/, '');
    const cleanPath = pathWithoutExt.replace(/^\/|\/$/g, ''); // 移除首尾斜杠

    return {
        routePath: cleanPath ? `/${cleanPath}` : '/',
        routeName: cleanPath || 'home'
    };
}

// 从 Markdown 内容提取标题
function extractTitle(content: string): string {
    const match = content.trim().match(/^#\s+(.*)$/m);
    return match ? match[1] : '未命名页面';
}
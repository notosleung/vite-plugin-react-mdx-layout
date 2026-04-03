[English](./README.md) | [简体中文]

**已弃用：vite-plugin-react-mdx-wrapper**

# vite-plugin-react-mdx-layout

一个极简的 Vite 插件，自动为你的`.mdx`文件包裹 React 组件，并自动处理 Frontmatter 数据。

## 🌟 特性

- **自动包裹**: 无需在每个`.mdx`中手动导入 Layout。
- **Frontmatter 自动注入**: 将 MDX 的 frontmatter 自动传递给 Wrapper 组件。
- **灵活配置**: 支持字符串路径或根据文件内容动态返回路径。
- **Meta 支持**: C支持从 Wrapper 组件中导出`meta`函数，适配 React Router v7 / Remix 等框架。

## 📦 安装

```bash
pnpm install vite-plugin-react-mdx-layout -D
```

## 🚀 使用方法

在你的`vite.config.ts`中配置：

```TypeScript
import { defineConfig } from 'vite';
import mdx from '@mdx-js/rollup';
import { reactMdxLayout } from 'vite-plugin-react-mdx-layout';

export default defineConfig({
  plugins: [
    reactMdxLayout('app/components/BlogWrapper.tsx'), // 在mdx()之前
    mdx()
  ],
});
```

## 动态 Wrapper 路径

你也可以传入一个函数，根据 MDX 文件的内容或路径动态决定使用哪个 Wrapper：

```TypeScript
reactMdxLayout((code, id) => {
  if (id.includes('/docs/')) return 'app/layouts/DocsWrapper.tsx';
  return 'app/layouts/DefaultWrapper.tsx';
})
```

## 🛠 编写你的 Wrapper 组件

你的 Layout 组件将接收`children`和`frontmatter`作为 props：

```TypeScript
// src/components/BlogWrapper.tsx
interface MdxFrontmatter {
  title: string
  date?: string
  description?: string
  [key: string]: any
}

interface MdxWrapperProps {
  children: ReactNode
  frontmatter: MdxFrontmatter
}

export default function BlogWrapper({ children, frontmatter }: MdxWrapperProps) {
  return (
    <article>
      <h1>{frontmatter.title}</h1>
      <span>{frontmatter.date}</span>
      {/* MDX content will be rendered in children */}
      <main>{children}</main>
    </article>
  );
}

// Optional: Export meta for React Router v7 / Remix
export function meta({ frontmatter }: { frontmatter: MdxFrontmatter }) {
  return [
    { title: frontmatter.title },
    { name: "description", content: frontmatter.description },
  ];
};
```

## 💡 注意事项

1. **执行顺序**: 本插件会自动设置`enforce: 'pre'`，确保在 MDX 编译器处理之前注入代码。
2. **环境要求**: 请确保你的项目已经配置了 React 环境以及 MDX 插件。
3. **路径**: 建议使用相对于项目根目录的路径，插件会自动将其转换为绝对路径。

## 📄 License

[MIT](./LICENSE)

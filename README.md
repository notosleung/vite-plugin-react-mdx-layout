[English] | [简体中文](./README.zh-CN.md)

# vite-plugin-react-mdx-layout

A lightweight Vite plugin that automatically wraps your `.mdx` files with a React component and handles frontmatter data injection.

## 🌟 Features

- **Automatic Wrapping**: No need to manually import layouts in every `.mdx` file.
- **Frontmatter Injection**: Automatically passes MDX frontmatter to your wrapper component.
- **Flexible Configuration**: Supports both static paths and dynamic path resolution via functions.
- **Meta Support**: Compatible with frameworks like React Router v7 and Remix for `meta` exports.

## 📦 Installation

```bash
pnpm install vite-plugin-react-mdx-layout -D
```

## 🚀 Usage

Configure it in your `vite.config.ts`:

```TypeScript
import { defineConfig } from 'vite';
import mdx from '@mdx-js/rollup';
import { reactMdxLayout } from 'vite-plugin-react-mdx-layout';

export default defineConfig({
  plugins: [
    reactMdxLayout('app/components/BlogWrapper.tsx'), // before mdx()
    mdx()
  ],
});
```

## Dynamic Wrapper Path

You can also provide a function to dynamically determine the wrapper path based on the file content or ID:

```TypeScript
reactMdxLayout((code, id) => {
  if (id.includes('/docs/')) return 'app/layouts/DocsWrapper.tsx';
  return 'app/layouts/DefaultWrapper.tsx';
})
```

## 🛠 Creating Your Wrapper Component

Your wrapper component receives `children` and `frontmatter` as props:

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

## 💡 Notes

1. **Execution Order**: The plugin automatically sets `enforce: 'pre'` to ensure it runs before the MDX compiler.
2. **Environment**: Ensure your project is configured with React and an MDX plugin.
3. **Paths**: It is recommended to use paths relative to the project root.

## 📄 License

[MIT](./LICENSE)

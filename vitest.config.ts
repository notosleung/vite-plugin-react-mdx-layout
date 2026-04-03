import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // 开启全局 API，让你不需要在每个文件里手动 import expect, test 等
    globals: true,
    // 设置环境，测试环境通常选 'node'
    environment: "node",
    // 包含测试文件的目录
    include: ["tests/**/*.{test,spec}.{js,ts}"],
  },
});

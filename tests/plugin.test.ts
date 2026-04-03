import { describe, it, expect } from "vitest";
import { reactMdxLayout } from "../src/index";

describe("reactMdxLayout plugin", () => {
  it("should ignore non-mdx files", () => {
    const plugin = reactMdxLayout("./Wrapper.tsx");
    // Testing that the plugin returns undefined for non-mdx files
    const result = plugin.transform("# Content", "test.txt");
    expect(result).toBeUndefined();
  });

  it("should inject wrapper import correctly", () => {
    const plugin = reactMdxLayout("./Wrapper.tsx");
    const result = plugin.transform("# Hello", "test.mdx");

    // Check if the import statement is injected
    expect(result).toContain("import MdWrapper, { meta as wrapperMeta } from");
    // Check if the React Wrapper component is used in the layout function
    expect(result).toContain("<MdWrapper frontmatter={fm}>{children}</MdWrapper>");
  });

  it("should handle frontmatter correctly", () => {
    const plugin = reactMdxLayout("./Wrapper.tsx");
    const mdx = "---\ntitle: Test\n---\nContent";
    const result = plugin.transform(mdx, "test.mdx");

    // Ensure the import is injected after the frontmatter closing block
    expect(result).toContain("---\n\nimport MdWrapper");
  });
});

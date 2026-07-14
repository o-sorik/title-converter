import { defineConfig } from "vitest/config"
import { resolve } from "node:path"

export default defineConfig({
  test: {
    // Claude Code worktrees are full repo copies; never run their tests.
    exclude: ["**/node_modules/**", ".claude/**"],
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "."),
    },
  },
})

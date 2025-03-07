import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
    plugins: [react()],
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: ["./src/setupTests.ts"],
        coverage: {
            provider: "v8",
            reporter: ["text", "json", "html"],
            // カバレッジ計算から除外するファイル/ディレクトリ
            exclude: [
                // 設定ファイル
                "postcss.config.js",
                "tailwind.config.js",
                "vite.config.ts",
                "vitest.config.ts",
                "biome.json",

                // データファイル
                "src/data/**",

                // エントリーポイント
                "src/main.tsx",
                "src/App.tsx",

                // その他の対象外ファイル
                "src/lib/**",
                "**/*.d.ts",
                "**/node_modules/**",
                "dist/**",
                ".cursor/**",
                "coverage/**",
            ],
        },
        alias: {
            "@": resolve(__dirname, "./src"),
        },
    },
});

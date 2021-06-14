import { resolve } from "path";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { replaceCodePlugin } from "vite-plugin-replace";
import { minify } from "html-minifier";
import { preprocess } from "./svelte.config";

// const { defineConfig } = require("vite");
import { defineConfig } from "vite";
const indexReplace = () => {
  return {
    name: "html-transform",
    transformIndexHtml(html) {
      return minify(html, {
        collapseWhitespace: true
      });
    }
  };
};

export default defineConfig(({ command, mode }) => {
  const isProduction = mode === "production";
  return {
    server: {
      port: 5000
    },
    build: {
      polyfillDynamicImport: false,
      cssCodeSplit: false,
      minify: isProduction
    },

    optimizeDeps: {
      exclude: ["@roxi/routify"]
    },
    resolve: {
      dedupe: ["@roxi/routify"],
      alias: {
        svelte: resolve(__dirname, "node_modules/svelte"),
        "__@comps": resolve(__dirname, "./src/components"),
        "__@modules": resolve(__dirname, "./src/modules"),
        "__@stores": resolve(__dirname, "./src/stores"),
        "__@root": resolve(__dirname, "./src")
      }
    },
    plugins: [
      replaceCodePlugin({
        replacements: [
          {
            from: "process.env.DBX_ENV_GRAPHQL_URL",
            to: `"${process.env.DBX_ENV_GRAPHQL_URL}"`
          },
          {
            from: "process.env.DBX_ENV_GRAPHQL_WS",
            to: `"${process.env.DBX_ENV_GRAPHQL_WS}"`
          },
          {
            from: "process.env.DBX_ENV_API_URL",
            to: `"${process.env.DBX_ENV_API_URL}"`
          },
          {
            from: "process.env.NODE_ENV",
            to: `"${process.env.NODE_ENV || "development"}"`
          }
        ]
      }),
      // windiCSS({
      //   //@ts-ignore
      //   verbose: true,
      //   silent: false,
      //   debug: true,
      //   config: "tailwind.config.js", // tailwind config file path (optional)
      //   compile: false, // false: interpretation mode; true: compilation mode
      //   prefix: "windi-", // set compilation mode style prefix
      //   globalPreflight: true, // set preflight style is global or scoped
      //   globalUtility: true // set utility style is global or scoped
      // }),
      svelte({
        hot: !isProduction,
        emitCss: true,
        extensions: [".svelte"],
        preprocess
      }),
      indexReplace()
    ]
  };
});

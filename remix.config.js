const { withEsbuildOverride } = require("remix-esbuild-override");
const path = require("node:path");
const GlobalsPolyfills =
  require("@esbuild-plugins/node-globals-polyfill").default;

withEsbuildOverride((option, { isServer }) => {
  // https://github.com/evanw/esbuild/issues/2328#issuecomment-1159258064
  option.logOverride = { "this-is-undefined-in-esm": "silent" }
  option.jsxFactory = "jsx";
  option.inject = [path.resolve(__dirname, "reactShims.ts")];

  // 🔽 This block is for Cloudflare Workers/Pages. 🔽
  if (isServer)
    option.plugins = [
      GlobalsPolyfills({
        buffer: true,
      }),
      ...option.plugins,
    ];
  // 🔼 This block is for Cloudflare Workers/Pages. 🔼

  return option;
});

/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  serverBuildTarget: "cloudflare-pages",
  server: "./server.js",
  devServerBroadcastDelay: 1000,
  ignoredRouteFiles: [".*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
};

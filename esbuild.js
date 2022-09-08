import { build, analyzeMetafile } from "esbuild";

const run = async () => {
  let result = await build({
    entryPoints: ["./src/test/testSdk.js"],
    bundle: true,
    minify: false,
    sourcemap: false,
    outfile: "build/testSdk.js",
    sourceRoot: "./src/",
    platform: "node",
    metafile: true
  });
};

run();
const { transpile } = require("typescript");
const { resolve } = require("path");

/** @type {import("@flamesx128/bys").Config} */
module.exports = {
  entry: "src/main.ts",
  output: {
    extention: ".js",
    filename: "bundle",
    path: resolve(__dirname, "dist"),
  },
  transpiler(code) {
    return transpile(code, {
      compilerOptions: {
        module: "commonjs",
        target: "es2015",
        moduleResolution: "classic",
        removeComments: true,
        lib: ["DOM", "DOM.Iterable", "ES2015", "ES2016"],
        strict: true,
        alwaysStrict: true,
      },
    });
  },
};

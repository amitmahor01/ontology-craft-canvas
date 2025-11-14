import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.js"],     
  format: ["esm", "cjs"],      
  target: "esnext",
  sourcemap: true,
  clean: true,
  dts: false,                  
  splitting: false,
  minify: false,
  bundle: true,
  external: [
    "react",
    "react-dom",
    "reactflow",
    "@reactflow/node-resizer"
  ],
  jsx: "transform",
  loader: {
    ".js": "jsx", 
  },            
});

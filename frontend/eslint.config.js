// eslint.config.js
import prettierPlugin from "eslint-plugin-prettier";

export default [
  {
    files: ["**/*.{js,jsx}"],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "warn",
    },
  },
];

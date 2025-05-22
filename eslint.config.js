import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { globalIgnores } from "eslint/config";

export default tseslint.config([
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  globalIgnores([".yarn", "node_modules", ".vscode", ".next", ".pnp.*"]),
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      js: js,
    },
    extends: [js.configs.recommended],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    rules: {
      "prettier/prettier": 0,
      "array-element-newline": [
        "error",
        {
          ArrayExpression: "consistent",
          ArrayPattern: {
            minItems: 20,
          },
        },
      ],
      "arrow-parens": [
        0,
        "as-needed",
        {
          requireForBlockBody: true,
        },
      ],
      "block-spacing": 2,
      camelcase: [
        "error",
        {
          properties: "never",
        },
      ],
      "jsx-quotes": ["error", "prefer-double"],
      "import/prefer-default-export": 0,
      "jsx-a11y/anchor-is-valid": 0,
      "max-len": ["error", 119],
      "no-nested-ternary": 0,
      "no-console": 0,
      "no-else-return": 0,
      "no-plusplus": 0,
      "no-param-reassign": 0,
      "no-useless-escape": 0,
      "object-curly-newline": 0,
      "object-shorthand": 0,
      "operator-linebreak": 0,
      "prefer-const": 0,
      "template-curly-spacing": 0,
      "react/jsx-pascal-case": 2,
      "react/react-in-jsx-scope": 0,
      "react/self-closing-comp": 0,
      "react/jsx-props-no-spreading": 0,
      "react/forbid-prop-types": 0,
      "react/prop-types": 0,
      "react/jsx-one-expression-per-line": 0,
      "react/jsx-curly-spacing": 0,
      "react/no-array-index-key": 0,
      "react/jsx-filename-extension": 0,
      "react/function-component-definition": 0,
      "react/require-default-props": 0,
      "react-hooks/exhaustive-deps": 0,
      "import/extensions": 0,
      "eol-last": ["error"],
      "@typescript-eslint/no-non-null-assertion": 0,
      "@typescript-eslint/no-var-requires": 0,
      "lines-between-class-members": 0,
      "max-classes-per-file": 0,
      "no-bitwise": 0,
    },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
]);

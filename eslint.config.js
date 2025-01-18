import jsPlugin from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import globals from "globals";

const eslintConfig = [
  {
    files: ["*.js", "*.jsx"],
    ...jsPlugin.configs.recommended,
  },
  {
    files: ["*.ts", "*.tsx"],
    languageOptions: {
      parser: tsParser,
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_*$",
          varsIgnorePattern: "^_*$",
          caughtErrorsIgnorePattern: "^_*$",
        },
      ],
    },
  },
  {
    files: ["*.jsx", "*.tsx"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      "react/jsx-curly-brace-presence": ["error", "always"],
      "react/self-closing-comp": ["error", { component: true, html: true }],
      "react/react-in-jsx-scope": "off",
    },
  },

  {
    ignores: [
      "**/*.d.ts",
      "**/*.pkg",
      "**/*.yml",
      "**/.yarn/",
      "**/build/",
      "**/dist/",
      "*.config.js",
      "*.config.mjs",
      "*.xml",
      "scripts/",
    ],
  },
];

export default eslintConfig;

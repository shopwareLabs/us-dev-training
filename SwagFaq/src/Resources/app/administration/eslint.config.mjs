// @ts-check

import eslint from "@eslint/js";
import eslintPluginVue from "eslint-plugin-vue";
import globals from "globals";
import typescriptEslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default typescriptEslint.config(
    { ignores: ["*.d.ts", "**/coverage", "**/dist", "**/node_modules"] },
    {
        extends: [
            eslint.configs.recommended,
            ...typescriptEslint.configs.recommended,
            ...eslintPluginVue.configs["flat/recommended"],
            eslintPluginPrettierRecommended,
        ],
        files: ["**/*.{ts,js,vue}"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: globals.browser,
            parserOptions: {
                parser: typescriptEslint.parser,
            },
        },
    }
);

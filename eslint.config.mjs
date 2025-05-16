import antfu from "@antfu/eslint-config";

export default antfu(
  {
    type: "app",
    react: true, // uncomment if you are using React
    typescript: true,
    formatters: true,
    stylistic: {
      indent: 2,
      semi: true,
      quotes: "double",
    },
  },
  {
    rules: {
      // Your custom overrides
      "ts/no-redeclare": "off",
      "ts/consistent-type-definitions": ["error", "type"],
      "no-console": ["warn"],
      "no-unused-vars": "warn",

      // Style/formatting-related disables (from your customizations)
      "style/*": "off",
      "format/*": "off",
      "stylistic/*": "off",
      "style/comma-spacing": "off",
      "style/comma-style": "off",
      "style/no-multi-spaces": "off",
      "style/no-multiple-empty-lines": "off",
      "style/no-trailing-spaces": "off",
      "style/brace-style": "off",
      "style/semi": "off",
      "style/quotes": "off",
      "style/indent": "off",
      "style/space-before-function-paren": "off",
      "style/spaced-comment": "off",
      "style/no-extra-semi": "off",
      "comma-dangle": "off",
      "object-curly-spacing": "off",
      "array-bracket-spacing": "off",
      "semi": "off",
      "quotes": "off",
      "indent": "off",
      "key-spacing": "off",
      "space-infix-ops": "off",
      "newline-per-chained-call": "off",

      // Additional customizations
      "antfu/no-top-level-await": "off",
      "node/prefer-global/process": "off",
      "node/no-process-env": "error",

      "perfectionist/sort-imports": [
        "warn",
        {
          tsconfigRootDir: ".",
        },
      ],
      "unicorn/filename-case": [
        "error",
        {
          case: "kebabCase",
          ignore: ["README.md"],
        },
      ],
    },
  },
);

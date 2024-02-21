module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "standard-with-typescript",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "import/order": [
          "error",
          {
            "groups": [["builtin", "external"], "internal", ["parent", "sibling", "index"]],
            "newlines-between": "always",
            "alphabetize": {"order": "asc", "caseInsensitive": true }
          }
        ],
          "react/jsx-max-props-per-line": ["error", {"maximum": { "single": 2, "multi": 1}}],
          "react/jsx-wrap-multilines":["error",{
              "declaration": "parens",
              "assignment": "parens",
              "return": "parens",
              "arrow": "parens",
              "condition": "parens-new-line",
              "logical": "parens-new-line",
              "prop": "ignore"
          }],
          "react/jsx-indent": ["error", 2],
          "react/jsx-indent-props": ["error", 2],
          "react/jsx-first-prop-new-line": 2,
          "react/jsx-closing-tag-location":2,
          "react/jsx-equals-spacing": [2, "never"],
          "react/jsx-curly-spacing": ["error", {"when": "never", "children": true}],
          "react/jsx-closing-bracket-location": ["error", { "selfClosing": "tag-aligned", "nonEmpty": "after-props"}],
          "@typescript-eslint/block-spacing": ["error", "never"],
          "@typescript-eslint/type-annotation-spacing": "error",
          "@typescript-eslint/explicit-function-return-type": 0,
          "@typescript-eslint/strict-boolean-expressions": 0,
          "@typescript-eslint/no-misused-promises": [
              "error",
              {
                "checksVoidReturn": false
              }
          ],
          "@typescript-eslint/consistent-type-definitions": ["error", "type"],
          "@typescript-eslint/object-curly-spacing": 0,
          "@typescript-eslint/consistent-type-definitions": 0,
          "@typescript-eslint/consistent-indexed-object-style": 0,
          "object-curly-spacing": ["error", "never"],
          "padding-line-between-statements": [
              "error",
              {"blankLine": "always", "prev": "*", "next": ["return","if","try","for","while","export","const"]},
              {"blankLine": "never", "prev": "singleline-const", "next": "singleline-const"},
              {"blankLine": "always", "prev": "block-like", "next": "*"},
          ],
          "multiline-ternary": ["error", "always"]
        }
}

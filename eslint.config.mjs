import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Allow unused variables with underscore prefix (convention for intentionally unused params)
      "@typescript-eslint/no-unused-vars": ["error", {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_"
      }],
      // Downgrade any type to warning (pre-existing issues in codebase)
      "@typescript-eslint/no-explicit-any": "warn",
      // Downgrade unescaped entities to warning
      "react/no-unescaped-entities": "warn"
    }
  }
];

export default eslintConfig;

import config from "@repo/eslint-config";

// Workspaces lint themselves; the root covers tools, end-to-end tests, and config.
export default [
  {
    ignores: [
      "apps/**",
      "packages/**",
      "playwright-report/**",
      "test-results/**",
    ],
  },
  ...config,
];

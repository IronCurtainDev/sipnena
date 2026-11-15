export const API_KEY_HEADER = "x-api-key";
const DEMO_API_KEY = "dev-demo-api-key";
// This value is bundled into browser JavaScript. It is an abuse-control
// identifier, never a secret or an authorization mechanism. Local and browser
// test builds use the demo key; tools/deploy.mjs rebuilds with the real key.
export const apiKey = import.meta.env.VITE_API_KEY ?? DEMO_API_KEY;
export const apiKeyHeaders = { [API_KEY_HEADER]: apiKey };

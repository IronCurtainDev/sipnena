interface ImportMetaEnv {
  /** Public abuse-control key; tools/deploy.mjs requires a real value for deployed builds. */
  readonly VITE_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

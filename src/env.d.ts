/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Public origin of the deployed site, e.g. https://example.com (no trailing slash). */
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

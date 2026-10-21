/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Public origin of the deployed site, e.g. https://example.com (no trailing slash). */
  readonly VITE_SITE_URL?: string;
  /** Contact form POST endpoint (Formspree, Web3Forms, ...). Defaults to FormSubmit. */
  readonly VITE_CONTACT_FORM_ENDPOINT?: string;
  /** Optional access key sent as `access_key` (Web3Forms). */
  readonly VITE_CONTACT_FORM_ACCESS_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

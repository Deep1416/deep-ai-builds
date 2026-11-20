declare namespace NodeJS {
  interface ProcessEnv {
    /** Public origin of the deployed site, e.g. https://example.com (no trailing slash). */
    readonly NEXT_PUBLIC_SITE_URL?: string;
    /** Contact form POST endpoint (Formspree, Web3Forms, ...). Defaults to FormSubmit. */
    readonly NEXT_PUBLIC_CONTACT_FORM_ENDPOINT?: string;
    /** Optional access key sent as `access_key` (Web3Forms). */
    readonly NEXT_PUBLIC_CONTACT_FORM_ACCESS_KEY?: string;
  }
}

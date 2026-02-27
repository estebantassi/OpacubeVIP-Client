interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_SECURE: string;
  readonly VITE_TURNSTILE: string;
  readonly VITE_TURNSTILE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
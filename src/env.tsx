//.env is used for production variables that change only on the hosting machine
//this env file is used for values that change on every machine
export const getApiUrl = () => import.meta.env.VITE_API_URL;
export const getSecure = (): boolean => import.meta.env.VITE_SECURE === "true";
export const getTurnstileEnabled = (): boolean => import.meta.env.VITE_TURNSTILE === "true";
export const getTurnstileKey = () => import.meta.env.VITE_TURNSTILE_KEY;

export const PASSWORD_MIN_LENGTH = 12;
export const PASSWORD_MAX_LENGTH = 256;

export const USERNAME_MIN_LENGTH = 1;
export const USERNAME_MAX_LENGTH = 30;
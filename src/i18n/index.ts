import en from './locales/en';

export const getKey = (key: string) => en[key as never] ?? '';

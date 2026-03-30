export const URL_PARAMS = {
    QUERY: 'q',
} as const;

export type UrlParam = (typeof URL_PARAMS)[keyof typeof URL_PARAMS];

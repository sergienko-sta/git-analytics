export const EThemeMode = {
    LIGHT: 'light',
    DARK: 'dark',
} as const;

export type TThemeMode = (typeof EThemeMode)[keyof typeof EThemeMode];

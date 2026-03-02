import { createContext } from 'react';

import type { TThemeMode } from '@/shared/model';

export interface IThemeContextType {
    mode: TThemeMode;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContextType | undefined>(undefined);

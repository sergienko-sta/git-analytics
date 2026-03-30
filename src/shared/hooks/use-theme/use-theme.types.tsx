import { createContext } from 'react';
import type { theme } from 'antd';

import type { TThemeMode } from '@/shared/model';

export interface IThemeContextType {
    mode: TThemeMode;
    designTokens: ReturnType<typeof theme.useToken>['token'];
    toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContextType | undefined>(undefined);

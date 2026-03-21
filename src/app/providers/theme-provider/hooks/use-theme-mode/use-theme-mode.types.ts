import type * as Shared from '@shared';
import type { theme, ThemeConfig } from 'antd';

export type TUseThemeModeResult = {
    mode: Shared.Model.TThemeMode;
    toggleThemeMode: () => void;
    currentTheme: ThemeConfig;
    designTokens: ReturnType<typeof theme.useToken>['token'];
};

export type TUseThemeMode = () => TUseThemeModeResult;

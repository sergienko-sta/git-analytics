import type * as Shared from '@shared';
import type { ThemeConfig } from 'antd';

export type TUseThemeModeResult = {
    mode: Shared.Model.TThemeMode;
    toggleThemeMode: () => void;
    currentTheme: ThemeConfig;
};

export type TUseThemeMode = () => TUseThemeModeResult;

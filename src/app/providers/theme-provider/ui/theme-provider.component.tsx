import { memo, type PropsWithChildren } from 'react';
import { ConfigProvider } from 'antd';

import * as Shared from '@shared';

import * as Hooks from '../hooks';

export const ThemeProvider = memo<PropsWithChildren<unknown>>(({ children }) => {
    const { mode, currentTheme, toggleThemeMode } = Hooks.useThemeMode();

    return (
        <Shared.ThemeContext.Provider value={{ mode, toggleTheme: toggleThemeMode }}>
            <ConfigProvider theme={currentTheme}>{children}</ConfigProvider>
        </Shared.ThemeContext.Provider>
    );
});

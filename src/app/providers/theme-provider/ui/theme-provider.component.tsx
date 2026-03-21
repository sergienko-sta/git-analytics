import { memo, type PropsWithChildren } from 'react';
import { ConfigProvider } from 'antd';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import * as Shared from '@shared';

import * as Hooks from '../hooks';

export const ThemeProvider = memo<PropsWithChildren<unknown>>(({ children }) => {
    const { mode, currentTheme, toggleThemeMode, designTokens } = Hooks.useThemeMode();

    return (
        <Shared.ThemeContext.Provider value={{ mode, designTokens, toggleTheme: toggleThemeMode }}>
            <ConfigProvider theme={currentTheme}>
                <StyledThemeProvider theme={{ designTokens }}>{children}</StyledThemeProvider>
            </ConfigProvider>
        </Shared.ThemeContext.Provider>
    );
});

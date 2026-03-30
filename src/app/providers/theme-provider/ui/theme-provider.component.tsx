import { memo, type PropsWithChildren } from 'react';
import { ConfigProvider } from 'antd';
import { StyleProvider } from 'antd-style';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import * as Shared from '@shared';

import * as Hooks from '../hooks';

import * as Styles from './globals.styles';

export const ThemeProvider = memo<PropsWithChildren<unknown>>(({ children }) => {
    const { mode, currentTheme, toggleThemeMode, designTokens } = Hooks.useThemeMode();

    return (
        <Shared.ThemeContext.Provider value={{ mode, designTokens, toggleTheme: toggleThemeMode }}>
            <StyleProvider>
                <ConfigProvider theme={currentTheme}>
                    <StyledThemeProvider theme={{ designTokens }}>
                        <Styles.GlobalStyles />
                        {children}
                    </StyledThemeProvider>
                </ConfigProvider>
            </StyleProvider>
        </Shared.ThemeContext.Provider>
    );
});

import { useCallback, useMemo, useState } from 'react';

import * as Shared from '@shared';

import { darkTheme, lightTheme } from '@/app/theme';

import type * as Types from './use-theme-mode.types';

export const useThemeMode: Types.TUseThemeMode = () => {
    const [mode, setMode] = useState<Shared.Model.TThemeMode>(() => {
        const savedMode = localStorage.getItem('theme-mode');

        if (
            savedMode === Shared.Model.EThemeMode.LIGHT ||
            savedMode === Shared.Model.EThemeMode.DARK
        ) {
            return savedMode;
        }

        return Shared.Model.EThemeMode.LIGHT;
    });
    const toggleThemeMode = useCallback(() => {
        setMode((currentMode) => {
            const newMode =
                currentMode === Shared.Model.EThemeMode.LIGHT
                    ? Shared.Model.EThemeMode.DARK
                    : Shared.Model.EThemeMode.LIGHT;
            localStorage.setItem('theme-mode', newMode);
            return newMode;
        });
    }, []);
    const currentTheme = useMemo(
        () => (mode === Shared.Model.EThemeMode.LIGHT ? lightTheme : darkTheme),
        [mode],
    );

    return useMemo(
        () => ({ mode, currentTheme, toggleThemeMode }),
        [mode, currentTheme, toggleThemeMode],
    );
};

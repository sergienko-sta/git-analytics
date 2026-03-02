import { useCallback, useMemo, useState } from 'react';
import type * as Shared from '@shared';

import { darkTheme, lightTheme } from '@/app/theme';

import type * as Types from './use-theme-mode.types';

export const useThemeMode: Types.TUseThemeMode = () => {
    const [mode, setMode] = useState<Shared.Model.TThemeMode>(() => {
        const savedMode = localStorage.getItem('theme-mode') as Shared.Model.TThemeMode;
        return savedMode || 'light';
    });
    const toggleThemeMode = useCallback(() => {
        setMode((currentMode) => {
            const newMode = currentMode === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme-mode', newMode);
            return newMode;
        });
    }, []);
    const currentTheme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

    return useMemo(
        () => ({ mode, currentTheme, toggleThemeMode }),
        [mode, currentTheme, toggleThemeMode],
    );
};

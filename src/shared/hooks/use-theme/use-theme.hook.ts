import { useContext } from 'react';

import * as Types from './use-theme.types';

export const useTheme = () => {
    const context = useContext(Types.ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }

    return context;
};

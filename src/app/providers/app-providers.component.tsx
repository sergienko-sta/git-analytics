import { AppRouter } from '../router/ui';

import { ThemeProvider } from './theme-provider';

export const AppProviders = () => {
    return (
        <ThemeProvider>
            <AppRouter />
        </ThemeProvider>
    );
};

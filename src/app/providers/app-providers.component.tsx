import { AppRouter } from '../router/ui';

import { I18nProvider } from './i18n-provider';
import { ThemeProvider } from './theme-provider';

export const AppProviders = () => {
    return (
        <I18nProvider>
            <ThemeProvider>
                <AppRouter />
            </ThemeProvider>
        </I18nProvider>
    );
};

import { AppRouter } from '../router/ui';

import { I18nProvider } from './i18n-provider';
import { QueryProvider } from './query-provider';
import { ThemeProvider } from './theme-provider';

export const AppProviders = () => {
    return (
        <I18nProvider>
            <ThemeProvider>
                <QueryProvider>
                    <AppRouter />
                </QueryProvider>
            </ThemeProvider>
        </I18nProvider>
    );
};

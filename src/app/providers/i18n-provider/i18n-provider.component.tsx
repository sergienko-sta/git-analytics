import { type PropsWithChildren, Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';

import { i18n } from '@shared';

export const I18nProvider = ({ children }: PropsWithChildren) => {
    return (
        <Suspense fallback={null}>
            <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
        </Suspense>
    );
};

import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import * as Shared from '@shared';

import type * as Types from './use-language.types';

export const useLanguage: Types.TUseLanguage = () => {
    const { i18n } = useTranslation();

    const currentLanguage = i18n.language as Shared.Model.SupportedLanguage;

    const changeLanguage = useCallback(
        (lang: Shared.Model.SupportedLanguage) => {
            i18n.changeLanguage(lang).catch(() => {
                localStorage.setItem(Shared.PREFERRED_LANGUAGE, Shared.defaultLanguage);
            });
            localStorage.setItem(Shared.PREFERRED_LANGUAGE, lang);
        },
        [i18n],
    );

    const isLanguageActive = useCallback(
        (lang: Shared.Model.SupportedLanguage) => {
            return currentLanguage === lang;
        },
        [currentLanguage],
    );

    return {
        currentLanguage,
        changeLanguage,
        isLanguageActive,
    };
};

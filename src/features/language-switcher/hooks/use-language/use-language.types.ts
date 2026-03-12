import type * as Shared from '@shared';

type TUseLanguageResult = {
    currentLanguage: Shared.Model.SupportedLanguage;
    changeLanguage: (lang: Shared.Model.SupportedLanguage) => void;
    isLanguageActive: (lang: Shared.Model.SupportedLanguage) => boolean;
};

export type TUseLanguage = () => TUseLanguageResult;

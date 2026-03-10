import type ruCommon from '../../../public/locales/ru/common.json';
import type ruNavigation from '../../../public/locales/ru/navigation.json';
import type { supportedLanguages } from '../constants';
import type { NestedKeyOf } from '../types';

export type SupportedLanguage = (typeof supportedLanguages)[number];

export type CommonResource = typeof ruCommon;
export type NavigationResource = typeof ruNavigation;

export type CommonKeys = NestedKeyOf<CommonResource>;
export type NavigationKeys = NestedKeyOf<NavigationResource>;

declare module 'i18next' {
    interface CustomTypeOptions {
        defaultNS: 'common';
        resources: {
            common: CommonResource;
            navigation: NavigationResource;
        };
    }
}

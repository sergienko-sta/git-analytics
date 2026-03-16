import type ruCommon from '../../../public/locales/ru/common.json';
import type ruFeatures from '../../../public/locales/ru/features.json';
import type ruNavigation from '../../../public/locales/ru/navigation.json';
import type { supportedLanguages } from '../constants';
import type { NestedKeyOf } from '../types';

export type SupportedLanguage = (typeof supportedLanguages)[number];

export type CommonResource = typeof ruCommon;
export type NavigationResource = typeof ruNavigation;
export type FeaturesResource = typeof ruFeatures;

export type CommonKeys = NestedKeyOf<CommonResource>;
export type NavigationKeys = NestedKeyOf<NavigationResource>;
export type FeaturesKeys = NestedKeyOf<FeaturesResource>;

declare module 'i18next' {
    interface CustomTypeOptions {
        defaultNS: 'common';
        resources: {
            common: CommonResource;
            navigation: NavigationResource;
            features: FeaturesResource;
        };
    }
}

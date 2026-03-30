import type { ReactNode } from 'react';

interface IFeatureTranslation {
    id: number;
    key: string;
    title: string;
    description: string;
}

export interface IFeaturePointsTranslation {
    section: {
        title: string;
        description: string;
    };
    features: IFeatureTranslation[];
}

export type TFeatureKey = 'search' | 'api' | 'trending' | 'analytics';

export interface IFeature {
    id: number;
    key: TFeatureKey;
    icon: ReactNode;
    color: string;
}

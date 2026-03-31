import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import * as Constants from '../../constants';
import type * as Model from '../../model';

export const useFeaturePoints = () => {
    const { t } = useTranslation('widgets');
    return useMemo(() => {
        const translation = t('feature-points', {
            returnObjects: true,
        }) as Model.IFeaturePointsTranslation;

        const features = translation?.features || [];
        const translationMap = new Map(features.map((item) => [item.id, item]));

        return Constants.FEATURES.map((feature) => {
            const translation = translationMap.get(feature.id);
            return {
                ...feature,
                title: translation?.title || '',
                description: translation?.description || '',
            };
        });
    }, [t]);
};

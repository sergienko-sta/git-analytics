import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import * as Constants from '../../constants';

/* v8 ignore start */
export const useArchitecturePoints = () => {
    const { t } = useTranslation('widgets');

    return useMemo(() => {
        return Constants.ARCHITECTURE_POINTS.map((point) => ({
            ...point,
            title: t(`architecture-points.architecture.${point.key}.title`),
            description: t(`architecture-points.architecture.${point.key}.description`),
            highlights: t(`architecture-points.architecture.${point.key}.highlights`, {
                returnObjects: true,
            }),
        }));
    }, [t]);
};
/* v8 ignore stop */

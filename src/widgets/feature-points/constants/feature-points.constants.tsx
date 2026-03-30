import { ApiOutlined, LineChartOutlined, SearchOutlined, StarOutlined } from '@ant-design/icons';

import type * as Model from '../model';

const FEATURE_POINT_CONFIG = {
    search: { color: '#6366f1', icon: <SearchOutlined /> },
    api: { color: '#f59e0b', icon: <ApiOutlined /> },
    trending: { color: '#ef4444', icon: <StarOutlined /> },
    analytics: { color: '#10b981', icon: <LineChartOutlined /> },
} as const;

export const FEATURES: readonly Model.IFeature[] = Object.entries(FEATURE_POINT_CONFIG).map(
    ([key, config], index) => ({
        id: index + 1,
        key: key as Model.TFeatureKey,
        icon: config.icon,
        color: config.color,
    }),
);

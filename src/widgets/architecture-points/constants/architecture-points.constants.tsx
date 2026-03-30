import type { ReactNode } from 'react';
import {
    AppstoreOutlined,
    BgColorsOutlined,
    FileTextOutlined,
    GlobalOutlined,
    LinkOutlined,
    RocketOutlined,
    SafetyOutlined,
    ThunderboltOutlined,
} from '@ant-design/icons';

import type * as Model from '../model';

export const ARCHITECTURE_CONFIG: Record<
    Model.TArchitectureKey,
    { icon: ReactNode; highlightsCount: number }
> = {
    react: { icon: <RocketOutlined />, highlightsCount: 4 },
    typescript: { icon: <FileTextOutlined />, highlightsCount: 4 },
    router: { icon: <LinkOutlined />, highlightsCount: 4 },
    fsd: { icon: <AppstoreOutlined />, highlightsCount: 3 },
    'api-client': { icon: <SafetyOutlined />, highlightsCount: 3 },
    performance: { icon: <ThunderboltOutlined />, highlightsCount: 3 },
    'design-system': { icon: <BgColorsOutlined />, highlightsCount: 3 },
    i18n: { icon: <GlobalOutlined />, highlightsCount: 2 },
} as const;

export const ARCHITECTURE_POINTS: readonly Model.IArchitecturePoint[] = Object.entries(
    ARCHITECTURE_CONFIG,
).map(([key, config], index) => ({
    id: index + 1,
    key: key as Model.TArchitectureKey,
    icon: config.icon,
}));

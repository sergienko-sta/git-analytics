import { theme } from 'antd';

import type { TThemeConfig } from '../theme.types';

export const light: TThemeConfig = {
    algorithm: theme.defaultAlgorithm,
    token: {
        colorPrimary: '#1677ff',
        borderRadius: 6,
        colorBgBase: '#ffffff',
        colorTextBase: '#232323',
        colorSuccess: '#10b981',
        colorWarning: '#f59e0b',
        colorError: '#ef4444',
        colorInfo: '#3b82f6',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },

    components: {
        Button: {
            controlHeight: 40,
            borderRadiusLG: 10,
        },
        Card: {
            paddingLG: 24,
        },
        Layout: {
            headerBg: '#ffffff',
            siderBg: '#f5f7fa',
        },
    },
};

import { theme } from 'antd';

import { lightTheme } from '../light';
import type { TThemeConfig } from '../theme.types';

export const dark: TThemeConfig = {
    algorithm: theme.darkAlgorithm,
    token: {
        colorPrimary: '#1677ff',
        borderRadius: 6,
        colorBgBase: '#1f1f1f',
        colorTextBase: '#ffffff',
    },
    components: {
        Button: lightTheme.components?.Button,
        Card: lightTheme.components?.Card,
        Layout: {
            ...lightTheme.components?.Layout,
            headerBg: '#141414',
            siderBg: '#1f1f1f',
        },
    },
};

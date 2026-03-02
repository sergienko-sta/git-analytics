import { theme } from 'antd';

import { lightTheme } from '../light';
import type { TThemeConfig } from '../types';

export const dark: TThemeConfig = {
    algorithm: theme.darkAlgorithm,
    token: {
        colorPrimary: '#1677ff',
        borderRadius: 6,
        colorBgBase: '#141414',
        colorTextBase: '#ffffff',
    },
    components: lightTheme.components,
};

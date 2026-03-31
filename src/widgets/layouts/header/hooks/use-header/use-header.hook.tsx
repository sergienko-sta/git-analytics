import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BulbFilled, BulbOutlined } from '@ant-design/icons';

import * as Shared from '@shared';

export const useHeader = () => {
    const { t } = useTranslation('widgets');
    const { toggleTheme, mode } = Shared.useTheme();

    const isLightTheme = mode === Shared.Model.EThemeMode.LIGHT;
    const themeKey: Shared.Model.WidgetsKeys = isLightTheme
        ? 'layout-header.switch-to-dark'
        : 'layout-header.switch-to-light';

    const themeButtonConfig = useMemo(
        () => ({
            icon: isLightTheme ? <BulbOutlined /> : <BulbFilled />,
            title: t(themeKey),
            tooltip: t(themeKey),
        }),
        [isLightTheme, t, themeKey],
    );

    const handleThemeToggle = useCallback(() => {
        toggleTheme();
    }, [toggleTheme]);

    return {
        themeButtonConfig,
        handleThemeToggle,
        isLightTheme,
    };
};

import { useTranslation } from 'react-i18next';
import { Flex, Layout, Typography } from 'antd';

import * as Shared from '@shared';

export const HomePage = () => {
    const { mode } = Shared.useTheme();
    const { t } = useTranslation();

    return (
        <Layout>
            <Flex vertical align='center' justify='center'>
                <Typography.Title level={1}>Vite + React</Typography.Title>
                <Typography.Text type='warning'>
                    {t('theme.current-theme')}:{' '}
                    {mode === 'light'
                        ? t('theme.light').toLocaleLowerCase()
                        : t('theme.dark').toLocaleLowerCase()}
                </Typography.Text>
            </Flex>
        </Layout>
    );
};

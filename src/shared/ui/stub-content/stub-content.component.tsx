import { Flex, Layout, Typography } from 'antd';

import { useTheme } from '../../hooks';

export const StubContent = () => {
    const { mode } = useTheme();

    return (
        <Layout>
            <Flex vertical align='center' justify='center'>
                <a href='https://vite.dev' target='_blank' rel='noreferrer'></a>
                <a href='https://react.dev' target='_blank' rel='noreferrer'></a>

                <Typography.Title level={1}>Vite + React</Typography.Title>
                <Typography.Text type='warning'>
                    Текущая тема: {mode === 'light' ? 'светлая' : 'темная'}
                </Typography.Text>
                <Typography.Text type='success'>
                    Click on the Vite and React logos to learn more
                </Typography.Text>
            </Flex>
        </Layout>
    );
};

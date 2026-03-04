import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

export const RootLayout = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Outlet />
        </Layout>
    );
};

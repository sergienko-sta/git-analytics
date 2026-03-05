// import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

// import { Header } from '../header';
import * as Styles from './root-layout.styles';

export const RootLayout = () => {
    // const [collapsed, setCollapsed] = useState(false);

    return (
        <Styles.Layout>
            <Layout>
                {/* <Header collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)} /> */}
                <Styles.Content>
                    <Styles.ContentWrapper>
                        <Outlet />
                    </Styles.ContentWrapper>
                </Styles.Content>
                <Styles.Footer>C GitAnalytics ©{new Date().getFullYear()}</Styles.Footer>
            </Layout>
        </Styles.Layout>
    );
};

import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

import { Header } from '../header';

import * as Styles from './root-layout.styles';

export const RootLayout = () => {
    return (
        <Styles.Layout>
            <Layout>
                <Header />
                <Styles.Content>
                    <Styles.ContentWrapper>
                        <Outlet />
                    </Styles.ContentWrapper>
                </Styles.Content>
                <Styles.Footer>GitAnalytics ©{new Date().getFullYear()}</Styles.Footer>
            </Layout>
        </Styles.Layout>
    );
};

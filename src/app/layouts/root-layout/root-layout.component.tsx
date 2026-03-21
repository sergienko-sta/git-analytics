import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

import * as Widgets from '@widgets';

import * as Features from '@features';

import * as Shared from '@shared';

import * as Styles from './root-layout.styles';

export const RootLayout = () => {
    return (
        <Styles.Layout>
            <Layout>
                <Widgets.Header rightContent={<Features.LanguageSwitcher />}></Widgets.Header>
                <Styles.Content>
                    <Styles.ContentWrapper>
                        <Outlet />
                    </Styles.ContentWrapper>
                </Styles.Content>
                <Styles.Footer>
                    {Shared.APP_LOGO_NAME} ©{new Date().getFullYear()}
                </Styles.Footer>
            </Layout>
        </Styles.Layout>
    );
};

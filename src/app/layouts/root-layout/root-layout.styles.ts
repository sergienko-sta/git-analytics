import { Layout as AntdLayout } from 'antd';
import styled from 'styled-components';

export const Layout = styled(AntdLayout)`
    min-height: 100vh;
`;

export const Content = styled(Layout.Content)`
    margin: 0 16px;
`;

export const ContentWrapper = styled.div`
    padding: 24;
    min-height: 360;
`;

export const Footer = styled(Layout.Footer)`
    text-align: center;
`;

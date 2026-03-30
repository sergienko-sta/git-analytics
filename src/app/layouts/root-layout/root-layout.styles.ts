import { Layout as AntdLayout } from 'antd';
import styled from 'styled-components';

const { Content: AntdContent, Footer: AntdFooter } = AntdLayout;

export const Layout = styled(AntdLayout)`
    min-height: 100vh;
    background: ${({ theme }) => theme.designTokens.colorBgContainer};
`;

export const Content = styled(AntdContent)`
    margin: 0 ${({ theme }) => theme.designTokens.marginMD}px;
    padding: ${({ theme }) => theme.designTokens.paddingContentVerticalLG}px 0;
`;

export const ContentWrapper = styled.div`
    padding: ${({ theme }) => theme.designTokens.paddingLG}px;
    border-radius: ${({ theme }) => theme.designTokens.borderRadiusLG}px;
    box-shadow: ${({ theme }) => theme.designTokens.boxShadowTertiary};
`;

export const Footer = styled(AntdFooter)`
    text-align: center;
    background: ${({ theme }) => theme.designTokens.colorBgLayout};
    color: ${({ theme }) => theme.designTokens.colorTextSecondary};
    border-top: 1px solid ${({ theme }) => theme.designTokens.colorBorderSecondary};
`;

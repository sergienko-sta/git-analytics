import { Layout } from 'antd';
import styled from 'styled-components';

export const Header = styled(Layout.Header)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 ${({ theme }) => theme.designTokens.paddingLG}px;
    position: sticky;
    top: 0;
    z-index: ${({ theme }) => theme.designTokens.zIndexPopupBase};
    box-shadow: ${({ theme }) => theme.designTokens.boxShadowTertiary};
    height: 64px;
    line-height: 64px;
`;

export const LeftSection = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.designTokens.marginMD}px;
    flex: 1;
`;

export const Logo = styled.div`
    font-size: ${({ theme }) => theme.designTokens.fontSizeLG}px;
    font-weight: ${({ theme }) => theme.designTokens.fontWeightStrong};
    cursor: pointer;
    white-space: nowrap;

    &:hover {
        opacity: 0.8;
    }
`;

export const RightSection = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.designTokens.marginMD}px;
    flex: 1;
    justify-content: flex-end;
`;

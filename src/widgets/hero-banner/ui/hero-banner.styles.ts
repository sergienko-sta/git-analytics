import styled, { type CSSProperties } from 'styled-components';

export const BannerContainer = styled.div`
    text-align: center;
    padding: ${({ theme }) => theme.designTokens.paddingXL}px
        ${({ theme }) => theme.designTokens.paddingLG}px;
    background: ${({ theme }) => theme.designTokens.colorBgLayout};
    border-radius: ${({ theme }) => theme.designTokens.borderRadiusLG}px;
    margin-bottom: ${({ theme }) => theme.designTokens.marginLG}px;
`;

export const description: CSSProperties = {
    marginBottom: 24,
    whiteSpace: 'pre-line',
};

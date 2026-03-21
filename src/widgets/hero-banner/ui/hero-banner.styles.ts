import styled, { type CSSProperties } from 'styled-components';

export const BannerContainer = styled.div`
    text-align: center;
    padding: 48px 24px;
    background: ${({ theme }) => theme.designTokens?.colorBgLayout};
    border-radius: ${({ theme }) => theme.designTokens?.borderRadiusLG}px;
    margin-bottom: 32px;
`;

export const description: CSSProperties = {
    marginBottom: 24,
};

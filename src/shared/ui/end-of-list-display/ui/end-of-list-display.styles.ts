import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${({ theme }) => theme.designTokens.marginXS}px;
    padding: ${({ theme }) => theme.designTokens.paddingLG}px;
    text-align: center;
    color: ${({ theme }) => theme.designTokens.colorTextSecondary};
`;

export const IconWrapper = styled.span`
    font-size: ${({ theme }) => theme.designTokens.fontSize}px;
`;

import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding: 24px;
    text-align: center;
    color: ${({ theme }) => theme.designTokens?.colorTextSecondary};
`;

export const IconWrapper = styled.span`
    font-size: 16px;
`;

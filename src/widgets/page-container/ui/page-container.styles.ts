import styled from 'styled-components';

export const Container = styled.div`
    padding: ${({ theme }) => theme.designTokens.paddingLG}px;
    max-width: ${({ theme }) => theme.designTokens.screenXL}px;
    margin: 0 auto;
    width: 100%;
`;

export const Header = styled.header`
    margin-bottom: ${({ theme }) => theme.designTokens.marginLG}px;
`;

import styled from 'styled-components';

export const Container = styled.div`
    max-width: ${({ theme }) => theme.designTokens.screenXL}px;
    margin: 0 auto;
    padding: ${({ theme }) => theme.designTokens.paddingLG}px;
`;

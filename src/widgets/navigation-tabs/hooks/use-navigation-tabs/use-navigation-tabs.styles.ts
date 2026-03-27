import styled from 'styled-components';

export const TabContainer = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.designTokens.marginXS}px;
`;

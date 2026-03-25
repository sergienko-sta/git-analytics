import { Typography } from 'antd';
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 400px;
    width: 100%;
    text-align: center;
    padding: 24px;
`;

export const IconWrapper = styled.div`
    font-size: 48px;
    margin-bottom: 16px;
    color: ${({ theme }) => theme.designTokens?.colorTextSecondary};
`;

export const Description = styled(Typography.Title)`
    margin-top: 8px;
    font-size: 14px;
`;

export const ActionWrapper = styled.div`
    margin-top: 24px;
`;

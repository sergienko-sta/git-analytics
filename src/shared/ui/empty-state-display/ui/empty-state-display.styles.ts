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
    padding: ${({ theme }) => theme.designTokens.paddingLG}px;
`;

export const IconWrapper = styled.div`
    font-size: 48px;
    margin-bottom: ${({ theme }) => theme.designTokens.marginMD}px;
    color: ${({ theme }) => theme.designTokens.colorTextSecondary};
`;

export const Description = styled(Typography.Text)`
    margin-top: ${({ theme }) => theme.designTokens.marginXS}px;
    font-size: ${({ theme }) => theme.designTokens.fontSize}px;
    color: ${({ theme }) => theme.designTokens.colorTextSecondary};
    max-width: ${({ theme }) => theme.designTokens.screenXS}px;
    line-height: 1.5;
`;

export const ActionWrapper = styled.div`
    margin-top: ${({ theme }) => theme.designTokens.marginLG}px;
`;

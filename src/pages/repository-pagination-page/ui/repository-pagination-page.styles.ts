import { Typography } from 'antd';
import styled from 'styled-components';

export const Text = styled(Typography.Text)`
    margin-top: ${({ theme }) => theme.designTokens.marginMD}px;
    margin-bottom: ${({ theme }) => theme.designTokens.marginMD}px;
    display: block;
`;

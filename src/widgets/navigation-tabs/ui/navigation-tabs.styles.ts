import { Tabs as AntdTabs } from 'antd';
import styled from 'styled-components';

export const Tabs = styled(AntdTabs)`
    flex: 2;
    margin: 0 ${({ theme }) => theme.designTokens.marginLG}px;
`;

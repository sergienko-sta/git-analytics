import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';

export const SearchIcon = styled(SearchOutlined)<{ $color?: string }>`
    color: ${({ theme, $color }) => $color || theme.designTokens.colorIcon};
    font-size: ${({ theme }) => theme.designTokens.fontSize}px;
    transition: color ${({ theme }) => theme.designTokens.motionDurationMid} ease;
`;

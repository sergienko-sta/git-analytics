import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';

export const SearchIcon = styled(SearchOutlined)<{ $color?: string }>`
    color: ${(props) => props.$color || '#bfbfbf'};
    font-size: 16px;
    transition: color 0.3s ease;
`;

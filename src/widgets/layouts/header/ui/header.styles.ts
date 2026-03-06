import { Layout } from 'antd';
import styled from 'styled-components';

export const StyledHeader = styled(Layout.Header)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
    height: 64px;
    line-height: 64px;
`;

export const LeftSection = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    flex: 1;
`;

export const Logo = styled.div`
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;

    &:hover {
        opacity: 0.8;
    }
`;

export const RightSection = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    flex: 1;
    justify-content: flex-end;
`;

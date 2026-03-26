import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
    0% {
        opacity: 0.6;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0.6;
    }
`;

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

export const Container = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px;
    animation: ${fadeIn} 0.3s ease-out;

    @media (max-width: 768px) {
        padding: 0 12px;
    }
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 0 8px;
    font-size: 14px;

    @media (max-width: 768px) {
        margin-bottom: 16px;
        font-size: 12px;
    }
`;

export const VirtualListContainer = styled.div`
    height: 70vh;
    min-height: 400px;
    overflow-y: auto;
    border-radius: 12px;
    scrollbar-width: thin;
    position: relative;
    background: ${({ theme }) => theme.designTokens?.colorBgContainer};
    border: 1px solid ${({ theme }) => theme.designTokens?.colorBorderSecondary};

    &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    &::-webkit-scrollbar-track {
        background: ${({ theme }) => theme.designTokens?.colorBgContainer};
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.designTokens?.colorBorder};
        border-radius: 4px;
        transition: background 0.2s ease;

        &:hover {
            background: ${({ theme }) => theme.designTokens?.colorPrimary};
        }
    }

    @media (max-width: 768px) {
        height: 60vh;
        min-height: 300px;
    }
`;

export const VirtualListItem = styled.div`
    padding: 8px;
    box-sizing: border-box;
    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;

    &:hover {
        transform: translateY(-2px);
    }

    @media (max-width: 768px) {
        padding: 4px;
    }
`;

export const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
    width: 100%;
    background: ${({ theme }) => theme.designTokens?.colorBgContainer};
    border-radius: 12px;
`;

export const ErrorContainer = styled.div`
    margin: 20px 0;
    padding: 0 8px;
`;

export const EmptyContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 16px;
    min-height: 400px;
    text-align: center;
    color: ${({ theme }) => theme.designTokens?.colorTextSecondary};
    font-size: 16px;

    @media (max-width: 768px) {
        font-size: 14px;
        min-height: 300px;
    }
`;

export const EndMessage = styled.div`
    text-align: center;
    padding: 24px;
    color: ${({ theme }) => theme.designTokens?.colorTextSecondary};
    font-size: 14px;
    border-top: 1px solid ${({ theme }) => theme.designTokens?.colorBorderSecondary};

    @media (max-width: 768px) {
        padding: 16px;
        font-size: 12px;
    }
`;

export const SkeletonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;
`;

export const SkeletonItem = styled.div`
    height: 100px;
    background: ${({ theme }) => theme.designTokens?.colorBgContainer};
    border-radius: 12px;
    animation: ${pulse} 1.5s ease-in-out infinite;
    border: 1px solid ${({ theme }) => theme.designTokens?.colorBorderSecondary};
`;

export const PullToRefresh = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
    color: ${({ theme }) => theme.designTokens?.colorTextSecondary};
    font-size: 12px;
    transition: all 0.2s ease;
`;

export const LoadMoreIndicator = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    gap: 8px;
    color: ${({ theme }) => theme.designTokens?.colorTextSecondary};
    font-size: 14px;
`;

export const LoadMoreError = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
    gap: 8px;
    color: ${({ theme }) => theme.designTokens?.colorError};
    font-size: 12px;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

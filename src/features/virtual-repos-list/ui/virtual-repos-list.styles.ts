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
    max-width: ${({ theme }) => theme.designTokens.screenXL}px;
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.designTokens.paddingMD}px;
    animation: ${fadeIn} ${({ theme }) => theme.designTokens.motionDurationMid} ease-out;

    @media (max-width: ${({ theme }) => theme.designTokens.screenMD}px) {
        padding: 0 ${({ theme }) => theme.designTokens.paddingSM}px;
    }
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${({ theme }) => theme.designTokens.marginLG}px;
    padding: 0 ${({ theme }) => theme.designTokens.paddingXS}px;
    font-size: ${({ theme }) => theme.designTokens.fontSizeSM}px;

    @media (max-width: ${({ theme }) => theme.designTokens.screenMD}px) {
        margin-bottom: ${({ theme }) => theme.designTokens.marginMD}px;
        font-size: ${({ theme }) => theme.designTokens.fontSize}px;
    }
`;

export const VirtualListContainer = styled.div`
    height: 70vh;
    min-height: 400px;
    overflow-y: auto;
    border-radius: ${({ theme }) => theme.designTokens.borderRadiusLG}px;
    scrollbar-width: thin;
    position: relative;
    background: ${({ theme }) => theme.designTokens.colorBgContainer};
    border: 1px solid ${({ theme }) => theme.designTokens.colorBorderSecondary};

    &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    &::-webkit-scrollbar-track {
        background: ${({ theme }) => theme.designTokens.colorBgContainer};
        border-radius: ${({ theme }) => theme.designTokens.borderRadiusSM}px;
    }

    &::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.designTokens.colorBorder};
        border-radius: ${({ theme }) => theme.designTokens.borderRadiusSM}px;
        transition: background ${({ theme }) => theme.designTokens.motionDurationFast} ease;

        &:hover {
            background: ${({ theme }) => theme.designTokens.colorPrimary};
        }
    }

    @media (max-width: ${({ theme }) => theme.designTokens.screenMD}px) {
        height: 60vh;
        min-height: 300px;
    }
`;

export const VirtualListItem = styled.div`
    padding: ${({ theme }) => theme.designTokens.paddingXS}px;
    box-sizing: border-box;
    transition:
        transform ${({ theme }) => theme.designTokens.motionDurationFast} ease,
        box-shadow ${({ theme }) => theme.designTokens.motionDurationFast} ease;

    &:hover {
        transform: translateY(-2px);
    }

    @media (max-width: ${({ theme }) => theme.designTokens.screenMD}px) {
        padding: ${({ theme }) => theme.designTokens.paddingXXS}px;
    }
`;

export const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
    width: 100%;
    background: ${({ theme }) => theme.designTokens.colorBgContainer};
    border-radius: ${({ theme }) => theme.designTokens.borderRadiusLG}px;
`;

export const ErrorContainer = styled.div`
    margin: ${({ theme }) => theme.designTokens.marginLG}px 0;
    padding: 0 ${({ theme }) => theme.designTokens.paddingXS}px;
`;

export const EmptyContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: ${({ theme }) => theme.designTokens.marginMD}px;
    min-height: 400px;
    text-align: center;
    color: ${({ theme }) => theme.designTokens.colorTextSecondary};
    font-size: ${({ theme }) => theme.designTokens.fontSize}px;

    @media (max-width: ${({ theme }) => theme.designTokens.screenMD}px) {
        font-size: ${({ theme }) => theme.designTokens.fontSizeSM}px;
        min-height: 300px;
    }
`;

export const EndMessage = styled.div`
    text-align: center;
    padding: ${({ theme }) => theme.designTokens.paddingLG}px;
    color: ${({ theme }) => theme.designTokens.colorTextSecondary};
    font-size: ${({ theme }) => theme.designTokens.fontSizeSM}px;
    border-top: 1px solid ${({ theme }) => theme.designTokens.colorBorderSecondary};

    @media (max-width: ${({ theme }) => theme.designTokens.screenMD}px) {
        padding: ${({ theme }) => theme.designTokens.paddingMD}px;
        font-size: ${({ theme }) => theme.designTokens.fontSize}px;
    }
`;

export const SkeletonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.designTokens.marginMD}px;
    padding: ${({ theme }) => theme.designTokens.paddingMD}px;
`;

export const SkeletonItem = styled.div`
    height: 100px;
    background: ${({ theme }) => theme.designTokens.colorBgContainer};
    border-radius: ${({ theme }) => theme.designTokens.borderRadiusLG}px;
    animation: ${pulse} 1.5s ease-in-out infinite;
    border: 1px solid ${({ theme }) => theme.designTokens.colorBorderSecondary};
`;

export const PullToRefresh = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${({ theme }) => theme.designTokens.paddingMD}px;
    color: ${({ theme }) => theme.designTokens.colorTextSecondary};
    font-size: ${({ theme }) => theme.designTokens.fontSize}px;
    transition: all ${({ theme }) => theme.designTokens.motionDurationFast} ease;
`;

export const LoadMoreIndicator = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${({ theme }) => theme.designTokens.paddingLG}px;
    gap: ${({ theme }) => theme.designTokens.marginXS}px;
    color: ${({ theme }) => theme.designTokens.colorTextSecondary};
    font-size: ${({ theme }) => theme.designTokens.fontSizeSM}px;
`;

export const LoadMoreError = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${({ theme }) => theme.designTokens.paddingMD}px;
    gap: ${({ theme }) => theme.designTokens.marginXS}px;
    color: ${({ theme }) => theme.designTokens.colorError};
    font-size: ${({ theme }) => theme.designTokens.fontSize}px;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

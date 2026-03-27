import { Card } from 'antd';
import styled from 'styled-components';

export const Container = styled.section`
    padding: ${({ theme }) => theme.designTokens.paddingContentVerticalLG * 2.5}px
        ${({ theme }) => theme.designTokens.paddingContentHorizontalLG}px;
    max-width: ${({ theme }) => theme.designTokens.screenXL}px;
    margin: 0 auto;
    background: ${({ theme }) => theme.designTokens.colorBgContainer};

    @media (max-width: ${({ theme }) => theme.designTokens.screenMD}px) {
        padding: ${({ theme }) => theme.designTokens.paddingContentVerticalLG}px
            ${({ theme }) => theme.designTokens.paddingContentHorizontalSM}px;
    }
`;

export const SectionTitle = styled.div`
    text-align: center;
    margin-bottom: ${({ theme }) => theme.designTokens.marginXL}px;

    h2 {
        font-size: ${({ theme }) => theme.designTokens.fontSizeHeading2}px;
        font-weight: ${({ theme }) => theme.designTokens.fontWeightStrong};
        margin-bottom: ${({ theme }) => theme.designTokens.marginMD}px;
        color: ${({ theme }) => theme.designTokens.colorTextHeading};
        line-height: ${({ theme }) => theme.designTokens.lineHeightHeading2};

        @media (max-width: ${({ theme }) => theme.designTokens.screenMD}px) {
            font-size: ${({ theme }) => theme.designTokens.fontSizeHeading3}px;
        }
    }

    p {
        font-size: ${({ theme }) => theme.designTokens.fontSizeLG}px;
        color: ${({ theme }) => theme.designTokens.colorTextSecondary};
        margin-bottom: 0;
        line-height: ${({ theme }) => theme.designTokens.lineHeight};

        @media (max-width: ${({ theme }) => theme.designTokens.screenMD}px) {
            font-size: ${({ theme }) => theme.designTokens.fontSize}px;
        }
    }
`;

export const ArchCard = styled(Card)`
    height: 100%;
    transition: all ${({ theme }) => theme.designTokens.motionDurationMid} ease;
    border-radius: ${({ theme }) => theme.designTokens.borderRadiusLG}px;

    &:hover {
        transform: translateY(-4px);
        box-shadow: ${({ theme }) => theme.designTokens.boxShadowSecondary};
    }

    .ant-card-body {
        padding: ${({ theme }) => theme.designTokens.paddingLG}px;
        height: 100%;
        display: flex;
        flex-direction: column;

        @media (max-width: ${({ theme }) => theme.designTokens.screenMD}px) {
            padding: ${({ theme }) => theme.designTokens.paddingMD}px;
        }
    }

    h3 {
        font-size: ${({ theme }) => theme.designTokens.fontSizeHeading4}px;
        font-weight: ${({ theme }) => theme.designTokens.fontWeightStrong};
        margin: ${({ theme }) => theme.designTokens.marginMD}px 0
            ${({ theme }) => theme.designTokens.marginSM}px;
        color: ${({ theme }) => theme.designTokens.colorTextHeading};
        line-height: ${({ theme }) => theme.designTokens.lineHeightHeading4};

        @media (max-width: ${({ theme }) => theme.designTokens.screenMD}px) {
            font-size: ${({ theme }) => theme.designTokens.fontSizeHeading5}px;
        }
    }

    p {
        font-size: ${({ theme }) => theme.designTokens.fontSizeSM}px;
        line-height: ${({ theme }) => theme.designTokens.lineHeight};
        color: ${({ theme }) => theme.designTokens.colorTextSecondary};
        margin-bottom: ${({ theme }) => theme.designTokens.marginMD}px;
        flex-grow: 1;
    }
`;

export const CardIcon = styled.div`
    font-size: ${({ theme }) => theme.designTokens.fontSizeHeading2}px;
    color: ${({ theme }) => theme.designTokens.colorPrimary};
    margin-bottom: ${({ theme }) => theme.designTokens.marginXS}px;

    svg {
        width: ${({ theme }) => theme.designTokens.fontSizeHeading2}px;
        height: ${({ theme }) => theme.designTokens.fontSizeHeading2}px;
    }
`;

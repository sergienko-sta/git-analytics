import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.section`
    padding: ${({ theme }) =>
        `${theme.designTokens.paddingXL}px ${theme.designTokens.paddingLG}px`};
    background: ${({ theme }) => theme.designTokens.colorBgContainer};

    @media (max-width: ${({ theme }) => theme.designTokens.screenMD}px) {
        padding: ${({ theme }) =>
            `${theme.designTokens.paddingXL}px ${theme.designTokens.paddingMD}px`};
    }
`;

export const SectionTitle = styled.div`
    text-align: center;
    margin-bottom: ${({ theme }) => theme.designTokens.marginXXL}px;

    h2 {
        font-size: ${({ theme }) => theme.designTokens.fontSizeHeading1}px;
        font-weight: ${({ theme }) => theme.designTokens.fontWeightStrong};
        margin-bottom: ${({ theme }) => theme.designTokens.marginMD}px;
        color: ${({ theme }) => theme.designTokens.colorTextHeading};
        letter-spacing: -0.02em;

        @media (max-width: ${({ theme }) => theme.designTokens.screenMD}px) {
            font-size: ${({ theme }) => theme.designTokens.fontSizeHeading2}px;
        }
    }

    p {
        font-size: ${({ theme }) => theme.designTokens.fontSizeLG}px;
        color: ${({ theme }) => theme.designTokens.colorTextSecondary};
        max-width: 600px;
        margin: 0 auto;

        @media (max-width: ${({ theme }) => theme.designTokens.screenMD}px) {
            font-size: ${({ theme }) => theme.designTokens.fontSize}px;
        }
    }
`;

export const FeatureCard = styled.div<{ $color: string }>`
    background: ${({ theme }) => theme.designTokens.colorBgContainer};
    border-radius: ${({ theme }) => theme.designTokens.borderRadiusLG}px;
    padding: ${({ theme }) =>
        `${theme.designTokens.paddingXL}px ${theme.designTokens.paddingLG}px`};
    text-align: center;
    height: 100%;
    transition: all ${({ theme }) => theme.designTokens.motionDurationMid}
        cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid ${({ theme }) => theme.designTokens.colorBorderSecondary};
    animation: ${fadeInUp} ${({ theme }) => theme.designTokens.motionDurationSlow} ease-out forwards;
    animation-delay: ${() => {
        // Динамическая задержка на основе позиции (будет передана через проп)
        return '0s';
    }};

    &:hover {
        transform: translateY(-4px);
        border-color: ${({ $color }) => $color};
        box-shadow: ${({ theme }) => theme.designTokens.boxShadowSecondary};
    }

    h3 {
        font-size: ${({ theme }) => theme.designTokens.fontSizeLG}px;
        font-weight: ${({ theme }) => theme.designTokens.fontWeightStrong};
        margin: ${({ theme }) => theme.designTokens.marginLG}px 0
            ${({ theme }) => theme.designTokens.marginSM}px;
        color: ${({ theme }) => theme.designTokens.colorTextHeading};

        @media (max-width: ${({ theme }) => theme.designTokens.screenMD}px) {
            font-size: ${({ theme }) => theme.designTokens.fontSize}px;
        }
    }

    p {
        font-size: ${({ theme }) => theme.designTokens.fontSizeSM}px;
        line-height: 1.6;
        color: ${({ theme }) => theme.designTokens.colorTextSecondary};
        margin: 0;
    }
`;

export const IconWrapper = styled.div<{ $color: string }>`
    width: 72px;
    height: 72px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ $color }) => `${$color}0d`};
    border-radius: 50%;
    font-size: 32px;
    color: ${({ $color }) => $color};
    transition: transform ${({ theme }) => theme.designTokens.motionDurationMid} ease;

    ${FeatureCard}:hover & {
        transform: scale(1.05);
    }
`;

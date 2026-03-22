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
    padding: 80px 24px;
    background: ${({ theme }) => theme.designTokens?.colorBgContainer};

    @media (max-width: 768px) {
        padding: 60px 16px;
    }
`;

export const SectionTitle = styled.div`
    text-align: center;
    margin-bottom: 64px;

    h2 {
        font-size: 36px;
        font-weight: 700;
        margin-bottom: 16px;
        color: ${({ theme }) => theme.designTokens?.colorTextHeading};
        letter-spacing: -0.02em;

        @media (max-width: 768px) {
            font-size: 28px;
        }
    }

    p {
        font-size: 18px;
        color: ${({ theme }) => theme.designTokens?.colorTextSecondary};
        max-width: 600px;
        margin: 0 auto;

        @media (max-width: 768px) {
            font-size: 16px;
        }
    }
`;

export const FeatureCard = styled.div<{ $color: string }>`
    background: ${({ theme }) => theme.designTokens?.colorBgContainer};
    border-radius: ${({ theme }) => theme.designTokens?.borderRadiusLG}px;
    padding: 32px 24px;
    text-align: center;
    height: 100%;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid ${({ theme }) => theme.designTokens?.colorBorderSecondary};
    animation: ${fadeInUp} 0.5s ease-out forwards;
    animation-delay: ${() => {
        // Динамическая задержка на основе позиции (будет передана через проп)
        return '0s';
    }};

    &:hover {
        transform: translateY(-4px);
        border-color: ${({ $color }) => $color};
        box-shadow: ${({ theme }) => theme.designTokens?.boxShadowSecondary};
    }

    h3 {
        font-size: 20px;
        font-weight: 600;
        margin: 20px 0 12px;
        color: ${({ theme }) => theme.designTokens?.colorTextHeading};

        @media (max-width: 768px) {
            font-size: 18px;
        }
    }

    p {
        font-size: 14px;
        line-height: 1.6;
        color: ${({ theme }) => theme.designTokens?.colorTextSecondary};
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
    transition: transform 0.3s ease;

    ${FeatureCard}:hover & {
        transform: scale(1.05);
    }
`;

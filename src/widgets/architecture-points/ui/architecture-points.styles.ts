import { Card } from 'antd';
import styled from 'styled-components';

export const Container = styled.section`
    padding: 60px 24px;
    max-width: 1200px;
    margin: 0 auto;
    background: ${({ theme }) => theme.designTokens?.colorBgContainer};

    @media (max-width: 768px) {
        padding: 40px 16px;
    }
`;

export const SectionTitle = styled.div`
    text-align: center;
    margin-bottom: 48px;

    h2 {
        font-size: 36px;
        font-weight: 600;
        margin-bottom: 16px;
        color: ${({ theme }) => theme.designTokens?.colorTextHeading};

        @media (max-width: 768px) {
            font-size: 28px;
        }
    }

    p {
        font-size: 18px;
        color: ${({ theme }) => theme.designTokens?.colorTextSecondary};
        margin-bottom: 0;

        @media (max-width: 768px) {
            font-size: 16px;
        }
    }
`;

export const ArchCard = styled(Card)`
    height: 100%;
    transition: all 0.3s ease;
    border-radius: 12px;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    }

    .ant-card-body {
        padding: 24px;
        height: 100%;
        display: flex;
        flex-direction: column;

        @media (max-width: 768px) {
            padding: 20px;
        }
    }

    h3 {
        font-size: 20px;
        font-weight: 600;
        margin: 16px 0 12px;
        color: ${({ theme }) => theme.designTokens?.colorTextHeading};

        @media (max-width: 768px) {
            font-size: 18px;
        }
    }

    p {
        font-size: 14px;
        line-height: 1.6;
        color: ${({ theme }) => theme.designTokens?.colorTextSecondary};
        margin-bottom: 16px;
        flex-grow: 1;
    }
`;

export const CardIcon = styled.div`
    font-size: 32px;
    color: ${({ theme }) => theme.designTokens?.colorPrimary};
    margin-bottom: 8px;

    svg {
        width: 32px;
        height: 32px;
    }
`;

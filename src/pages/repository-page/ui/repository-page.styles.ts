import styled from 'styled-components';

export const Container = styled.div`
    max-width: 1400px;
    margin: 0 auto;
    padding: 32px 24px;

    @media (max-width: 768px) {
        padding: 24px 16px;
    }
`;

export const Header = styled.div`
    text-align: center;
    margin-bottom: 48px;

    h1 {
        font-size: 32px;
        font-weight: 600;
        margin-bottom: 16px;
        background: linear-gradient(135deg, #6366f1, #a855f7);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;

        @media (max-width: 768px) {
            font-size: 24px;
        }
    }

    h4 {
        color: ${({ theme }) => theme.designTokens?.colorTextSecondary};
        max-width: 800px;
        margin: 0 auto;
        white-space: pre-line;

        @media (max-width: 768px) {
            font-size: 14px;
        }
    }
`;

export const RecommendationSection = styled.div`
    margin: 48px 0;
    padding: 32px;
    background: linear-gradient(
        135deg,
        ${({ theme }) => theme.designTokens?.colorBgLayout},
        ${({ theme }) => theme.designTokens?.colorBgContainer}
    );
    border-radius: 16px;
    border: 1px solid ${({ theme }) => theme.designTokens?.colorBorderSecondary};

    @media (max-width: 768px) {
        padding: 24px;
    }

    h3 {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 24px;
        text-align: center;
        color: ${({ theme }) => theme.designTokens?.colorTextHeading};

        @media (max-width: 768px) {
            font-size: 20px;
        }
    }

    .ant-card {
        height: 100%;
        background: ${({ theme }) => theme.designTokens?.colorBgContainer};
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;

        &:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }
    }

    .ant-card-head {
        border-bottom: 2px solid ${({ theme }) => theme.designTokens?.colorPrimary};
        padding: 16px 24px;

        .ant-card-head-title {
            font-size: 18px;
            font-weight: 600;
        }
    }

    .ant-card-body {
        padding: 24px;
    }

    ul {
        margin: 0;
        padding-left: 20px;

        li {
            margin: 12px 0;
            line-height: 1.5;
            color: ${({ theme }) => theme.designTokens?.colorTextSecondary};

            @media (max-width: 768px) {
                margin: 8px 0;
            }
        }
    }
`;

export const TechDetailsSection = styled.div`
    margin: 48px 0;

    h3 {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 24px;
        text-align: center;
        color: ${({ theme }) => theme.designTokens?.colorTextHeading};

        @media (max-width: 768px) {
            font-size: 20px;
        }
    }

    .ant-card {
        border-radius: 16px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        background: ${({ theme }) => theme.designTokens?.colorBgContainer};
    }

    .ant-card-body {
        padding: 32px;

        @media (max-width: 768px) {
            padding: 24px;
        }
    }

    strong {
        font-size: 16px;
        color: ${({ theme }) => theme.designTokens?.colorTextHeading};
        display: block;
        margin-bottom: 12px;
    }

    ul {
        margin: 0;
        padding-left: 20px;

        li {
            margin: 8px 0;
            line-height: 1.5;
            color: ${({ theme }) => theme.designTokens?.colorTextSecondary};
            font-size: 14px;
        }
    }

    code {
        background: ${({ theme }) => theme.designTokens?.colorBgLayout};
        padding: 2px 6px;
        border-radius: 4px;
        font-family: 'Monaco', 'Menlo', monospace;
        font-size: 13px;
        color: ${({ theme }) => theme.designTokens?.colorPrimary};
    }
`;

export const ActionButtons = styled.div`
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-top: 32px;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;

        button {
            width: 200px;
        }
    }
`;

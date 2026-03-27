import styled from 'styled-components';

export const Container = styled.div`
    max-width: ${({ theme }) => theme.designTokens.screenXL}px;
    margin: 0 auto;
    padding: ${({ theme }) =>
        `${theme.designTokens.paddingXL}px ${theme.designTokens.paddingLG}`}px;
    @media (max-width: ${({ theme }) => theme.designTokens.screenMD}px) {
        padding: ${({ theme }) =>
            `${theme.designTokens.paddingLG}px ${theme.designTokens.paddingMD}`}px;
    }
`;

export const Header = styled.div`
    text-align: center;
    margin-bottom: ${({ theme }) => theme.designTokens.marginXXL}px;

    h1 {
        font-size: ${({ theme }) => theme.designTokens.fontSizeHeading1}px;
        font-weight: ${({ theme }) => theme.designTokens.fontWeightStrong};
        margin-bottom: ${({ theme }) => theme.designTokens.marginMD}px;
        font-size: 32px;
        font-weight: 600;
        margin-bottom: 16px;
        background: linear-gradient(
            135deg,
            ${({ theme }) => theme.designTokens.colorPrimary},
            #a855f7
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;

        @media (max-width: ${({ theme }) => theme.designTokens.screenMD}px) {
            font-size: ${({ theme }) => theme.designTokens.fontSizeHeading2}px;
        }
    }

    h4 {
        color: ${({ theme }) => theme.designTokens.colorTextSecondary};
        max-width: ${({ theme }) => theme.designTokens.screenMD}px;
        margin: 0 auto;
        white-space: pre-line;

        @media (max-width: ${({ theme }) => theme.designTokens.screenMD}px) {
            font-size: ${({ theme }) => theme.designTokens.fontSizeSM}px;
        }
    }
`;

export const RecommendationSection = styled.div`
    margin: ${({ theme }) => theme.designTokens.marginXXL}px 0;
    padding: ${({ theme }) => theme.designTokens.paddingXL}px;
    background: linear-gradient(
        135deg,
        ${({ theme }) => theme.designTokens.colorBgLayout},
        ${({ theme }) => theme.designTokens.colorBgContainer}
    );
    border-radius: 16px;
    border: 1px solid ${({ theme }) => theme.designTokens.colorBorderSecondary};

    @media (max-width: ${({ theme }) => theme.designTokens.screenMD}px) {
        padding: ${({ theme }) => theme.designTokens.paddingLG}px;
    }

    h3 {
        font-size: ${({ theme }) => theme.designTokens.fontSizeHeading2}px;
        font-weight: ${({ theme }) => theme.designTokens.fontWeightStrong};
        margin-bottom: ${({ theme }) => theme.designTokens.marginLG}px;
        text-align: center;
        color: ${({ theme }) => theme.designTokens.colorTextHeading};

        @media (max-width: ${({ theme }) => theme.designTokens.screenMD}px) {
            font-size: ${({ theme }) => theme.designTokens.fontSizeHeading3}px;
        }
    }

    .ant-card {
        height: 100%;
        background: ${({ theme }) => theme.designTokens.colorBgContainer};
        border-radius: ${({ theme }) => theme.designTokens.borderRadiusLG}px;
        box-shadow: ${({ theme }) => theme.designTokens.boxShadow};
        transition:
            transform ${({ theme }) => theme.designTokens.motionDurationFast} ease,
            box-shadow ${({ theme }) => theme.designTokens.motionDurationFast} ease;

        &:hover {
            transform: translateY(-4px);
            box-shadow: ${({ theme }) => theme.designTokens.boxShadowSecondary};
        }
    }

    .ant-card-head {
        border-bottom: 2px solid ${({ theme }) => theme.designTokens.colorPrimary};
        padding: ${({ theme }) =>
            `${theme.designTokens.paddingMD}px ${theme.designTokens.paddingLG}px`};

        .ant-card-head-title {
            font-size: ${({ theme }) => theme.designTokens.fontSizeLG}px;
            font-weight: ${({ theme }) => theme.designTokens.fontWeightStrong};
        }
    }

    .ant-card-body {
        padding: ${({ theme }) => theme.designTokens.paddingLG}px;
    }

    ul {
        margin: 0;
        padding-left: ${({ theme }) => theme.designTokens.paddingLG}px;

        li {
            margin: ${({ theme }) => theme.designTokens.marginSM}px 0;
            line-height: 1.5;
            color: ${({ theme }) => theme.designTokens.colorTextSecondary};

            @media (max-width: ${({ theme }) => theme.designTokens.screenMD}px) {
                margin: ${({ theme }) => theme.designTokens.marginXS}px 0;
            }
        }
    }
`;

export const TechDetailsSection = styled.div`
    margin: ${({ theme }) => theme.designTokens.marginXXL}px 0;

    h3 {
        font-size: ${({ theme }) => theme.designTokens.fontSizeHeading2}px;
        font-weight: ${({ theme }) => theme.designTokens.fontWeightStrong};
        margin-bottom: ${({ theme }) => theme.designTokens.marginLG}px;
        text-align: center;
        color: ${({ theme }) => theme.designTokens.colorTextHeading};

        @media (max-width: ${({ theme }) => theme.designTokens.screenMD}px) {
            font-size: ${({ theme }) => theme.designTokens.fontSizeHeading3}px;
        }
    }

    .ant-card {
        border-radius: 16px;
        box-shadow: ${({ theme }) => theme.designTokens.boxShadow};
        background: ${({ theme }) => theme.designTokens.colorBgContainer};
    }

    .ant-card-body {
        padding: ${({ theme }) => theme.designTokens.paddingXL}px;

        @media (max-width: ${({ theme }) => theme.designTokens.screenMD}px) {
            padding: ${({ theme }) => theme.designTokens.paddingLG}px;
        }
    }

    strong {
        font-size: ${({ theme }) => theme.designTokens.fontSize}px;
        color: ${({ theme }) => theme.designTokens.colorTextHeading};
        display: block;
        margin-bottom: ${({ theme }) => theme.designTokens.marginSM}px;
    }

    ul {
        margin: 0;
        padding-left: ${({ theme }) => theme.designTokens.paddingLG}px;

        li {
            margin: ${({ theme }) => theme.designTokens.marginXS}px 0;
            line-height: 1.5;
            color: ${({ theme }) => theme.designTokens.colorTextSecondary};
            font-size: ${({ theme }) => theme.designTokens.fontSizeSM}px;
        }
    }

    code {
        background: ${({ theme }) => theme.designTokens.colorBgLayout};
        padding: 2px 6px;
        border-radius: ${({ theme }) => theme.designTokens.borderRadiusSM}px;
        font-family: 'Monaco', 'Menlo', monospace;
        font-size: 13px;
        color: ${({ theme }) => theme.designTokens.colorPrimary};
    }
`;

export const ActionButtons = styled.div`
    display: flex;
    justify-content: center;
    gap: ${({ theme }) => theme.designTokens.marginMD}px;
    margin-top: ${({ theme }) => theme.designTokens.marginXL}px;

    @media (max-width: ${({ theme }) => theme.designTokens.screenMD}px) {
        flex-direction: column;
        align-items: center;

        button {
            width: 200px;
        }
    }
`;

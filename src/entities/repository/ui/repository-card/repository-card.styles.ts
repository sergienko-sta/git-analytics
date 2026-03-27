import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ token }) => ({
    card: {
        transition: 'all 0.3s ease',

        '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: token.boxShadowSecondary,
        },
    },

    metaTitle: {
        marginBottom: token.marginXS,
        fontSize: token.fontSizeLG,
        fontWeight: token.fontWeightStrong,
        color: token.colorText,
    },

    metaDescription: {
        fontSize: token.fontSizeSM,
        color: token.colorTextSecondary,
    },
}));

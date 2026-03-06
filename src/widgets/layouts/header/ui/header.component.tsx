import { BulbFilled, BulbOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import { EAppRoutes, useAppNavigate, useTheme } from '@/shared';

import * as Styles from './header.styles';

export const Header = () => {
    const { to } = useAppNavigate();
    const { toggleTheme, mode } = useTheme();

    const handleLogoClick = () => {
        to(EAppRoutes.HOME, {});
    };

    return (
        <Styles.StyledHeader>
            <Styles.LeftSection>
                <Styles.Logo onClick={handleLogoClick}>GitAnalytics</Styles.Logo>
            </Styles.LeftSection>

            <Styles.RightSection>
                <Button
                    type='text'
                    icon={mode === 'light' ? <BulbOutlined /> : <BulbFilled />}
                    onClick={toggleTheme}
                    title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
                />
            </Styles.RightSection>
        </Styles.StyledHeader>
    );
};

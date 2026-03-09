import { BulbFilled, BulbOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import * as Widgets from '@widgets';

import * as Shared from '@shared';

import * as Hooks from '../hooks';

import * as Styles from './header.styles';

export const Header = () => {
    const { toggleTheme, mode } = Shared.useTheme();
    const { activeTab, handleLogoClick, handleTabChange } = Hooks.useNavigation();

    return (
        <Styles.StyledHeader>
            <Styles.LeftSection>
                <Styles.Logo onClick={handleLogoClick}>GitAnalytics</Styles.Logo>
            </Styles.LeftSection>

            <Widgets.NavigationTabs activeTab={activeTab} onTabChange={handleTabChange} />

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
